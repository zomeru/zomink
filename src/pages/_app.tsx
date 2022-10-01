import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';

import { UserProvider } from '@/contexts/';
import * as gtag from '@/utils/gtag';
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
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (process.env.NODE_ENV === 'production') gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <UserProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
