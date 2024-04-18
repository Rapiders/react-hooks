import React, { CSSProperties, ReactElement, cloneElement } from 'react';
import { useRef, useState, Children, ReactNode } from 'react';
import { createContext, useContext } from 'react';

export const CarouselIndex = createContext<number | null>(null);

export const useDragCarouselIndex = () => {
  const result = useContext(CarouselIndex);
  if (result) return result;
  throw new Error(
    'Check the provider: You have to use CarouselIndex in IndexCarouselProvider children'
  );
};

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

  const style = {
    display: 'flex',
    transform: `translateX(${-index * getSliderWidth() + transX}px)`,
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-out',
  };

  return {
    style,
    ref,
    handleTouchStart,
    handleTouchMove,
    handleMoveEnd,
    handleScrollStart,
    handleScrollMove,
    index,
  };
}

function DragIndexCarousel({
  startIndex,
  minMove,
  style,
  className,
  children,
}: {
  startIndex: number;
  minMove?: number;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}) {
  const pageLimit = Children.count(children) - 1;
  const {
    index,
    ref,
    style: dragStyle,
    handleTouchStart,
    handleTouchMove,
    handleMoveEnd,
    handleScrollStart,
    handleScrollMove,
  } = _useDragIndexCarousel(pageLimit, minMove, startIndex);

  return (
    <div
      style={{
        overflow: 'hidden',
        ...style,
      }}
      className={className}
      draggable={false}
    >
      <div
        ref={ref}
        style={{ ...dragStyle, height: '100%', width: '100%' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMoveEnd}
        onMouseDown={handleScrollStart}
        onMouseMove={handleScrollMove}
        onMouseUp={handleMoveEnd}
        onMouseLeave={handleMoveEnd}
      >
        <CarouselIndex.Provider value={index}>
          {children}
        </CarouselIndex.Provider>
      </div>
    </div>
  );
}

export default function useDragIndexCarousel(startIndex = 0, minMove = 60) {
  const component = ({
    children,
    className,
    style,
  }: {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
  }) => {
    return (
      <DragIndexCarousel
        startIndex={startIndex}
        minMove={minMove}
        style={style}
        className={className}
      >
        {Children.map(children, (child: ReactElement) =>
          cloneElement(child, {
            style: { ...child.props.style, flexShrink: 0 },
            draggable: false,
          })
        )}
      </DragIndexCarousel>
    );
  };

  return component;
}
