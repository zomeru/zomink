import React, { useState } from 'react';
import Link from 'next/link';

const ShortenField = () => {
  const [link, setLink] = useState('');

  const handleShortenLink = async (e: React.FormEvent) => {
    e.preventDefault();

    // if link is not a valid url, return
    if (
      !link.match(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      ) ||
      link.includes(' ')
    ) {
      console.log('not a valid url', link);
      return;
    }

    console.log('valid url', link);
  };

  return (
    <form
      className='padding-sides my-[0px] w-full bg-primary-500 py-[35px] 2xl:my-[50px]'
      onSubmit={handleShortenLink}
    >
      <div className='max-width my-auto h-full space-y-3'>
        <div className='flex w-full space-x-3'>
          <input
            type='text'
            className='w-full rounded-lg px-5 outline-none'
            placeholder='Paste your link to be shorten'
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type='submit' className='btn-primary-lg'>
            Shorten
          </button>
        </div>
        <p className='text-center text-sm font-light text-white'>
          By clicking Shorten, you are agreeing to Zomy&apos;s{' '}
          <strong>
            <Link href='/terms-of-service'>
              <a className='simple-links underline hover:text-primary-100'>
                Terms of Service
              </a>
            </Link>
          </strong>
          ,{' '}
          <strong>
            {' '}
            <Link href='/privacy-policy'>
              <a className='simple-links underline hover:text-primary-100'>
                Privacy Policy
              </a>
            </Link>
          </strong>
          , and <strong>Use of Cookies</strong>.
        </p>
      </div>
    </form>
  );
};

export default ShortenField;
