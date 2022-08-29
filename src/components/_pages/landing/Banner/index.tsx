import React from 'react';

const Banner = () => {
  return (
    <section className='padding-sides my-[80px]  bg-primary-200'>
      <div className='max-width space-y-5 py-[50px]'>
        <h2 className='sc-heading text-white'>
          More than just a free link shortener
        </h2>
        <div className='flex justify-center'>
          <button type='button' className='btn-white-lg'>
            Sign up for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
