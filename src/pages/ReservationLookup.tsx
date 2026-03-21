import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { api } from '@/lib/api';
import {
  mapReservationFromApi,
  mapScheduleFromApi,
  reservationNumberFromApi,
  type ApiReservation,
  type ApiSchedule,
} from '@/lib/apiMappers';
import { minutesToTime, DAY_LABELS, RESERVATION_TYPE_LABELS } from '@/lib/types';
import type { Reservation } from '@/lib/types';
import { ArrowLeft, WalletCards, MapPin, User, CalendarRange, Info, Ban, ReceiptText, CalendarClock } from 'lucide-react';

export default function ReservationLookup() {
  const { number } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: reservation,
    isPending: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ['public-reservation', number],
    queryFn: async (): Promise<Reservation> => {
      if (!number) throw new Error('Nie znaleziono rezerwacji o podanym numerze.');
      const list = await api.get<ApiReservation[]>('/api/v1/reservations');
      const match = list.find(
        r =>
          reservationNumberFromApi(r).toLowerCase() === number.toLowerCase() ||
          r.id === number,
      );
      if (!match) throw new Error('Nie znaleziono rezerwacji o podanym numerze.');
      const aid = match.area?.id;
      let schedules = [];
      if (aid) {
        const slist = await api.get<ApiSchedule[]>(`/api/v1/areas/${aid}/schedules`);
        schedules = slist.filter(s => s.reservation?.id === match.id).map(s => mapScheduleFromApi(s, match.id));
      }
      return mapReservationFromApi(match, schedules);
    },
    enabled: !!number,
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/reservations/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Reservation>(['public-reservation', number], old =>
        old && old.id === id ? { ...old, status: 'CANCELLED' } : old,
      );
      queryClient.invalidateQueries({ queryKey: ['area-schedules'] });
      queryClient.invalidateQueries({ queryKey: ['admin-reservations'] });
    },
  });

  const handleCancel = () => {
    if (reservation && (reservation.status === 'PENDING' || reservation.status === 'CONFIRMED')) {
      cancelMutation.mutate(reservation.id);
    }
  };

  const errMsg = isError && error instanceof Error ? error.message : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-16">
        <div className="animate-pulse space-y-4 w-full max-w-lg mx-4">
          <div className="h-6 bg-surface-high rounded w-1/3" />
          <div className="h-40 bg-surface-high rounded-3xl" />
          <div className="h-20 bg-surface-high rounded-3xl" />
        </div>
      </div>
    );
  }

  if (errMsg || !reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-16">
        <div className="text-center mx-4 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <Ban size={32} />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Nie znaleziono</h2>
          <p className="font-body text-base text-muted-foreground mb-8 text-balance">{errMsg || 'Nie znaleziono rezerwacji o podanym numerze.'}</p>
          <Button variant="default" size="lg" onClick={() => navigate('/znajdz-rezerwacje')}>Wróć do wyszukiwarki</Button>
        </div>
      </div>
    );
  }

  const isCanceled = reservation.status === 'CANCELLED';
  const paid = (reservation.payment?.amount ?? 0) > 0;
  const bookedHours = reservation.schedules.reduce((sum, s) => sum + Math.max(0, s.ends_at - s.starts_at), 0) / 60;
  // `area.price` is stored as price per 15 minutes, so convert to hourly rate.
  const pricePerHour = (reservation.area?.price ?? 0) * 4;
  const amountToPay = pricePerHour * bookedHours;

  return (
    <div className="min-h-screen bg-surface pt-20 pb-20">
      {/* Background Hero */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-[#22338b] to-[#141e54] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('@/assets/hero-sports.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 pt-8">
        <button onClick={() => navigate('/znajdz-rezerwacje')} className="flex items-center gap-2 font-display font-medium text-sm text-white/70 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Powrót
        </button>

        {/* Title Header */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] items-start gap-4 md:gap-6 mb-12 text-white animate-fade-in-up">
          <div className="min-w-0 max-w-full overflow-hidden">
            <span className="font-body text-xs font-semibold tracking-widest text-white/50 uppercase mb-2 block">Szczegóły rezerwacji</span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-[-0.02em] leading-tight [overflow-wrap:anywhere]">
              {reservation.reservationNumber}
            </h1>
          </div>
          <div className="justify-self-start md:justify-self-end md:self-start bg-white/95 rounded-full px-2 py-1 shadow-sm">
            <StatusBadge status={reservation.status} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* Main Info Columns */}
          <div className="space-y-6">

            {/* Facility & Time Card */}
            <div className="bg-surface-lowest rounded-3xl p-6 md:p-8 shadow-ambient border border-border/50 animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground leading-tight">{reservation.facility?.name}</h3>
                  <p className="font-body text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-open-green"></span> {reservation.area?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <CalendarRange size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-body text-xs text-muted-foreground mb-1 uppercase tracking-wider">Rodzaj i Termin</span>
                    <span className="block font-body text-base font-medium text-foreground text-balance">
                      {RESERVATION_TYPE_LABELS[reservation.reservationType]}
                    </span>
                    <span className="block font-body text-sm text-foreground/80 mt-1">
                      {reservation.schedules.length
                        ? reservation.schedules.map(s => `${DAY_LABELS[s.day_of_week]}`).join(', ')
                        : '—'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CalendarClock size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-body text-xs text-muted-foreground mb-1 uppercase tracking-wider">Godziny i Data</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {reservation.schedules.length ? (
                        reservation.schedules.map((s, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-high font-body text-sm font-medium text-foreground"
                          >
                            {minutesToTime(s.starts_at)} – {minutesToTime(s.ends_at)}
                          </span>
                        ))
                      ) : (
                        <span className="font-body text-sm text-muted-foreground">—</span>
                      )}
                    </div>
                    <span className="block font-body text-xs text-muted-foreground mt-3">
                      Złożono: {reservation.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Info Card */}
            <div className="bg-surface-lowest rounded-3xl p-6 md:p-8 shadow-ambient border border-border/50 animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary-container">
                  <User size={20} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">Dane klienta</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-y-5 gap-x-4">
                <div>
                  <span className="block font-body text-xs text-muted-foreground mb-1">Główny rezerwujący</span>
                  <span className="block font-body text-sm font-medium text-foreground break-all">{reservation.reservationHolder}</span>
                </div>
                <div>
                  <span className="block font-body text-xs text-muted-foreground mb-1">E-mail</span>
                  <span className="block font-body text-sm font-medium text-foreground break-all">{reservation.email}</span>
                </div>
                <div>
                  <span className="block font-body text-xs text-muted-foreground mb-1">Telefon</span>
                  <span className="block font-body text-sm font-medium text-foreground">{reservation.phoneNumber}</span>
                </div>
                {reservation.nip && (
                  <div>
                    <span className="block font-body text-xs text-muted-foreground mb-1">NIP (Firma)</span>
                    <span className="block font-body text-sm font-medium text-foreground">{reservation.nip}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (Finances & Actions) */}
          <div className="space-y-6">

            {/* Finances Card */}
            <div className="bg-surface-lowest rounded-3xl p-6 md:p-8 shadow-ambient border border-border/50 relative overflow-hidden animate-scale-in" style={{ animationDelay: '300ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <WalletCards size={20} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">Finanse</h3>
                </div>
                {paid ? (
                  <span className="bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-green-200">Opłacone</span>
                ) : (
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-orange-200">Do zapłaty</span>
                )}
              </div>

              <div className="bg-surface-low rounded-2xl p-5 mb-4 relative z-10">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-body text-sm text-muted-foreground">Całkowity koszt</span>
                  <span className="font-display font-bold text-3xl text-foreground">
                    {amountToPay.toFixed(2)} <span className="text-lg text-muted-foreground font-medium">zł</span>
                  </span>
                </div>
              </div>

              {!paid && (
                <Button
                  type="button"
                  variant="default"
                  className="w-full mb-2"
                >
                  Przejdź do płatności
                </Button>
              )}

              {paid && (
                <button className="w-full flex justify-center items-center gap-2 py-3 font-body text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors">
                  <ReceiptText size={18} /> Pobierz fakturę / rachunek
                </button>
              )}
            </div>

            {/* Actions Card */}
            {!isCanceled && (
              <div className="bg-red-50/50 rounded-3xl p-6 md:p-8 border border-red-100 animate-scale-in" style={{ animationDelay: '400ms' }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                    <Info size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-red-950 mb-1">Zarządzaj rezerwacją</h3>
                    <p className="font-body text-sm text-red-900/70 text-balance">
                      Jeżeli zmieniły się Twoje plany, możesz anulować tę rezerwację. Procesu zwrotu środków (jeśli występuje) możesz śledzić kontaktując się z BOK.
                    </p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="xl"
                  className="w-full font-bold shadow-lg shadow-red-500/20"
                  onClick={handleCancel}
                  disabled={cancelMutation.isPending}
                >
                  <Ban size={18} className="mr-2" />
                  Anuluj bezpowrotnie
                </Button>
              </div>
            )}

            {isCanceled && (
              <div className="bg-surface-low rounded-3xl p-6 md:p-8 text-center animate-scale-in">
                <span className="block font-display font-bold text-lg text-foreground mb-2">Rezerwacja jest nieaktywna</span>
                <p className="font-body text-sm text-muted-foreground text-balance">
                  Ta rezerwacja została anulowana lub odrzucona przez administratora i nie możesz już nią zarządzać.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

