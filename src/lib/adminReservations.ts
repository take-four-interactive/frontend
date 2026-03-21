import { api } from './api';
import {
  mapReservationFromApi,
  mapScheduleFromApi,
  scheduleLinksToReservationId,
  type ApiReservation,
  type ApiSchedule,
} from './apiMappers';
import type { Reservation } from './types';

export async function fetchAdminReservationsEnriched(adminId: string): Promise<Reservation[]> {
  const raw = await api.get<ApiReservation[]>(`/api/v1/admins/${encodeURIComponent(adminId)}/reservations`);
  const areaIds = [...new Set(raw.map(r => r.area?.id).filter(Boolean))] as string[];
  const allSchedules: ApiSchedule[] = [];
  await Promise.all(
    areaIds.map(async aid => {
      const list = await api.get<ApiSchedule[]>(`/api/v1/areas/${encodeURIComponent(aid)}/schedules`);
      allSchedules.push(...list);
    }),
  );
  return raw.map(r => {
    const forR = allSchedules.filter(s => scheduleLinksToReservationId(s) === r.id);
    const schedules = forR.map(s => mapScheduleFromApi(s, r.id));
    return mapReservationFromApi(r, schedules);
  });
}
