import { useEffect, useState } from 'react';

import { URLDocument } from '@/types/url';
import fetcher from '@/utils/fetcher';
import { ResponseDocument } from '@/types/response';
import { UserDocument } from '@/types/user';

export const LOCAL_LINKS_KEY = 'localLinks';

const useShortenURLs = (user: UserDocument | undefined) => {
  const [shortenedURLs, setShortenedURLs] = useState<Array<URLDocument>>(
    []
  );

  useEffect(() => {
    async function getUrls() {
      if (user) {
        // localStorage.removeItem(LOCAL_LINKS_KEY);

        const response: ResponseDocument = await fetcher(
          '/urls/user',
          'GET'
        );
        if (response.status === 'success') {
          setShortenedURLs(response.data?.urlData as Array<URLDocument>);
        }
      } else {
        const localLinks = localStorage.getItem(LOCAL_LINKS_KEY);

        if (localLinks) {
          setShortenedURLs(JSON.parse(localLinks));
        }
      }
    }

    getUrls();
  }, [user]);

  return { shortenedURLs, setShortenedURLs } as const;
};

export default useShortenURLs;
