import type { NextPage } from 'next';

import { Layout } from '@/components';
import { Hero, ShortenField } from '@/components/_pages/landing';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <ShortenField />
    </Layout>
  );
};

export default Home;
