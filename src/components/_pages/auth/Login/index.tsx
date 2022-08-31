import React from 'react';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { APP_NAME } from '@/components/constants';
import {
  LoginUserInput,
  loginUserSchema,
  useAuth,
} from '@/contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();

  // const [loginError, setLoginError] = useState<LoginUserInput | any>(
  //   {} as LoginUserInput
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  console.log('errors', errors);
  // console.log('loginError', loginError);

  const onSubmit = async (values: LoginUserInput) => {
    console.log({ values });
    login(values);
    // reset();
  };

  return (
    <section className='padding-sides mt-[50px] mb-[150px]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto my-auto max-w-[500px] space-y-6 text-center'
      >
        <h1 className='sc-heading text-primary-400'>Log in</h1>
        <p className=' text-infoText'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/register' passHref>
            <a className='text-primary-200 underline'>Sign up</a>
          </Link>
          {' or '}
          <a href='#' className='text-primary-200 underline'>
            Sign up with Google
          </a>
        </p>
        <button
          type='button'
          className='btn-primary-lg mx-auto flex items-center justify-center space-x-3'
        >
          <AiOutlineGoogle className='text-2xl text-white' />
          <span>Log in with Google</span>
        </button>
        <div className='text-separator text-infoText'>OR</div>
        <div className='flex flex-col space-y-3'>
          <input
            type='text'
            className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
            placeholder='Email or Username'
            {...register('email')}
          />

          <input
            type='password'
            className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
            placeholder='Password'
            {...register('password')}
          />
        </div>
        <button type='submit' className='btn-primary-lg'>
          Log in
        </button>
        <p className='text-sm text-infoText'>
          By logging in, you agree to {APP_NAME}&apos;s{' '}
          <a
            href='/pages/terms-of-service'
            target='_blank'
            rel='noopener noreferrer'
            className='simple-links text-infoText'
          >
            Terms of Service
          </a>
          ,{' '}
          <a
            href='/pages/privacy-policy'
            target='_blank'
            rel='noopener noreferrer'
            className='simple-links text-infoText'
          >
            Privacy Policy
          </a>{' '}
          and Use of Cookie.
        </p>
      </form>
    </section>
  );
};

export default Login;
