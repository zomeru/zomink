import {
  createContext,
  FC,
  useContext,
  useState,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import Router from 'next/router';

import fetcher from '@/utils/fetcher';
import { ResponseDocument } from '@/types/response';
import {
  CreateUserInput,
  LoginUserInput,
  UserDocument,
} from '@/types/user';

export interface UserContext {
  user?: UserDocument;
  /* eslint-disable no-unused-vars */
  setUser: Dispatch<SetStateAction<UserDocument | undefined>>;
  register: (
    values: CreateUserInput
  ) => Promise<ResponseDocument | undefined>;
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

  useEffect(() => {
    // const token = document.cookie
    //   .split('; ')
    //   .filter((row) => row.startsWith('access='))
    //   .map((c) => c.split('=')[1])[0];

    const getCurrentUser = async () => {
      try {
        const response = await fetcher('/users/me', 'GET');
        if (response?.status === 'success') {
          setUser(response.data.user);
        }
      } catch (error) {
        setUser(undefined);
      }
    };

    if (!user) getCurrentUser();
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
