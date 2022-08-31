import React from 'react';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { APP_NAME } from '@/components/constants';
import {
  CreateUserInput,
  createUserSchema,
  useAuth,
} from '@/contexts/AuthContext';

const Register = () => {
  // const [registerError, setRegisterError] = useState<CreateUserInput | any>(
  //   {} as CreateUserInput
  // );

  const { register: createNewAccount } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  console.log('errors', errors);
  // console.log('registerError', registerError);

  const onSubmit = async (values: CreateUserInput) => {
    console.log({ values });
    await createNewAccount(values);
  };

  return (
    <section className='padding-sides mt-[50px] mb-[150px]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto my-auto max-w-[500px] space-y-6 text-center'
      >
        <h1 className='sc-heading text-primary-400'>Sign up</h1>
        <p className=' text-infoText'>
          Already have an account?{' '}
          <Link href='/auth/login' passHref>
            <a className='text-primary-200 underline'>Log in</a>
          </Link>
          {' or '}
          <a href='#' className='text-primary-200 underline'>
            Log in with Google
          </a>
        </p>
        <p>{`${errors.email?.message}`}</p>
        <button
          type='button'
          className='btn-primary-lg mx-auto flex items-center justify-center space-x-3'
        >
          <AiOutlineGoogle className='text-2xl text-white' />
          <span>Sign up with Google</span>
        </button>
        <div className='text-separator text-infoText'>OR</div>
        <div className='flex flex-col space-y-3'>
          <div className='space-y-1'>
            <input
              type='text'
              className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
              placeholder='Username'
              {...register('username')}
            />
            <p className='ml-1 text-left text-sm text-infoText'>
              At least 6 characters
            </p>
          </div>

          <input
            type='email'
            className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
            placeholder='Email'
            {...register('email')}
          />
          <input
            type='text'
            className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
            placeholder='First name'
            {...register('firstName')}
          />
          <input
            type='text'
            className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
            placeholder='Last name'
            {...register('lastName')}
          />
          <div className='space-y-1'>
            <input
              type='password'
              className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
              placeholder='Password'
              {...register('password')}
            />
            <p className='ml-1 text-left text-sm text-infoText'>
              At least one capital letter, at least one lower case letter, at
              least one number, at least 8 characters
            </p>
          </div>
          <input
            type='password'
            className='h-[55px] w-full rounded-lg border border-bGray p-5 outline-none'
            placeholder='Confirm password'
            {...register('passwordConfirmation')}
          />
        </div>
        <button type='submit' className='btn-primary-lg'>
          Create an account
        </button>
        <p className='text-sm text-infoText'>
          By creating an account, you agree to {APP_NAME}&apos;s{' '}
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

export default Register;
