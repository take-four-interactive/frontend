import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display font-extrabold text-xl tracking-tight text-primary">
          MOSiR
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Strona główna
          </Link>
          <Link to="/rezerwacja" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Rezerwacja
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="sm">Panel admina</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface-lowest px-4 pb-4 space-y-3 animate-fade-in">
          <Link to="/" className="block font-body text-sm py-2" onClick={() => setOpen(false)}>Strona główna</Link>
          <Link to="/rezerwacja" className="block font-body text-sm py-2" onClick={() => setOpen(false)}>Rezerwacja</Link>
          <Link to="/admin" className="block font-body text-sm py-2" onClick={() => setOpen(false)}>Panel admina</Link>
        </div>
      )}
    </nav>
  );
}
