import { minutesToTime, DAY_LABELS, type DayOfWeek, type ReservationStatus, type ReservationType } from '@/lib/types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';
import {
  mapAreaFromApi,
  mapFacilityFromApi,
  parseApiScheduleSlot,
  scheduleLinksToReservationId,
  type ApiArea,
  type ApiFacility,
  type ApiSchedule,
} from '@/lib/apiMappers';
import { fetchAdminReservationsEnriched } from '@/lib/adminReservations';
import { useAdminProfile } from '@/lib/adminProfile';

type CellBooking = {
  reservationType: ReservationType;
  reservationHolder: string;
  status: ReservationStatus;
};

const DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export default function AdminAvailability() {
  const { adminId, facilityId } = useAdminProfile();

  const { data: facilitiesRaw = [] } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => api.get<ApiFacility[]>('/api/v1/facilities'),
  });
  const facilities = useMemo(() => facilitiesRaw.map(mapFacilityFromApi), [facilitiesRaw]);
  const facility = facilities.find(f => f.id === facilityId);

  const { data: areasRaw = [] } = useQuery({
    queryKey: ['facility-areas', facilityId],
    queryFn: () => api.get<ApiArea[]>(`/api/v1/facilities/${facilityId}/areas`),
    enabled: !!facilityId,
  });
  const areas = useMemo(() => areasRaw.map(mapAreaFromApi), [areasRaw]);

  const { data: adminReservations = [] } = useQuery({
    queryKey: ['admin-reservations', adminId],
    queryFn: () => fetchAdminReservationsEnriched(adminId!),
    enabled: !!adminId,
  });

  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(areas.length > 0 ? areas[0].id : null);

  useEffect(() => {
    if (areas.length > 0 && !selectedAreaId) {
      setSelectedAreaId(areas[0].id);
    }
  }, [areas, selectedAreaId]);

  useEffect(() => {
    if (areas.length > 0 && selectedAreaId && !areas.some(a => a.id === selectedAreaId)) {
      setSelectedAreaId(areas[0].id);
    }
  }, [areas, selectedAreaId]);

  const { data: areaSchedulesRaw = [] } = useQuery({
    queryKey: ['area-schedules', selectedAreaId],
    queryFn: () => api.get<ApiSchedule[]>(`/api/v1/areas/${encodeURIComponent(selectedAreaId!)}/schedules`),
    enabled: !!selectedAreaId,
  });

  const resById = useMemo(() => new Map(adminReservations.map(r => [r.id, r])), [adminReservations]);

  const findCellBooking = useCallback(
    (day: DayOfWeek, slotStart: number): CellBooking | null => {
      for (const s of areaSchedulesRaw) {
        const slot = parseApiScheduleSlot(s);
        if (!slot || slot.day !== day) continue;
        if (!(slot.startsAt < slotStart + 15 && slot.endsAt > slotStart)) continue;

        const rid = scheduleLinksToReservationId(s);
        const res = rid ? resById.get(rid) : undefined;
        const nested = s.reservation;
        const status = (res?.status ?? nested?.reservationStatus ?? 'CONFIRMED') as ReservationStatus;
        if (status === 'CANCELLED') continue;
        if (status !== 'CONFIRMED' && status !== 'PENDING') continue;

        const reservationType = (res?.reservationType ?? nested?.reservationType ?? 'SINGLE') as ReservationType;
        const reservationHolder = res?.reservationHolder ?? nested?.reservationHolder ?? 'Rezerwacja';
        return { reservationType, reservationHolder, status };
      }
      return null;
    },
    [areaSchedulesRaw, resById],
  );

  const timeSlots: number[] = [];
  for (let m = 450; m < 1260; m += 15) timeSlots.push(m);

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
                  : 'bg-surface-lowest text-muted-foreground hover:bg-surface-high/50 border border-surface-high',
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
              <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-3 py-3 text-left w-20">
                Godz.
              </th>
              {DAYS.map(d => (
                <th key={d} className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-2 py-3 text-center">
                  {DAY_LABELS[d].slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(slot => (
              <tr key={slot}>
                <td className="px-3 py-2 font-body text-xs text-muted-foreground">{minutesToTime(slot)}</td>
                {DAYS.map(day => {
                  const booking = findCellBooking(day, slot);
                  return (
                    <td key={day} className="px-1 py-1">
                      {booking ? (
                        <div
                          className={cn(
                            'rounded-lg px-2 py-1.5 text-center',
                            booking.reservationType === 'TECHNICAL_BRAKE'
                              ? 'bg-red-500/10 border border-red-500/20'
                              : booking.status === 'CONFIRMED'
                                ? 'bg-primary/10'
                                : 'bg-secondary/15',
                          )}
                        >
                          <span
                            className={cn(
                              'font-body text-[10px] font-medium block truncate',
                              booking.reservationType === 'TECHNICAL_BRAKE' ? 'text-red-700' : 'text-foreground',
                            )}
                          >
                            {booking.reservationType === 'TECHNICAL_BRAKE'
                              ? 'Przerwa'
                              : booking.reservationHolder.split(' ')[0]}
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
