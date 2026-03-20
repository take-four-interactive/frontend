import { mockFacilities, mockAreas, mockAdminReservations } from '@/lib/mockData';
import { minutesToTime, DAY_LABELS, type DayOfWeek } from '@/lib/types';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'SATURDAY', 'SUNDAY'];

export default function AdminAvailability() {
  const adminFacilityId = localStorage.getItem('mosir_admin_facility');
  const facility = mockFacilities.find(f => f.id === adminFacilityId);
  const areas = mockAreas.filter(a => a.facility_id === adminFacilityId);
  
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(areas.length > 0 ? areas[0].id : null);

  useEffect(() => {
    if (areas.length > 0 && !selectedAreaId) {
      setSelectedAreaId(areas[0].id);
    }
  }, [areas, selectedAreaId]);

  const hours: number[] = [];
  for (let h = 360; h < 1380; h += 60) hours.push(h);

  const selectedArea = areas.find(a => a.id === selectedAreaId);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="font-body text-sm text-muted-foreground">
          Widok tygodniowy — {facility?.name} {selectedArea ? `(${selectedArea.name})` : ''}
        </p>
        <Link
          to="/admin/przerwa-techniczna"
          className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2 font-display text-sm font-bold text-white shadow-sm hover:bg-red-600 transition-colors"
        >
          <Plus size={16} className="mr-2" /> Dodaj przerwę techniczną
        </Link>
      </div>

      {areas.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {areas.map(area => (
            <button
              key={area.id}
              onClick={() => setSelectedAreaId(area.id)}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-full font-body text-sm font-medium transition-colors',
                selectedAreaId === area.id 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-surface-lowest text-muted-foreground hover:bg-surface-high/50 border border-surface-high'
              )}
            >
              {area.name}
            </button>
          ))}
        </div>
      )}

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
                    r.area_id === selectedAreaId &&
                    (r.status === 'CONFIRMED' || r.status === 'PENDING') &&
                    r.schedules.some(s => s.day_of_week === day && s.starts_at <= hour && s.ends_at > hour)
                  );
                  return (
                    <td key={day} className="px-1 py-1">
                      {booking ? (
                        <div className={cn(
                          'rounded-lg px-2 py-1.5 text-center',
                          booking.reservationType === 'TECHNICAL_BRAKE' ? 'bg-red-500/10 border border-red-500/20' :
                          booking.status === 'CONFIRMED' ? 'bg-primary/10' : 'bg-secondary/15'
                        )}>
                          <span className={cn(
                            "font-body text-[10px] font-medium block truncate",
                            booking.reservationType === 'TECHNICAL_BRAKE' ? 'text-red-700' : 'text-foreground'
                          )}>
                            {booking.reservationType === 'TECHNICAL_BRAKE' ? 'Przerwa' : booking.reservationHolder.split(' ')[0]}
                          </span>
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
