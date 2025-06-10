// src/lib/api.ts
export const API_BASE = 'http://localhost:3001/api';

function getToken() {
  return localStorage.getItem('token') || '';
}

export async function fetchWithToken(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = getToken();
  console.log('>>> Token enviado:', token);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${res.status}`);
  }
  return res.json();
}

