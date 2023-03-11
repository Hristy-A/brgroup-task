import { useEffect } from 'react';

/**
 * Custom hook for refetching data every time interval (default 60 seconds)
 * @param refetchFunc refetch function
 * @param interval interval between refetch calling (in seconds)
 */
export async function useRefetch(refetchFunc: () => void, interval = 60) {
  useEffect(() => {
    const timeout = setInterval(refetchFunc, interval * 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [refetchFunc, interval]);
}
