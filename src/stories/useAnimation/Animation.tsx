import React from 'react';
import './animation.css';
import useAnimation from '@/useAnimation/useAnimation';

export const Animation = ({ mountClassName, unmountClassName }: { mountClassName?: string; unmountClassName?: string }) => {
  const { show, hide, isShow, AnimationWrapper } = useAnimation({
    mountClassName,
    unmountClassName,
  });

  const handleClick = () => {
    if (!isShow) return show();
    hide();
  };

  return (
    <div className="flex">
      <AnimationWrapper
        style={{
          width: 100,
          height: 100,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 15,
            backgroundColor: 'coral',
          }}
        />
      </AnimationWrapper>
      <button onClick={handleClick}>{isShow ? 'Hide' : 'Show'}</button>
    </div>
  );
};
