import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRouter } from 'next/router';

import { APP_NAME } from '@/components/constants';
import { useUser } from '@/contexts/AuthContext';
import { LoginUserInput } from '@/types/user';
import { loginUserSchema } from '@/schema/user';
import { useError } from '@/hooks';
import getGoogleOAuthURL from '@/utils/getGoogleOAuthURL';

const Login = () => {
  const { push, query, replace } = useRouter();
  const { login } = useUser();
  const [loginError, setLoginError] = useError();

  useEffect(() => {
    let timeout: any;
    if (query.error) {
      timeout = setTimeout(() => {
        replace('/auth/login', undefined, { shallow: true });
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  const onSubmit = async (
    values: LoginUserInput,
    // eslint-disable-next-line no-unused-vars
    setSubmitting: (submit: boolean) => void
  ) => {
    setLoginError(undefined);

    const res = await login(values);

    if (res) {
      if (
        res.status === 'error' &&
        (res.statusCode === 401 || res.statusCode === 400)
      ) {
        setLoginError(res.message);
      } else {
        setLoginError('Something went wrong! Please try again later.');
      }
    }

    setSubmitting(false);
  };

  return (
    <section className='padding-sides mt-[50px] mb-[150px]'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={toFormikValidationSchema(loginUserSchema)}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className='mx-auto my-auto max-w-[500px] space-y-6 text-center'
          >
            <h1 className='sc-heading text-primary-400'>Log in</h1>
            <p className=' text-infoText'>
              Don&apos;t have an account?{' '}
              <Link href='/auth/register' passHref>
                <a className='text-primary-200 underline'>Sign up</a>
              </Link>
              {' or '}
              <Link href={getGoogleOAuthURL()}>
                <a className='text-primary-200 underline'>
                  Sign up with Google
                </a>
              </Link>
            </p>
            <button
              type='button'
              className='btn-primary-lg mx-auto flex items-center justify-center space-x-3'
              onClick={() => {
                push(getGoogleOAuthURL());
              }}
            >
              <AiOutlineGoogle className='text-2xl text-white' />
              <span>Log in with Google</span>
            </button>
            <div className='text-separator text-infoText'>OR</div>
            <div className='flex flex-col space-y-3'>
              <input
                type='text'
                name='email'
                className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                  errors.email && touched.email && 'input-error'
                }`}
                placeholder='Email or Username'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <input
                type='password'
                name='password'
                className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                  errors.password && touched.password && 'input-error'
                }`}
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <p
              className={`duration-800 text-red-400 transition-all ease-in-out ${
                loginError || query.error
                  ? 'opacity-1 h-full'
                  : ' h-0 opacity-0'
              }`}
            >
              {loginError || query.error}
            </p>

            <button
              disabled={isSubmitting}
              type='submit'
              className={`btn-primary-lg ${
                isSubmitting && 'btn-primary-disabled '
              }`}
            >
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
        )}
      </Formik>
    </section>
  );
};

export default Login;
