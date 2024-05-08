import React, {
  CSSProperties,
  ForwardedRef,
  ReactElement,
  cloneElement,
  forwardRef,
  useEffect,
} from 'react';
import { useRef, useState, Children, ReactNode } from 'react';

export function _useDragIndexCarousel(
  pageLimit: number,
  minMove = 60,
  startIndex = 0
) {
  const [isMouseDown, setMouseDown] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [transX, setTransX] = useState(0);
  const [index, setIndex] = useState(startIndex);
  const ref = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleScrollStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setTouchStartX(e.pageX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const moveWidth = e.touches[0].clientX - touchStartX;
    setTransX(moveWidth);
  };

  const handleScrollMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      const moveWidth = e.pageX - touchStartX;
      setTransX(moveWidth);
    }
  };

  const getSliderWidth = () => {
    if (ref.current) {
      return ref.current.clientWidth;
    }
    return window.innerWidth;
  };

  const handleMoveEnd = () => {
    setMouseDown(false);
    const limitPage = pageLimit;
    if (transX > minMove) {
      setIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (transX < -minMove) {
      setIndex((prev) => (prev < limitPage ? prev + 1 : prev));
    }
    setTransX(0);
    setTouchStartX(0);
  };

  const getNext = (index: number) => {
    if (index < pageLimit - 1) return index + 1;
    return index;
  };

  const getPrev = (index: number) => {
    if (index > 0) return index - 1;
    return index;
  };

  const next = () => setIndex((prev) => getNext(prev));
  const prev = () => setIndex((prev) => getPrev(prev));

  useEffect(() => {
    if (ref.current) {
      ref.current.style.display = 'flex';
      ref.current.style.transform = `translateX(${-index * getSliderWidth() + transX}px)`;
      ref.current.style.transitionDuration = '300ms';
      ref.current.style.transitionTimingFunction = 'ease-out';
    }
  }, [transX]);

  return {
    ref,
    isEnd: index === pageLimit,
    isStart: index === 0,
    handleTouchStart,
    handleTouchMove,
    handleMoveEnd,
    handleScrollStart,
    handleScrollMove,
    next,
    prev,
    index,
  };
}

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

export default function useDragIndexCarousel(
  dataLength: number,
  startIndex = 0,
  minMove = 60
) {
  const {
    index,
    ref,
    handleTouchStart,
    handleTouchMove,
    handleMoveEnd,
    handleScrollStart,
    handleScrollMove,
    next,
    prev,
    isEnd,
    isStart,
  } = _useDragIndexCarousel(dataLength - 1, minMove, startIndex);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('touchstart', handleTouchStart as any);
      ref.current.addEventListener('touchmove', handleTouchMove as any);
      ref.current.addEventListener('touchend', handleMoveEnd as any);
      ref.current.addEventListener('mousedown', handleScrollStart as any);
      ref.current.addEventListener('mouseleave', handleMoveEnd as any);
      ref.current.addEventListener('mousemove', handleScrollMove as any);
      ref.current.addEventListener('mouseup', handleMoveEnd as any);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('touchstart', handleTouchStart as any);
        ref.current.removeEventListener('touchmove', handleTouchMove as any);
        ref.current.removeEventListener('touchend', handleMoveEnd as any);
        ref.current.removeEventListener('mousedown', handleScrollStart as any);
        ref.current.removeEventListener('mouseleave', handleMoveEnd as any);
        ref.current.removeEventListener('mousemove', handleScrollMove as any);
        ref.current.removeEventListener('mouseup', handleMoveEnd as any);
      }
    };
  });

  return { CarouselWrapper, index, ref, next, prev, isStart, isEnd };
}
