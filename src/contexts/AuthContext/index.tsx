import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from 'react';
import router from 'next/router';
import { object, string, TypeOf } from 'zod';
import NProgress from 'nprogress';

import fetchAPI from '@/utils/fetchAPI';

export const loginUserSchema = object({
  email: string().min(1, 'Username is required'),
  password: string().min(1, 'Password is required'),
});

export const createUserSchema = object({
  username: string().min(6, 'Username must be at least 6 characters long'),
  firstName: string().min(2, 'First name must be at least 2 characters'),
  lastName: string().min(2, 'Last name must be at least 2 characters'),
  password: string().min(8, 'Password must be at least 8 characters long'),
  passwordConfirmation: string().min(8, 'Password confirmation is required'),
  email: string({
    required_error: 'Email is required',
  }).email('Not a valid email'),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;

interface AuthContextProps {
  user: any | null;
  accessToken: string | null;
  /* eslint-disable no-unused-vars */
  login: ({ email, password }: LoginUserInput) => void;
  register: (values: CreateUserInput) => void;
  logout: () => void;
  /* eslint-enable no-unused-vars */
}

const authContextDefaultValues: AuthContextProps = {
  user: null,
  accessToken: null,
  login: () => {},
  register: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(authContextDefaultValues);

const getCurrentUser = async (token: string) => {
  try {
    const currentUser = await fetchAPI('/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return currentUser;
  } catch (error) {
    console.log('error getting current user', error);
    return null;
  }
};

const refreshToken = async (token: string) => {
  try {
    const newSession = await fetchAPI('/session/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'x-headers': token,
      },
    });

    return newSession;
  } catch (error) {
    console.log('error refreshing token', error);
    return null;
  }
};

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>('');

  useEffect(() => {
    (async () => {
      try {
        const acsToken = localStorage.getItem(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN as string
        );

        if (!acsToken && !accessToken) {
          setUser(null);
          setAccessToken(null);
          return;
        }

        const currentUser = await getCurrentUser(acsToken || accessToken || '');

        if (!currentUser) {
          // refresh token
          const rfToken = localStorage.getItem(
            process.env.NEXT_PUBLIC_REFRESH_TOKEN as string
          );

          if (!rfToken) {
            setUser(null);
            setAccessToken(null);
            return;
          }

          const newSession = await refreshToken(rfToken);

          const newUser = await getCurrentUser(newSession.accessToken);

          setUser(newUser);
          setAccessToken(newSession.accessToken);
        }

        setUser(currentUser);
        setAccessToken(acsToken || accessToken);
      } catch (error) {
        console.log('error getting current user', error);
        setUser(null);
        setAccessToken(null);
      }
    })();
  }, []);

  const login = async (values: LoginUserInput) => {
    try {
      NProgress.configure({ showSpinner: false });
      NProgress.start();
      const loginData = await fetchAPI('/session', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ ...values }),
      });

      setAccessToken(loginData.accessToken);
      localStorage.setItem(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
        loginData.accessToken
      );
      localStorage.setItem(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN as string,
        loginData.refreshToken
      );

      const currentUser = await getCurrentUser(loginData.accessToken);

      if (currentUser) {
        setUser(currentUser);
        router.push('/');
      }
    } catch (error: any) {
      console.log('login error', error);
    }
  };
  const register = async (values: CreateUserInput) => {
    try {
      NProgress.configure({ showSpinner: false });
      NProgress.start();
      await fetchAPI(`/users`, {
        method: 'POST',
        body: JSON.stringify({ ...values }),
      });

      const loginValues = {
        email: values.email,
        password: values.password,
      } as LoginUserInput;

      login(loginValues);
    } catch (error) {
      console.log('error registering user', error);
    }
  };

  const logout = async () => {
    try {
      await fetchAPI('/session/logout', {
        method: 'POST',
      });
      localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN as string);
      localStorage.removeItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN as string);
      setUser(null);
      setAccessToken(null);
      router.push('/');
    } catch (error) {
      console.log('error logging out', error);
    }
  };

  const authProviderValue = useMemo(
    () => ({
      user,
      accessToken,
      register,
      login,
      logout,
    }),
    [user, accessToken, login, logout]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
