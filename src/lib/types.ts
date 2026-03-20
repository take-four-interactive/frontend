export interface Facility {
  id: string;
  name: string;
  image_path: string | null;
}

export interface Area {
  id: string;
  facility_id: string;
  name: string;
  available_from: number;
  available_to: number;
  price_per_15mins: number;
}

export type ReservationType = 'ONCE' | 'PERIODIC' | 'SUBSCRIPTION';
export type ReservationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface Schedule {
  id?: string;
  dayOfWeek: DayOfWeek;
  startsAt: number;
  endsAt: number;
  date?: string;
  reservation_id?: string;
}

export interface Payment {
  id?: string;
  amount: number;
  created_at?: string;
  reservation_id?: string;
}

export interface Reservation {
  id: string;
  reservationNumber: string;
  reservationHolder: string;
  areaId: string;
  phoneNumber: string;
  email: string;
  nip: string | null;
  reservationType: ReservationType;
  status: ReservationStatus;
  createdAt: string;
  schedules: Schedule[];
  payment?: Payment;
  area?: Area;
  facility?: Facility;
}

export interface CreateReservationRequest {
  reservationHolder: string;
  areaId: string;
  phoneNumber: string;
  email: string;
  nip: string | null;
  reservationType: ReservationType;
  schedules: Omit<Schedule, 'id' | 'reservation_id'>[];
}

export interface CreateReservationResponse {
  id: string;
  reservationNumber: string;
  status: ReservationStatus;
  payment: { amount: number };
}

export interface AdminLoginResponse {
  token: string;
  adminName: string;
  facilityId: string;
}

export interface DashboardStats {
  totalReservationsToday: number;
  pendingApprovalCount: number;
  activeReservationsThisWeek: number;
  revenueThisWeek: number;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: 'Poniedziałek',
  TUESDAY: 'Wtorek',
  WEDNESDAY: 'Środa',
  THURSDAY: 'Czwartek',
  FRIDAY: 'Piątek',
  SATURDAY: 'Sobota',
  SUNDAY: 'Niedziela',
};

export const RESERVATION_TYPE_LABELS: Record<ReservationType, string> = {
  ONCE: 'Jednorazowa',
  PERIODIC: 'Okresowa',
  SUBSCRIPTION: 'Subskrypcja',
};

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  PENDING: 'Oczekująca',
  ACCEPTED: 'Zaakceptowana',
  REJECTED: 'Odrzucona',
  CANCELLED: 'Anulowana',
};
