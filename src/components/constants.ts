import { BiLink } from 'react-icons/bi';
import { MdOutlineAnalytics, MdOutlineManageSearch } from 'react-icons/md';
import { BsPeople } from 'react-icons/bs';

export const APP_NAME = 'Zomy';

export const NAV_LINKS = [
  {
    name: 'My URLs',
    link: '/my-urls',
  },
  {
    name: 'Features',
    link: '#features',
  },
  {
    name: 'GitHub',
    link: '/github',
  },
  {
    name: 'Donate',
    link: 'https://ko-fi.com/zomeru',
  },
  {
    name: 'Log in',
    link: '/auth/login',
  },
];

export const FEATURES = [
  {
    title: 'Link Shortener',
    description:
      'Free custom link shortener with many features that gives you better quality for links shortening. Shortened links will never expire. We do not display ads during direct redirecting to the original url.',
    Icon: BiLink,
  },
  {
    title: 'Link Analytics',
    description:
      'Track each shortened link and measure its performance to understand it. Detailed analytics provides you info about clicks, browsers, systems, geo location.',
    Icon: MdOutlineAnalytics,
  },
  {
    title: 'Link Management',
    description:
      'Optimize and customize each short URL to take advantage of its potential. Set your custom alias (name), use it in affiliate programs, get QR code for printing flyers and much more.',
    Icon: MdOutlineManageSearch,
  },
  {
    title: 'Team Features',
    description:
      'Create your own teams and invite members to join them. Organize your work in a better and more efficient way. Shorten, manage and analyze links with your own teams.',
    Icon: BsPeople,
  },
];
