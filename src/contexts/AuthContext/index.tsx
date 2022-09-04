import {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import Router from 'next/router';
import { object, TypeOf, z } from 'zod';

import fetcher from '@/utils/fetcher';

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

export interface UserDocument {
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
  status: 'error' | 'success';
  statusCode: number;
  data?: {
    user: UserDocument;
  };
  message?: string;
}

export interface UserContext {
  user?: UserDocument;
  /* eslint-disable no-unused-vars */
  setUser: Dispatch<SetStateAction<UserDocument | undefined>>;
  register: (values: CreateUserInput) => Promise<ResponseDocument | undefined>;
  login: (values: LoginUserInput) => Promise<ResponseDocument | undefined>;
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
  const [user, setUser] = useState<UserDocument | undefined>();

  const getMe = async () => {
    const response = await fetcher('/users/me', 'GET');

    if (response?.status === 'success') {
      setUser(response.data.user);
    }
  };

  useEffect(() => {
    if (!user) getMe();
  }, [user]);

  const register = async (values: CreateUserInput) => {
    const response: ResponseDocument = await fetcher<CreateUserInput>(
      '/users',
      'POST',
      values
    );

    if (response.status === 'success') {
      setUser(response?.data?.user);
      Router.push('/');
      return;
    }

    return response;
  };

  const login = async (values: LoginUserInput) => {
    const response: ResponseDocument = await fetcher<LoginUserInput>(
      '/auth/login',
      'POST',
      values
    );

    if (response.status === 'success') {
      setUser(response?.data?.user);
      Router.push('/');
      return;
    }

    return response;
  };

  const logout = async () => {
    await fetcher('/auth/logout', 'POST');
    setUser(undefined);
    Router.push('/');
  };

  const value = useMemo(
    () => ({ user, setUser, logout, login, register }),
    [user, setUser, logout, login, register]
  );

  return (
    <UserContextImpl.Provider value={value}>
      {children}
    </UserContextImpl.Provider>
  );
};

export default UserProvider;
