import useSwitch from './useSwitch';
import { renderHook, act } from '@testing-library/react';

describe('useSwitch 기능테스트', () => {
  it('useSwitch는 스위치(혹은 토글)의 켜짐 상태와 켜짐상태를 조절할 수 있는 함수들을 반환한다.', () => {
    const { result } = renderHook(() => useSwitch(false));

    expect(result.current.isOn).toBe(false);
    act(() => {
      result.current.on();
    });
    expect(result.current.isOn).toBe(true);
    act(() => {
      result.current.off();
    });
    expect(result.current.isOn).toBe(false);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOn).toBe(true);
  });

  it('useSwitch는 초기값을 파라미터로 받는다.', () => {
    const { result: resultFalse } = renderHook(() => useSwitch(false));
    const { result: resultTrue } = renderHook(() => useSwitch(true));
    const maybeFalse = resultFalse.current.isOn;
    const maybeTrue = resultTrue.current.isOn;

    expect(maybeFalse).toBe(false);
    expect(maybeTrue).toBe(true);
  });
});
