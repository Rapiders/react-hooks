import { renderHook, act } from '@testing-library/react';
import useCarousel from './useCarousel';

const DATA_LENGTH = 3;
describe('useCarousel 기능 테스트', () => {
  it('next 함수를 통해 index를 1증가시킬 수 있다.', () => {
    const { result } = renderHook(() => useCarousel(DATA_LENGTH));
    expect(result.current.isStart).toBe(true);
    expect(result.current.index).toBe(0);
    act(() => result.current.next());
    expect(result.current.index).toBe(1);
  });

  it('next 함수 실행시 dataLength와 index가 같아지는 경우 초기 index로 이동한다.', () => {
    const { result } = renderHook(() =>
      useCarousel(DATA_LENGTH, { startIndex: DATA_LENGTH - 1, infinity: true })
    );
    expect(result.current.index).toBe(DATA_LENGTH - 1);
    expect(result.current.isEnd).toBe(true);
    act(() => result.current.next());
    expect(result.current.index).toBe(0);
  });

  it('prev 함수를 통해 index를 1감소시킬 수 있다.', () => {
    const { result } = renderHook(() =>
      useCarousel(DATA_LENGTH, { startIndex: DATA_LENGTH - 1, infinity: true })
    );
    expect(result.current.index).toBe(DATA_LENGTH - 1);
    act(() => result.current.prev());
    expect(result.current.index).toBe(DATA_LENGTH - 2);
  });

  it('prev 함수 실행시, index가 0인경우, 마지막 값으로 이동한다.', () => {
    const { result } = renderHook(() =>
      useCarousel(DATA_LENGTH, { infinity: true })
    );
    expect(result.current.index).toBe(0);
    act(() => result.current.prev());
    expect(result.current.index).toBe(DATA_LENGTH - 1);
  });
});
