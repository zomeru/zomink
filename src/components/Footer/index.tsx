import React from 'react';
import Link from 'next/link';

import { APP_NAME, FOOTER_LINKS, FOOTER_SOCIALS } from '../constants';

const Footer = () => {
  return (
    <footer className='padding-sides my-[80px] '>
      <div className='max-width flex max-w-[1000px] justify-between'>
        {FOOTER_LINKS.map(({ title, links }) => (
          <div key={title}>
            <h3 className='mb-2 text-lg font-semibold text-primary-500'>
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
                    className='simple-links text-infoText '
                  >
                    {name}
                  </a>
                ) : (
                  <Link key={name} href={link} passHref>
                    <a className='simple-links text-infoText '>{name}</a>
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
        <div>
          <div className='text-4xl font-black uppercase text-primary-200'>
            {APP_NAME}
          </div>
          <div className='text-infoText'>
            <h1>&copy; 2022 | {APP_NAME}</h1>
            <h2>Free Custom Link Shortener</h2>
            <h2>Link Management, Link Analytics</h2>
            <p>All rights reserved.</p>
            <div className='flex items-center space-x-1'>
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
                    className="text-infoText transition-all duration-300 ease-in-out hover:text-primary-200"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
