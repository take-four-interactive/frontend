import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import StatusBadge from '@/components/StatusBadge';
import { toast } from '@/components/ui/use-toast';
import { api } from '@/lib/api';
import {
  mapReservationFromApi,
  mapScheduleFromApi,
  scheduleLinksToReservationId,
  type ApiReservation,
  type ApiSchedule,
} from '@/lib/apiMappers';
import type { Reservation, Schedule } from '@/lib/types';
import { minutesToTime, DAY_LABELS, RESERVATION_TYPE_LABELS } from '@/lib/types';
import { ArrowLeft, Check, X, Trash2 } from 'lucide-react';

export default function AdminReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rejectReason, setRejectReason] = useState('');
  const [showReject, setShowReject] = useState(false);
  const [localOverride, setLocalOverride] = useState<Reservation['status'] | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: reservation, isPending, isError } = useQuery({
    queryKey: ['reservation', id],
    queryFn: async () => {
      const r = await api.get<ApiReservation>(`/api/v1/reservations/${id}`);
      const aid = r.area?.id;
      let schedules: Schedule[] = [];
      if (aid) {
        const list = await api.get<ApiSchedule[]>(`/api/v1/areas/${aid}/schedules`);
        schedules = list
          .filter(s => scheduleLinksToReservationId(s) === r.id)
          .map(s => mapScheduleFromApi(s, r.id));
      }
      return mapReservationFromApi(r, schedules);
    },
    enabled: !!id,
  });

  const display = reservation ? { ...reservation, status: localOverride ?? reservation.status } : null;

  const handleAccept = () => setLocalOverride('CONFIRMED');
  const handleReject = () => {
    setLocalOverride('CANCELLED');
    setShowReject(false);
  };

  const deleteMutation = useMutation({
    mutationFn: (reservationId: string) => api.delete(`/api/v1/reservations/${reservationId}`),
    onSuccess: async () => {
      setDeleteDialogOpen(false);
      await queryClient.invalidateQueries({ queryKey: ['admin-reservations'] });
      await queryClient.invalidateQueries({ queryKey: ['area-schedules'] });
      toast({ title: 'Rezerwacja została usunięta.' });
      navigate('/admin/rezerwacje');
    },
    onError: (err: Error) => {
      toast({
        title: 'Nie udało się usunąć rezerwacji',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  if (isPending || !display) {
    return (
      <div className="max-w-2xl animate-fade-in py-12">
        <p className="font-body text-sm text-muted-foreground">Ładowanie…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl animate-fade-in py-12">
        <p className="font-body text-sm text-destructive">Nie udało się wczytać rezerwacji.</p>
        <button
          type="button"
          onClick={() => navigate('/admin/rezerwacje')}
          className="mt-4 font-body text-sm text-primary underline"
        >
          Wróć do listy
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl animate-fade-in">
      <button
        type="button"
        onClick={() => navigate('/admin/rezerwacje')}
        className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Lista rezerwacji
      </button>

      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground">{display.reservationNumber}</h1>
        <StatusBadge status={display.status} />
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-surface-lowest rounded-2xl p-6 card-accent space-y-3">
          <Row label="Obiekt" value={`${display.facility?.name ?? '—'} — ${display.area?.name ?? '—'}`} />
          <Row label="Rodzaj" value={RESERVATION_TYPE_LABELS[display.reservationType]} />
          <Row
            label="Termin"
            value={
              display.schedules.length
                ? display.schedules.map(s => DAY_LABELS[s.day_of_week]).join(', ')
                : '—'
            }
          />
          <Row
            label="Godziny"
            value={
              display.schedules.length
                ? display.schedules.map(s => `${minutesToTime(s.starts_at)}–${minutesToTime(s.ends_at)}`).join(', ')
                : '—'
            }
          />
          <Row label="Data złożenia" value={display.createdAt} />
        </div>

        <div className="bg-surface-lowest rounded-2xl p-6 card-accent space-y-3">
          <Row label="Klient" value={display.reservationHolder} />
          <Row label="E-mail" value={display.email} />
          <Row label="Telefon" value={display.phoneNumber} />
          {display.nip && <Row label="NIP" value={display.nip} />}
        </div>

        <div className="bg-secondary/10 rounded-2xl p-6">
          <Row label="Kwota" value={`${(display.payment?.amount ?? 0).toFixed(2)} zł`} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {display.status === 'PENDING' && (
          <>
            <Button variant="default" onClick={handleAccept}>
              <Check size={16} /> Zaakceptuj
            </Button>
            <Button variant="outline" onClick={() => setShowReject(!showReject)}>
              <X size={16} /> Odrzuć
            </Button>
          </>
        )}
        <Button
          type="button"
          variant="outline"
          className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => setDeleteDialogOpen(true)}
          disabled={deleteMutation.isPending}
        >
          <Trash2 size={16} /> Usuń rezerwację
        </Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usunąć rezerwację?</AlertDialogTitle>
            <AlertDialogDescription>
              Czynność jest nieodwracalna. Sloty w kalendarzu zostaną zwolnione.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending || !id}
              onClick={() => id && deleteMutation.mutate(id)}
            >
              {deleteMutation.isPending ? 'Usuwanie…' : 'Usuń'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showReject && (
        <div className="mt-4 bg-surface-lowest rounded-2xl p-6 space-y-4 animate-scale-in">
          <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground block">
            Powód odrzucenia (opcjonalnie)
          </label>
          <textarea
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            className="w-full h-24 px-4 py-3 bg-surface-low rounded-lg font-body text-sm text-foreground focus:outline-none resize-none"
          />
          <Button variant="destructive" onClick={handleReject}>
            Potwierdź odrzucenie
          </Button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="font-body text-xs text-muted-foreground flex-shrink-0">{label}</span>
      <span className="font-body text-sm text-foreground text-right">{value}</span>
    </div>
  );
}
