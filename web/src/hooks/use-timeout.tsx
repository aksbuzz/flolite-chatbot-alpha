import { useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return
    }
    
    const id = setTimeout(() => {
      callbackRef.current?.();
    }, delay);
    
    return () => {
      clearTimeout(id);
    };
  }, [delay]);
}
