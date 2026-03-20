import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-low py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <span className="font-display font-extrabold text-lg text-primary">MOSiR</span>
            <p className="font-body text-sm text-muted-foreground mt-2 max-w-xs">
              Miejski Ośrodek Sportu i Rekreacji — rezerwacja obiektów sportowych online.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="font-display font-semibold text-sm mb-3 text-foreground">Nawigacja</h4>
              <div className="space-y-2">
                <Link to="/" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Strona główna</Link>
                <Link to="/rezerwacja" className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Rezerwacja</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-3 text-foreground">Kontakt</h4>
              <p className="font-body text-sm text-muted-foreground">kontakt@mosir.pl</p>
              <p className="font-body text-sm text-muted-foreground">+48 12 345 67 89</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} MOSiR. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
