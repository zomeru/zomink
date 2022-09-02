import {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { object, TypeOf, z } from 'zod';

import { fetcher, poster } from '@/utils/fetcher';

export const loginUserSchema = object({
  email: z
    .string({
      required_error: 'Email or username is required',
    })
    .min(1, 'Email or username is required'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
});

export const createUserSchema = object({
  username: z.string({}).min(6, 'Username must be at least 6 characters long'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  passwordConfirmation: z.string(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email is required')
    .email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export interface DataDocument {
  user: {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    verified: false;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
}
export interface ResponseDocument {
  status: number;
  data?: DataDocument;
  error?: string;
  message?: string;
}

export interface UserContext {
  data: any;
  /* eslint-disable no-unused-vars */
  setData: (data?: DataDocument) => void;
  /* eslint-enable no-unused-vars */
  logout: () => void;
}

export const UserContextImpl = createContext<UserContext>(null!);

export function useUser() {
  return useContext(UserContextImpl);
}

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { push } = useRouter();

  const [data, setData] = useState<DataDocument | undefined>();

  const getMe = async () => {
    await fetcher<ResponseDocument>(
      `/users/me`
    ).then((response) => {
      if (response && response.status === 200) {
        setData(response.data);
      }
    });
  };

  useEffect(() => {
    if (!data) getMe();
  }, [data]);

  const logout = async () => {
    try {
      await poster(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {});
      setData(undefined);
      push('/');
    } catch (error) {
      console.log('logout error', error);
    }
  };

  const value = useMemo(
    () => ({ data, setData, logout }),
    [data, setData, logout]
  );

  return (
    <UserContextImpl.Provider value={value}>
      {children}
    </UserContextImpl.Provider>
  );
};

export default UserProvider;
