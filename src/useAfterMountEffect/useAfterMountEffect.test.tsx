import { renderHook } from '@testing-library/react';
import useAfterMountEffect from './useAfterMountEffect'; // useAfterMountEffect 훅의 경로에 맞게 조정하세요.

describe('useAfterMountEffect', () => {
  it('첫 렌더링 때 callback이 실행되지 않는다.', () => {
    const effectCallback = jest.fn();

    renderHook(() => useAfterMountEffect(effectCallback, []));

    expect(effectCallback).not.toHaveBeenCalled();
  });

  it('첫 렌더링 이후 deps 배열의 변경으로 인해 callback이 실행된다.', () => {
    const effectCallback = jest.fn();
    let dep = false;

    const { rerender } = renderHook(() => useAfterMountEffect(effectCallback, [dep]));

    expect(effectCallback).not.toHaveBeenCalled(); // 처음 마운트 시에는 호출되지 않음

    dep = true;
    rerender(); // 의존성 배열에 있는 값이 변경되어 컴포넌트가 업데이트됨

    expect(effectCallback).toHaveBeenCalledTimes(1); // 업데이트 후 함수가 호출됨
  });
});
