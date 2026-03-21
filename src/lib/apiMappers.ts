import type {
  Area,
  DayOfWeek,
  Facility,
  Reservation,
  ReservationStatus,
  ReservationType,
  Schedule,
} from './types';

export const DEFAULT_FACILITY_IMAGE = '/assets/hero-sports.jpg';

export interface ApiFacility {
  id: string;
  name: string;
  imagePath?: string | null;
}

export interface ApiArea {
  id: string;
  availableFrom: number;
  availableTo: number;
  pricePer15Minutes: number;
  facility?: ApiFacility | null;
}

export interface ApiReservation {
  id: string;
  reservationHolder: string;
  phoneNumber: string;
  email: string;
  nip?: string | null;
  reservationType: string;
  reservationStatus: string;
  createdAt: string;
  area?: ApiArea | null;
}

export interface ApiSchedule {
  id: string;
  dayOfWeek: string;
  startsAt: number;
  endsAt: number;
  reservation?: ApiReservation | null;
  /** Gdy backend nie zagnieżdża `reservation`, często jest samo id */
  reservationId?: string;
}

function backendTimeToMinutes(t: number): number {
  // Backend stores time in minutes from midnight.
  // Example: 360 => 06:00, so we keep it unchanged.
  if (!Number.isFinite(t)) return t;
  return t;
}

function minutesToBackendTime(m: number, backendTimeIsHours: boolean): number {
  if (!Number.isFinite(m)) return m;
  if (!backendTimeIsHours) return m;
  if (m % 60 !== 0) {
    // Backend trzyma czasy jako "godziny" (int), więc 15-minutowe kafelki nie mają sensu.
    // Zatrzymujemy błędny zapis, zamiast cicho obcinać minuty.
    throw new Error('Backend oczekuje godzin całkowitych (H), a wybrano czas niebędący pełną godziną.');
  }
  const hours = m / 60;
  // Dodatkowa walidacja zakresu 0-24.
  if (!Number.isInteger(hours) || hours < 0 || hours > 24) return hours;
  return hours;
}

/** Id rezerwacji powiązanej ze slotem — z obiektu lub płaskiego pola (Spring / OpenAPI). */
export function scheduleLinksToReservationId(s: ApiSchedule): string | undefined {
  const nested = s.reservation?.id;
  if (nested) return nested;
  const ext = s as ApiSchedule & { reservation_id?: string };
  if (s.reservationId != null && String(s.reservationId)) return String(s.reservationId);
  if (ext.reservation_id != null && String(ext.reservation_id)) return String(ext.reservation_id);
  return undefined;
}

function parseApiScheduleDayToDayOfWeek(raw: unknown): DayOfWeek | null {
  if (raw == null) return null;
  if (typeof raw === 'number' && !Number.isNaN(raw)) {
    const iso: Record<number, DayOfWeek> = {
      1: 'MONDAY',
      2: 'TUESDAY',
      3: 'WEDNESDAY',
      4: 'THURSDAY',
      5: 'FRIDAY',
      6: 'SATURDAY',
      7: 'SUNDAY',
    };
    return iso[raw] ?? null;
  }
  const u = String(raw).trim().toUpperCase();
  const all: DayOfWeek[] = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];
  if (all.includes(u as DayOfWeek)) return u as DayOfWeek;
  const short: Record<string, DayOfWeek> = {
    MON: 'MONDAY',
    TUE: 'TUESDAY',
    WED: 'WEDNESDAY',
    THU: 'THURSDAY',
    FRI: 'FRIDAY',
    SAT: 'SATURDAY',
    SUN: 'SUNDAY',
  };
  return short[u] ?? null;
}

/** Normalizacja camelCase / snake_case oraz dnia tygodnia z API. */
export function parseApiScheduleSlot(s: ApiSchedule): { day: DayOfWeek; startsAt: number; endsAt: number } | null {
  // TS2352 fix: cast through `unknown` when we intentionally treat the API payload
  // as a dynamic record for camelCase/snake_case normalization.
  const ext = s as unknown as Record<string, unknown>;
  const day = parseApiScheduleDayToDayOfWeek(ext.dayOfWeek ?? ext.day_of_week);
  const starts = ext.startsAt ?? ext.starts_at;
  const ends = ext.endsAt ?? ext.ends_at;
  if (day == null || starts == null || ends == null) return null;
  const startsAt = Number(starts);
  const endsAt = Number(ends);
  if (Number.isNaN(startsAt) || Number.isNaN(endsAt)) return null;
  return {
    day,
    startsAt: backendTimeToMinutes(startsAt),
    endsAt: backendTimeToMinutes(endsAt),
  };
}

export function mapFacilityFromApi(f: ApiFacility): Facility {
  const path = f.imagePath?.trim();
  return {
    id: f.id,
    name: f.name,
    image_path: path && path.length > 0 ? path : DEFAULT_FACILITY_IMAGE,
  };
}

export function mapAreaFromApi(a: ApiArea): Area {
  return {
    id: a.id,
    facility_id: a.facility?.id ?? '',
    name: 'Strefa',
    available_from: backendTimeToMinutes(a.availableFrom),
    available_to: backendTimeToMinutes(a.availableTo),
    price: a.pricePer15Minutes,
  };
}

export function mapScheduleFromApi(s: ApiSchedule, reservationId: string): Schedule {
  const slot = parseApiScheduleSlot(s);
  return {
    id: s.id,
    day_of_week: slot?.day ?? (s.dayOfWeek as DayOfWeek),
    starts_at: slot?.startsAt ?? s.startsAt,
    ends_at: slot?.endsAt ?? s.endsAt,
    reservation_id: reservationId,
  };
}

/**
 * Tekst pokazywany użytkownikowi po utworzeniu / na liście: jeśli backend podaje
 * `reservationNumber`, użyj go; w przeciwnym razie użyj `id` rezerwacji (np. UUID).
 */
export function reservationDisplayRef(payload: { id?: unknown; reservationNumber?: unknown }): string {
  const numRaw = payload.reservationNumber;
  if (numRaw != null) {
    const num = String(numRaw).trim();
    if (num) return num;
  }
  const idRaw = payload.id;
  if (idRaw != null) {
    const id = String(idRaw).trim();
    if (id) return id;
  }
  return '';
}

export function reservationNumberFromApi(r: ApiReservation): string {
  return reservationDisplayRef(r) || String(r.id ?? '');
}

export function mapReservationFromApi(r: ApiReservation, schedules: Schedule[]): Reservation {
  const area = r.area ? mapAreaFromApi(r.area) : undefined;
  const facility = r.area?.facility ? mapFacilityFromApi(r.area.facility) : undefined;
  const status = (r.reservationStatus || 'PENDING') as ReservationStatus;
  return {
    id: r.id,
    reservationNumber: reservationNumberFromApi(r),
    reservationHolder: r.reservationHolder,
    area_id: r.area?.id ?? '',
    phoneNumber: r.phoneNumber,
    email: r.email,
    nip: r.nip ?? null,
    reservationType: r.reservationType as ReservationType,
    status,
    createdAt: r.createdAt,
    schedules,
    payment: {
      id: '',
      amount: 0,
      created_at: r.createdAt,
      reservation_id: r.id,
    },
    area,
    facility,
  };
}

export function schedulesToTakenMinutes(schedules: ApiSchedule[]): number[] {
  const set = new Set<number>();
  for (const s of schedules) {
    const st = s.reservation?.reservationStatus;
    if (st === 'CANCELLED') continue;
    const slot = parseApiScheduleSlot(s);
    if (!slot) continue;
    const start = slot.startsAt;
    const end = slot.endsAt;
    // Mark all 15-minute buckets that overlap the reservation interval,
    // even if reservation boundaries are not exact multiples of 15.
    const from = Math.floor(start / 15) * 15;
    for (let m = from; m < end; m += 15) {
      const bucketEnd = m + 15;
      if (m < end && bucketEnd > start) set.add(m);
    }
  }
  return [...set].sort((a, b) => a - b);
}

/** Zajęte 15‑minutowe sloty startu (minuty od północy) tylko dla podanych dni tygodnia — pod kalendarz rezerwacji. */
export function schedulesToTakenMinutesForWeekdays(
  schedules: ApiSchedule[],
  weekdays: ReadonlySet<DayOfWeek>,
): number[] {
  if (weekdays.size === 0) return [];
  const set = new Set<number>();
  for (const s of schedules) {
    const st = s.reservation?.reservationStatus;
    if (st === 'CANCELLED') continue;
    const slot = parseApiScheduleSlot(s);
    if (!slot) continue;
    if (!weekdays.has(slot.day)) continue;
    // Mark all overlapping 15-minute buckets for given weekday only.
    const from = Math.floor(slot.startsAt / 15) * 15;
    for (let m = from; m < slot.endsAt; m += 15) {
      const bucketEnd = m + 15;
      if (m < slot.endsAt && bucketEnd > slot.startsAt) set.add(m);
    }
  }
  return [...set].sort((a, b) => a - b);
}

export function dateStrToDayOfWeek(dateStr: string): DayOfWeek {
  const d = new Date(`${dateStr}T12:00:00`);
  const map: Record<number, DayOfWeek> = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY',
  };
  return map[d.getDay()]!;
}

export function buildBookingReservationDTO(params: {
  reservationType: ReservationType;
  areaId: string;
  holder: string;
  email: string;
  phone: string;
  nip: string | null;
  startDateStr: string | null;
  endDateStr: string | null;
  selectedDays: DayOfWeek[];
  startTime: number;
  endTime: number;
  backendTimeIsHours?: boolean;
}): Record<string, unknown> {
  const {
    reservationType,
    areaId,
    holder,
    email,
    phone,
    nip,
    startDateStr,
    endDateStr,
    selectedDays,
    startTime,
    endTime,
    backendTimeIsHours,
  } = params;

  const schedules: { dayOfWeek: DayOfWeek; startsAt: number; endsAt: number }[] = [];

  if (reservationType === 'SINGLE') {
    if (!startDateStr) throw new Error('Brak daty');
    const apiStart = minutesToBackendTime(startTime, !!backendTimeIsHours);
    const apiEnd = minutesToBackendTime(endTime, !!backendTimeIsHours);
    schedules.push({
      dayOfWeek: dateStrToDayOfWeek(startDateStr),
      startsAt: apiStart,
      endsAt: apiEnd,
    });
  } else if (reservationType === 'PERIODIC') {
    if (!startDateStr || !endDateStr) throw new Error('Brak zakresu dat');
    const cur = new Date(`${startDateStr}T12:00:00`);
    const end = new Date(`${endDateStr}T12:00:00`);
    const apiStart = minutesToBackendTime(startTime, !!backendTimeIsHours);
    const apiEnd = minutesToBackendTime(endTime, !!backendTimeIsHours);
    const jsToDay: Record<number, DayOfWeek> = {
      0: 'SUNDAY',
      1: 'MONDAY',
      2: 'TUESDAY',
      3: 'WEDNESDAY',
      4: 'THURSDAY',
      5: 'FRIDAY',
      6: 'SATURDAY',
    };
    while (cur <= end) {
      const dow = jsToDay[cur.getDay()];
      if (selectedDays.includes(dow)) {
        schedules.push({ dayOfWeek: dow, startsAt: apiStart, endsAt: apiEnd });
      }
      cur.setDate(cur.getDate() + 1);
    }
  } else if (reservationType === 'SUBSCRIPTION') {
    const apiStart = minutesToBackendTime(startTime, !!backendTimeIsHours);
    const apiEnd = minutesToBackendTime(endTime, !!backendTimeIsHours);
    for (const day of selectedDays) {
      schedules.push({ dayOfWeek: day, startsAt: apiStart, endsAt: apiEnd });
    }
  }

  return {
    reservationHolder: holder,
    phoneNumber: phone,
    email,
    nip: nip ?? '',
    reservationType,
    reservationStatus: 'PENDING',
    areaId,
    schedules,
  };
}

export function buildTechnicalBrakeDTO(params: {
  areaId: string;
  startDateStr: string;
  endDateStr: string;
  selectedDays: DayOfWeek[];
  startTime: number;
  endTime: number;
  backendTimeIsHours?: boolean;
}): Record<string, unknown> {
  const { areaId, startDateStr, endDateStr, selectedDays, startTime, endTime, backendTimeIsHours } = params;
  const schedules: { dayOfWeek: DayOfWeek; startsAt: number; endsAt: number }[] = [];
  const apiStart = minutesToBackendTime(startTime, !!backendTimeIsHours);
  const apiEnd = minutesToBackendTime(endTime, !!backendTimeIsHours);
  const cur = new Date(`${startDateStr}T12:00:00`);
  const end = new Date(`${endDateStr}T12:00:00`);
  const jsToDay: Record<number, DayOfWeek> = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY',
  };
  while (cur <= end) {
    const dow = jsToDay[cur.getDay()];
    if (selectedDays.includes(dow)) {
      schedules.push({ dayOfWeek: dow, startsAt: apiStart, endsAt: apiEnd });
    }
    cur.setDate(cur.getDate() + 1);
  }
  return {
    reservationHolder: 'SYSTEM (Przerwa techniczna)',
    phoneNumber: '---',
    email: 'admin@mosir.local',
    // Backend OpenAPI: nip is "string" (not nullable). Empty string is the safest fallback.
    nip: '',
    reservationType: 'TECHNICAL_BRAKE',
    reservationStatus: 'CONFIRMED',
    areaId,
    schedules,
  };
}
