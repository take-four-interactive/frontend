import { Facility, Area, Admin, Reservation, Payment, Schedule } from './types';

// Mock Facilities
export const mockFacilities: Facility[] = [
  { id: 'f1-uuid', name: 'Hala Widowiskowo-Sportowa', image_path: '/assets/hero-sports.jpg' },
  { id: 'f2-uuid', name: 'Pływalnia Miejska', image_path: '/assets/facility-pool.jpg' },
  { id: 'f3-uuid', name: 'Stadion Lekkoatletyczny', image_path: '/assets/facility-stadium.jpg' },
  { id: 'f4-uuid', name: 'Korty Tenisowe', image_path: '/assets/facility-tennis.jpg' },
  { id: 'f5-uuid', name: 'Boisko Orlik', image_path: '/assets/hero-sports.jpg' },
  { id: 'f6-uuid', name: 'Sala Fitness', image_path: '/assets/hero-sports.jpg' },
  { id: 'f7-uuid', name: 'Hala Tenisa Stołowego', image_path: '/assets/facility-tennis.jpg' },
  { id: 'f8-uuid', name: 'Basen Termalny', image_path: '/assets/facility-pool.jpg' },
  { id: 'f9-uuid', name: 'Stadion Piłkarski', image_path: '/assets/facility-stadium.jpg' },
  { id: 'f10-uuid', name: 'Kort Squash', image_path: '/assets/facility-tennis.jpg' },
  { id: 'f11-uuid', name: 'Sala Tańca', image_path: '/assets/hero-sports.jpg' },
  { id: 'f12-uuid', name: 'Boisko Siatkówki Plażowej', image_path: '/assets/hero-sports.jpg' },
  { id: 'f13-uuid', name: 'Tor Wrotkarski', image_path: '/assets/facility-stadium.jpg' },
  { id: 'f14-uuid', name: 'Hala Gimnastyczna', image_path: '/assets/hero-sports.jpg' },
  { id: 'f15-uuid', name: 'Basen Olimpijski', image_path: '/assets/facility-pool.jpg' },
  { id: 'f16-uuid', name: 'Stadion Żużlowy', image_path: '/assets/facility-stadium.jpg' },
  { id: 'f17-uuid', name: 'Korty Badmintona', image_path: '/assets/facility-tennis.jpg' },
  { id: 'f18-uuid', name: 'Sala Bokserska', image_path: '/assets/hero-sports.jpg' },
  { id: 'f19-uuid', name: 'Tor Łyżwiarski', image_path: '/assets/facility-stadium.jpg' },
  { id: 'f20-uuid', name: 'Hala Koszykówki', image_path: '/assets/hero-sports.jpg' },
  { id: 'f21-uuid', name: 'Basen Rekreacyjny', image_path: '/assets/facility-pool.jpg' },
  { id: 'f22-uuid', name: 'Stadion Rugby', image_path: '/assets/facility-stadium.jpg' },
  { id: 'f23-uuid', name: 'Korty Bowling', image_path: '/assets/facility-tennis.jpg' },
  { id: 'f24-uuid', name: 'Sala Jogi', image_path: '/assets/hero-sports.jpg' },
  { id: 'f25-uuid', name: 'Boisko Baseball', image_path: '/assets/hero-sports.jpg' },
  { id: 'f26-uuid', name: 'Hala Piłki Ręcznej', image_path: '/assets/hero-sports.jpg' },
  { id: 'f27-uuid', name: 'Basen Nurkowy', image_path: '/assets/facility-pool.jpg' },
  { id: 'f28-uuid', name: 'Stadion Lekkiej Atletyki', image_path: '/assets/facility-stadium.jpg' },
  { id: 'f29-uuid', name: 'Korty Golfa', image_path: '/assets/facility-tennis.jpg' },
  { id: 'f30-uuid', name: 'Sala Bilardowa', image_path: '/assets/hero-sports.jpg' },
];

export const mockAreas: Area[] = [
  { id: 'a1-uuid', facility_id: 'f1-uuid', name: 'Sektor A (Siatkówka)', available_from: 360, available_to: 1320, price: 50 },
  { id: 'a2-uuid', facility_id: 'f1-uuid', name: 'Sektor B (Koszykówka)', available_from: 360, available_to: 1320, price: 60 },
  { id: 'a3-uuid', facility_id: 'f1-uuid', name: 'Cała Hala', available_from: 360, available_to: 1320, price: 200 },
  
  { id: 'a4-uuid', facility_id: 'f2-uuid', name: 'Tor 1 (Basen sportowy)', available_from: 360, available_to: 1320, price: 30 },
  { id: 'a5-uuid', facility_id: 'f2-uuid', name: 'Tor 2 (Basen sportowy)', available_from: 360, available_to: 1320, price: 30 },
  { id: 'a6-uuid', facility_id: 'f2-uuid', name: 'Basen rekreacyjny', available_from: 360, available_to: 1320, price: 80 },

  { id: 'a7-uuid', facility_id: 'f3-uuid', name: 'Bieżnia okrężna', available_from: 420, available_to: 1200, price: 20 },
  { id: 'a8-uuid', facility_id: 'f3-uuid', name: 'Boisko trawiaste', available_from: 420, available_to: 1200, price: 150 },

  { id: 'a9-uuid', facility_id: 'f4-uuid', name: 'Kort 1 (Mączka)', available_from: 480, available_to: 1260, price: 40 },
  { id: 'a10-uuid', facility_id: 'f4-uuid', name: 'Kort 2 (Sztuczny)', available_from: 480, available_to: 1260, price: 45 },

  { id: 'a11-uuid', facility_id: 'f5-uuid', name: 'Boisko piłkarskie', available_from: 480, available_to: 1320, price: 50 },
  { id: 'a12-uuid', facility_id: 'f5-uuid', name: 'Boisko do koszykówki', available_from: 480, available_to: 1320, price: 30 },

  // Fitness areas
  { id: 'a13-uuid', facility_id: 'f6-uuid', name: 'Strefa siłowa', available_from: 360, available_to: 1320, price: 25 },
  { id: 'a14-uuid', facility_id: 'f6-uuid', name: 'Strefa cardio', available_from: 360, available_to: 1320, price: 20 },
  { id: 'a15-uuid', facility_id: 'f6-uuid', name: 'Sala aerobiku', available_from: 360, available_to: 1320, price: 35 },

  // Table tennis areas
  { id: 'a16-uuid', facility_id: 'f7-uuid', name: 'Stół 1', available_from: 480, available_to: 1260, price: 15 },
  { id: 'a17-uuid', facility_id: 'f7-uuid', name: 'Stół 2', available_from: 480, available_to: 1260, price: 15 },
  { id: 'a18-uuid', facility_id: 'f7-uuid', name: 'Stół 3', available_from: 480, available_to: 1260, price: 15 },
  { id: 'a19-uuid', facility_id: 'f7-uuid', name: 'Stół 4', available_from: 480, available_to: 1260, price: 15 },

  // Thermal pool areas
  { id: 'a20-uuid', facility_id: 'f8-uuid', name: 'Basen termalny główny', available_from: 360, available_to: 1320, price: 45 },
  { id: 'a21-uuid', facility_id: 'f8-uuid', name: 'Jacuzzi', available_from: 360, available_to: 1320, price: 25 },
  { id: 'a22-uuid', facility_id: 'f8-uuid', name: 'Sauna sucha', available_from: 360, available_to: 1320, price: 30 },

  // Football stadium areas
  { id: 'a23-uuid', facility_id: 'f9-uuid', name: 'Boisko główne', available_from: 420, available_to: 1200, price: 300 },
  { id: 'a24-uuid', facility_id: 'f9-uuid', name: 'Boisko treningowe A', available_from: 420, available_to: 1200, price: 150 },
  { id: 'a25-uuid', facility_id: 'f9-uuid', name: 'Boisko treningowe B', available_from: 420, available_to: 1200, price: 150 },

  // Squash court
  { id: 'a26-uuid', facility_id: 'f10-uuid', name: 'Kort 1', available_from: 480, available_to: 1260, price: 35 },
  { id: 'a27-uuid', facility_id: 'f10-uuid', name: 'Kort 2', available_from: 480, available_to: 1260, price: 35 },

  // Dance hall
  { id: 'a28-uuid', facility_id: 'f11-uuid', name: 'Sala główna', available_from: 360, available_to: 1320, price: 40 },
  { id: 'a29-uuid', facility_id: 'f11-uuid', name: 'Sala lustra', available_from: 360, available_to: 1320, price: 45 },

  // Beach volleyball
  { id: 'a30-uuid', facility_id: 'f12-uuid', name: 'Boisko 1', available_from: 480, available_to: 1320, price: 25 },
  { id: 'a31-uuid', facility_id: 'f12-uuid', name: 'Boisko 2', available_from: 480, available_to: 1320, price: 25 },

  // Roller skating
  { id: 'a32-uuid', facility_id: 'f13-uuid', name: 'Tor główny', available_from: 420, available_to: 1200, price: 20 },

  // Gymnastics hall
  { id: 'a33-uuid', facility_id: 'f14-uuid', name: 'Sala główna', available_from: 360, available_to: 1320, price: 60 },
  { id: 'a34-uuid', facility_id: 'f14-uuid', name: 'Sprzęt artystyczny', available_from: 360, available_to: 1320, price: 45 },

  // Olympic pool
  { id: 'a35-uuid', facility_id: 'f15-uuid', name: 'Tor 1', available_from: 360, available_to: 1320, price: 40 },
  { id: 'a36-uuid', facility_id: 'f15-uuid', name: 'Tor 2', available_from: 360, available_to: 1320, price: 40 },
  { id: 'a37-uuid', facility_id: 'f15-uuid', name: 'Tor 3', available_from: 360, available_to: 1320, price: 40 },
  { id: 'a38-uuid', facility_id: 'f15-uuid', name: 'Tor 4', available_from: 360, available_to: 1320, price: 40 },
  { id: 'a39-uuid', facility_id: 'f15-uuid', name: 'Tor 5', available_from: 360, available_to: 1320, price: 40 },
  { id: 'a40-uuid', facility_id: 'f15-uuid', name: 'Tor 6', available_from: 360, available_to: 1320, price: 40 },

  // Speedway stadium
  { id: 'a41-uuid', facility_id: 'f16-uuid', name: 'Tor żużlowy', available_from: 420, available_to: 1200, price: 500 },

  // Badminton courts
  { id: 'a42-uuid', facility_id: 'f17-uuid', name: 'Kort 1', available_from: 480, available_to: 1260, price: 20 },
  { id: 'a43-uuid', facility_id: 'f17-uuid', name: 'Kort 2', available_from: 480, available_to: 1260, price: 20 },
  { id: 'a44-uuid', facility_id: 'f17-uuid', name: 'Kort 3', available_from: 480, available_to: 1260, price: 20 },

  // Boxing gym
  { id: 'a45-uuid', facility_id: 'f18-uuid', name: 'Ring główny', available_from: 360, available_to: 1320, price: 50 },
  { id: 'a46-uuid', facility_id: 'f18-uuid', name: 'Strefa treningowa', available_from: 360, available_to: 1320, price: 30 },

  // Ice rink
  { id: 'a47-uuid', facility_id: 'f19-uuid', name: 'Lodowisko główne', available_from: 360, available_to: 1320, price: 35 },

  // Basketball hall
  { id: 'a48-uuid', facility_id: 'f20-uuid', name: 'Boisko główne', available_from: 360, available_to: 1320, price: 80 },
  { id: 'a49-uuid', facility_id: 'f20-uuid', name: 'Boisko treningowe', available_from: 360, available_to: 1320, price: 60 },

  // Recreational pool
  { id: 'a50-uuid', facility_id: 'f21-uuid', name: 'Basen główny', available_from: 360, available_to: 1320, price: 25 },
  { id: 'a51-uuid', facility_id: 'f21-uuid', name: 'Basen dla dzieci', available_from: 360, available_to: 1320, price: 15 },
  { id: 'a52-uuid', facility_id: 'f21-uuid', name: 'Zjeżdżalnia', available_from: 360, available_to: 1320, price: 10 },

  // Rugby stadium
  { id: 'a53-uuid', facility_id: 'f22-uuid', name: 'Boisko główne', available_from: 420, available_to: 1200, price: 250 },

  // Bowling alleys
  { id: 'a54-uuid', facility_id: 'f23-uuid', name: 'Tor 1', available_from: 480, available_to: 1320, price: 30 },
  { id: 'a55-uuid', facility_id: 'f23-uuid', name: 'Tor 2', available_from: 480, available_to: 1320, price: 30 },
  { id: 'a56-uuid', facility_id: 'f23-uuid', name: 'Tor 3', available_from: 480, available_to: 1320, price: 30 },
  { id: 'a57-uuid', facility_id: 'f23-uuid', name: 'Tor 4', available_from: 480, available_to: 1320, price: 30 },

  // Yoga room
  { id: 'a58-uuid', facility_id: 'f24-uuid', name: 'Sala główna', available_from: 360, available_to: 1320, price: 25 },

  // Baseball field
  { id: 'a59-uuid', facility_id: 'f25-uuid', name: 'Boisko główne', available_from: 480, available_to: 1320, price: 100 },

  // Handball hall
  { id: 'a60-uuid', facility_id: 'f26-uuid', name: 'Boisko główne', available_from: 360, available_to: 1320, price: 70 },

  // Diving pool
  { id: 'a61-uuid', facility_id: 'f27-uuid', name: 'Wieża 1m', available_from: 360, available_to: 1320, price: 20 },
  { id: 'a62-uuid', facility_id: 'f27-uuid', name: 'Wieża 3m', available_from: 360, available_to: 1320, price: 25 },
  { id: 'a63-uuid', facility_id: 'f27-uuid', name: 'Wieża 5m', available_from: 360, available_to: 1320, price: 30 },
  { id: 'a64-uuid', facility_id: 'f27-uuid', name: 'Wieża 10m', available_from: 360, available_to: 1320, price: 40 },

  // Athletics stadium
  { id: 'a65-uuid', facility_id: 'f28-uuid', name: 'Bieżnia 400m', available_from: 420, available_to: 1200, price: 50 },
  { id: 'a66-uuid', facility_id: 'f28-uuid', name: 'Strefa rzutów', available_from: 420, available_to: 1200, price: 30 },
  { id: 'a67-uuid', facility_id: 'f28-uuid', name: 'Strefa skoków', available_from: 420, available_to: 1200, price: 35 },

  // Golf course
  { id: 'a68-uuid', facility_id: 'f29-uuid', name: 'Driving range', available_from: 480, available_to: 1200, price: 50 },
  { id: 'a69-uuid', facility_id: 'f29-uuid', name: 'Putting green', available_from: 480, available_to: 1200, price: 30 },

  // Billiard room
  { id: 'a70-uuid', facility_id: 'f30-uuid', name: 'Stół snooker', available_from: 480, available_to: 1320, price: 25 },
  { id: 'a71-uuid', facility_id: 'f30-uuid', name: 'Stół pool', available_from: 480, available_to: 1320, price: 20 },
];

export const mockAdmins: Admin[] = [
  { id: 'admin1', name: 'Hala_Admin', password: 'hala', facility_id: 'f1-uuid' },
  { id: 'admin2', name: 'Basen_Admin', password: 'basen', facility_id: 'f2-uuid' },
  { id: 'admin3', name: 'Stadion_Admin', password: 'stadion', facility_id: 'f3-uuid' },
  { id: 'admin4', name: 'Korty_Admin', password: 'korty', facility_id: 'f4-uuid' },
  { id: 'admin5', name: 'Orlik_Admin', password: 'orlik', facility_id: 'f5-uuid' },
  { id: 'admin6', name: 'Fitness_Admin', password: 'fitness', facility_id: 'f6-uuid' },
  { id: 'admin7', name: 'TenisStolowy_Admin', password: 'tenisstolowy', facility_id: 'f7-uuid' },
  { id: 'admin8', name: 'BasenTermalny_Admin', password: 'basentermalny', facility_id: 'f8-uuid' },
  { id: 'admin9', name: 'PilkaNozna_Admin', password: 'pilka', facility_id: 'f9-uuid' },
  { id: 'admin10', name: 'Squash_Admin', password: 'squash', facility_id: 'f10-uuid' },
  { id: 'admin11', name: 'Taniec_Admin', password: 'taniec', facility_id: 'f11-uuid' },
  { id: 'admin12', name: 'SiatkowkaPlazowa_Admin', password: 'plazowa', facility_id: 'f12-uuid' },
  { id: 'admin13', name: 'Wrotki_Admin', password: 'wrotki', facility_id: 'f13-uuid' },
  { id: 'admin14', name: 'Gimnastyka_Admin', password: 'gimnastyka', facility_id: 'f14-uuid' },
  { id: 'admin15', name: 'BasenOlimpijski_Admin', password: 'olimpijski', facility_id: 'f15-uuid' },
  { id: 'admin16', name: 'Zuzel_Admin', password: 'zuzel', facility_id: 'f16-uuid' },
  { id: 'admin17', name: 'Badminton_Admin', password: 'badminton', facility_id: 'f17-uuid' },
  { id: 'admin18', name: 'Boks_Admin', password: 'boks', facility_id: 'f18-uuid' },
  { id: 'admin19', name: 'Lyzwy_Admin', password: 'lyzwy', facility_id: 'f19-uuid' },
  { id: 'admin20', name: 'Koszykowka_Admin', password: 'koszykowka', facility_id: 'f20-uuid' },
  { id: 'admin21', name: 'BasenRekreacyjny_Admin', password: 'rekreacyjny', facility_id: 'f21-uuid' },
  { id: 'admin22', name: 'Rugby_Admin', password: 'rugby', facility_id: 'f22-uuid' },
  { id: 'admin23', name: 'Bowling_Admin', password: 'bowling', facility_id: 'f23-uuid' },
  { id: 'admin24', name: 'Joga_Admin', password: 'joga', facility_id: 'f24-uuid' },
  { id: 'admin25', name: 'Baseball_Admin', password: 'baseball', facility_id: 'f25-uuid' },
  { id: 'admin26', name: 'PilkaReczna_Admin', password: 'reczna', facility_id: 'f26-uuid' },
  { id: 'admin27', name: 'Skoki_Admin', password: 'skoki', facility_id: 'f27-uuid' },
  { id: 'admin28', name: 'Lekkoatletyka_Admin', password: 'lekkoatletyka', facility_id: 'f28-uuid' },
  { id: 'admin29', name: 'Golf_Admin', password: 'golf', facility_id: 'f29-uuid' },
  { id: 'admin30', name: 'Bilard_Admin', password: 'bilard', facility_id: 'f30-uuid' },
];

export const mockDashboardStats = {
  totalReservationsToday: 287,
  pendingApprovalCount: 89,
  activeReservationsThisWeek: 1247,
  revenueThisWeek: 45680.50,
};

// --- RESERVATION GENERATOR ---
const baseReservations = [
  { holder: 'Jan Kowalski', num: 'MOSiR-2025-0001', aId: 'a1-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 100 },
  { holder: 'Anna Nowak', num: 'MOSiR-2025-0002', aId: 'a1-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 400 },
  { holder: 'Adam Wiśniewski', num: 'MOSiR-2025-0003', aId: 'a2-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 60 },
  { holder: 'Piotr Kulesza', num: 'MOSiR-2025-0004', aId: 'a3-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Klub Sportowy "Orzeł"', num: 'MOSiR-2025-0005', aId: 'a3-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 1200 },
  
  { holder: 'Szkoła Pływania Aqua', num: 'MOSiR-2025-0006', aId: 'a4-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 600 },
  { holder: 'Michał Zawadzki', num: 'MOSiR-2025-0007', aId: 'a5-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 30 },
  { holder: 'Kamil Głowacki', num: 'MOSiR-2025-0008', aId: 'a6-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 80 },
  { holder: 'Rodzina Lisów', num: 'MOSiR-2025-0009', aId: 'a6-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  
  { holder: 'Akademia Biegowa', num: 'MOSiR-2025-0010', aId: 'a7-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 800 },
  { holder: 'Janina Niezgoda', num: 'MOSiR-2025-0011', aId: 'a7-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 20 },
  { holder: 'UKS Football', num: 'MOSiR-2025-0012', aId: 'a8-uuid', type: 'PERIODIC' as const, status: 'PENDING' as const, amount: 600 },

  { holder: 'Krzysztof Konon', num: 'MOSiR-2025-0013', aId: 'a9-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 40 },
  { holder: 'Tomasz Hajto', num: 'MOSiR-2025-0014', aId: 'a10-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Rafał Trzask', num: 'MOSiR-2025-0015', aId: 'a9-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 320 },

  { holder: 'OSP Straż', num: 'MOSiR-2025-0016', aId: 'a11-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 50 },
  { holder: 'FC Ponalewce', num: 'MOSiR-2025-0017', aId: 'a11-uuid', type: 'PERIODIC' as const, status: 'PENDING' as const, amount: 200 },
  { holder: 'Koszykarze z osiedla', num: 'MOSiR-2025-0018', aId: 'a12-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 30 },
  
  { holder: 'ZSZ Nr 2', num: 'MOSiR-2025-0019', aId: 'a1-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 1500 },
  { holder: 'Stowarzyszenie Weteranów', num: 'MOSiR-2025-0020', aId: 'a3-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 200 },
  { holder: 'Kółko Pływackie', num: 'MOSiR-2025-0021', aId: 'a6-uuid', type: 'PERIODIC' as const, status: 'PENDING' as const, amount: 640 },
  { holder: 'Urodziny Jasia', num: 'MOSiR-2025-0022', aId: 'a6-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 160 },
  { holder: 'Lekkoatletyka dla najmłodszych', num: 'MOSiR-2025-0023', aId: 'a7-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 400 },
  { holder: 'Zarząd Spółdzielni', num: 'MOSiR-2025-0024', aId: 'a10-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 45 },
  { holder: 'Turniej Tenisa Stołowego', num: 'MOSiR-2025-0025', aId: 'a3-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Dzieciarnia FC', num: 'MOSiR-2025-0026', aId: 'a11-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 500 },

  // Additional reservations for new areas
  { holder: 'Marek Fitness', num: 'MOSiR-2025-0027', aId: 'a13-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 25 },
  { holder: 'Katarzyna Cardio', num: 'MOSiR-2025-0028', aId: 'a14-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 160 },
  { holder: 'Aerobik Team', num: 'MOSiR-2025-0029', aId: 'a15-uuid', type: 'SUBSCRIPTION' as const, status: 'PENDING' as const, amount: 280 },
  { holder: 'Ping Pong Club', num: 'MOSiR-2025-0030', aId: 'a16-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 120 },
  { holder: 'Relax Spa', num: 'MOSiR-2025-0031', aId: 'a20-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 45 },
  { holder: 'Miejski KS', num: 'MOSiR-2025-0032', aId: 'a23-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 2400 },
  { holder: 'Squash Masters', num: 'MOSiR-2025-0033', aId: 'a26-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 35 },
  { holder: 'Taniec i Ruch', num: 'MOSiR-2025-0034', aId: 'a28-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 320 },
  { holder: 'Beach Volleyball Team', num: 'MOSiR-2025-0035', aId: 'a30-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 25 },
  { holder: 'Roller Skating Club', num: 'MOSiR-2025-0036', aId: 'a32-uuid', type: 'PERIODIC' as const, status: 'PENDING' as const, amount: 160 },
  { holder: 'Gimnastyka Artystyczna', num: 'MOSiR-2025-0037', aId: 'a33-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 480 },
  { holder: 'Olimpijczycy', num: 'MOSiR-2025-0038', aId: 'a35-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 320 },
  { holder: 'Żużlowcy Miejscy', num: 'MOSiR-2025-0039', aId: 'a41-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Badminton Academy', num: 'MOSiR-2025-0040', aId: 'a42-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 160 },
  { holder: 'Boks Boxing Club', num: 'MOSiR-2025-0041', aId: 'a45-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 50 },
  { holder: 'Łyżwiarze Figurowi', num: 'MOSiR-2025-0042', aId: 'a47-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 280 },
  { holder: 'Koszykówka Młodzieżowa', num: 'MOSiR-2025-0043', aId: 'a48-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 640 },
  { holder: 'Rodzice z dziećmi', num: 'MOSiR-2025-0044', aId: 'a50-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 25 },
  { holder: 'Rugby Team', num: 'MOSiR-2025-0045', aId: 'a53-uuid', type: 'PERIODIC' as const, status: 'PENDING' as const, amount: 2000 },
  { holder: 'Bowling Night', num: 'MOSiR-2025-0046', aId: 'a54-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 30 },
  { holder: 'Yoga Studio', num: 'MOSiR-2025-0047', aId: 'a58-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 200 },
  { holder: 'Baseball Club', num: 'MOSiR-2025-0048', aId: 'a59-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Piłka Ręczna Kobiet', num: 'MOSiR-2025-0049', aId: 'a60-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 560 },
  { holder: 'Skoki do wody', num: 'MOSiR-2025-0050', aId: 'a61-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 20 },

  // More reservations - let's add hundreds more
  { holder: 'Klub Tenisowy Victoria', num: 'MOSiR-2025-0051', aId: 'a9-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 360 },
  { holder: 'Szkoła Pływania Delfin', num: 'MOSiR-2025-0052', aId: 'a4-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 720 },
  { holder: 'Akademia Koszykówki', num: 'MOSiR-2025-0053', aId: 'a2-uuid', type: 'PERIODIC' as const, status: 'PENDING' as const, amount: 480 },
  { holder: 'Stowarzyszenie Biegaczy', num: 'MOSiR-2025-0054', aId: 'a7-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 20 },
  { holder: 'Trening Personalny', num: 'MOSiR-2025-0055', aId: 'a13-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 200 },
  { holder: 'Zajęcia Aerobiku', num: 'MOSiR-2025-0056', aId: 'a15-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Mistrzostwa Tenisa Stołowego', num: 'MOSiR-2025-0057', aId: 'a16-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 60 },
  { holder: 'Relaks w Termach', num: 'MOSiR-2025-0058', aId: 'a21-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 25 },
  { holder: 'Trening Bramkarski', num: 'MOSiR-2025-0059', aId: 'a24-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 1200 },
  { holder: 'Squash Tournament', num: 'MOSiR-2025-0060', aId: 'a27-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 35 },

  // Continue adding more reservations...
  { holder: 'Studio Tańca Modern', num: 'MOSiR-2025-0061', aId: 'a29-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 360 },
  { holder: 'Plażówka Summer', num: 'MOSiR-2025-0062', aId: 'a31-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 25 },
  { holder: 'Klub Wrotkarski', num: 'MOSiR-2025-0063', aId: 'a32-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 240 },
  { holder: 'Gimnastyka Rytmiczna', num: 'MOSiR-2025-0064', aId: 'a34-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 360 },
  { holder: 'Pływanie Olimpijskie', num: 'MOSiR-2025-0065', aId: 'a36-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Badminton Seniors', num: 'MOSiR-2025-0066', aId: 'a43-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 160 },
  { holder: 'Boks Amatorski', num: 'MOSiR-2025-0067', aId: 'a46-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 30 },
  { holder: 'Łyżwiarstwo Figurowe', num: 'MOSiR-2025-0068', aId: 'a47-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 420 },
  { holder: 'Koszykówka Akademicka', num: 'MOSiR-2025-0069', aId: 'a49-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 60 },
  { holder: 'Basen Rodzinny', num: 'MOSiR-2025-0070', aId: 'a51-uuid', type: 'PERIODIC' as const, status: 'PENDING' as const, amount: 120 },

  // Adding more variety
  { holder: 'Rugby Juniors', num: 'MOSiR-2025-0071', aId: 'a53-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 1800 },
  { holder: 'Bowling Friday', num: 'MOSiR-2025-0072', aId: 'a55-uuid', type: 'SINGLE' as const, status: 'CONFIRMED' as const, amount: 30 },
  { holder: 'Yoga dla początkujących', num: 'MOSiR-2025-0073', aId: 'a58-uuid', type: 'PERIODIC' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Baseball League', num: 'MOSiR-2025-0074', aId: 'a59-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 800 },
  { holder: 'Piłka Ręczna Mężczyzn', num: 'MOSiR-2025-0075', aId: 'a60-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 70 },
  { holder: 'Skoki 3m Platform', num: 'MOSiR-2025-0076', aId: 'a62-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 200 },
  { holder: 'Lekkoatletyka Młodzież', num: 'MOSiR-2025-0077', aId: 'a65-uuid', type: 'SUBSCRIPTION' as const, status: 'CONFIRMED' as const, amount: 400 },
  { holder: 'Golf Practice', num: 'MOSiR-2025-0078', aId: 'a68-uuid', type: 'SINGLE' as const, status: 'CANCELLED' as const, amount: null },
  { holder: 'Bilard Mistrzowski', num: 'MOSiR-2025-0079', aId: 'a70-uuid', type: 'PERIODIC' as const, status: 'CONFIRMED' as const, amount: 200 },
  { holder: 'Pool Tournament', num: 'MOSiR-2025-0080', aId: 'a71-uuid', type: 'SINGLE' as const, status: 'PENDING' as const, amount: 20 },

  // Let's add many more - generating a pattern
  ...Array.from({ length: 200 }, (_, i) => {
    const id = 81 + i;
    const areaIds = ['a1-uuid', 'a2-uuid', 'a3-uuid', 'a4-uuid', 'a5-uuid', 'a6-uuid', 'a7-uuid', 'a8-uuid', 'a9-uuid', 'a10-uuid', 'a11-uuid', 'a12-uuid', 'a13-uuid', 'a14-uuid', 'a15-uuid', 'a16-uuid', 'a17-uuid', 'a18-uuid', 'a19-uuid', 'a20-uuid', 'a21-uuid', 'a22-uuid', 'a23-uuid', 'a24-uuid', 'a25-uuid', 'a26-uuid', 'a27-uuid', 'a28-uuid', 'a29-uuid', 'a30-uuid', 'a31-uuid', 'a32-uuid', 'a33-uuid', 'a34-uuid', 'a35-uuid', 'a36-uuid', 'a37-uuid', 'a38-uuid', 'a39-uuid', 'a40-uuid', 'a41-uuid', 'a42-uuid', 'a43-uuid', 'a44-uuid', 'a45-uuid', 'a46-uuid', 'a47-uuid', 'a48-uuid', 'a49-uuid', 'a50-uuid', 'a51-uuid', 'a52-uuid', 'a53-uuid', 'a54-uuid', 'a55-uuid', 'a56-uuid', 'a57-uuid', 'a58-uuid', 'a59-uuid', 'a60-uuid', 'a61-uuid', 'a62-uuid', 'a63-uuid', 'a64-uuid', 'a65-uuid', 'a66-uuid', 'a67-uuid', 'a68-uuid', 'a69-uuid', 'a70-uuid', 'a71-uuid'];
    const holders = ['Klub Sportowy Alfa', 'Akademia Sportu', 'Stowarzyszenie Młodzieżowe', 'Zespół Szkolny', 'Klub Seniorów', 'Akademia Młodych Talentów', 'Stowarzyszenie Rodziców', 'Klub Rekreacyjny', 'Zespół Miejski', 'Akademia Mistrzów', 'Klub Zawodowców', 'Stowarzyszenie Amatorów', 'Zespół Akademicki', 'Klub Miejski', 'Akademia Olimpijska', 'Stowarzyszenie Sportowe', 'Zespół Młodzieżowy', 'Klub Mistrzowski', 'Akademia Zawodowa', 'Stowarzyszenie Lokalne'];
    const types: ('SINGLE' | 'PERIODIC' | 'SUBSCRIPTION')[] = ['SINGLE', 'PERIODIC', 'SUBSCRIPTION'];
    const statuses: ('CONFIRMED' | 'PENDING' | 'CANCELLED')[] = ['CONFIRMED', 'PENDING', 'CANCELLED'];
    
    const areaId = areaIds[i % areaIds.length];
    const area = mockAreas.find(a => a.id === areaId)!;
    const type = types[i % types.length];
    const status = statuses[i % statuses.length];
    const amount = status === 'CANCELLED' ? null : area.price * (type === 'SINGLE' ? 1 : type === 'PERIODIC' ? 4 : 8) * (0.8 + Math.random() * 0.4);
    
    return {
      holder: holders[i % holders.length] + ` ${id}`,
      num: `MOSiR-2025-${String(id).padStart(4, '0')}`,
      aId: areaId,
      type,
      status,
      amount: amount ? Math.round(amount) : null
    };
  })
];

export const mockAdminReservations: Reservation[] = baseReservations.map((r, i) => {
  const area = mockAreas.find(a => a.id === r.aId)!;
  const facility = mockFacilities.find(f => f.id === area.facility_id)!;
  const resId = `res-uuid-${i}`;

  const payment: Payment | undefined = r.amount ? {
    id: `pay-uuid-${i}`,
    amount: r.amount,
    created_at: '2025-10-01',
    reservation_id: resId
  } : undefined;

  const schedules: Schedule[] = [
    { id: `sch-uuid-${i}-1`, day_of_week: 'MONDAY', starts_at: 960, ends_at: 1020, reservation_id: resId }
  ];

  if (r.type !== 'SINGLE') {
    schedules.push({ id: `sch-uuid-${i}-2`, day_of_week: 'WEDNESDAY', starts_at: 960, ends_at: 1020, reservation_id: resId });
  }

  return {
    id: resId,
    reservationNumber: r.num,
    reservationHolder: r.holder,
    area_id: r.aId,
    phoneNumber: '+48 111 222 333',
    email: 'email@example.com',
    nip: (i % 5 === 0) ? '1234567890' : null,
    reservationType: r.type,
    status: r.status,
    createdAt: '2025-10-01',
    area,
    facility,
    schedules,
    payment,
  };
});

// Single mock reservation for lookup
export const mockReservation = mockAdminReservations[0];

export const mockTakenSlots: Record<string, number[]> = {
  'a1-uuid': [600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a2-uuid': [720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a3-uuid': [600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230, 1260, 1290],
  'a4-uuid': [540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a5-uuid': [600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a6-uuid': [600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230, 1260, 1290],
  'a7-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a8-uuid': [600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200],
  'a9-uuid': [600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a10-uuid': [600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a11-uuid': [600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230, 1260, 1290],
  'a12-uuid': [600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a13-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a14-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a15-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a16-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a17-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a18-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a19-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a20-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a21-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a22-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a23-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a24-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a25-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a26-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a27-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a28-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a29-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a30-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a31-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a32-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a33-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a34-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a35-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a36-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a37-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a38-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a39-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a40-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a41-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a42-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a43-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a44-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a45-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a46-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a47-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a48-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a49-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a50-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a51-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a52-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a53-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a54-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a55-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a56-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a57-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a58-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a59-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a60-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a61-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a62-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a63-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a64-uuid': [360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260, 1275, 1290, 1305],
  'a65-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a66-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a67-uuid': [420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a68-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a69-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200],
  'a70-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
  'a71-uuid': [480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735, 750, 765, 780, 795, 810, 825, 840, 855, 870, 885, 900, 915, 930, 945, 960, 975, 990, 1005, 1020, 1035, 1050, 1065, 1080, 1095, 1110, 1125, 1140, 1155, 1170, 1185, 1200, 1215, 1230, 1245, 1260],
};
