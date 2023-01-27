import { useElementDimensions } from '@/hooks';
import React from 'react';

import { Footer, Navbar } from '..';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const footerRef = React.useRef<HTMLElement>(null);

  const { height } = useElementDimensions(footerRef);

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: `calc(100vh - (100px + ${height}px))`,
        }}
      >
        {children}
      </main>
      <Footer ref={footerRef} />
    </>
  );
};

export default Layout;
