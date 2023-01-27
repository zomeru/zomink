import React from 'react';
import Image from 'next/image';

import { Layout } from '@/components';

const NotFound = () => {
  return (
    <Layout>
      <div className='flex h-full flex-col items-center space-y-5 py-20 px-5'>
        <div className='relative h-[200px] w-[200px] sm:h-[350px] sm:w-[350px] '>
          <Image src='/assets/images/404.png' layout='fill' className='' />
        </div>
        <div className='space-y-3 text-center md:space-y-6'>
          <h2 className='text-4xl font-bold text-primary-500 sm:text-5xl md:text-6xl'>
            Something went wrong!
          </h2>
          <p className='text-base sm:text-lg md:text-xl'>
            Page not found. Maybe you have clicked or entered an invalid
            link.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

// This is a 404 error, which means you've clicked on a bad link or entered an invalid URL. Maybe what you are looking for can be found at Bitly.com. P.S. Bitly links are case sensitive.
