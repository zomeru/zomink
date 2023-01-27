// maintenance page
import React from 'react';
import Link from 'next/link';

const Maintenance = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {children}
      <h1 className='text-4xl font-bold'>Maintenance</h1>
      <p className='text-xl'>This page is currently in development.</p>
      <Link href='/'>
        <div className='py-2 px-3 text-primary-300'>
          Go back to home page.
        </div>
      </Link>
    </div>
  );
};

export default Maintenance;
