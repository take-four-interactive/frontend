import { Facility, Area, Reservation, DashboardStats } from './types';

// Mock facilities
export const mockFacilities: Facility[] = [
  { id: '1', name: 'Hala Sportowa Centrum', image_path: null },
  { id: '2', name: 'Kompleks Basenowy Fala', image_path: null },
  { id: '3', name: 'Stadion Miejski', image_path: null },
  { id: '4', name: 'Korty Tenisowe Park', image_path: null },
];

export const mockAreas: Record<string, Area[]> = {
  '1': [
    { id: 'a1', facility_id: '1', name: 'Sala główna', available_from: 360, available_to: 1320, price_per_15mins: 12.5 },
    { id: 'a2', facility_id: '1', name: 'Sala boczna A', available_from: 480, available_to: 1200, price_per_15mins: 8.0 },
  ],
  '2': [
    { id: 'a3', facility_id: '2', name: 'Tor pływacki 25m', available_from: 360, available_to: 1260, price_per_15mins: 15.0 },
    { id: 'a4', facility_id: '2', name: 'Brodzik rekreacyjny', available_from: 480, available_to: 1200, price_per_15mins: 10.0 },
  ],
  '3': [
    { id: 'a5', facility_id: '3', name: 'Boisko główne', available_from: 480, available_to: 1320, price_per_15mins: 25.0 },
  ],
  '4': [
    { id: 'a6', facility_id: '4', name: 'Kort 1', available_from: 420, available_to: 1260, price_per_15mins: 7.5 },
    { id: 'a7', facility_id: '4', name: 'Kort 2', available_from: 420, available_to: 1260, price_per_15mins: 7.5 },
    { id: 'a8', facility_id: '4', name: 'Kort 3 (kryty)', available_from: 360, available_to: 1320, price_per_15mins: 12.0 },
  ],
};

export const mockTakenSlots: Record<string, number[]> = {
  'a1': [540, 600, 960],
  'a2': [480, 720],
  'a3': [600, 660, 720],
  'a5': [600, 660],
  'a6': [480, 540],
};

export const mockReservation: Reservation = {
  id: 'r1',
  reservationNumber: 'MOSiR-2025-4471',
  reservationHolder: 'Jan Kowalski',
  areaId: 'a1',
  phoneNumber: '+48 600 123 456',
  email: 'jan.kowalski@email.pl',
  nip: null,
  reservationType: 'ONCE',
  status: 'PENDING',
  createdAt: '2025-03-18',
  schedules: [
    { dayOfWeek: 'MONDAY', startsAt: 540, endsAt: 660 },
  ],
  payment: { amount: 100.0, created_at: '2025-03-18' },
  facility: { id: '1', name: 'Hala Sportowa Centrum', image_path: null },
  area: { id: 'a1', facility_id: '1', name: 'Sala główna', available_from: 360, available_to: 1320, price_per_15mins: 12.5 },
};

export const mockDashboardStats: DashboardStats = {
  totalReservationsToday: 12,
  pendingApprovalCount: 3,
  activeReservationsThisWeek: 47,
  revenueThisWeek: 2340.0,
};

export const mockAdminReservations: Reservation[] = [
  mockReservation,
  {
    id: 'r2', reservationNumber: 'MOSiR-2025-4472', reservationHolder: 'Firma SportMax Sp. z o.o.',
    areaId: 'a1', phoneNumber: '+48 500 222 333', email: 'biuro@sportmax.pl', nip: '1234567890',
    reservationType: 'PERIODIC', status: 'ACCEPTED', createdAt: '2025-03-17',
    schedules: [{ dayOfWeek: 'WEDNESDAY', startsAt: 600, endsAt: 720 }],
    payment: { amount: 600.0 },
    facility: { id: '1', name: 'Hala Sportowa Centrum', image_path: null },
    area: { id: 'a1', facility_id: '1', name: 'Sala główna', available_from: 360, available_to: 1320, price_per_15mins: 12.5 },
  },
  {
    id: 'r3', reservationNumber: 'MOSiR-2025-4473', reservationHolder: 'Anna Nowak',
    areaId: 'a2', phoneNumber: '+48 700 444 555', email: 'anna@nowak.pl', nip: null,
    reservationType: 'SUBSCRIPTION', status: 'PENDING', createdAt: '2025-03-19',
    schedules: [
      { dayOfWeek: 'MONDAY', startsAt: 480, endsAt: 540 },
      { dayOfWeek: 'FRIDAY', startsAt: 960, endsAt: 1020 },
    ],
    payment: { amount: 128.0 },
    facility: { id: '1', name: 'Hala Sportowa Centrum', image_path: null },
    area: { id: 'a2', facility_id: '1', name: 'Sala boczna A', available_from: 480, available_to: 1200, price_per_15mins: 8.0 },
  },
];
