import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '@/contexts/AuthContext';
import { NAV_LINKS } from '../constants';
import Logo from '../Logo';

const Navbar = () => {
  const { push } = useRouter();
  const { user, logout } = useUser();

  return (
    <header className='padding-sides w-auto'>
      <nav className='max-width  flex h-[100px] w-full items-center justify-between text-primary-500'>
        <Link href='/' passHref>
          <a>
            <Logo />
          </a>
        </Link>
        <div className='hidden items-center space-x-[20px] sm:flex md:space-x-[30px]'>
          {NAV_LINKS.map(({ name, link }) => {
            if (name === 'Log in' && user) {
              return null;
            }
            const newName: string =
              user && name === 'My URLs' ? 'Dashboard' : name;

            if (['github', 'donate'].indexOf(newName.toLowerCase()) > -1) {
              return (
                <a
                  key={newName}
                  className={`links ${
                    newName === 'Donate' &&
                    'after:bg-pink-600 hover:text-pink-600'
                  }`}
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {newName}
                </a>
              );
            }

            return (
              <Link
                href={newName === 'Dashboard' ? '/dashboard' : link}
                passHref
                key={newName}
              >
                <a className='links'>{newName}</a>
              </Link>
            );
          })}
          <button
            type='button'
            className='btn-primary'
            onClick={() => {
              if (user) {
                logout();
              } else {
                push('/auth/register');
              }
            }}
          >
            {user ? 'Log out' : 'Sign up'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

// eslint-disable-next-line no-unused-vars
