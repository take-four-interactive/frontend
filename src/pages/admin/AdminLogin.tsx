import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Mock login
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('mosir_admin_token', 'mock-jwt-token');
        localStorage.setItem('mosir_admin_name', 'Administrator');
        localStorage.setItem('mosir_admin_facility', '1');
        navigate('/admin/dashboard');
      } else {
        setError('Podaj adres e-mail i hasło.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="bg-surface-lowest rounded-2xl p-8 md:p-10 w-full max-w-sm shadow-ambient animate-scale-in">
        <div className="text-center mb-8">
          <span className="font-display font-extrabold text-2xl text-primary">MOSiR</span>
          <p className="font-body text-sm text-muted-foreground mt-2">Panel administracyjny</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-1.5 block">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-4 bg-surface-low rounded-t-lg font-body text-sm text-foreground focus:outline-none"
              style={{ borderBottom: '2px solid hsl(224 100% 87%)' }}
              onFocus={e => (e.target.style.borderBottomColor = 'hsl(237 97% 21%)')}
              onBlur={e => (e.target.style.borderBottomColor = 'hsl(224 100% 87%)')}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-1.5 block">Hasło</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 bg-surface-low rounded-t-lg font-body text-sm text-foreground focus:outline-none"
              style={{ borderBottom: '2px solid hsl(224 100% 87%)' }}
              onFocus={e => (e.target.style.borderBottomColor = 'hsl(237 97% 21%)')}
              onBlur={e => (e.target.style.borderBottomColor = 'hsl(224 100% 87%)')}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="font-body text-xs text-destructive">{error}</p>}
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? 'Logowanie...' : <><LogIn size={16} /> Zaloguj się</>}
          </Button>
        </form>
      </div>
    </div>
  );
}
