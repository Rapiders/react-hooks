import { useEffect, useRef } from 'react';

export default function useAfterMountEffect(func: React.EffectCallback, deps: React.DependencyList) {
  const afterMount = useRef(false);

  useEffect(() => {
    if (afterMount.current) func();
    else afterMount.current = true;
  }, deps);

  return useAfterMountEffect;
}
