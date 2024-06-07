import React, { useState } from 'react';

export function _useAnimation(mountAnimationClassName?: string, unmountAnimationClassName?: string, unmountCallback?: () => void) {
  const [animationClassName, setAnimationClassName] = useState<string | undefined>(mountAnimationClassName);

  const triggerUnmountAnimation = () => {
    setAnimationClassName(unmountAnimationClassName);
    if (unmountAnimationClassName === undefined) handleUnmountAnimationEnd();
  };

  const handleUnmountAnimationEnd = () => {
    if (animationClassName === unmountAnimationClassName) {
      unmountCallback && unmountCallback();
      setAnimationClassName(mountAnimationClassName);
    }
  };

  return {
    animationClassName,
    triggerUnmountAnimation,
    handleUnmountAnimationEnd,
  };
}

export default function useAnimation({ mountClassName, unmountClassName }: { mountClassName?: string; unmountClassName?: string }) {
  const [isShow, setIsShow] = useState(false);
  const { triggerUnmountAnimation, animationClassName, handleUnmountAnimationEnd } = _useAnimation(mountClassName, unmountClassName, () =>
    setIsShow(false),
  );

  const show = () => setIsShow(true);
  const hide = () => triggerUnmountAnimation();

  const AnimationWrapper = ({ children, className, ...rest }: { className?: string } & React.ComponentProps<'div'>) => {
    return (
      isShow && (
        <div className={`${animationClassName} ${className}`} onAnimationEnd={handleUnmountAnimationEnd} {...rest}>
          {children}
        </div>
      )
    );
  };

  return { isShow, show, hide, AnimationWrapper };
}
