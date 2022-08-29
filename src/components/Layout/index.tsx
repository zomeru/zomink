import React from 'react';

import { Footer, Navbar } from "..";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
