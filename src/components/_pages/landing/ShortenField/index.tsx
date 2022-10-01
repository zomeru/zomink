import React, { useState } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { APP_NAME, LOCAL_LINKS_KEY } from '@/components/constants';
import { CreateShortURLInput, URLDocument } from '@/types/url';
import { createShortURLSchema } from '@/schema/url';
import shortenLink, { removeForwardSlash } from '@/utils/shortenLink';
import { useUser } from '@/contexts/AuthContext';
import { useError, useShortenURLs } from '@/hooks';
import { ResponseDocument } from '@/types/response';
import TextError from '@/components/TextError';
import { aliasValid } from '@/utils/regEx';
import ShortenedURLs from '../ShortenedURLs';

const ShortenField = () => {
  const { user } = useUser();
  const [shortenError, setShortenError] = useError();
  const { shortenedURLs, setShortenedURLs } = useShortenURLs(user);

  const [shortening, setShortening] = useState(false);

  const onShorten = async (
    values: CreateShortURLInput,
    resetForm: () => void
  ) => {
    setShortening(true);
    setShortenError(undefined);
    NProgress.configure({ showSpinner: true });
    NProgress.start();
    const newLink = removeForwardSlash(values.link).trim();

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
          setShortening(false);
          return;
        }

        if (values.alias && !aliasValid(values.alias)) {
          setShortenError('Alias must be 5 alphanumeric characters');
          NProgress.done();
          setShortening(false);
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
        setShortening(false);
        resetForm();
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
          resetForm();
        } else if (
          response.status === 'error' &&
          response.statusCode === 400
        ) {
          setShortenError(response.message);
        } else {
          setShortenError('Something went wrong! Please try again later.');
        }
      }

      NProgress.done();
      setShortening(false);
      return;
    }

    const newValues: CreateShortURLInput = {
      ...values,
      link: newLink,
      user: user._id,
    };

    const response: ResponseDocument = await shortenLink(newValues);

    if (response.status === 'success') {
      const newShortenedURL = response?.data?.urlData as URLDocument;
      const filteredShortenedURLs = shortenedURLs.filter(
        (item) => item._id !== newShortenedURL._id
      );

      setShortenedURLs([...filteredShortenedURLs, newShortenedURL]);
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
    setShortening(false);
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
          // touched,
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
            <div className='flex w-full flex-col space-y-3 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-3'>
              <input
                type='text'
                name='link'
                className={`h-[45px] w-full rounded-lg px-5 text-sm 
                outline-none sm:h-auto sm:text-base ${
                  errors.link && values.link.length > 0
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
                className={`h-[45px] w-full rounded-lg px-5 text-sm outline-none sm:h-auto sm:w-[180px] sm:text-base md:w-[250px] ${
                  errors.alias && values.alias.length > 0
                    ? 'input-error text-red-600'
                    : 'text-sky-600'
                }`}
                placeholder='Alias, (optional)'
                value={values.alias}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                disabled={
                  shortening ||
                  isSubmitting ||
                  (!!errors.link && errors.link !== 'Link is required') ||
                  !!errors.alias
                }
                type='submit'
                className={`btn-primary-lg ${
                  shortening ||
                  isSubmitting ||
                  (!!errors.link && errors.link !== 'Link is required') ||
                  errors.alias
                    ? 'btn-primary-disabled'
                    : ''
                }`}
              >
                Shorten
              </button>
            </div>
            <p className='text-center text-xs font-light text-white sm:text-sm'>
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
                !shortenError && errors.alias && values.alias.length > 0
              }
              errorText={errors.alias!}
              className={`mb-[20px] ${
                shortenedURLs.length > 0 && 'h-[25px]'
              }`}
              dotClassName={
                shortenedURLs.length > 0 ? '-translate-y-[8px]' : ''
              }
            />
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
            <ShortenedURLs urls={[...shortenedURLs].reverse()} />
          </form>
        )}
      </Formik>
    </section>
  );
};

export default ShortenField;
