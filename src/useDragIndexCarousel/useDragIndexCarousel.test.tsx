import { fireEvent, render } from '@testing-library/react';
import useDragIndexCarousel from './useDragIndexCarousel';
import React from 'react';

const DATA = [1, 2, 3, 4];
const WRAPPER_WIDTH = 500;
const START_INDEX = 2;

function TestComponent() {
  const { CarouselWrapper, ref } = useDragIndexCarousel(DATA.length);

  return (
    <CarouselWrapper
      ref={ref}
      style={{
        width: WRAPPER_WIDTH,
        height: 500,
      }}
      className="wrapper"
    >
      {DATA.map((index) => (
        <div
          key={index}
          style={{
            width: '100%',
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
          role={String(index)}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          >
            {index}
          </div>
        </div>
      ))}
    </CarouselWrapper>
  );
}

function IndexConfigureTestComponent() {
  const { CarouselWrapper, ref } = useDragIndexCarousel(DATA.length, { startIndex: START_INDEX });

  return (
    <CarouselWrapper
      ref={ref}
      style={{
        width: WRAPPER_WIDTH,
        height: 500,
      }}
      className="wrapper"
    >
      {DATA.map((index) => (
        <div
          key={index}
          style={{
            width: '100%',
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
          role={String(index)}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          >
            {index}
          </div>
        </div>
      ))}
    </CarouselWrapper>
  );
}

function InfinityTestComponent() {
  const { CarouselWrapper, ref } = useDragIndexCarousel(DATA.length, {
    infinity: true,
  });

  return (
    <CarouselWrapper
      ref={ref}
      style={{
        width: WRAPPER_WIDTH,
        height: 500,
      }}
      className="wrapper"
    >
      {DATA.map((index) => (
        <div
          key={index}
          style={{
            width: '100%',
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
          role={String(index)}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          >
            {index}
          </div>
        </div>
      ))}
    </CarouselWrapper>
  );
}

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    value: WRAPPER_WIDTH,
  });

  Object.defineProperties(MouseEvent.prototype, {
    pageX: {
      get() {
        return this.clientX;
      },
    },
    pageY: {
      get() {
        return this.clientY;
      },
    },
  });
});

describe('useDragIndexCarousel 컴포넌트 기능 테스트', () => {
  it('스크롤을 통해 Carousel을 넘길 수 있다.', () => {
    const { container } = render(<TestComponent />);
    const wrapper = container.querySelector<HTMLElement>('.wrapper')!;
    const carousel = wrapper.querySelector('div')!;

    fireEvent.mouseDown(carousel, { clientX: 0 });
    fireEvent.mouseMove(carousel, { clientX: -100 });
    fireEvent.mouseUp(carousel);
    expect(carousel.style.transform).toBe(`translateX(${-WRAPPER_WIDTH}px)`);

    fireEvent.mouseDown(carousel, { clientX: 0 });
    fireEvent.mouseMove(carousel, { clientX: -100 });
    fireEvent.mouseUp(carousel);
    expect(carousel.style.transform).toBe(`translateX(${-2 * WRAPPER_WIDTH}px)`);
  });

  it('스크롤을 해도 첫 인덱스나 마지막 인덱스이면 Carousel이 넘어가지 않는다.', () => {
    const { container } = render(<TestComponent />);
    const wrapper = container.querySelector<HTMLElement>('.wrapper')!;
    const carousel = wrapper.querySelector('div')!;
    const scrollRight = () => {
      fireEvent.mouseDown(carousel, { clientX: 0 });
      fireEvent.mouseMove(carousel, { clientX: -100 });
      fireEvent.mouseUp(carousel);
    };

    const scrollLeft = () => {
      fireEvent.mouseDown(carousel, { clientX: 0 });
      fireEvent.mouseMove(carousel, { clientX: 100 });
      fireEvent.mouseUp(carousel);
    };

    Array.from({ length: 10 }).forEach(() => scrollRight());
    expect(carousel.style.transform).toBe(`translateX(${-3 * WRAPPER_WIDTH}px)`);
    Array.from({ length: 10 }).forEach(() => scrollLeft());
    expect(carousel.style.transform).toBe(`translateX(${0}px)`);
  });
});

describe('useDragIndexCarousel Infinity 컴포넌트 테스트', () => {
  it('Infinity option이 true인 경우, translateX는 WRAPPER_WIDTH (index=1)로 시작한다.', () => {
    const { container } = render(<InfinityTestComponent />);
    const wrapper = container.querySelector<HTMLElement>('.wrapper')!;
    const carousel = wrapper.querySelector('div')!;
    expect(carousel.style.transform).toBe(`translateX(${-WRAPPER_WIDTH}px)`);
  });

  it('Infinity option이 true인 경우, 인덱스 양끝단을 오갈 수 있다.', () => {
    const { container } = render(<InfinityTestComponent />);
    const wrapper = container.querySelector<HTMLElement>('.wrapper')!;
    const carousel = wrapper.querySelector('div')!;
    expect(carousel.style.transform).toBe(`translateX(${-WRAPPER_WIDTH}px)`);

    const scrollRight = () => {
      fireEvent.mouseDown(carousel, { clientX: 0 });
      fireEvent.mouseMove(carousel, { clientX: -100 });
      fireEvent.mouseUp(carousel);
    };

    const scrollLeft = () => {
      fireEvent.mouseDown(carousel, { clientX: 0 });
      fireEvent.mouseMove(carousel, { clientX: 100 });
      fireEvent.mouseUp(carousel);
    };

    scrollLeft();
    expect(carousel.style.transform).toBe(`translateX(${0}px)`);
    fireEvent.transitionEnd(carousel);
    expect(carousel.style.transform).toBe(`translateX(${-WRAPPER_WIDTH * DATA.length}px)`);

    Array.from({ length: 2 }).forEach(() => scrollRight());
    expect(carousel.style.transform).toBe(`translateX(${-WRAPPER_WIDTH * (DATA.length + 1)}px)`);
    fireEvent.transitionEnd(carousel);
    expect(carousel.style.transform).toBe(`translateX(${-WRAPPER_WIDTH}px)`);
  });
});

describe('startIndex 지정 테스트', () => {
  it('startIndex를 지정할 수 있다.', () => {
    const { container } = render(<IndexConfigureTestComponent />);
    const wrapper = container.querySelector<HTMLElement>('.wrapper')!;
    const carousel = wrapper.querySelector('div')!;
    expect(carousel.style.transform).toBe(`translateX(${-START_INDEX * WRAPPER_WIDTH}px)`);
  });
});
