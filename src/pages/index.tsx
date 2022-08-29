import type { NextPage } from 'next';

import { Layout } from '@/components';
import { FAQ, Features, Hero, ShortenField } from '@/components/_pages/landing';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <ShortenField />
      <Features />
      <FAQ />
    </Layout>
  );
};

export default Home;
