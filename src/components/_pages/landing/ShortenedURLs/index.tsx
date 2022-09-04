import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useUser } from '@/contexts/AuthContext';
import { URLDocument } from '@/types/url';

const UrlComponent = ({
  onCopy,
  shortURL,
  showSeparator,
  url,
  copied,
}: {
  onCopy: () => void;
  url: string;
  shortURL: string;
  showSeparator: boolean;
  copied: boolean;
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
            <button
              onClick={onCopy}
              disabled={copied}
              type='button'
              className='btn-secondary h-[35]'
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
        {showSeparator && <div className='my-5 h-[2px] w-full bg-bGray' />}
      </div>
    </div>
  );
};

const ShortenedURLs = ({ urls }: { urls: Array<URLDocument> }) => {
  const [urlCopied, setUrlCopied] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    let timeout: any;
    if (urlCopied) {
      timeout = setTimeout(() => {
        setUrlCopied(undefined);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [urlCopied]);

  const { user } = useUser();

  if (!urls || urls.length === 0) return null;

  const reversedUrls = [...urls].reverse();
  const firstItem = reversedUrls[0];
  const otherItems =
    reversedUrls.length > 3
      ? reversedUrls.slice(1, 3)
      : reversedUrls.slice(1);

  const copyToClipBoard = async (url: string, id: string) => {
    try {
      setUrlCopied(undefined);
      await navigator.clipboard.writeText(url);

      setUrlCopied(id);
    } catch (err) {
      setUrlCopied(undefined);
    }
  };

  return (
    <div className='mt-4 w-full rounded-lg bg-white p-[20px]'>
      <UrlComponent
        onCopy={() => {
          copyToClipBoard(
            `https://zom.ink/${firstItem.alias}`,
            firstItem._id
          );
        }}
        copied={urlCopied === firstItem._id}
        shortURL={`https://zom.ink/${firstItem.alias}`}
        url={firstItem.link}
        showSeparator
      />
      {otherItems.map((item) => {
        return (
          <UrlComponent
            onCopy={() => {
              copyToClipBoard(`https://zom.ink/${item.alias}`, item._id);
            }}
            copied={urlCopied === item._id}
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
