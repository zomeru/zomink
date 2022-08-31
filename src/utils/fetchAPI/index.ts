import { RequestInit } from 'next/dist/server/web/spec-extension/request';

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT as string}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options?.headers && options.headers),
      },
    }
  );

  return response.json();
}

export default fetchAPI;
