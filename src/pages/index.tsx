import type { NextPage } from 'next';

import { Layout } from '@/components';
import { Features, Hero, ShortenField } from '@/components/_pages/landing';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <ShortenField />
      <Features />
    </Layout>
  );
};

export default Home;
