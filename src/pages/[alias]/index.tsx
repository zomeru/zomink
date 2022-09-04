import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import fetcher from '@/utils/fetcher';

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
    return <div>Unable to find URL to redirect to.</div>;
  }

  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { alias } = context.params as { alias: string };

  const response: {
    status: string;
    link: string;
  } = await fetcher(`/urls/${alias}`, 'GET');

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
