import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';

import { UserProvider } from '@/contexts/';
import SEO from '../../next-seo-config';

import 'nprogress/nprogress.css';
import '../styles/globals.css';

Router.events.on('routeChangeStart', () => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
