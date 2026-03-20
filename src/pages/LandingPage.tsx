import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, CalendarDays, ClipboardCheck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockFacilities, mockAreas } from '@/lib/mockData';
import { minutesToTime } from '@/lib/types';
import heroImage from '@/assets/hero-sports.jpg';
import poolImage from '@/assets/facility-pool.jpg';
import tennisImage from '@/assets/facility-tennis.jpg';
import stadiumImage from '@/assets/facility-stadium.jpg';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const facilityImages: Record<string, string> = {
  '1': heroImage,
  '2': poolImage,
  '3': stadiumImage,
  '4': tennisImage,
};

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const heroRef = useScrollReveal();
  const facilitiesRef = useScrollReveal();
  const howRef = useScrollReveal();
  const searchRef = useScrollReveal();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/rezerwacja/${searchQuery.trim()}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative gradient-hero min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-32" ref={heroRef}>
          <div className="max-w-2xl opacity-0 animate-fade-in-up">
            <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-primary-foreground/60 mb-4">
              Miejski Ośrodek Sportu i Rekreacji
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] text-primary-foreground leading-[0.95] text-balance mb-6">
              Zarezerwuj obiekt sportowy online
            </h1>
            <p className="font-body text-lg text-primary-foreground/70 max-w-lg text-pretty mb-10">
              Szybka rezerwacja hal sportowych, basenów, kortów i boisk. Wybierz termin, potwierdź dane i gotowe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rezerwacja">
                <Button variant="hero-secondary" size="xl">
                  Zarezerwuj teraz
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#obiekty">
                <Button variant="tertiary" size="xl" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Sprawdź dostępność
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="obiekty" className="py-24 bg-surface-low" ref={facilitiesRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-xl mb-16 opacity-0 animate-fade-in-up">
            <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-secondary-container mb-3">Nasze obiekty</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground text-balance">
              Wybierz obiekt i zarezerwuj termin
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockFacilities.map((facility, i) => {
              const areas = mockAreas[facility.id] || [];
              const minPrice = areas.length > 0 ? Math.min(...areas.map(a => a.price_per_15mins * 4)) : 0;
              const isOpen = areas.some(a => {
                const now = new Date();
                const mins = now.getHours() * 60 + now.getMinutes();
                return mins >= a.available_from && mins < a.available_to;
              });

              return (
                <div
                  key={facility.id}
                  className="bg-surface-lowest rounded-2xl overflow-hidden card-accent opacity-0 animate-fade-in-up group"
                  style={{ animationDelay: `${150 + i * 80}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={facilityImages[facility.id] || heroImage}
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={isOpen ? 'status-dot-open' : 'status-dot-closed'} />
                      <span className="font-body text-xs text-muted-foreground">{isOpen ? 'Otwarte' : 'Zamknięte'}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-foreground mb-1">{facility.name}</h3>
                    {minPrice > 0 && (
                      <p className="font-body text-sm text-muted-foreground mb-4">
                        od <span className="font-medium text-foreground">{minPrice.toFixed(0)} zł</span>/h
                      </p>
                    )}
                    <Link to="/rezerwacja">
                      <Button variant="secondary" size="sm" className="w-full">
                        Zarezerwuj
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24" ref={howRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-xl mb-16 opacity-0 animate-fade-in-up">
            <p className="font-body text-xs font-medium tracking-[0.04em] uppercase text-secondary-container mb-3">Jak to działa</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground text-balance">
              Rezerwacja w trzech krokach
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              { icon: CalendarDays, title: 'Wybierz obiekt i termin', desc: 'Przeglądaj dostępne obiekty, wybierz salę i pasujący Ci termin.' },
              { icon: ClipboardCheck, title: 'Uzupełnij dane', desc: 'Podaj dane kontaktowe — jako osoba prywatna lub firma.' },
              { icon: CheckCircle, title: 'Potwierdź rezerwację', desc: 'Otrzymasz numer rezerwacji. Administrator potwierdzi ją e-mailem.' },
            ].map((step, i) => (
              <div key={i} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${200 + i * 100}ms` }}>
                <div className="flex items-start gap-4 md:flex-col">
                  <div className="w-12 h-12 rounded-xl bg-surface-low flex items-center justify-center flex-shrink-0">
                    <step.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <span className="font-display text-xs font-bold text-secondary-container tracking-wide uppercase mb-1 block">
                      Krok {i + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-foreground mb-2">{step.title}</h3>
                    <p className="font-body text-sm text-muted-foreground max-w-xs text-pretty">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-20 bg-surface-low" ref={searchRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center opacity-0 animate-fade-in-up">
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground mb-3">
              Sprawdź status rezerwacji
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Wpisz numer rezerwacji, np. MOSiR-2025-4471
            </p>
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="MOSiR-2025-XXXX"
                  className="w-full h-12 pl-11 pr-4 bg-surface-lowest rounded-lg font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  aria-label="Numer rezerwacji"
                />
              </div>
              <Button type="submit" variant="default" size="lg">Szukaj</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
