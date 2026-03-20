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

const ALL_DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'SATURDAY', 'SUNDAY'];

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
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [startDateStr, setStartDateStr] = useState<string | null>(null);
  const [endDateStr, setEndDateStr] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  // Post submission
  const [submitted, setSubmitted] = useState(false);
  const [reservationNumber, setReservationNumber] = useState('');

  const areas = selectedFacility ? mockAreas.filter(a => a.facility_id === selectedFacility) : [];
  const takenSlots = selectedArea ? mockTakenSlots[selectedArea.id] || [] : [];

  const canNext = () => {
    switch (step) {
      case 0: return !!selectedArea;
      case 1: return !!reservationType;
      case 2: return holder.trim() && email.includes('@') && phone.trim() && (!isCompany || nip.trim());
      case 3: {
        if (startTime === null || endTime === null || startTime >= endTime) return false;
        if (reservationType === 'SINGLE') return !!startDateStr;
        if (reservationType === 'SUBSCRIPTION') return selectedDays.length > 0;
        if (reservationType === 'PERIODIC') return !!startDateStr && !!endDateStr && selectedDays.length > 0;
        return false;
      }
      default: return true;
    }
  };

  const generateTimeSlots = () => {
    if (!selectedArea) return [];
    const slots: number[] = [];
    for (let m = selectedArea.available_from; m < selectedArea.available_to; m += 15) {
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
    if (!selectedArea || startTime === null || endTime === null || startTime >= endTime) return 0;
    const intervals = (endTime - startTime) / 15;
    const basePrice = selectedArea.price * intervals;
    if (reservationType === 'SINGLE') return basePrice;
    if (reservationType === 'PERIODIC') {
      if (!startDateStr || !endDateStr) return 0;
      let count = 0;
      const cur = new Date(startDateStr);
      const end = new Date(endDateStr);
      const mMap: Record<number, DayOfWeek | undefined> = { 0: 'SUNDAY', 1: 'MONDAY', 2: 'TUESDAY', 3: 'WEDNESDAY', 4: 'THURSDAY', 6: 'SATURDAY' };
      while (cur <= end) {
        const d = mMap[cur.getDay()];
        if (d && selectedDays.includes(d)) count++;
        cur.setDate(cur.getDate() + 1);
      }
      return basePrice * count;
    }
    if (reservationType === 'SUBSCRIPTION') return basePrice * selectedDays.length * 4;
    return basePrice;
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
                        {mockAreas.filter(a => a.facility_id === facility.id).map(area => (
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
                              {(area.price * 4).toFixed(0)} zł/h
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
                  { type: 'SINGLE' as ReservationType, desc: 'Jednorazowa rezerwacja na wybrany dzień.' },
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

              {(reservationType === 'SUBSCRIPTION' || reservationType === 'PERIODIC') && (
                <div className="mb-8">
                  <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-3">Dni tygodnia</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DAYS.map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])}
                        className={cn(
                          'px-4 py-2 rounded-full font-body text-sm font-medium transition-colors',
                          selectedDays.includes(day) ? 'bg-primary text-primary-foreground shadow-md' : 'bg-surface-high text-muted-foreground hover:bg-surface-high/80'
                        )}
                      >
                        {DAY_LABELS[day]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(reservationType === 'SINGLE' || reservationType === 'PERIODIC') && (
                <div className="mb-10 max-w-sm">
                  <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-3">
                    {reservationType === 'PERIODIC' ? 'Wybierz zakres dat' : 'Wybierz datę'}
                  </p>
                  
                  {/* Custom Calendar Card */}
                  <div className="bg-surface-lowest shadow-ambient rounded-2xl p-5 border border-surface-high">
                    <div className="flex justify-between items-center mb-4">
                      <button onClick={() => setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className="p-2 hover:bg-surface-low rounded-lg transition-colors text-primary">
                        <ArrowLeft size={18} />
                      </button>
                      <span className="font-display font-semibold text-foreground text-sm uppercase tracking-wide">
                        {currentMonthDate.toLocaleString('pl-PL', { month: 'long', year: 'numeric' })}
                      </span>
                      <button onClick={() => setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="p-2 hover:bg-surface-low rounded-lg transition-colors text-primary">
                        <ArrowRight size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 mb-2">
                      {['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'].map(d => (
                        <span key={d} className="text-center font-body text-xs font-medium text-muted-foreground">{d}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-1">
                      {(() => {
                        const year = currentMonthDate.getFullYear();
                        const month = currentMonthDate.getMonth();
                        const firstDay = new Date(year, month, 1).getDay();
                        const daysInMonth = new Date(year, month + 1, 0).getDate();
                        const daysPre = Array(firstDay).fill(null);
                        const daysIds = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                        const handleDateClick = (dateStr: string) => {
                          if (reservationType === 'SINGLE') {
                            setStartDateStr(dateStr);
                            setEndDateStr(null);
                          } else {
                            if (startDateStr === null) {
                              setStartDateStr(dateStr);
                              setEndDateStr(null);
                            } else if (endDateStr !== null) {
                              setStartDateStr(dateStr);
                              setEndDateStr(null);
                            } else if (dateStr === startDateStr) {
                              setStartDateStr(null);
                            } else if (dateStr < startDateStr) {
                              return;
                            } else {
                              setEndDateStr(dateStr);
                            }
                          }
                        };

                        return [...daysPre.map((_, i) => <span key={`pre-${i}`} />), ...daysIds.map(d => {
                          const dateObj = new Date(year, month, d);
                          // Adjust for local timezone string comparison
                          const dateStr = [dateObj.getFullYear(), String(dateObj.getMonth() + 1).padStart(2, '0'), String(dateObj.getDate()).padStart(2, '0')].join('-');
                          
                          const isStart = startDateStr === dateStr;
                          const isEnd = endDateStr === dateStr;
                          const isBetween = reservationType === 'PERIODIC' && startDateStr && endDateStr && dateStr > startDateStr && dateStr < endDateStr;
                          const isSelected = isStart || isEnd || isBetween;

                          return (
                            <div key={d} className={cn(
                              "h-10 flex items-center justify-center relative",
                              isBetween && "bg-primary/10",
                              isStart && endDateStr && "bg-gradient-to-r from-transparent 50% to-primary/10",
                              isEnd && startDateStr && "bg-gradient-to-l from-transparent 50% to-primary/10",
                            )}>
                              <button
                                onClick={() => handleDateClick(dateStr)}
                                className={cn(
                                  'w-8 h-8 rounded-lg font-body text-sm transition-all flex items-center justify-center relative z-10',
                                  isStart ? 'border-2 border-primary text-primary font-bold shadow-sm bg-surface-lowest' : '',
                                  isEnd ? 'bg-primary text-primary-foreground font-bold shadow-md' : '',
                                  !isStart && !isEnd && isBetween ? 'text-primary' : '',
                                  !isSelected ? 'text-foreground hover:bg-surface-high/50' : ''
                                )}
                              >
                                {d}
                              </button>
                            </div>
                          );
                        })];
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* Time Slots (Range Picker Visual Grid) */}
              <div>
                <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-3">Wybierz zakres czasu</p>
                <div className="bg-surface-lowest shadow-ambient rounded-2xl p-5 border border-surface-high">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-2">
                    {generateTimeSlots().map((slot, index, arr) => {
                      const isTaken = takenSlots.includes(slot);
                      const isStart = startTime === slot;
                      const isEndBlock = endTime !== null && slot === endTime - 15;
                      const isBetween = startTime !== null && endTime !== null && slot > startTime && slot < endTime - 15;
                      const isSelected = isStart || isEndBlock || isBetween;

                      const handleTimeClick = () => {
                        if (startTime === null) {
                          setStartTime(slot);
                          setEndTime(slot + 15);
                        } else if (endTime !== null && endTime > startTime + 15) {
                          setStartTime(slot);
                          setEndTime(slot + 15);
                        } else if (startTime === slot && endTime === slot + 15) {
                          setStartTime(null);
                          setEndTime(null);
                        } else {
                          const proposedEnd = slot + 15;
                          if (proposedEnd <= startTime) return;
                          const hasTaken = takenSlots.some(t => t >= startTime && t < proposedEnd);
                          if (hasTaken) return;
                          setEndTime(proposedEnd);
                        }
                      };

                      return (
                        <div key={slot} className={cn(
                          "h-10 flex items-center justify-center relative",
                          isBetween && "bg-primary/10",
                          isStart && endTime !== null && endTime > startTime + 15 && "bg-gradient-to-r from-transparent 50% to-primary/10",
                          isEndBlock && startTime !== null && endTime > startTime + 15 && "bg-gradient-to-l from-transparent 50% to-primary/10",
                        )}>
                          <button
                            disabled={isTaken}
                            onClick={handleTimeClick}
                            className={cn(
                              'w-full mx-1 py-1.5 rounded-lg font-body text-xs font-medium transition-all relative z-10',
                              isTaken ? 'bg-surface-high text-muted-foreground/40 line-through cursor-not-allowed' : '',
                              isStart && !isTaken ? 'border-2 border-primary text-primary bg-surface-lowest shadow-sm' : '',
                              isEndBlock && !isStart && !isTaken ? 'bg-primary text-primary-foreground shadow-md' : '',
                              isBetween && !isTaken ? 'text-primary' : '',
                              !isSelected && !isTaken ? 'text-foreground hover:bg-surface-high' : ''
                            )}
                          >
                            {minutesToTime(slot)}
                          </button>
                        </div>
                      );
                    })}
                  </div>
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
                        : reservationType === 'PERIODIC'
                          ? `Od ${startDateStr || ''} do ${endDateStr || startDateStr} (${selectedDays.map(d => DAY_LABELS[d].slice(0, 3)).join(', ')})`
                          : startDateStr || ''
                    }
                  />
                  <Row label="Godziny" value={startTime !== null && endTime !== null ? `${minutesToTime(startTime)} – ${minutesToTime(endTime)}` : ''} />
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
