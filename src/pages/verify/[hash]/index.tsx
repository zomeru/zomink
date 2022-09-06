import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import fetcher from '@/utils/fetcher';
import { Layout } from '@/components';

type StatusType = 'verified' | 'already verified' | 'invalid';

const index = ({ status }: { status: StatusType }) => {
  const [requestMade, setRequestMade] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'verified') {
      setMessage(
        'Your email has been verified. You can now access all the features of Zomink.'
      );
    }
    if (status === 'already verified') {
      setMessage('Your email has already been verified');
    }
    if (status === 'invalid') {
      setMessage('Invalid verification link.');
    }

    if (requestMade && !status) {
      setMessage(
        "Something wen't wrong. We are unable to verify your email."
      );
    }

    setTimeout(() => {
      setRequestMade(true);
    }, 3000);
  }, [status, requestMade]);

  return (
    <Layout>
      <div className='flex min-h-[calc(100vh-300px)] items-center justify-center'>
        <h1 className='text-2xl font-semibold'>{message}</h1>
      </div>
    </Layout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { hash } = context.params as { hash: string };
  const { token } = context.query as { token: string };

  const response: any = await fetcher(
    `/users/verify/${hash}/${token}`,
    'POST'
  );

  if (response.status === 'success') {
    return {
      props: {
        status: 'verified',
      },
    };
  }

  if (response.message.toLowerCase() === 'already verified') {
    return {
      props: {
        status: 'already verified',
      },
    };
  }

  return {
    props: {
      status: 'invalid',
    },
  };
};
