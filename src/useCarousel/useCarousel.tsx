import React, {
  Children,
  ForwardedRef,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

const CarouselWrapper = forwardRef(
  (
    {
      children,
      style,
      className,
    }: { children: ReactNode; style?: React.CSSProperties; className?: string },
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div style={{ overflow: 'hidden', ...style }} className={className}>
      <div ref={ref} style={{ height: '100%', width: '100%' }}>
        {Children.map(children, (child: ReactElement) =>
          cloneElement(child, {
            style: { ...child.props.style, flexShrink: 0 },
          })
        )}
      </div>
    </div>
  )
);

interface useCarouselOptions {
  startIndex?: number;
  infinity?: boolean;
}

export default function useCarousel(
  dataLength: number,
  options?: useCarouselOptions
) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(options?.startIndex || 0);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateX(${-index * getSliderWidth()}px)`;
      ref.current.style.transitionDuration = '300ms';
      ref.current.style.transitionTimingFunction = 'ease-out';
      ref.current.style.display = 'flex';
    }
  }, [index]);

  const getSliderWidth = () => {
    if (ref.current) {
      return ref.current.clientWidth;
    }
    return window.innerWidth;
  };

  const getNext = (index: number) => {
    if (index < dataLength - 1) return index + 1;
    if (options?.infinity) return 0;
    return index;
  };

  const getPrev = (index: number) => {
    if (index > 0) return index - 1;
    if (options?.infinity) return dataLength - 1;
    return index;
  };

  const next = () => setIndex((prev) => getNext(prev));
  const prev = () => setIndex((prev) => getPrev(prev));

  return {
    isEnd: index === dataLength - 1,
    isStart: index === 0,
    CarouselWrapper,
    ref,
    index,
    next,
    prev,
  };
}
