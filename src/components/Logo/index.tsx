import React from 'react';

import { APP_NAME_LOGO } from '../constants';

const Logo = () => {
  return (
    <h1 className='font-black uppercase text-primary-200'>
      <span className='text-4xl'>{APP_NAME_LOGO.name}</span>
      <span className='text-2xl'>{APP_NAME_LOGO.domain}</span>
    </h1>
  );
};

export default Logo;
