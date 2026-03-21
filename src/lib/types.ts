export interface Facility {
  id: string; // UUID
  name: string;
  image_path: string;
}

export interface Area {
  id: string; // UUID
  facility_id: string; // UUID
  name: string;
  available_from: number;
  available_to: number;
  price: number;
}

export interface Admin {
  id: string; // UUID
  name: string; // TEXT
  password: string; // TEXT
  facility_id: string; // UUID
}

export type ReservationType = 'SINGLE' | 'PERIODIC' | 'SUBSCRIPTION' | 'TECHNICAL_BRAKE';
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface Schedule {
  id: string; // UUID
  day_of_week: DayOfWeek;
  starts_at: number;
  ends_at: number;
  reservation_id: string; // UUID
}

export interface Payment {
  id: string; // UUID
  amount: number;
  created_at: string; // DATE
  reservation_id: string; // UUID
}

export interface Reservation {
  id: string; // UUID
  reservationNumber: string; // Numer z API lub identyfikator rezerwacji (np. UUID)
  reservationHolder: string;
  area_id: string; // UUID
  phoneNumber: string;
  email: string;
  nip: string | null;
  reservationType: ReservationType;
  status: ReservationStatus;
  createdAt: string; // DATE

  // Frontend relations
  schedules: Schedule[];
  payment?: Payment;
  area?: Area;
  facility?: Facility;
}

export interface CreateReservationRequest {
  reservationHolder: string;
  area_id: string;
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
  SINGLE: 'Jednorazowa',
  PERIODIC: 'Okresowa',
  SUBSCRIPTION: 'Subskrypcja',
  TECHNICAL_BRAKE: 'Przerwa techniczna',
};

export const STATUS_LABELS: Record<ReservationStatus, string> = {
  PENDING: 'Oczekująca',
  CONFIRMED: 'Zaplanowana',
  CANCELLED: 'Anulowana',
};
