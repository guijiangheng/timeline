import { useCallback, useLayoutEffect, useRef } from 'react';

export const useEventCallback = <T extends (...args: any) => any>(fn: T) => {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => ref.current(...args),
    [],
  );
};
