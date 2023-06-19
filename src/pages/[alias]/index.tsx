import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { DefaultSeo } from 'next-seo';

import fetcher from '@/utils/fetcher';
import NotFound from '../404';
import SEO from '../../../next-seo-config';

type MetaData = {
  title: string;
  description: string;
  domain: string;
  images: string[];
  duration: number;
  url: string;
};

const Alias = ({ metaData }: { metaData: MetaData }) => {
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotFound(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (notFound) {
    return (
      <>
        <DefaultSeo {...SEO} />
        <NotFound />
      </>
    );
  }

  return (
    <>
      {metaData && (
        <DefaultSeo
          title={metaData.title}
          description={metaData.description}
          openGraph={{
            url: metaData.url,
            type: 'website',
            title: metaData.title,
            description: metaData.description,
            images: metaData.images.map((image) => ({
              url: image,
              alt: metaData.title,
            })),
            site_name: metaData.domain,
          }}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { alias } = context.params as { alias: string };

  if (alias === 'sw.js') return { props: {} };

  const userAgent = req.headers['user-agent']?.toString() || '';

  console.log('userAgent', encodeURIComponent(userAgent));

  const response: {
    status: string;
    data: {
      url: any;
    };
  } = await fetcher(
    `/${alias}/${encodeURIComponent(userAgent)}/urls`,
    'GET'
  );

  console.log('response', response);

  if (response.status === 'success') {
    const metaResponse = await fetch(
      `https://jsonlink.io/api/extract?url=${response.data.url.link}`
    );
    const metaData = await metaResponse.json();

    console.log('metaData', metaData);

    return {
      props: {
        metaData,
      },
      redirect: {
        destination: response.data.url.link,
        statusCode: 301,
      },
    };
  }
  return {
    props: {},
  };
};

export default Alias;
