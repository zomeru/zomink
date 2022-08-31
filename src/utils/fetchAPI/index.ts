import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options?.headers && options.headers),
    },
    credentials: 'include',
  });

  return response.json();
}

export default fetchAPI;
