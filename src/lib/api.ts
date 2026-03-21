const API_BASE_URL =
  import.meta.env.DEV
    ? ''
    : ((import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ||
       'https://unaverred-armida-clownishly.ngrok-free.dev');

import { getAdminSession, clearAdminSession } from './cookies';

function shouldAttachAdminToken(path: string): boolean {
  if (path === '/api/v1/admins/login') return false;
  if (path.startsWith('/api/v1/admins')) return true;
  /** Szczegóły i DELETE rezerwacji — backend może wymagać JWT (panel admina). Lista POST /reservations bez końcowego / zostaje bez tokenu (kreator). */
  if (path.startsWith('/api/v1/reservations/')) return true;
  return false;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { token } = getAdminSession();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    ...((options?.headers as Record<string, string>) || {}),
  };
  if (token && shouldAttachAdminToken(path)) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (res.status === 401 && shouldAttachAdminToken(path)) {
    clearAdminSession();
    window.location.href = '/admin';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    const msg =
      (errBody && typeof errBody === 'object' && 'message' in errBody && String((errBody as { message: unknown }).message)) ||
      (errBody && typeof errBody === 'object' && 'error' in errBody && String((errBody as { error: unknown }).error)) ||
      `HTTP ${res.status}`;
    throw new Error(msg || 'Wystąpił błąd');
  }
  if (res.status === 204) return {} as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
