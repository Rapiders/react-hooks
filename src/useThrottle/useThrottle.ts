import { useCallback, useRef } from 'react';

export default function useThrottle(callback: () => void, time: number) {
  const ref = useRef<NodeJS.Timeout | null>(null);

  const throttleFunction = useCallback(() => {
    if (ref.current) return;

    ref.current = setTimeout(() => {
      clearTimeout(ref.current!);
      ref.current = null;
      callback();
    }, time);
  }, [callback]);

  return throttleFunction;
}
