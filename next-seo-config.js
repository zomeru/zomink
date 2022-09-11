import {
  APP_DESCRIPTION,
  APP_TITLE,
  APP_URL,
} from '@/components/constants';

const imgUrl = `https://zom.ink/assets/images/app_image.png`;

export default {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    type: 'website',
    url: APP_URL,
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: imgUrl,
        width: 1600,
        height: 800,
        alt: APP_TITLE,
        type: 'image/png',
      },
    ],
    site_name: APP_TITLE,
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
