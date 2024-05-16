import { useCallback, useEffect, useRef } from 'react';

export default function useFocusAnimation<T extends HTMLElement>(
  onFocusClassName: string,
  onFocusOutClassName?: string,
  threshold?: number,
  rootMargin?: string,
) {
  const elementRef = useRef<T>(null);

  const handleScroll: IntersectionObserverCallback = useCallback(([entry]) => {
    const { current } = elementRef;
    if (current) {
      if (entry.isIntersecting) {
        onFocusOutClassName && current.classList.remove(onFocusOutClassName);
        current.classList.add(onFocusClassName);
      } else {
        current.classList.remove(onFocusClassName);
        onFocusOutClassName && current.classList.add(onFocusOutClassName);
      }
    }
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    const { current } = elementRef;

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: threshold || 0.1,
        rootMargin: rootMargin || '0px 0px 0px 0px',
      });

      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return elementRef;
}
