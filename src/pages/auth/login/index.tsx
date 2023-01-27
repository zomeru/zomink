import React from 'react';
import { GetServerSideProps } from 'next';

import { Layout } from '@/components';
import { LoginComponent } from '@/components/_pages/auth';
import fetcher from '@/utils/fetcher';

const Login = () => {
  return (
    <Layout>
      <LoginComponent />
    </Layout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const accessToken = req.cookies.access;

  const response = await fetcher(`/auth/access/${accessToken}`, 'POST');

  console.log('response login', response);

  if (response.status === 'success') {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};
