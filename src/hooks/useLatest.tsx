import { useCallback, useEffect, useRef } from 'react';

export const useLatest = <T, >(t: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = t;
  }, [t]);

  return useCallback(()=> ref.current, []);
};