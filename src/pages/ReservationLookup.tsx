import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { mockReservation } from '@/lib/mockData';
import { minutesToTime, DAY_LABELS, RESERVATION_TYPE_LABELS } from '@/lib/types';
import type { Reservation } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

export default function ReservationLookup() {
  const { number } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Mock fetch
    setTimeout(() => {
      if (number && (number === mockReservation.reservationNumber || number.startsWith('MOSiR-'))) {
        setReservation({ ...mockReservation, reservationNumber: number });
      } else {
        setError('Nie znaleziono rezerwacji o podanym numerze.');
      }
      setLoading(false);
    }, 800);
  }, [number]);

  const handleCancel = () => {
    if (reservation && (reservation.status === 'PENDING' || reservation.status === 'ACCEPTED')) {
      setReservation({ ...reservation, status: 'CANCELLED' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-16">
        <div className="animate-pulse space-y-4 w-full max-w-lg mx-4">
          <div className="h-6 bg-surface-high rounded w-1/3" />
          <div className="h-40 bg-surface-high rounded-2xl" />
          <div className="h-20 bg-surface-high rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-16">
        <div className="text-center mx-4">
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Nie znaleziono</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">{error}</p>
          <Button variant="default" onClick={() => navigate('/')}>Wróć na stronę główną</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Strona główna
        </button>

        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-foreground">{reservation.reservationNumber}</h1>
          <StatusBadge status={reservation.status} />
        </div>

        <div className="space-y-4">
          <div className="bg-surface-lowest rounded-2xl p-6 card-accent space-y-3">
            <Row label="Obiekt" value={`${reservation.facility?.name} — ${reservation.area?.name}`} />
            <Row label="Rodzaj" value={RESERVATION_TYPE_LABELS[reservation.reservationType]} />
            <Row label="Termin" value={reservation.schedules.map(s => `${DAY_LABELS[s.dayOfWeek]}`).join(', ')} />
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

          {(reservation.status === 'PENDING' || reservation.status === 'ACCEPTED') && (
            <div className="pt-4">
              <Button variant="destructive" onClick={handleCancel}>Anuluj rezerwację</Button>
            </div>
          )}
        </div>
      </div>
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
