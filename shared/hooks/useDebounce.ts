import { useCallback, useEffect, useRef } from 'react';

function useDebounce(callback: (...args: any[]) => void, delay = 500) {
  const handler = useRef<number | null>(null);

  const debounceCallback = useCallback(
    (...args: any[]) => {
      if (handler.current) clearTimeout(handler.current);
      handler.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, []);

  return debounceCallback;
}
export default useDebounce;
