/* eslint-disable no-return-await */
import axios, { AxiosResponse } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';

import { QueryResponse } from '../fetcher';

axios.defaults.withCredentials = true;

export const refreshTokens = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh`,
    undefined,
    {
      headers: {
        cookie: req.headers.cookie!,
      },
      withCredentials: true,
    }
  );

  const cookies = response.headers['set-cookie']?.toString();
  req.headers.cookie = cookies;
  res.setHeader('set-Cookie', cookies as string);
};

const handleRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
  request: () => Promise<AxiosResponse>
): Promise<AxiosResponse> => {
  try {
    return await request();
  } catch (error: any) {
    if (error?.response?.status === 401) {
      await refreshTokens(req, res);
      return await request();
    }

    throw error;
  }
};

/* eslint-disable no-useless-catch */
const fetchSSR = async (
  req: IncomingMessage,
  res: ServerResponse,
  url: string
): Promise<QueryResponse<any>> => {
  try {
    const request = () =>
      axios.get(url, {
        headers: {
          cookie: req.headers.cookie!,
        },
      });

    const data = await handleRequest(req, res, request);
    return data;
  } catch (error: any) {
    throw error;
  }
};

/* eslint-enable no-useless-catch */
/* eslint-enable no-return-await */

export default fetchSSR;
