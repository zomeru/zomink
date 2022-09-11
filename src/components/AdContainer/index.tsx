import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}
/* eslint-enable no-unused-vars */

const AdContainer = ({ slot }: { slot: string }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (process.env.NODE_ENV === 'production') {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <div>
      <ins
        className='adsbygoogle block'
        data-ad-client='ca-pub-4274133898976040'
        data-ad-slot={slot}
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
    </div>
  );
};

export default AdContainer;
