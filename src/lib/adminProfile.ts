import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { getAdminSession } from './cookies';
import { mapFacilityFromApi, type ApiFacility } from './apiMappers';
import type { Facility } from './types';

type ApiAdmin = {
  id: string;
  name: string;
  password?: string;
  facility?: ApiFacility | null;
};

export function useAdminProfile() {
  const session = useMemo(() => getAdminSession(), []);
  const adminId = session.id;

  const query = useQuery({
    queryKey: ['admin-profile', adminId],
    enabled: !!adminId,
    queryFn: () => api.get<ApiAdmin>(`/api/v1/admins/${encodeURIComponent(adminId!)}`),
  });

  const facility: Facility | undefined = useMemo(() => {
    const f = query.data?.facility;
    if (!f) return undefined;
    return mapFacilityFromApi(f);
  }, [query.data?.facility]);

  return {
    adminId,
    admin: query.data,
    facility,
    facilityId: query.data?.facility?.id ?? undefined,
    ...query,
  };
}

