import { Link } from 'react-router-dom';
import { mockAdminReservations } from '@/lib/mockData';
import { CalendarDays, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const adminFacilityId = localStorage.getItem('mosir_admin_facility');
  const adminReservations = mockAdminReservations.filter(r => !adminFacilityId || r.area?.facility_id === adminFacilityId);
  const pendingCount = adminReservations.filter(r => r.status === 'PENDING').length;
  const totalToday = adminReservations.length;
  const activeThisWeek = adminReservations.filter(r => r.status !== 'CANCELLED').length;
  const revenueThisWeek = adminReservations.filter(r => r.payment).reduce((acc, r) => acc + (r.payment?.amount || 0), 0);

  const stats = [
    { label: 'Rezerwacje dziś', value: totalToday, icon: CalendarDays, highlight: false },
    { label: 'Oczekujące', value: pendingCount, icon: AlertCircle, highlight: pendingCount > 0 },
    { label: 'Aktywne w tym tyg.', value: activeThisWeek, icon: Clock, highlight: false },
    { label: 'Przychód', value: `${revenueThisWeek.toFixed(0)} zł`, icon: TrendingUp, highlight: false },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              'bg-surface-lowest rounded-2xl p-6 card-accent',
              stat.highlight && 'card-accent-active'
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                stat.highlight ? 'bg-secondary/15' : 'bg-surface-low'
              )}>
                <stat.icon size={18} className={stat.highlight ? 'text-secondary-container' : 'text-muted-foreground'} />
              </div>
            </div>
            <p className={cn(
              'font-display text-2xl font-bold tracking-[-0.02em]',
              stat.highlight ? 'text-secondary-container' : 'text-foreground'
            )}>
              {stat.value}
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <Link
        to="/admin/rezerwacje?status=PENDING"
        className="inline-flex items-center gap-2 px-5 py-3 bg-secondary/15 rounded-xl font-display font-semibold text-sm text-secondary-container hover:bg-secondary/25 transition-colors"
      >
        Oczekujące rezerwacje
        {pendingCount > 0 && (
          <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center">
            {pendingCount}
          </span>
        )}
      </Link>
    </div>
  );
}
