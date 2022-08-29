import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NAV_LINKS } from '../constants';
import Logo from '../Logo';

const Navbar = () => {
  const { push } = useRouter();

  return (
    <header className='padding-sides w-auto'>
      <nav className='max-width  flex h-[100px] w-full items-center justify-between text-primary-500'>
        <Link href='/' passHref>
          <a href='/'>
            <Logo />
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
          <button
            type='button'
            className='btn-primary'
            onClick={() => push('/auth/register')}
          >
            Sign up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
