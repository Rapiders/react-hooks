import { ReactNode, useRef, useState } from 'react';
import React from 'react';

export function useCarousel(dataLength: number, startIndex = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(startIndex);

  const getSliderWidth = () => {
    if (ref.current) {
      return ref.current.clientWidth;
    }
    return window.innerWidth;
  };

  const next = () => setIndex((prev) => (prev < dataLength ? prev + 1 : prev));
  const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));

  const style = {
    transform: `translateX(${-index * getSliderWidth()}px)`,
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
    display: 'flex',
  };

  const CarouselWrapper = ({ children }: { children: ReactNode }) => {
    <div
      style={{
        overflow: 'hidden',
      }}
    >
      <div ref={ref} style={style}>
        {children}
      </div>
    </div>;
  };

  return {
    CarouselWrapper,
    index,
    next,
    prev,
  };
}
