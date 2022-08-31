import React from 'react';

import { Footer, Navbar } from '..';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='min-h-[calc(100vh - 100px)]'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
