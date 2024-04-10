import { useCallback, useEffect, useRef } from 'react';
import useAnimation from './useAnimation';

export default function useFocusAnimation<T extends HTMLElement>(
  onFocusClassName: string,
  onFocusOutClassName?: string,
  threshold?: number
) {
  const elementRef = useRef<T>(null);
  const { animationClassName, triggerUnmountAnimation } = useAnimation(
    onFocusClassName,
    onFocusOutClassName||''
  );

  const handleScroll: IntersectionObserverCallback = useCallback(([entry]) => {
    const { current } = elementRef;
    if (current) {
      if (entry.isIntersecting) {
        if (animationClassName)
          return current.classList.add(animationClassName);
        triggerUnmountAnimation();
      }
    }
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    const { current } = elementRef;

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: threshold || 0.1,
      });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return elementRef;
}
