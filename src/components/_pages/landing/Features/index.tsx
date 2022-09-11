import React from 'react';
import { useRouter } from 'next/router';

import { FEATURES } from '@/components/constants';

const Features = () => {
  const { push } = useRouter();

  return (
    <section
      id='features'
      className='padding-sides mt-[60px] sm:mt-[80px]'
    >
      <div className='max-width'>
        <h2 className='sc-heading'>
          Manage, analyze, and shorten your links.
        </h2>
        <p className='mt-2 text-center text-sm text-infoText sm:text-base'>
          Don’t let the links limit you. With all these features, you can
          manage your links like a pro.
        </p>
        <div className='max-width my-[40px] grid w-full max-w-[700px] grid-cols-1 place-items-center gap-y-[20px] sm:my-[50px] sm:grid-cols-2 sm:gap-y-[50px] 2xl:max-w-[1300px] 2xl:grid-cols-4 2xl:gap-x-[50px]'>
          {FEATURES.map(({ title, description, Icon }) => (
            <div
              key={title}
              className='h-[260px] w-[260px] space-y-2 rounded-xl border border-neutral-400 p-4 text-center sm:h-[300px] sm:w-[300px]'
            >
              <Icon className='mx-auto text-4xl text-primary-200 sm:text-5xl' />
              <h3 className='text-xl font-medium sm:text-2xl'>{title}</h3>
              <p className='text-sm text-infoText sm:text-base'>
                {description}
              </p>
            </div>
          ))}
        </div>
        <div className='flex w-full justify-center'>
          <button
            type='button'
            className='btn-primary-lg'
            onClick={() => push('/auth/register')}
          >
            Get started for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
