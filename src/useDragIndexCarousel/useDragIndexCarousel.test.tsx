import { renderHook, act } from '@testing-library/react';
import { _useDragIndexCarousel } from './useDragIndexCarousel';

describe('_useDragIndexCarousel', () => {
  it('초기 상태 테스트 index로 시작할 수 있다.', () => {
    const { result } = renderHook(() => _useDragIndexCarousel(3));

    expect(result.current.index).toBe(0);
    expect(result.current.style.transform).toBe('translateX(0px)');
  });

  it('모바일 터치이벤트 테스트: 절대값으로 minMove보다 많이, 오른쪽으로 슬라이드하면 index를 증가시킬 수 있다.', () => {
    const { result } = renderHook(() => _useDragIndexCarousel(3, 60));
    const touchEvent = { touches: [{ clientX: 0 }] };
    const touchMove = { touches: [{ clientX: -100 }] };

    act(() =>
      result.current.handleTouchStart(
        touchEvent as unknown as React.TouchEvent<HTMLDivElement>
      )
    );
    act(() =>
      result.current.handleTouchMove(
        touchMove as unknown as React.TouchEvent<HTMLDivElement>
      )
    );
    act(() => result.current.handleMoveEnd());

    expect(result.current.index).toBe(1);
  });

  it('모바일 터치이벤트 테스트: 절대값으로 minMove보다 많이, 왼쪽으로 슬라이드하면 index를 감소시킬 수 있다.', () => {
    const { result } = renderHook(() => _useDragIndexCarousel(3, 60, 1));
    const touchEvent = { touches: [{ clientX: 0 }] };
    const touchMove = { touches: [{ clientX: 100 }] };

    act(() =>
      result.current.handleTouchStart(
        touchEvent as unknown as React.TouchEvent<HTMLDivElement>
      )
    );
    act(() =>
      result.current.handleTouchMove(
        touchMove as unknown as React.TouchEvent<HTMLDivElement>
      )
    );
    act(() => result.current.handleMoveEnd());

    expect(result.current.index).toBe(0);
  });

  it('모바일 터치이벤트 테스트: 절대값으로 minMove보다 적게,  슬라이드하면 index를 유지시킬 수 있다.', () => {
    const { result } = renderHook(() => _useDragIndexCarousel(3, 100));
    const touchEvent = { touches: [{ clientX: 0 }] };
    const touchMove = { touches: [{ clientX: -90 }] };

    act(() =>
      result.current.handleTouchStart(
        touchEvent as unknown as React.TouchEvent<HTMLDivElement>
      )
    );
    act(() =>
      result.current.handleTouchMove(
        touchMove as unknown as React.TouchEvent<HTMLDivElement>
      )
    );
    act(() => result.current.handleMoveEnd());

    expect(result.current.index).toBe(0);
  });

  it('PC 스크롤이벤트 테스트: 절대값으로 minMove보다 많이, 오른쪽으로 슬라이드하면 index를 증가시킬 수 있다.', () => {
    const { result } = renderHook(() => _useDragIndexCarousel(3, 60));
    const touchEvent = { pageX: 0 };
    const touchMove = { pageX: -100 };

    act(() =>
      result.current.handleScrollStart(
        touchEvent as unknown as React.MouseEvent<HTMLDivElement>
      )
    );
    act(() =>
      result.current.handleScrollMove(
        touchMove as unknown as React.MouseEvent<HTMLDivElement>
      )
    );
    act(() => result.current.handleMoveEnd());

    expect(result.current.index).toBe(1);
  });

  it('PC 스크롤이벤트 테스트: 절대값으로 minMove보다 많이, 왼쪽으로 슬라이드하면 index를 감소시킬수 있다.', () => {
    const { result } = renderHook(() => _useDragIndexCarousel(3, 60, 1));
    const touchEvent = { pageX: 0 };
    const touchMove = { pageX: 100 };

    act(() =>
      result.current.handleScrollStart(
        touchEvent as unknown as React.MouseEvent<HTMLDivElement>
      )
    );
    act(() =>
      result.current.handleScrollMove(
        touchMove as unknown as React.MouseEvent<HTMLDivElement>
      )
    );
    act(() => result.current.handleMoveEnd());

    expect(result.current.index).toBe(0);
  });

  it('PC 스크롤이벤트 테스트: 절대값으로 minMove보다 적게 슬라이드하면 index를 유지시킬 수 있다.', () => {
    const { result } = renderHook(() => _useDragIndexCarousel(3, 100, 1));
    const touchEvent = { pageX: 0 };
    const touchMove = { pageX: 60 };

    act(() =>
      result.current.handleScrollStart(
        touchEvent as unknown as React.MouseEvent<HTMLDivElement>
      )
    );
    act(() =>
      result.current.handleScrollMove(
        touchMove as unknown as React.MouseEvent<HTMLDivElement>
      )
    );
    act(() => result.current.handleMoveEnd());

    expect(result.current.index).toBe(1);
  });
});
