import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, List, CalendarDays, Settings, LogOut, Menu, X } from 'lucide-react';
import { getAdminSession, clearAdminSession } from '@/lib/cookies';
import { cn } from '@/lib/utils';
import { useAdminProfile } from '@/lib/adminProfile';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/rezerwacje', label: 'Rezerwacje', icon: List },
  { to: '/admin/dostepnosc', label: 'Dostępność', icon: CalendarDays },
  { to: '/admin/ustawienia', label: 'Ustawienia', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, isPending } = useAdminProfile();
  const { name: cookieAdminName } = getAdminSession();
  const adminName = admin?.name || cookieAdminName || (isPending ? 'Admin…' : 'Admin');

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-surface-low flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-surface-lowest flex flex-col transition-transform duration-300 lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-6">
          <Link to="/" className="font-display font-extrabold text-xl text-primary">MOSiR</Link>
          <p className="font-body text-xs text-muted-foreground mt-1">Panel administracyjny</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm transition-colors',
                location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-surface-low hover:text-foreground'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <div className="px-4 py-3 bg-surface-low rounded-xl mb-2">
            <p className="font-body text-sm font-medium text-foreground">{adminName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 w-full font-body text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={16} /> Wyloguj
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-surface-lowest flex items-center px-4 lg:px-8 gap-4 sticky top-0 z-20">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h2 className="font-display font-semibold text-foreground">
            {NAV_ITEMS.find(i => location.pathname.startsWith(i.to))?.label || 'Admin'}
          </h2>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
