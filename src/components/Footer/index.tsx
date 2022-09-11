import React from 'react';
import Link from 'next/link';

import { APP_NAME, FOOTER_LINKS, FOOTER_SOCIALS } from '../constants';
import Logo from '../Logo';

const Footer = () => {
  return (
    <>
      <footer className='padding-sides my-[60px] sm:my-[80px] '>
        <div className='max-width flex max-w-[1000px] flex-col items-center justify-between space-y-8 sm:flex-row sm:items-start sm:space-y-0'>
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h3 className='mb-2 text-center text-lg font-semibold text-primary-500 sm:text-start'>
                {title}
              </h3>
              <div className='flex flex-col space-y-1'>
                {links.map(({ name, link, isNewTab }) =>
                  isNewTab ? (
                    <a
                      key={name}
                      href={link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='simple-links text-center text-infoText sm:text-start '
                    >
                      {name}
                    </a>
                  ) : (
                    <Link key={name} href={link} passHref>
                      <a className='simple-links text-center text-infoText sm:text-start '>
                        {name}
                      </a>
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
          <div>
            <div className='text-center sm:text-start'>
              <Logo />
            </div>
            <div className='text-infoText'>
              <h1 className='text-center sm:text-start'>
                &copy; 2022 | {APP_NAME}
              </h1>
              <h2 className='text-center sm:text-start'>
                Free Custom Link Shortener
              </h2>
              <h2 className='text-center sm:text-start'>
                Link Management, Link Analytics
              </h2>
              <p className='text-center sm:text-start'>
                All rights reserved.
              </p>
              <div className='flex items-center justify-center space-x-1 sm:justify-start'>
                {FOOTER_SOCIALS.map(({ name, Icon, link }, index) => (
                  <a
                    key={name}
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Icon
                      style={{
                        fontSize: `${index * 4 + 40}px`,
                      }}
                      className='text-infoText transition-all duration-300 ease-in-out hover:text-primary-200'
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='flex h-[40px] w-full items-center justify-center bg-primary-200'>
        <p className='text-sm text-white sm:text-base'>
          Built by{' '}
          <a
            href='https://github.com/zomeru'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-all duration-200 ease-in-out hover:text-neutral-200'
          >
            Zomer Gregorio
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
