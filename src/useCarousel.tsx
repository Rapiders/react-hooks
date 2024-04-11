import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useRef,
  useState,
} from 'react';

const CarouselWrapper = forwardRef(
  (
    { children, style }: { children: ReactNode; style: React.CSSProperties },
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div style={{ overflow: 'hidden' }}>
      <div ref={ref} style={style}>
        {children}
      </div>
    </div>
  )
);

export function useCarousel(dataLength: number, startIndex = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(startIndex);

  const getSliderWidth = () => {
    if (ref.current) {
      return ref.current.clientWidth;
    }
    return window.innerWidth;
  };

  const next = () => setIndex((prev) => (prev < dataLength - 1 ? prev + 1 : 0));
  const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : dataLength));

  const style = {
    transform: `translateX(${-index * getSliderWidth()}px)`,
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
    display: 'flex',
  };

  return {
    CarouselWrapper,
    style,
    ref,
    index,
    next,
    prev,
  };
}
