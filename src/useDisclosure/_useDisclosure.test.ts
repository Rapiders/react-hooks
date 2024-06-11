import useDisclosure from './useDisclosure';
import { renderHook, act } from '@testing-library/react';

describe('useDisclosure 기능테스트', () => {
  it('useDisclosure는 modal, disclosure와 같이 컴포넌트의 열림과 닫힘 상태를 조절할 수 있는 기능들을 반환한다.', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('useDisclosure는 초기값을 파라미터로 받는다.', () => {
    const { result: resultFalse } = renderHook(() => useDisclosure(false));
    const { result: resultTrue } = renderHook(() => useDisclosure(true));
    const maybeFalse = resultFalse.current.isOpen;
    const maybeTrue = resultTrue.current.isOpen;

    expect(maybeFalse).toBe(false);
    expect(maybeTrue).toBe(true);
  });
});
