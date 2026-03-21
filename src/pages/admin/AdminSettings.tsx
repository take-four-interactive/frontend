import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { minutesToTime } from '@/lib/types';
import { api } from '@/lib/api';
import { mapAreaFromApi, type ApiArea } from '@/lib/apiMappers';
import { useAdminProfile } from '@/lib/adminProfile';

export default function AdminSettings() {
  const { facility, facilityId } = useAdminProfile();

  const { data: areasRaw = [] } = useQuery({
    queryKey: ['facility-areas', facilityId],
    queryFn: () => api.get<ApiArea[]>(`/api/v1/facilities/${facilityId}/areas`),
    enabled: !!facilityId,
  });
  const areas = areasRaw.map(mapAreaFromApi);

  const [facilityName, setFacilityName] = useState(facility?.name ?? '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (facility?.name) setFacilityName(facility.name);
  }, [facility?.name]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl animate-fade-in space-y-8">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-4">Dane obiektu</h3>
        <div className="bg-surface-lowest rounded-2xl p-6 space-y-4">
          <div>
            <label className="font-body text-xs font-medium tracking-[0.04em] uppercase text-muted-foreground mb-1.5 block">
              Nazwa obiektu
            </label>
            <input
              type="text"
              value={facilityName}
              onChange={e => setFacilityName(e.target.value)}
              className="w-full h-11 px-4 bg-surface-low rounded-t-lg font-body text-sm text-foreground focus:outline-none"
              style={{ borderBottom: '2px solid hsl(224 100% 87%)' }}
              onFocus={e => (e.target.style.borderBottomColor = 'hsl(237 97% 21%)')}
              onBlur={e => (e.target.style.borderBottomColor = 'hsl(224 100% 87%)')}
            />
          </div>
          <Button variant="default" onClick={handleSave}>
            {saved ? 'Zapisano ✓' : 'Zapisz zmiany'}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-4">Sale / strefy</h3>
        <div className="space-y-3">
          {areas.map(area => (
            <div key={area.id} className="bg-surface-lowest rounded-2xl p-5 card-accent">
              <h4 className="font-display font-semibold text-foreground mb-2">{area.name}</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span className="font-body text-xs text-muted-foreground">
                  Godziny: {minutesToTime(area.available_from)} – {minutesToTime(area.available_to)}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  Cena: {(area.price * 4).toFixed(0)} zł/h
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
