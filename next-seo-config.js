import { APP_NAME } from '@/components/constants';

const description = `${APP_NAME} is a free and open-source link management platform with all the features you need in one place. Manage, track, and shorten your links with your custom alias.`;

const imgUrl = ''; // TODO: add image

export default {
  title: `${APP_NAME} - Free Link Shortener`,
  description,
  openGraph: {
    type: 'website',
    url: 'https://zom.ink',
    title: `${APP_NAME} - Free Link Shortener`,
    description,
    images: [
      {
        url: imgUrl,
        width: 1400,
        height: 800,
        alt: `${APP_NAME} - Free Link Shortener`,
        type: 'image/png',
      },
    ],
    site_name: `${APP_NAME} - Free Link Shortener`,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/x-icon',
    },
    {
      rel: 'apple-touch-icon',
      href: '/icons/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'initial-scale=1, viewport-fit=cover, user-scalable=no',
    },
  ],
};
