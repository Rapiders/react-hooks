import { act, renderHook } from '@testing-library/react';
import useDebounce from './useDebounce';

const DELAY_TIME = 1000;

beforeAll(() => jest.useFakeTimers());

describe('useDebounce 기능 테스트', () => {
  it('debounce 함수는 몇번이 수행되어도 지정된 초 이후에 한번 수행된다.', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, DELAY_TIME));
    Array.from({ length: 1000 }).forEach(() => result.current());
    expect(callback).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(DELAY_TIME));
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => jest.advanceTimersByTime(DELAY_TIME));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('훅을 여러개를 사용해도 서로 영향을 미치지 않는다.', () => {
    const callback = jest.fn();
    const callback2 = jest.fn();

    const { result } = renderHook(() => useDebounce(callback, DELAY_TIME));
    const { result: result2 } = renderHook(() => useDebounce(callback2, DELAY_TIME));

    Array.from({ length: 1000 }).forEach(() => result.current());
    expect(callback).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(DELAY_TIME));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    Array.from({ length: 1000 }).forEach(() => result2.current());
    expect(callback2).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(DELAY_TIME));
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
