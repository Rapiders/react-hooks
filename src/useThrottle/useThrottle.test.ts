import { renderHook, act } from '@testing-library/react';
import useThrottle from './useThrottle';

const DELAY_TIME = 1000;

describe('useThrottle 기능 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('throttle Function이 많이 호출되어도, 지정한 시간 간격에 맞춰서 수행할 수 있다.', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, DELAY_TIME));
    Array.from({ length: 100 }).forEach(() => result.current());
    expect(callback).not.toHaveBeenCalled();
    act(() => jest.advanceTimersByTime(DELAY_TIME));
    expect(callback).toHaveBeenCalledTimes(1);

    Array.from({ length: 100 }).forEach(() => result.current());
    act(() => jest.advanceTimersByTime(DELAY_TIME));
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
