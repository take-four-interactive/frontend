import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { mockAdminReservations } from '@/lib/mockData';
import { minutesToTime, DAY_LABELS, RESERVATION_TYPE_LABELS } from '@/lib/types';
import { ArrowLeft, Check, X, Ban } from 'lucide-react';

export default function AdminReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(() =>
    mockAdminReservations.find(r => r.id === id) || mockAdminReservations[0]
  );
  const [rejectReason, setRejectReason] = useState('');
  const [showReject, setShowReject] = useState(false);

  const handleAccept = () => setReservation({ ...reservation, status: 'ACCEPTED' });
  const handleReject = () => { setReservation({ ...reservation, status: 'REJECTED' }); setShowReject(false); };
  const handleCancel = () => setReservation({ ...reservation, status: 'CANCELLED' });

  return (
    <div className="max-w-2xl animate-fade-in">
      <button onClick={() => navigate('/admin/rezerwacje')} className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} /> Lista rezerwacji
      </button>

      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground">{reservation.reservationNumber}</h1>
        <StatusBadge status={reservation.status} />
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-surface-lowest rounded-2xl p-6 card-accent space-y-3">
          <Row label="Obiekt" value={`${reservation.facility?.name} — ${reservation.area?.name}`} />
          <Row label="Rodzaj" value={RESERVATION_TYPE_LABELS[reservation.reservationType]} />
          <Row label="Termin" value={reservation.schedules.map(s => DAY_LABELS[s.dayOfWeek]).join(', ')} />
          <Row label="Godziny" value={reservation.schedules.map(s => `${minutesToTime(s.startsAt)}–${minutesToTime(s.endsAt)}`).join(', ')} />
          <Row label="Data złożenia" value={reservation.createdAt} />
        </div>

        <div className="bg-surface-lowest rounded-2xl p-6 card-accent space-y-3">
          <Row label="Klient" value={reservation.reservationHolder} />
          <Row label="E-mail" value={reservation.email} />
          <Row label="Telefon" value={reservation.phoneNumber} />
          {reservation.nip && <Row label="NIP" value={reservation.nip} />}
        </div>

        {reservation.payment && (
          <div className="bg-secondary/10 rounded-2xl p-6">
            <Row label="Kwota" value={`${reservation.payment.amount.toFixed(2)} zł`} />
          </div>
        )}
      </div>

      {reservation.status === 'PENDING' && (
        <div className="flex flex-wrap gap-3">
          <Button variant="default" onClick={handleAccept}>
            <Check size={16} /> Zaakceptuj
          </Button>
          <Button variant="outline" onClick={() => setShowReject(!showReject)}>
            <X size={16} /> Odrzuć
          </Button>
          <Button variant="ghost" onClick={handleCancel} className="text-destructive hover:text-destructive">
            <Ban size={16} /> Anuluj
          </Button>
        </div>
      )}

      {showReject && (
        <div className="mt-4 bg-surface-lowest rounded-2xl p-6 space-y-4 animate-scale-in">
          <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground block">Powód odrzucenia (opcjonalnie)</label>
          <textarea
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            className="w-full h-24 px-4 py-3 bg-surface-low rounded-lg font-body text-sm text-foreground focus:outline-none resize-none"
          />
          <Button variant="destructive" onClick={handleReject}>Potwierdź odrzucenie</Button>
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
