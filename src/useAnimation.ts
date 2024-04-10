import { useState } from 'react';

export default function useAnimation(
  mountAnimationClassName?: string,
  unmountAnimationClassName?: string,
  unmountCallback?: () => void
) {
  const [animationClassName, setAnimationClassName] = useState<
    string | undefined
  >(mountAnimationClassName);

  const triggerUnmountAnimation = () => {
    if (unmountAnimationClassName)
      setAnimationClassName(unmountAnimationClassName);
  };

  const handleUnmountAnimationEnd = () => {
    if (animationClassName === unmountAnimationClassName) {
      unmountCallback && unmountCallback();
    }
  };

  return {
    animationClassName,
    triggerUnmountAnimation,
    handleUnmountAnimationEnd,
  };
}
