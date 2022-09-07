import React from 'react';
import { useRouter } from 'next/router';

const Banner = () => {
  const { push } = useRouter();

  return (
    <section className='padding-sides my-[80px] bg-primary-200'>
      <div className='max-width space-y-5 py-[50px]'>
        <h2 className='sc-heading text-white'>
          More than just a free link shortener
        </h2>
        <div className='flex justify-center'>
          <button
            type='button'
            className='btn-white-lg'
            onClick={() => push('/auth/register')}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
