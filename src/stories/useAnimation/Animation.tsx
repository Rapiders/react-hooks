import React from 'react';
import useAnimation from '@/useAnimation/useAnimation';
import { animationWrapper, flexCol } from './Animation.css';

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
    <div className={flexCol}>
      <AnimationWrapper className={animationWrapper}>
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
