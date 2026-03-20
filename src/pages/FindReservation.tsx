import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mail, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FindReservation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/rezerwacja/${searchQuery.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full max-w-xl">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
            <CalendarDays size={32} />
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-foreground mb-4">
            Znajdź rezerwację
          </h1>
          <p className="font-body text-base text-muted-foreground text-balance">
            Sprawdź szczegóły, pobierz dowód wpłaty lub anuluj swoją rezerwację. Wystarczy podać numer otrzymany w wiadomości e-mail.
          </p>
        </div>

        <div className="bg-surface-lowest rounded-3xl p-6 md:p-10 shadow-ambient border border-border/50 animate-scale-in" style={{ animationDelay: '100ms' }}>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <label className="font-body text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1">Numer rezerwacji</label>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="np. MOSiR-2025-4471"
                  className="w-full h-14 pl-12 pr-4 bg-surface-low rounded-xl font-body text-base text-foreground placeholder:text-muted-foreground/50 border border-transparent focus:outline-none focus:border-primary/30 focus:bg-surface-lowest transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-body text-xs font-semibold tracking-wider uppercase text-muted-foreground ml-1">E-mail (opcjonalnie)</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Adres przypisany do rezerwacji"
                  className="w-full h-14 pl-12 pr-4 bg-surface-low rounded-xl font-body text-base text-foreground placeholder:text-muted-foreground/50 border border-transparent focus:outline-none focus:border-primary/30 focus:bg-surface-lowest transition-all"
                />
              </div>
            </div>

            <Button type="submit" variant="default" size="xl" className="w-full text-base font-bold shadow-lg shadow-primary/20 mt-4">
              Szukaj rezerwacji
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
