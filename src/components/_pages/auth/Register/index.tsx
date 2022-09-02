import React from 'react';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';

import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useRouter } from 'next/router';

import { APP_NAME } from '@/components/constants';
import {
  CreateUserInput,
  createUserSchema,
  useUser,
} from '@/contexts/AuthContext';
import { poster } from '@/utils/fetcher';

const Register = () => {
  const router = useRouter();
  const { setData } = useUser();
  const [registerError, setRegisterError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (registerError) {
      setTimeout(() => {
        setRegisterError(null);
      }, 5000);
    }
  }, [registerError]);

  const onSubmit = async (
    values: CreateUserInput,
    // eslint-disable-next-line no-unused-vars
    setSubmitting: (submit: boolean) => void
  ) => {
    await poster<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, values)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          router.push('/');
        } else if (res?.status === 401 || res?.status === 400) {
          setRegisterError(res?.error || res?.message);
        } else {
          setRegisterError('Something went wrong! Please try again later.');
        }
      })
      .catch((err) => {
        if (err?.status === 401 || err?.status === 400) {
          setRegisterError(err?.error || err?.message);
        } else {
          setRegisterError('Something went wrong! Please try again later.');
        }
      });

    setSubmitting(false);
  };

  return (
    <section className='padding-sides mt-[50px] mb-[150px]'>
      <Formik
        initialValues={{
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={toFormikValidationSchema(createUserSchema)}
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
                  name='username'
                  className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                    errors.username &&
                    touched.username &&
                    'border-2 border-red-400'
                  }`}
                  placeholder='Username'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className='ml-1 text-left text-sm text-infoText'>
                  At least 6 characters
                </p>
              </div>

              <input
                type='email'
                name='email'
                className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                  errors.email && touched.email && 'border-2 border-red-400'
                }`}
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type='text'
                name='firstName'
                className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                  errors.firstName &&
                  touched.firstName &&
                  'border-2 border-red-400'
                }`}
                placeholder='First name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type='text'
                name='lastName'
                className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                  errors.lastName &&
                  touched.lastName &&
                  'border-2 border-red-400'
                }`}
                placeholder='Last name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className='space-y-1'>
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
                {/* // TODO: Re-enable */}
                {/* <p className='ml-1 text-left text-sm text-infoText'>
                  At least one capital letter, at least one lower case letter,
                  at least one number, at least 8 characters
                </p> */}
                <p className='ml-1 text-left text-sm text-infoText'>
                  At least 8 characters
                </p>
              </div>
              <div>
                <input
                  type='password'
                  name='passwordConfirmation'
                  className={`h-[55px] w-full rounded-lg border border-bGray p-5 outline-none ${
                    errors.passwordConfirmation &&
                    touched.passwordConfirmation &&
                    'border-2 border-red-400'
                  }`}
                  placeholder='Confirm password'
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p
                  className={`duration-800 ml-1 text-center text-sm text-red-400 transition-all ease-in-out ${
                    errors.passwordConfirmation &&
                    errors.passwordConfirmation !== 'Required'
                      ? 'opacity-1 h-full'
                      : ' h-0 opacity-0'
                  }`}
                >
                  Passwords do not match
                </p>
              </div>
            </div>

            <p
              className={`duration-800 text-red-400 transition-all ease-in-out ${
                registerError ? 'opacity-1 h-full' : ' h-0 opacity-0'
              }`}
            >
              {registerError}
            </p>

            <button
              type='submit'
              disabled={isSubmitting}
              className={`btn-primary-lg ${
                isSubmitting &&
                'cursor-not-allowed bg-neutral-600 hover:bg-neutral-600'
              }`}
            >
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
        )}
      </Formik>
    </section>
  );
};

export default Register;
