import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '@/contexts/AuthContext';
import { NAV_LINKS } from '../constants';
import Logo from '../Logo';

const Navbar = () => {
  const { push } = useRouter();
  const { data, logout } = useUser();

  return (
    <header className='padding-sides w-auto'>
      <nav className='max-width  flex h-[100px] w-full items-center justify-between text-primary-500'>
        <Link href='/' passHref>
          <Logo />
        </Link>
        <div className='flex items-center space-x-[30px]'>
          {NAV_LINKS.map(({ name, link }) => {
            if (name === 'Log in' && data?.user) {
              return null;
            }
            const newName = data?.user && name === 'My URLs' ? 'App' : name;

            return (
              <Link
                href={newName === 'App' ? '/app' : link}
                passHref
                key={newName}
              >
                <a
                  className={`links ${
                    newName === 'Donate' &&
                    'after:bg-pink-600 hover:text-pink-600'
                  }`}
                >
                  {newName}
                </a>
              </Link>
            );
          })}
          <button
            type='button'
            className='btn-primary'
            onClick={() => {
              if (data?.user) {
                logout();
              } else {
                push('/auth/register');
              }
            }}
          >
            {data?.user ? 'Log out' : 'Sign up'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
