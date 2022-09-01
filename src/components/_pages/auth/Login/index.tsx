import React from 'react';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';

import { APP_NAME } from '@/components/constants';
import {
  DataDocument,
  LoginUserInput,
  loginUserSchema,
  useUser,
} from '@/contexts/AuthContext';
import { poster } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const Login = () => {
  const router = useRouter();
  const { setData } = useUser();
  const [loginError, setLoginError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        setLoginError(null);
      }, 5000);
    }
  }, [loginError]);

  const onSubmit = (
    values: LoginUserInput,
    // eslint-disable-next-line no-unused-vars
    setSubmitting: (submit: boolean) => void
  ) => {
    setTimeout(async () => {
      await poster<DataDocument | any>(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        values
      )
        .then((res) => {
          if (res.status === 200 || res.data.status === 200) {
            setData(res);
            router.push('/');
          }
          if (res?.data.status === 401) {
            setLoginError(res?.data?.error || res?.data?.message);
          } else {
            setLoginError('Something went wrong! Please try again later.');
          }

          setSubmitting(false);
        })
        .catch((err) => {
          if (err?.data?.status === 401) {
            setLoginError(err?.data?.error || err?.data?.message);
          } else {
            setLoginError('Something went wrong! Please try again later.');
          }
          setSubmitting(false);
        });
    }, 400);
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
              <Link href="#">
                <a className='text-primary-200 underline'>
                  Sign up with Google
                </a>
              </Link>
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
                name='email'
                className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                  errors.email && touched.email && 'border-2 border-red-400'
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
                  errors.password &&
                  touched.password &&
                  'border-2 border-red-400'
                }`}
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <p
              className={`duration-800 text-red-400 transition-all ease-in-out ${
                loginError ? 'opacity-1 h-full' : ' h-0 opacity-0'
              }`}
            >
              {loginError}
            </p>

            <button
              disabled={isSubmitting}
              type='submit'
              className={`btn-primary-lg ${
                isSubmitting && 'cursor-not-allowed bg-neutral-600'
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
