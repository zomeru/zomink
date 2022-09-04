import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import fetcher from '@/utils/fetcher';
import { Maintenance } from '@/components';

const Alias = ({ link }: { link: string }) => {
  const [requestMade, setRequestMade] = React.useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (link) push(link);

    setTimeout(() => {
      setRequestMade(true);
    }, 3500);
  }, [link]);

  if (requestMade) {
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
  const { alias } = context.params as { alias: string };

  const response: {
    status: string;
    link: string;
  } = await fetcher(`/${alias}/urls`, 'GET');

  if (response.status === 'success') {
    return {
      props: {
        link: response.link,
      },
      redirect: {
        destination: response.link,
        statusCode: 301,
      },
    };
  }

  return {
    props: {
      link: null,
    },
  };
};

export default Alias;
