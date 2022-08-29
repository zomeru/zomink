import React from 'react';
import Link from 'next/link';

import { APP_NAME } from '@/constants/app';
import { NAV_LINKS } from '@/constants/navbar';

const Navbar = () => {
  return (
    <header className=' w-auto px-[50px]'>
      <nav className='max-width mx-auto flex h-[100px] w-full items-center justify-between text-primary-500'>
        <Link href='/' passHref>
          <a href='/'>
            <h1 className='text-4xl font-black uppercase text-primary-200'>
              {APP_NAME}
            </h1>
          </a>
        </Link>
        <div className='flex items-center space-x-[30px]'>
          {NAV_LINKS.map(({ name, link }) => {
            return (
              <Link href={link} passHref key={name}>
                <a
                  className={`links ${
                    name === 'Donate' && 'after:bg-pink-600 hover:text-pink-600'
                  }`}
                >
                  {name}
                </a>
              </Link>
            );
          })}
          <button type='button' className='btn-primary'>
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
