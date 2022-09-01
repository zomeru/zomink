import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

/* eslint-disable no-return-await */

axios.defaults.withCredentials = true;

export type QueryResponse<T> = T;

export const refreshTokens = async () => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh`,
    undefined,
    {
      withCredentials: true,
    }
  );
};

const handleRequest = async (
  request: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error: any) {
    if (error?.response?.status === 401) {
      await refreshTokens();
      return await request();
    }
    // return Promise.reject(error);

    return error.response;
  }
};

export const fetcher = async <T>(url: string): Promise<QueryResponse<T>> => {
  try {
    const request = () => axios.get(url, { withCredentials: true });
    const { data } = await handleRequest(request);
    return data;
  } catch (error: any) {
    return error.response;
  }
};

export const poster = async <T>(
  url: string,
  payload?: unknown,
  options?: AxiosRequestConfig
): Promise<QueryResponse<T>> => {
  try {
    const request = () =>
      axios.post(url, payload, {
        withCredentials: true,
        // headers: {
        //   'Content-Type': 'application/json',
        //   Accept: 'application/json',
        // },
        ...options,
      });
    const { data } = await handleRequest(request);
    return data;
  } catch (error: any) {
    return error.response;
  }
};

/* eslint-enable no-return-await */
