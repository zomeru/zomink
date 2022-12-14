import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import fetcher from '@/utils/fetcher';
import { Maintenance } from '@/components';

const Alias = ({ link }: { link: string }) => {
  const [requestMade, setRequestMade] = React.useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (link !== 'not found') push(link);
    if (link === 'not found') setRequestMade(true);

    setTimeout(() => {
      setRequestMade(true);
    }, 5000);
  }, [link]);

  if (requestMade || link === 'not found') {
    return (
      <Maintenance>
        <h1 className='mb-4 text-2xl font-medium'>
          Unable to find URL to redirect to
        </h1>
      </Maintenance>
    );
  }

  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { alias } = context.params as { alias: string };

  const userAgent = req.headers['user-agent'] as string;

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
        url: response.data.url.link,
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
