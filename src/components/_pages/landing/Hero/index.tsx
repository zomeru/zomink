import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { APP_DESCRIPTION, APP_NAME } from '@/components/constants';

const HERO_IMAGE = '/assets/images/hero_image.png';

const Hero = () => {
  const { push } = useRouter();

  return (
    <section className='padding-sides mt-0 2xl:mt-[35px]'>
      <div className='max-width h-auto'>
        {/* des & img */}
        <div className='relative flex h-[350px] items-center justify-between sm:h-[400px] xl:h-[500px] '>
          <div className='space-y-3 text-primary-500 sm:space-y-5 xl:space-y-8'>
            <h1 className='text-lg sm:text-xl'>Link Shortener</h1>
            <h2 className='text-3xl font-extrabold sm:text-4xl lg:text-5xl 2xl:text-6xl'>
              Manage your links in an easy way.
            </h2>
            <h3 className='text-sm text-infoText sm:text-base'>
              {APP_DESCRIPTION}
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
          <div className='relative hidden h-full w-full md:block'>
            <Image
              placeholder='blur'
              src={HERO_IMAGE}
              layout='fill'
              objectFit='contain'
              alt={`${APP_NAME} - Hero Analytics Image`}
              blurDataURL={HERO_IMAGE}
              quality={50}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
