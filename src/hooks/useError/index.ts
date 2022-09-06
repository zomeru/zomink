import { useEffect, useState } from 'react';

const useError = (dependencies?: Array<any>) => {
  const [error, setError] = useState<string | null | undefined>();

  useEffect(() => {
    let timeout: any;

    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error, ...[dependencies]]);

  return [error, setError] as const;
};

export default useError;
