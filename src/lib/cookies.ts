// Simple cookie helpers for admin session

export function setCookie(name: string, value: string): void {
  // No expiration = essentially permanent (until manually cleared)
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function removeCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0`;
}

// Admin session helpers
const KEYS = {
  id: 'mosir_admin_id',
  name: 'mosir_admin_name',
  facility: 'mosir_admin_facility',
  token: 'mosir_admin_token',
} as const;

export function setAdminSession(data: {
  id: string;
  name: string;
  facilityId?: string;
}): void {
  setCookie(KEYS.id, data.id);
  setCookie(KEYS.name, data.name);
  if (data.facilityId) setCookie(KEYS.facility, data.facilityId);
  // Use admin id as a "token" for route protection since API has no JWT
  setCookie(KEYS.token, data.id);
}

export function getAdminSession() {
  return {
    id: getCookie(KEYS.id),
    name: getCookie(KEYS.name),
    facilityId: getCookie(KEYS.facility),
    token: getCookie(KEYS.token),
  };
}

export function clearAdminSession(): void {
  removeCookie(KEYS.id);
  removeCookie(KEYS.name);
  removeCookie(KEYS.facility);
  removeCookie(KEYS.token);
}
