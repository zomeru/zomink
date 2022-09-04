// maintenance page
import React from 'react';

const Maintenance = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {children}
      <h1 className='text-4xl font-bold'>Maintenance</h1>
      <p className='text-xl'>This page is currently in development.</p>
    </div>
  );
};

export default Maintenance;
