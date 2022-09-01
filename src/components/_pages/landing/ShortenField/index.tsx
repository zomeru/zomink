import React, { useState } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';

import { APP_NAME } from '@/components/constants';
import linkCheck from '@/utils/linkCheck/linkCheck';

const ShortenField = () => {
  const [link, setLink] = useState('');
  const [alias, setAlias] = useState('');

  const handleShortenLink = async (e: React.FormEvent) => {
    e.preventDefault();
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    setTimeout(() => {
      if (linkCheck(link)) {
        console.log('Link is valid');
        return;
      } 
        console.log('Link is not invalid');
      

      NProgress.done();
    }, 2000);
  };

  return (
    <section
      id='shortener'
      className='padding-sides my-[20px] w-full bg-primary-500 py-[35px] 2xl:my-[50px]'
    >
      <form
        className='max-width my-auto h-full space-y-3 '
        onSubmit={handleShortenLink}
      >
        <div className='flex w-full space-x-3'>
          <input
            type='text'
            className='w-full rounded-lg px-5 outline-none'
            placeholder='Paste your link here'
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type='text'
            className='w-[250px] rounded-lg px-5 outline-none'
            placeholder='Alias (optional)'
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <button type='submit' className='btn-primary-lg'>
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
      </form>
    </section>
  );
};

export default ShortenField;
