import { useUser } from '@/contexts/AuthContext';
import { URLDocument } from '@/types/url';
import Link from 'next/link';
import React, { useMemo } from 'react';

const UrlComponent = ({
  url,
  shortURL,
  showSeparator,
}: {
  url: string;
  shortURL: string;
  showSeparator: boolean;
}) => {
  return (
    <div className='space-y-5'>
      <div>
        <div className='flex justify-between'>
          <p className='my-auto w-[300px] truncate text-primary-500'>
            {url}
          </p>
          <div className='mr-2 space-x-4'>
            <a
              href={shortURL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary-200'
            >
              {shortURL}
            </a>
            <button type='button' className='btn-secondary h-[35]'>
              Copy
            </button>
          </div>
        </div>
        {showSeparator && <div className='my-5 h-[2px] w-full bg-bGray' />}
      </div>
    </div>
  );
};

const ShortenedURLs = ({ urls }: { urls: Array<URLDocument> }) => {
  const { user } = useUser();

  if (!urls || urls.length === 0) return null;

  const firstItem = useMemo(() => urls[0], [urls]);
  const otherItems = useMemo(
    () => (urls.length > 3 ? urls.slice(1, 3) : urls.slice(1)),
    [urls]
  );

  return (
    <div className='mt-4 w-full rounded-lg bg-white p-[20px]'>
      <UrlComponent
        shortURL={`https://zom.ink/${firstItem.alias}`}
        url={firstItem.link}
        showSeparator
      />
      {otherItems.map((item) => {
        return (
          <UrlComponent
            key={item._id}
            shortURL={`https://zom.ink/${item.alias}`}
            url={item.link}
            showSeparator
          />
        );
      })}
      <div className=''>
        <div className='flex w-full items-center justify-between'>
          <h2 className='text-xl font-bold text-primary-500'>
            Want to manage, customize, and track your links?
          </h2>
          <button type='button' className='btn-primary'>
            Get Started
          </button>
        </div>
      </div>
      <Link href={user ? '/app' : 'my-urls'}>
        <a className='text-primary-200'>View all your links here</a>
      </Link>
    </div>
  );
};

export default ShortenedURLs;
