import { renderHook, act } from '@testing-library/react';
import { _useAnimation } from './useAnimation';

const MOUNT_ANIMATION_CLASSNAME = 'mountAnimation';
const UNMOUNT_ANIMATION_CLASSNAME = 'unmountAnimation';

describe('useAnimation Test', () => {
  it('triggerUnmountAnimation이 수행되면 unmountAnimationClassName으로 상태를 변경할 수 있다.', () => {
    const { result } = renderHook(() => _useAnimation(MOUNT_ANIMATION_CLASSNAME, UNMOUNT_ANIMATION_CLASSNAME));
    expect(result.current.animationClassName).toBe(MOUNT_ANIMATION_CLASSNAME);
    act(() => result.current.triggerUnmountAnimation());
    expect(result.current.animationClassName).toBe(UNMOUNT_ANIMATION_CLASSNAME);
  });

  it('handleUnmountAnimationEnd이 실행되면 unmountCallback을 수행할 수 있다.', () => {
    const unmountCallback = jest.fn();
    const { result } = renderHook(() => _useAnimation(MOUNT_ANIMATION_CLASSNAME, UNMOUNT_ANIMATION_CLASSNAME, unmountCallback));
    expect(result.current.animationClassName).toBe(MOUNT_ANIMATION_CLASSNAME);
    act(() => result.current.triggerUnmountAnimation());
    expect(result.current.animationClassName).toBe(UNMOUNT_ANIMATION_CLASSNAME);
    act(() => result.current.handleUnmountAnimationEnd());
    expect(unmountCallback).toHaveBeenCalled();
  });
});
