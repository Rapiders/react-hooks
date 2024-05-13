import React, {
  ForwardedRef,
  ReactElement,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
  Children,
  ReactNode,
} from 'react';

interface useDragIndexCarouselOptions {
  minMove?: number;
  startIndex?: number;
  infinity?: boolean;
}

export function _useDragIndexCarousel(
  pageLimit: number,
  minMove = 60,
  startIndex = 0,
  infinity = false
) {
  const [isMouseDown, setMouseDown] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [transX, setTransX] = useState(0);
  const [index, setIndex] = useState(startIndex);
  const ref = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleScrollStart = (e: MouseEvent) => {
    setMouseDown(true);
    setTouchStartX(e.pageX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const moveWidth = e.touches[0].clientX - touchStartX;
    setTransX(moveWidth);
  };

  const handleScrollMove = (e: MouseEvent) => {
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
    if (transX > minMove) setIndex((prev) => getPrev(prev));
    else if (transX < -minMove) setIndex((prev) => getNext(prev));

    setTransX(0);
    setTouchStartX(0);
  };

  const getNext = (index: number) => {
    if (index < pageLimit) return index + 1;
    return index;
  };

  const getPrev = (index: number) => {
    if (index > 0) return index - 1;
    return index;
  };

  const next = () => setIndex((prev) => getNext(prev));
  const prev = () => setIndex((prev) => getPrev(prev));

  const reconcileIndex = () => {
    const resetToFirstPage = () => {
      if (ref.current) {
        ref.current.style.transition = 'none';
        ref.current.style.transform = `translateX(${-getSliderWidth()}px)`;
        setIndex(1);
        ref.current.removeEventListener('transitionend', resetToFirstPage);
      }
    };
    const resetToLastPage = () => {
      if (ref.current) {
        ref.current!.style.transition = 'none';
        ref.current!.style.transform = `translateX(${-(pageLimit - 1) * getSliderWidth()}px)`;
        setIndex(pageLimit - 1);
        ref.current!.removeEventListener('transitionend', resetToLastPage);
      }
    };

    if (index === pageLimit && ref.current)
      ref.current.addEventListener('transitionend', resetToFirstPage);

    if (index === 0 && ref.current)
      ref.current.addEventListener('transitionend', resetToLastPage);
  };

  // initialize index with infinity options
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transition = 'none';
      ref.current.style.transform = `translateX(${-index * getSliderWidth() + transX}px)`;
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transition = 'all';
      ref.current.style.display = 'flex';
      ref.current.style.transform = `translateX(${-index * getSliderWidth() + transX}px)`;
      ref.current.style.transitionDuration = '300ms';
      ref.current.style.transitionTimingFunction = 'ease-out';
    }
    if (infinity) reconcileIndex();
  }, [transX, index]);

  return {
    isDragging: transX !== 0,
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
  options?: useDragIndexCarouselOptions
) {
  const getStartIndex = () => {
    if (!options) return 0;
    if (options.infinity) return (options.startIndex || 0) + 1;
    return options.startIndex || 0;
  };
  const minMove = options?.minMove || 60;
  const startIndex = getStartIndex();
  const infinity = options?.infinity || false;
  const realDataLength = infinity ? dataLength + 1 : dataLength - 1;

  const {
    isDragging,
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
  } = _useDragIndexCarousel(realDataLength, minMove, startIndex, infinity);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('touchstart', handleTouchStart);
      ref.current.addEventListener('touchmove', handleTouchMove);
      ref.current.addEventListener('touchend', handleMoveEnd);
      ref.current.addEventListener('mousedown', handleScrollStart);
      ref.current.addEventListener('mouseleave', handleMoveEnd);
      ref.current.addEventListener('mousemove', handleScrollMove);
      ref.current.addEventListener('mouseup', handleMoveEnd);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('touchstart', handleTouchStart);
        ref.current.removeEventListener('touchmove', handleTouchMove);
        ref.current.removeEventListener('touchend', handleMoveEnd);
        ref.current.removeEventListener('mousedown', handleScrollStart);
        ref.current.removeEventListener('mouseleave', handleMoveEnd);
        ref.current.removeEventListener('mousemove', handleScrollMove);
        ref.current.removeEventListener('mouseup', handleMoveEnd);
      }
    };
  });

  // when Infinity options
  useEffect(() => {
    if (infinity && ref.current) {
      if (ref.current.lastElementChild && ref.current.firstElementChild) {
        const lastElement = ref.current.lastElementChild;
        const firstElement = ref.current.firstElementChild;
        ref.current.insertBefore(
          lastElement.cloneNode(true),
          ref.current.firstElementChild
        );
        ref.current.appendChild(firstElement.cloneNode(true));
      }
    }
  }, []);

  const getDisplayIndex = () => {
    if (infinity) {
      const displayIndex = index - 1;
      if (displayIndex > dataLength - 1) return dataLength - 1;
      if (displayIndex < 0) return 0;
      return displayIndex;
    }
    return index;
  };

  return {
    isDragging,
    CarouselWrapper,
    index: getDisplayIndex(),
    ref,
    next,
    prev,
    isStart,
    isEnd,
  };
}
