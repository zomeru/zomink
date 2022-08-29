import React from 'react';
import { useRouter } from 'next/router';

import { FEATURES } from '@/components/constants';

const Features = () => {
  const { push } = useRouter();

  return (
    <section id='features' className='padding-sides mt-[80px]'>
      <div className='max-width'>
        <h2 className='sc-heading'>Manage, analyze, and shorten your links.</h2>
        <p className='mt-2 text-center text-infoText'>
          Don’t let the links limit you. With all these features, you can manage
          your links like a pro.
        </p>
        <div className='max-width my-[50px] grid w-full max-w-[700px] grid-cols-2 place-items-center gap-y-[50px] 2xl:max-w-[1300px] 2xl:grid-cols-4 2xl:gap-x-[50px]'>
          {FEATURES.map(({ title, description, Icon }) => (
            <div
              key={title}
              className='h-[300px] w-[300px] space-y-2 rounded-xl border border-neutral-400 p-4 text-center'
            >
              <Icon className='mx-auto text-5xl text-primary-200' />
              <h3 className='text-2xl font-medium'>{title}</h3>
              <p className='text-infoText'>{description}</p>
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
