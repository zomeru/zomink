const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('credentials', 'include');

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

const refreshTokens = async () => {
  const res = await fetcher(`/auth/refresh`, 'POST');
  return res;
};

const handleRequest = async (request: () => any) => {
  try {
    return await request();
  } catch (error: any) {
    if (error?.response?.status === 401) {
      try {
        await refreshTokens();
        return await request();
      } catch (innerError: any) {
        return innerError;
      }
    }
    return error;
  }
};

export const fetcher = async <T>(
  url: string,
  method: MethodType,
  payload?: T
) => {
  try {
    const response = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`,
          {
            method,
            headers,
            credentials: 'include',
            body: JSON.stringify(payload),
          }
        );

        return res.json();
      } catch (error) {
        return error;
      }
    };

    const data = await handleRequest(response);
    return data;
  } catch (error) {
    return error;
  }
};

export default fetcher;
