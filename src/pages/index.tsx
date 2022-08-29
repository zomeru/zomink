import type { NextPage } from 'next';

import { Layout } from '@/components';
import {
  Banner,
  FAQ,
  Features,
  Hero,
  ShortenField,
} from '@/components/_pages/landing';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <ShortenField />
      <Features />
      <FAQ />
      <Banner />
    </Layout>
  );
};

export default Home;
