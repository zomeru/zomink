import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { APP_NAME, LOCAL_LINKS_KEY } from '@/components/constants';
import { CreateShortURLInput, URLDocument } from '@/types/url';
import { createShortURLSchema } from '@/schema/url';
import shortenLink from '@/utils/shortenLink';
import { useUser } from '@/contexts/AuthContext';
import { useShortenURLs } from '@/hooks';
import { ResponseDocument } from '@/types/response';
import TextError from '@/components/TextError';
import { aliasValid } from '@/utils/regEx';
import ShortenedURLs from '../ShortenedURLs';

const ShortenField = () => {
  const { user } = useUser();
  const { shortenedURLs, setShortenedURLs } = useShortenURLs(user);

  const [shortenError, setShortenError] = useState<string | undefined>();

  useEffect(() => {
    let timeout: any;

    if (shortenError) {
      timeout = setTimeout(() => {
        setShortenError(undefined);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [shortenError]);

  const onShorten = async (
    values: CreateShortURLInput,
    resetForm: () => void
  ) => {
    setShortenError(undefined);
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    const newLink =
      values.link[values.link.length - 1] === '/'
        ? values.link.slice(0, -1).trim()
        : values.link.trim();

    if (!user) {
      let existingShortenedURL: URLDocument | undefined;

      if (values.alias && aliasValid(values.alias)) {
        existingShortenedURL = shortenedURLs.find(
          (item) => item.alias === values.alias && item.link === newLink
        );
      } else {
        existingShortenedURL = [...shortenedURLs]
          .reverse()
          .find((item) => item.link === newLink);
      }

      if (existingShortenedURL) {
        if (existingShortenedURL.alias === values.alias) {
          setShortenError('Alias already taken');
          NProgress.done();
          return;
        }

        if (values.alias && !aliasValid(values.alias)) {
          setShortenError('Alias must be 5 alphanumeric characters');
          NProgress.done();
          return;
        }

        const newExistingShortenedURL: URLDocument = {
          ...existingShortenedURL,
          updatedAt: new Date(),
        };

        const newShortenedURLs = [
          ...shortenedURLs.filter(
            (item) => item._id !== existingShortenedURL!._id
          ),
          newExistingShortenedURL,
        ];

        localStorage.setItem(
          LOCAL_LINKS_KEY,
          JSON.stringify(newShortenedURLs)
        );
        setShortenedURLs(newShortenedURLs);
        setShortenError(undefined);
      } else {
        const response: ResponseDocument = await shortenLink({
          ...values,
          link: newLink,
          user: undefined,
        } as CreateShortURLInput);

        if (response.status === 'success') {
          const newShortenedURLs = [
            ...shortenedURLs,
            response?.data?.urlData as URLDocument,
          ];

          localStorage.setItem(
            LOCAL_LINKS_KEY,
            JSON.stringify(newShortenedURLs)
          );
          setShortenedURLs(newShortenedURLs);
          setShortenError(undefined);
        } else if (
          response.status === 'error' &&
          response.statusCode === 400
        ) {
          setShortenError(response.message);
        } else {
          setShortenError('Something went wrong! Please try again later.');
        }
      }

      resetForm();
      NProgress.done();
      return;
    }

    const newValues: CreateShortURLInput = {
      ...values,
      link: newLink,
      user: user._id,
    };

    const response: ResponseDocument = await shortenLink(newValues);

    if (response.status === 'success') {
      setShortenedURLs((prev) => [
        ...prev,
        response?.data?.urlData as URLDocument,
      ]);
      setShortenError(undefined);
      resetForm();
    } else if (
      response.status === 'error' &&
      response.statusCode === 400
    ) {
      setShortenError(response.message);
    } else {
      setShortenError('Something went wrong! Please try again later.');
    }

    NProgress.done();
  };

  return (
    <section
      id='shortener'
      className='padding-sides my-[20px] w-full bg-primary-500 py-[35px] 2xl:my-[50px]'
    >
      <Formik
        initialValues={{ link: '', alias: '', user: '' }}
        validationSchema={toFormikValidationSchema(createShortURLSchema)}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onShorten(values, resetForm);

          setSubmitting(false);
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
            className={`max-width my-auto h-full  ${
              shortenedURLs.length > 0 ? 'space-y-5' : 'space-y-3'
            }`}
            onSubmit={handleSubmit}
          >
            <div className='flex w-full space-x-3'>
              <input
                type='text'
                name='link'
                className={`w-full 
                rounded-lg px-5 outline-none ${
                  errors.link && touched.link && values.link.length > 0
                    ? 'input-error text-red-600'
                    : 'text-sky-600'
                }`}
                placeholder='Paste your link here'
                value={values.link}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type='text'
                name='alias'
                className='w-[250px] rounded-lg px-5 outline-none'
                placeholder='Alias, (optional)'
                value={values.alias}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                disabled={isSubmitting}
                type='submit'
                className={`btn-primary-lg ${
                  isSubmitting && 'btn-primary-disabled'
                }`}
              >
                Shorten
              </button>
            </div>
            <p className='text-center text-sm font-light text-white'>
              By clicking Shorten, you are agreeing to {APP_NAME}&apos;s{' '}
              <strong>
                <Link href='/pages/terms-of-service'>
                  <a className='simple-links underline hover:text-primary-100'>
                    Terms of Service
                  </a>
                </Link>
              </strong>
              ,{' '}
              <strong>
                {' '}
                <Link href='/pages/privacy-policy'>
                  <a className='simple-links underline hover:text-primary-100'>
                    Privacy Policy
                  </a>
                </Link>
              </strong>
              , and <strong>Use of Cookies</strong>.
            </p>
            <TextError
              showError={
                !shortenError && errors.link && values.link.length > 0
              }
              errorText={errors.link!}
              className={`mb-[20px] ${
                shortenedURLs.length > 0 && 'h-[25px]'
              }`}
              dotClassName={
                shortenedURLs.length > 0 ? '-translate-y-[8px]' : ''
              }
            />
            <TextError
              showError={shortenError}
              errorText={shortenError!}
              className={`mb-[20px] ${
                shortenedURLs.length > 0 && 'h-[25px]'
              }`}
              dotClassName={
                shortenedURLs.length > 0 ? '-translate-y-[8px]' : ''
              }
            />

            {shortenError && errors.link && shortenedURLs.length > 0 && (
              <div className='mt-[10px] h-[1px]' />
            )}
            <ShortenedURLs
              urls={user ? shortenedURLs : [...shortenedURLs].reverse()}
            />
          </form>
        )}
      </Formik>
    </section>
  );
};

export default ShortenField;
