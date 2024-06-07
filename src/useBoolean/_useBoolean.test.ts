import useBoolean from './useBoolean';
import { renderHook, act } from '@testing-library/react';

describe('useBoolean 기능테스트', () => {
  it('useBoolean은 boolean상태를 나타내는 값과 그 boolean을 변경할 수 있는 값을 배열로 반환한다.', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);
  });

  it('useBoolean은 초기값을 받으며 useBoolean의 초기값을 설정한다', () => {
    const { result: resultFalse } = renderHook(() => useBoolean(false));
    const { result: resultTrue } = renderHook(() => useBoolean(true));
    const [maybeFalse] = resultFalse.current;
    const [maybeTrue] = resultTrue.current;

    expect(maybeFalse).toBe(false);
    expect(maybeTrue).toBe(true);
  });
});
