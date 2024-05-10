import { useEffect, useRef, useState } from 'react';

export default function useInterval(callback: () => void, delay: number) {
  const [timer, setTimer] = useState(true);

  const stop = () => setTimer(false);
  const continueTimer = () => setTimer(true);

  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => {
      if (timer) savedCallback.current();
    };
    const timerId = setInterval(tick, delay);
    return () => clearInterval(timerId);
  }, [delay, timer]);

  return { stop, continueTimer };
}
