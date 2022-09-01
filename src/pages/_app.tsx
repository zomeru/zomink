import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';
import axios from 'axios';

import fetcherSSR from '@/utils/fetcherSSR';
import { UserProvider } from '@/contexts/';

import '../styles/globals.css';
import 'nprogress/nprogress.css';
import { GetServerSideProps } from 'next';
import SEO from '../../next-seo-config';

Router.events.on('routeChangeStart', () => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider initialData={pageProps?.data}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const response = await fetcherSSR(
    req,
    res,
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/me
  `
  );

  if (response.status !== 200 || response.data.status !== 200) {
    return { props: { data: null } };
  }

  return { props: { data: response } };
};
