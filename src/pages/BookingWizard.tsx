import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mockFacilities, mockAreas, mockTakenSlots } from '@/lib/mockData';
import {
  type Area, type DayOfWeek, type ReservationType,
  minutesToTime, DAY_LABELS, RESERVATION_TYPE_LABELS,
  type CreateReservationRequest, type Schedule,
} from '@/lib/types';
import { ArrowLeft, ArrowRight, Check, Building2, User, CalendarDays, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { label: 'Obiekt', icon: Building2 },
  { label: 'Typ', icon: CalendarDays },
  { label: 'Dane', icon: User },
  { label: 'Termin', icon: Clock },
  { label: 'Podsumowanie', icon: FileText },
];

const ALL_DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export default function BookingWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 1
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  // Step 2
  const [reservationType, setReservationType] = useState<ReservationType | null>(null);

  // Step 3
  const [isCompany, setIsCompany] = useState(false);
  const [holder, setHolder] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nip, setNip] = useState('');

  // Step 4
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dateRangeEnd, setDateRangeEnd] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  // Post submission
  const [submitted, setSubmitted] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');

  const areas = selectedFacility ? mockAreas[selectedFacility] || [] : [];
  const takenSlots = selectedArea ? mockTakenSlots[selectedArea.id] || [] : [];

  const canNext = () => {
    switch (step) {
      case 0: return !!selectedArea;
      case 1: return !!reservationType;
      case 2: return holder.trim() && email.includes('@') && phone.trim() && (!isCompany || nip.trim());
      case 3: return selectedSlots.length > 0 && (reservationType === 'SUBSCRIPTION' ? selectedDays.length > 0 : !!selectedDate);
      default: return true;
    }
  };

  const generateTimeSlots = () => {
    if (!selectedArea) return [];
    const slots: number[] = [];
    for (let m = selectedArea.available_from; m < selectedArea.available_to; m += 60) {
      slots.push(m);
    }
    return slots;
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days: Date[] = [];
    for (let i = 0; i < 28; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const calculatePrice = () => {
    if (!selectedArea || selectedSlots.length === 0) return 0;
    const pricePerHour = selectedArea.price_per_15mins * 4;
    const hours = selectedSlots.length;
    if (reservationType === 'ONCE') return pricePerHour * hours;
    if (reservationType === 'PERIODIC' && selectedDate && dateRangeEnd) {
      const start = new Date(selectedDate);
      const end = new Date(dateRangeEnd);
      const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      return pricePerHour * hours * days;
    }
    if (reservationType === 'SUBSCRIPTION') return pricePerHour * hours * selectedDays.length;
    return pricePerHour * hours;
  };

  const handleSubmit = () => {
    // Mock submission
    const num = `MOSiR-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationNumber(num);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-16">
        <div className="bg-surface-lowest rounded-2xl p-8 md:p-12 max-w-md w-full mx-4 shadow-ambient text-center animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-open-green/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-open-green" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground mb-2">Rezerwacja złożona!</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">Rezerwacja oczekuje na akceptację administratora.</p>
          <button
            onClick={() => navigate(`/rezerwacja/${reservationNumber}`)}
            className="font-display text-lg font-bold text-primary hover:underline underline-offset-4 mb-4 block mx-auto"
          >
            {reservationNumber}
          </button>
          <p className="font-body text-xs text-muted-foreground mb-8">
            Numer rezerwacji wysłano na adres e-mail. Możesz go wpisać w wyszukiwarce na stronie głównej.
          </p>
          <Button variant="default" onClick={() => navigate('/')}>Wróć na stronę główną</Button>
        </div>
      </div>
    );
  }

  const facilityName = selectedFacility ? mockFacilities.find(f => f.id === selectedFacility)?.name : '';

  return (
    <div className="min-h-screen bg-surface pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="gradient-hero rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors',
                  i <= step ? 'bg-secondary text-secondary-foreground' : 'bg-primary-foreground/10 text-primary-foreground/40'
                )}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={cn(
                  'hidden sm:block font-body text-xs',
                  i <= step ? 'text-primary-foreground' : 'text-primary-foreground/40'
                )}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    'hidden sm:block w-8 h-px mx-2',
                    i < step ? 'bg-secondary' : 'bg-primary-foreground/10'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-surface-lowest rounded-2xl p-6 md:p-8 min-h-[400px] animate-fade-in">
          {/* Step 1: Facility */}
          {step === 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] mb-1">Wybierz obiekt</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">Wybierz obiekt i salę, którą chcesz zarezerwować.</p>
              <div className="space-y-4">
                {mockFacilities.map(facility => (
                  <div key={facility.id}>
                    <button
                      onClick={() => { setSelectedFacility(facility.id); setSelectedArea(null); }}
                      className={cn(
                        'w-full text-left p-4 rounded-xl transition-colors',
                        selectedFacility === facility.id ? 'bg-surface-low card-accent-active' : 'bg-surface-low card-accent hover:bg-surface-high/50'
                      )}
                    >
                      <h3 className="font-display font-semibold text-foreground">{facility.name}</h3>
                    </button>
                    {selectedFacility === facility.id && (
                      <div className="ml-4 mt-3 space-y-2">
                        {(mockAreas[facility.id] || []).map(area => (
                          <button
                            key={area.id}
                            onClick={() => setSelectedArea(area)}
                            className={cn(
                              'w-full text-left p-4 rounded-xl transition-colors flex items-center justify-between',
                              selectedArea?.id === area.id ? 'bg-accent card-accent-active' : 'bg-surface-low hover:bg-surface-high/50'
                            )}
                          >
                            <div>
                              <span className="font-display font-medium text-foreground">{area.name}</span>
                              <span className="block font-body text-xs text-muted-foreground">
                                {minutesToTime(area.available_from)} – {minutesToTime(area.available_to)}
                              </span>
                            </div>
                            <span className="font-display font-bold text-sm text-secondary-container bg-secondary/15 px-3 py-1 rounded-full">
                              {(area.price_per_15mins * 4).toFixed(0)} zł/h
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Type */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] mb-1">Rodzaj rezerwacji</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">Wybierz, jak chcesz zarezerwować obiekt.</p>
              <div className="space-y-3">
                {([
                  { type: 'ONCE' as ReservationType, desc: 'Jednorazowa rezerwacja na wybrany dzień.' },
                  { type: 'PERIODIC' as ReservationType, desc: 'Rezerwacja na zakres dat (maks. 4 tygodnie).' },
                  { type: 'SUBSCRIPTION' as ReservationType, desc: 'Cykliczna rezerwacja w wybrane dni tygodnia.' },
                ]).map(opt => (
                  <button
                    key={opt.type}
                    onClick={() => setReservationType(opt.type)}
                    className={cn(
                      'w-full text-left p-5 rounded-xl transition-colors',
                      reservationType === opt.type ? 'bg-accent card-accent-active' : 'bg-surface-low card-accent hover:bg-surface-high/50'
                    )}
                  >
                    <span className="font-display font-semibold text-foreground">{RESERVATION_TYPE_LABELS[opt.type]}</span>
                    <span className="block font-body text-sm text-muted-foreground mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Client Data */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] mb-1">Dane klienta</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">Podaj dane kontaktowe do rezerwacji.</p>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIsCompany(false)}
                  className={cn(
                    'px-4 py-2 rounded-full font-body text-sm font-medium transition-colors',
                    !isCompany ? 'bg-accent text-accent-foreground' : 'bg-surface-low text-muted-foreground hover:bg-surface-high/50'
                  )}
                >
                  Osoba prywatna
                </button>
                <button
                  onClick={() => setIsCompany(true)}
                  className={cn(
                    'px-4 py-2 rounded-full font-body text-sm font-medium transition-colors',
                    isCompany ? 'bg-accent text-accent-foreground' : 'bg-surface-low text-muted-foreground hover:bg-surface-high/50'
                  )}
                >
                  Firma
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-1.5 block">
                    {isCompany ? 'Nazwa firmy' : 'Imię i nazwisko'}
                  </label>
                  <input
                    type="text"
                    value={holder}
                    onChange={e => setHolder(e.target.value)}
                    className="w-full h-11 px-4 bg-surface-low rounded-t-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                    style={{ borderBottom: '2px solid hsl(224 100% 87%)' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'hsl(237 97% 21%)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'hsl(224 100% 87%)')}
                  />
                </div>
                {isCompany && (
                  <div>
                    <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-1.5 block">NIP</label>
                    <input
                      type="text"
                      value={nip}
                      onChange={e => setNip(e.target.value)}
                      className="w-full h-11 px-4 bg-surface-low rounded-t-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                      style={{ borderBottom: '2px solid hsl(224 100% 87%)' }}
                      onFocus={e => (e.target.style.borderBottomColor = 'hsl(237 97% 21%)')}
                      onBlur={e => (e.target.style.borderBottomColor = 'hsl(224 100% 87%)')}
                    />
                  </div>
                )}
                <div>
                  <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-1.5 block">Adres e-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-11 px-4 bg-surface-low rounded-t-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                    style={{ borderBottom: '2px solid hsl(224 100% 87%)' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'hsl(237 97% 21%)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'hsl(224 100% 87%)')}
                  />
                </div>
                <div>
                  <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-1.5 block">Numer telefonu</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full h-11 px-4 bg-surface-low rounded-t-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                    style={{ borderBottom: '2px solid hsl(224 100% 87%)' }}
                    onFocus={e => (e.target.style.borderBottomColor = 'hsl(237 97% 21%)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'hsl(224 100% 87%)')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] mb-1">Wybierz termin</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">Wybierz datę i godziny rezerwacji.</p>

              {reservationType === 'SUBSCRIPTION' ? (
                <div className="mb-8">
                  <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-3">Dni tygodnia</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DAYS.map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])}
                        className={cn(
                          'px-4 py-2 rounded-full font-body text-sm font-medium transition-colors',
                          selectedDays.includes(day) ? 'bg-accent text-accent-foreground' : 'bg-surface-low text-muted-foreground hover:bg-surface-high/50'
                        )}
                      >
                        {DAY_LABELS[day]}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-3">
                    {reservationType === 'PERIODIC' ? 'Zakres dat' : 'Data'}
                  </p>
                  <div className="grid grid-cols-7 gap-1.5 max-w-sm">
                    {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map(d => (
                      <span key={d} className="text-center font-body text-xs text-muted-foreground py-1">{d}</span>
                    ))}
                    {(() => {
                      const days = generateCalendarDays();
                      const firstDayOfWeek = (days[0].getDay() + 6) % 7;
                      const blanks = Array(firstDayOfWeek).fill(null);
                      return [...blanks.map((_, i) => <span key={`b-${i}`} />), ...days.map(day => {
                        const dateStr = day.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateStr;
                        const isInRange = reservationType === 'PERIODIC' && selectedDate && dateRangeEnd &&
                          dateStr >= selectedDate && dateStr <= dateRangeEnd;
                        return (
                          <button
                            key={dateStr}
                            onClick={() => {
                              if (reservationType === 'PERIODIC') {
                                if (!selectedDate || dateRangeEnd) {
                                  setSelectedDate(dateStr);
                                  setDateRangeEnd(null);
                                } else {
                                  if (dateStr < selectedDate) {
                                    setSelectedDate(dateStr);
                                    setDateRangeEnd(null);
                                  } else {
                                    const start = new Date(selectedDate);
                                    const end = new Date(dateStr);
                                    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
                                    if (diff > 28) {
                                      const clamped = new Date(start);
                                      clamped.setDate(clamped.getDate() + 28);
                                      setDateRangeEnd(clamped.toISOString().split('T')[0]);
                                    } else {
                                      setDateRangeEnd(dateStr);
                                    }
                                  }
                                }
                              } else {
                                setSelectedDate(dateStr);
                              }
                            }}
                            className={cn(
                              'w-full aspect-square rounded-lg font-body text-sm transition-colors flex items-center justify-center',
                              isSelected || isInRange
                                ? 'bg-primary text-primary-foreground font-medium'
                                : 'text-foreground hover:bg-surface-high/50'
                            )}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })];
                    })()}
                  </div>
                </div>
              )}

              {/* Time Slots */}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground">Godziny</p>
                  <div className="flex items-center gap-3 ml-auto">
                    <span className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                      <span className="w-3 h-3 rounded bg-primary" /> Wybrana
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                      <span className="w-3 h-3 rounded bg-surface-high" /> Zajęta
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {generateTimeSlots().map(slot => {
                    const isTaken = takenSlots.includes(slot);
                    const isSelected = selectedSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        disabled={isTaken}
                        onClick={() => setSelectedSlots(prev =>
                          prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
                        )}
                        className={cn(
                          'py-2.5 rounded-lg font-body text-sm transition-colors',
                          isTaken && 'bg-surface-high text-muted-foreground/50 line-through cursor-not-allowed',
                          isSelected && !isTaken && 'bg-primary text-primary-foreground font-medium',
                          !isTaken && !isSelected && 'bg-surface-low text-foreground hover:bg-surface-high/50'
                        )}
                      >
                        {minutesToTime(slot)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Summary */}
          {step === 4 && (
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] mb-1">Podsumowanie</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">Sprawdź dane i potwierdź rezerwację.</p>

              <div className="space-y-4">
                <div className="bg-surface-low rounded-xl p-5 space-y-3">
                  <Row label="Obiekt" value={`${facilityName} — ${selectedArea?.name}`} />
                  <Row label="Rodzaj" value={reservationType ? RESERVATION_TYPE_LABELS[reservationType] : ''} />
                  <Row
                    label="Termin"
                    value={
                      reservationType === 'SUBSCRIPTION'
                        ? selectedDays.map(d => DAY_LABELS[d]).join(', ')
                        : reservationType === 'PERIODIC' && dateRangeEnd
                          ? `${selectedDate} — ${dateRangeEnd}`
                          : selectedDate || ''
                    }
                  />
                  <Row label="Godziny" value={selectedSlots.sort((a, b) => a - b).map(s => `${minutesToTime(s)}–${minutesToTime(s + 60)}`).join(', ')} />
                </div>
                <div className="bg-surface-low rounded-xl p-5 space-y-3">
                  <Row label={isCompany ? 'Firma' : 'Imię i nazwisko'} value={holder} />
                  <Row label="E-mail" value={email} />
                  <Row label="Telefon" value={phone} />
                  {isCompany && <Row label="NIP" value={nip} />}
                </div>
                <div className="bg-secondary/10 rounded-xl p-5">
                  <Row label="Cena" value={`${calculatePrice().toFixed(2)} zł`} bold />
                  {reservationType === 'SUBSCRIPTION' && (
                    <p className="font-body text-xs text-muted-foreground mt-1">Koszt tygodniowy</p>
                  )}
                </div>
              </div>

              <div className="bg-surface-low rounded-xl p-4 mt-6">
                <p className="font-body text-xs text-muted-foreground text-pretty">
                  Po złożeniu rezerwacji administrator MOSiR musi ją zaakceptować. Potwierdzenie zostanie wysłane na e-mail.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => step === 0 ? navigate('/') : setStep(step - 1)}
          >
            <ArrowLeft size={16} />
            {step === 0 ? 'Strona główna' : 'Wstecz'}
          </Button>
          {step < 4 ? (
            <Button variant="default" onClick={() => setStep(step + 1)} disabled={!canNext()}>
              Dalej <ArrowRight size={16} />
            </Button>
          ) : (
            <Button variant="hero-secondary" onClick={handleSubmit}>
              Złóż rezerwację
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="font-body text-xs text-muted-foreground flex-shrink-0">{label}</span>
      <span className={cn('font-body text-sm text-right', bold ? 'font-display font-bold text-foreground text-lg' : 'text-foreground')}>
        {value}
      </span>
    </div>
  );
}
