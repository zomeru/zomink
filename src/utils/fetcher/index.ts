import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { getError } from '../getError';

/* eslint-disable no-return-await */

axios.defaults.withCredentials = true;

export type QueryResponse<T> = T;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const refreshTokens = async () => {
  return await instance.post(`/auth/refresh`, undefined, {
    withCredentials: true,
  });
};

const handleRequest = async (
  request: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error: any) {
    if (error?.response?.status === 401) {
      try {
        await refreshTokens();
        return await request();
      } catch (innerError: any) {
        throw getError(innerError);
      }
    }
    return error;
  }
};

export const fetcher = async <T>(url: string): Promise<QueryResponse<T>> => {
  try {
    const request = () => instance.get(url).then((res) => res);
    const { data } = await handleRequest(request);
    return data;
  } catch (error: any) {
    throw getError(error);
  }
};

export const poster = async <T>(
  url: string,
  payload?: unknown,
  options?: AxiosRequestConfig
): Promise<QueryResponse<T>> => {
  try {
    const request = () =>
      instance
        .post(url, payload, options)
        .then((res) => {
          return res;
        })
        .catch((postInnerError) => {
          throw getError(postInnerError);
        });
    await request();
    const { data } = await handleRequest(request);

    return data;
  } catch (error: any) {
    return error;
  }
};

/* eslint-enable no-return-await */
