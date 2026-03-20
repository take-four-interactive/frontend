import { mockFacilities, mockAreas, mockAdminReservations } from '@/lib/mockData';
import { minutesToTime, DAY_LABELS, type DayOfWeek } from '@/lib/types';
import { cn } from '@/lib/utils';

const DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export default function AdminAvailability() {
  const areas = mockAreas['1'] || [];
  const hours: number[] = [];
  for (let h = 360; h < 1380; h += 60) hours.push(h);

  return (
    <div className="animate-fade-in">
      <p className="font-body text-sm text-muted-foreground mb-6">Widok tygodniowy — Hala Sportowa Centrum</p>

      <div className="bg-surface-lowest rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-surface-low">
              <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-3 py-3 text-left w-20">Godz.</th>
              {DAYS.map(d => (
                <th key={d} className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-2 py-3 text-center">
                  {DAY_LABELS[d].slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour}>
                <td className="px-3 py-2 font-body text-xs text-muted-foreground">{minutesToTime(hour)}</td>
                {DAYS.map(day => {
                  const booking = mockAdminReservations.find(r =>
                    (r.status === 'ACCEPTED' || r.status === 'PENDING') &&
                    r.schedules.some(s => s.dayOfWeek === day && s.startsAt <= hour && s.endsAt > hour)
                  );
                  return (
                    <td key={day} className="px-1 py-1">
                      {booking ? (
                        <div className={cn(
                          'rounded-lg px-2 py-1.5 text-center',
                          booking.status === 'ACCEPTED' ? 'bg-primary/10' : 'bg-secondary/15'
                        )}>
                          <span className="font-body text-[10px] font-medium text-foreground block truncate">{booking.reservationHolder.split(' ')[0]}</span>
                        </div>
                      ) : (
                        <div className="rounded-lg px-2 py-1.5 bg-surface-low">
                          <span className="font-body text-[10px] text-muted-foreground/30 block text-center">—</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
