import { renderHook } from '@testing-library/react';
import useInterval from './useInterval';
import { act } from 'react-dom/test-utils';

describe('useInterval 기능 테스트', () => {
  jest.useFakeTimers();
  it('지정된 시간 후에 callback을 주기적으로 수행할 수 있다.', () => {
    const callback = jest.fn();
    const delay = 1000;
    renderHook(() => useInterval(callback, delay));
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(2);
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('stop을 호출하면 callback호출하는 interval을 멈출 수 있다.', () => {
    const callback = jest.fn();
    const delay = 1000;
    const { result } = renderHook(() => useInterval(callback, delay));
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => result.current.stop());
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('stop을 호출하여 멈춘 상태에서 continueTimer를 통해 callback호출하는 interval을 재시작 할 수 있다.', () => {
    const callback = jest.fn();
    const delay = 1000;
    const { result } = renderHook(() => useInterval(callback, delay));
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => result.current.stop());
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => result.current.continueTimer());
    act(() => jest.advanceTimersByTime(delay));
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
