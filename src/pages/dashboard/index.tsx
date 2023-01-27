import React from 'react';
import { GetServerSideProps } from 'next';

import { Maintenance } from '@/components';
import fetcher from '@/utils/fetcher';

const App = () => {
  return <Maintenance />;
};

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const accessToken = req.cookies.access;

  const response = await fetcher(`/auth/access/${accessToken}`, 'POST');

  console.log('response dashboard', response);

  if (response.status !== 'success') {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};
