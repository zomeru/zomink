import { BiLink } from 'react-icons/bi';
import { MdOutlineAnalytics, MdOutlineManageSearch } from 'react-icons/md';
import { BsPeople } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { FaDiscord, FaFacebookSquare } from 'react-icons/fa';

export const APP_NAME = 'Zomink';

export const APP_NAME_LOGO = {
  name: 'Zom',
  domain: 'ink',
};

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

interface IFAQs {
  id: string;
  question: string;
  answer: Array<{
    text: string;
    coloredText?: string;
    link?: string;
  }>;
}

export const FAQs: IFAQs[] = [
  {
    id: 'question#1',
    question: 'What is a Link Shortener?',
    answer: [
      {
        text: 'A link shortener, also known as a URL shortener, seems like a simple tool, but it is a service that can have a dramatic impact on your marketing efforts.',
      },
      {
        text: 'Link shorteners work by transforming any long URL into a shorter, more readable link. When a user clicks the shortened version, they’re automatically forwarded to the destination URL.',
      },
      {
        text: 'Think of a short URL as a more descriptive and memorable nickname for your long webpage address. You can, for example, use a short URL like zom.ink/SomeArticle so people will have a good idea about where your link will lead before they click it.',
        coloredText: 'zom.ink/SomeArticle',
      },
      {
        text: 'If you’re contributing content to the online world, you need a link shortener.',
      },
    ],
  },
  {
    id: 'question#2',
    question: 'Why use a Link Shortener?',
    answer: [
      {
        text: 'How many people can even remember a long web address, especially if it has tons of characters and symbols? A short URL can make your link more memorable. Not only does it allow people to easily recall and share your link with others, it can also dramatically improve traffic to your content.',
      },
      {
        text: 'If you’re a business, you need a link shortener to make sure your links are easy to remember and easy to share with your customers.',
      },
      {
        text: 'If you’re a student, you need a link shortener to make sure your online class room links are easy to remember and easy to share with your classmates.',
      },
      {
        text: `${APP_NAME} is a free link shortener that works for everyone.`,
      },
    ],
  },
  {
    id: 'question#3',
    question: `Features of ${APP_NAME}’s Link Management Platform`,
    answer: [
      {
        text: 'If you’re looking to shorten just a link or two, you can use our link shortener service without registering an account.',
      },
      {
        text: 'But if you’re going to share a lot of links, you’ll need an account to manage all your links. You can edit, delete or even generate a QR code for each link.',
      },
      {
        text: 'Our product is designed to be easy to use and intuitive. With our team management feature, you can create teams and invite members to join them so you can manage your links in a better way.',
      },
    ],
  },
  {
    id: 'question#4',
    question: `Why choose ${APP_NAME}?`,
    answer: [
      {
        text: `${APP_NAME} is a FREE link management platform that works for everyone.`,
      },
      {
        text: 'Create an account to get started for FREE.',
        coloredText: 'Create an account to get started for FREE.',
        link: '/auth/register',
      },
    ],
  },
];

interface IFOOTER {
  title: string;
  links: Array<{
    name: string;
    link: string;
    isNewTab?: boolean;
  }>;
}

export const FOOTER_LINKS: IFOOTER[] = [
  {
    title: APP_NAME,
    links: [
      {
        name: 'About',
        link: '/pages/about',
      },
      {
        name: 'Terms of Service',
        link: '/pages/terms-of-service',
      },
      {
        name: 'Privacy Policy',
        link: '/pages/privacy-policy',
      },
      {
        name: 'Abuse Report',
        link: '/pages/report',
      },
      {
        name: 'Contact',
        link: '/pages/contact',
      },
    ],
  },
  {
    title: 'Features',
    links: [
      {
        name: 'Link Shortener',
        link: '#shortener',
      },
      {
        name: 'Management',
        link: '#features',
      },
      {
        name: 'Analytics',
        link: '#features',
      },
      {
        name: 'Team Features',
        link: '#features',
      },
    ],
  },
  {
    title: 'Open Source',
    links: [
      {
        name: 'Repository',
        link: '/github',
        isNewTab: true,
      },
      {
        name: 'Contribute',
        link: '/github',
        isNewTab: true,
      },
      {
        name: 'Bug Report',
        link: 'https://github.com/zomeru/zomink-client/issues/new',
        isNewTab: true,
      },
      {
        name: 'Feature Request',
        link: 'https://github.com/zomeru/zomink-client/issues/new',
        isNewTab: true,
      },
    ],
  },
];

export const FOOTER_SOCIALS = [
  {
    name: 'Facebook',
    Icon: FaFacebookSquare,
    link: '#',
  },
  {
    name: 'Instagram',
    Icon: AiFillInstagram,
    link: '#',
  },
  {
    name: 'Discord',
    Icon: FaDiscord,
    link: '#',
  },
];
