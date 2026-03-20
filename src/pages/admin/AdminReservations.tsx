import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockAdminReservations } from '@/lib/mockData';
import StatusBadge from '@/components/StatusBadge';
import { minutesToTime, RESERVATION_TYPE_LABELS } from '@/lib/types';
import type { ReservationStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

const STATUSES: (ReservationStatus | 'ALL')[] = ['ALL', 'PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED'];
const STATUS_LABEL: Record<string, string> = { ALL: 'Wszystkie', PENDING: 'Oczekujące', ACCEPTED: 'Zaakceptowane', REJECTED: 'Odrzucone', CANCELLED: 'Anulowane' };

export default function AdminReservations() {
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = mockAdminReservations.filter(r => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.reservationNumber.toLowerCase().includes(q) ||
        r.reservationHolder.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-4 py-2 rounded-full font-body text-xs font-medium transition-colors',
                statusFilter === s ? 'bg-accent text-accent-foreground' : 'bg-surface-lowest text-muted-foreground hover:bg-surface-high/50'
              )}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj..."
            className="h-9 pl-9 pr-4 bg-surface-lowest rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-56"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-lowest rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-low">
                <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-5 py-3">Nr</th>
                <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-5 py-3">Klient</th>
                <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-5 py-3 hidden md:table-cell">Sala</th>
                <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-5 py-3 hidden lg:table-cell">Typ</th>
                <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-5 py-3 hidden lg:table-cell">Godziny</th>
                <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-5 py-3">Kwota</th>
                <th className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-surface-low/50 transition-colors">
                  <td className="px-5 py-4">
                    <Link to={`/admin/rezerwacje/${r.id}`} className="font-display text-sm font-semibold text-primary hover:underline underline-offset-2">
                      {r.reservationNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-body text-sm text-foreground">{r.reservationHolder}</span>
                    <span className="block font-body text-xs text-muted-foreground">{r.email}</span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell font-body text-sm text-foreground">{r.area?.name}</td>
                  <td className="px-5 py-4 hidden lg:table-cell font-body text-sm text-muted-foreground">{RESERVATION_TYPE_LABELS[r.reservationType]}</td>
                  <td className="px-5 py-4 hidden lg:table-cell font-body text-sm text-muted-foreground">
                    {r.schedules.map(s => `${minutesToTime(s.startsAt)}–${minutesToTime(s.endsAt)}`).join(', ')}
                  </td>
                  <td className="px-5 py-4 font-display text-sm font-semibold text-foreground">{r.payment?.amount.toFixed(0)} zł</td>
                  <td className="px-5 py-4"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <p className="font-body text-sm text-muted-foreground">Brak rezerwacji spełniających kryteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
