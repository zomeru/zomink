import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import fetcher from '@/utils/fetcher';

const Alias = ({ link }: { link: string }) => {
  const { push } = useRouter();

  useEffect(() => {
    let isMounted = true;

    if (link !== 'not found') push(link);
    if (isMounted && link === 'not found') {
      push('/404');
    }

    const timer = setTimeout(() => {
      push('/404');
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [link]);

  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { alias } = context.params as { alias: string };

  if (alias === 'sw.js') return { props: {} };

  const userAgent = req.headers['user-agent']?.toString() || '';

  const response: {
    status: string;
    data: {
      url: any;
    };
  } = await fetcher(
    `/${alias}/${encodeURIComponent(userAgent)}/urls`,
    'GET'
  );

  if (response.status === 'success') {
    return {
      props: {
        link: response.data.url.link,
      },
      redirect: {
        destination: response.data.url.link,
        statusCode: 301,
      },
    };
  }
  return {
    props: {
      link: 'not found',
    },
  };
};

export default Alias;
