import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { APP_NAME } from '@/components/constants';

const HERO_IMAGE = '/assets/images/hero_image.png';

const Hero = () => {
  const { push } = useRouter();

  return (
    <section className='padding-sides mt-0 2xl:mt-[35px]'>
      <div className='max-width h-auto'>
        {/* des & img */}
        <div className='relative flex h-[400px] items-center justify-between xl:h-[500px] '>
          <div className='space-y-5 text-primary-500 xl:space-y-8'>
            <h1 className='text-xl'>Link Shortener</h1>
            <h2 className='text-5xl font-extrabold 2xl:text-6xl'>
              Manage your links in an easy way.
            </h2>
            <h3 className='text-infoText'>
              {APP_NAME} is a free and open-source link management platform with
              all the features you need in one place. Manage, track, and shorten
              your links with your custom alias.
            </h3>
            <div className='space-x-3'>
              <button
                type='button'
                className='btn-primary-lg'
                onClick={() => push('/auth/register')}
              >
                Get started
              </button>
              <button
                type='button'
                className='btn-secondary-lg'
                onClick={() => push('#features')}
              >
                Explore features
              </button>
            </div>
          </div>
          <div className='relative h-full w-full'>
            <Image
              src={HERO_IMAGE}
              layout='fill'
              objectFit='contain'
              alt={`${APP_NAME} - Hero Analytics Image`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
