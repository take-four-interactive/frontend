import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mockFacilities, mockAreas, mockTakenSlots, mockAdminReservations } from '@/lib/mockData';
import {
  type Area, type DayOfWeek, type ReservationType,
  minutesToTime, DAY_LABELS, RESERVATION_TYPE_LABELS, type Reservation
} from '@/lib/types';
import { ArrowLeft, ArrowRight, Check, MapPin, CalendarDays, Clock, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { label: 'Sala', icon: MapPin },
  { label: 'Termin', icon: Clock },
];

const ALL_DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'SATURDAY', 'SUNDAY'];

export default function AdminTechnicalBrake() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Admin Context
  const adminFacilityId = localStorage.getItem('mosir_admin_facility');
  const facility = mockFacilities.find(f => f.id === adminFacilityId);

  // Step 1
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  // Step 2
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [startDateStr, setStartDateStr] = useState<string | null>(null);
  const [endDateStr, setEndDateStr] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  // Post
  const [submitted, setSubmitted] = useState(false);

  const areas = adminFacilityId ? mockAreas.filter(a => a.facility_id === adminFacilityId) : [];
  const takenSlots = selectedArea ? mockTakenSlots[selectedArea.id] || [] : [];

  const canNext = () => {
    switch (step) {
      case 0: return !!selectedArea;
      case 1: {
        if (startTime === null || endTime === null || startTime >= endTime) return false;
        return !!startDateStr && !!endDateStr && selectedDays.length > 0;
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

  const handleSubmit = () => {
    // Generate technical brake
    const num = `PRZERWA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBrake: Reservation = {
      id: crypto.randomUUID(),
      reservationNumber: num,
      reservationHolder: 'SYSTEM (Przerwa Techniczna)',
      area_id: selectedArea!.id,
      phoneNumber: '---',
      email: 'admin@mosir.pl',
      nip: null,
      reservationType: 'TECHNICAL_BRAKE',
      status: 'CONFIRMED', // Technical brake is auto confirmed
      createdAt: new Date().toISOString().split('T')[0],
      schedules: [
        {
          id: crypto.randomUUID(),
          day_of_week: 'MONDAY', // simplified
          starts_at: startTime!,
          ends_at: endTime!,
          reservation_id: ''
        }
      ],
      area: selectedArea!,
      facility: facility
    };
    mockAdminReservations.push(newBrake);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center pt-16 animate-fade-in">
        <div className="bg-surface-lowest rounded-2xl p-8 max-w-md w-full shadow-ambient text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <Ban size={32} className="text-red-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Przerwa zablokowana</h2>
          <p className="font-body text-sm text-muted-foreground mb-8">Wybrane terminy są teraz niedostępne dla klientów.</p>
          <Button variant="default" onClick={() => navigate('/admin/dostepnosc')}>Wróć do kalendarza</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12 animate-fade-in max-w-3xl mx-auto">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Dodaj przerwę techniczną</h2>
      
      {/* Progress */}
      <div className="bg-surface-lowest shadow-sm rounded-2xl p-5 mb-8 border border-surface-high">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-colors',
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-surface-high text-muted-foreground'
              )}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={cn(
                'hidden sm:block font-body text-xs',
                i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  'hidden sm:block w-8 h-px mx-2',
                  i < step ? 'bg-primary/30' : 'bg-surface-high'
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-surface-high">
        
        {/* Step 0: Area */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-xl font-bold mb-4">Wybierz salę / strefę</h3>
            <div className="space-y-3">
              {areas.map(area => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl transition-colors border',
                    selectedArea?.id === area.id ? 'bg-primary/5 border-primary card-accent-active' : 'bg-surface-low border-transparent hover:border-surface-high'
                  )}
                >
                  <span className="font-display font-bold text-foreground block">{area.name}</span>
                  <span className="font-body text-sm text-muted-foreground">
                    Godziny: {minutesToTime(area.available_from)} – {minutesToTime(area.available_to)}
                  </span>
                </button>
              ))}
              {areas.length === 0 && <p className="text-muted-foreground text-sm">Brak sal dla tego obiektu.</p>}
            </div>
          </div>
        )}

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="font-display text-xl font-bold mb-6">Wskaż terminy niedostępności</h3>

            <div className="mb-8">
              <p className="font-body text-xs font-medium uppercase text-muted-foreground mb-3">Dni tygodnia</p>
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

            <div className="mb-10 max-w-sm">
              <p className="font-body text-xs font-medium uppercase text-muted-foreground mb-3">
                Wybierz zakres dat przerwy
              </p>
              
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
                    };

                    return [...daysPre.map((_, i) => <span key={`pre-${i}`} />), ...daysIds.map(d => {
                      const dateObj = new Date(year, month, d);
                      const dateStr = [dateObj.getFullYear(), String(dateObj.getMonth() + 1).padStart(2, '0'), String(dateObj.getDate()).padStart(2, '0')].join('-');
                      
                      const isStart = startDateStr === dateStr;
                      const isEnd = endDateStr === dateStr;
                      const isBetween = startDateStr && endDateStr && dateStr > startDateStr && dateStr < endDateStr;
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
                              isStart ? 'border-2 border-red-600 text-red-600 font-bold shadow-sm bg-surface-lowest' : '',
                              isEnd ? 'bg-red-600 text-white font-bold shadow-md' : '',
                              !isStart && !isEnd && isBetween ? 'text-red-700' : '',
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

            <div>
              <p className="font-body text-xs font-medium uppercase text-muted-foreground mb-3">Zakres zablokowanych godzin</p>
              <div className="bg-surface-lowest shadow-ambient rounded-2xl p-5 border border-surface-high">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-2">
                  {generateTimeSlots().map((slot) => {
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
                        isBetween && "bg-red-500/10",
                        isStart && endTime !== null && endTime > startTime + 15 && "bg-gradient-to-r from-transparent 50% to-red-500/10",
                        isEndBlock && startTime !== null && endTime > startTime + 15 && "bg-gradient-to-l from-transparent 50% to-red-500/10",
                      )}>
                        <button
                          disabled={isTaken}
                          onClick={handleTimeClick}
                          className={cn(
                            'w-full mx-1 py-1.5 rounded-lg font-body text-xs font-medium transition-all relative z-10',
                            isTaken ? 'bg-surface-high text-muted-foreground/40 line-through cursor-not-allowed' : '',
                            isStart && !isTaken ? 'border-2 border-red-600 text-red-600 bg-surface-lowest shadow-sm' : '',
                            isEndBlock && !isStart && !isTaken ? 'bg-red-600 text-white shadow-md' : '',
                            isBetween && !isTaken ? 'text-red-700' : '',
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
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => step === 0 ? navigate('/admin/dostepnosc') : setStep(step - 1)}
        >
          <ArrowLeft size={16} className="mr-2" />
          {step === 0 ? 'Anuluj' : 'Wstecz'}
        </Button>
        {step < 1 ? (
          <Button variant="default" onClick={() => setStep(step + 1)} disabled={!canNext()}>
            Dalej <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button variant="destructive" onClick={handleSubmit} disabled={!canNext()}>
            Zablokuj termin
          </Button>
        )}
      </div>
    </div>
  );
}
