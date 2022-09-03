import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/router';

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
  const { link } = await fetcher<{
    link: string;
  }>(`/urls/${alias}`);

  if (!link) {
    return {
      props: {},
    };
  }

  return {
    props: {
      link,
    },
    redirect: {
      destination: link,
      statusCode: 301,
    },
  };
};

export default Alias;
