import { render, screen, fireEvent } from '@testing-library/react';
import useCarousel from './useCarousel';
import React from 'react';

const DATA = [1, 2, 3, 4];

describe('useCarousel 기능 테스트', () => {
  const TestComponent = () => {
    const { CarouselWrapper, prev, next, index, ref } = useCarousel(DATA.length);
    return (
      <>
        <CarouselWrapper
          ref={ref}
          style={{
            width: 100,
            height: 100,
          }}
        >
          {DATA.map((num) => (
            <div
              key={num}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {num}
            </div>
          ))}
        </CarouselWrapper>
        <button onClick={prev} role="prev"></button>
        <button onClick={next} role="next"></button>
        <div role="index">{index}</div>
      </>
    );
  };

  it('Carousel Wrapper컴포넌트를 통해 prev, next 기능을 수행할 수 있다.', async () => {
    render(<TestComponent />);
    const next = await screen.findByRole('next');
    const prev = await screen.findByRole('prev');

    fireEvent.click(next);
    const indexElement = await screen.findByRole('index');
    expect(indexElement.textContent).toBe('1');

    fireEvent.click(prev);
    expect(indexElement.textContent).toBe('0');
  });

  it('index 제한을 넘어가는 경우, prev와 next함수가 index를 변화시키지 않을 수 있다.', async () => {
    render(<TestComponent />);
    const next = await screen.findByRole('next');
    const prev = await screen.findByRole('prev');

    Array.from({ length: 10 }).forEach(() => fireEvent.click(next));

    const indexElement = await screen.findByRole('index');
    expect(indexElement.textContent).toBe('3');

    Array.from({ length: 10 }).forEach(() => fireEvent.click(prev));
    expect(indexElement.textContent).toBe('0');
  });
});

describe('useCarousel(infinity) 기능 테스트', () => {
  const TestComponent = () => {
    const { CarouselWrapper, prev, next, index, ref } = useCarousel(DATA.length, { infinity: true });
    return (
      <>
        <CarouselWrapper
          ref={ref}
          style={{
            width: 100,
            height: 100,
          }}
        >
          {DATA.map((num) => (
            <div
              key={num}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {num}
            </div>
          ))}
        </CarouselWrapper>
        <button onClick={prev} role="prev"></button>
        <button onClick={next} role="next"></button>
        <div role="index">{index}</div>
      </>
    );
  };

  it('index 제한을 넘어가는 경우, prev와 next함수가 index를 적절하게 변환할 수 있다.', async () => {
    render(<TestComponent />);
    const next = await screen.findByRole('next');
    const prev = await screen.findByRole('prev');

    Array.from({ length: 5 }).forEach(() => fireEvent.click(next));

    const indexElement = await screen.findByRole('index');
    expect(indexElement.textContent).toBe('1');

    Array.from({ length: 2 }).forEach(() => fireEvent.click(prev));
    expect(indexElement.textContent).toBe('3');
  });
});
