import { keyframes, style } from '@vanilla-extract/css';

const showKeyframes = keyframes({
  from: {
    opacity: 0,
    height: 0,
  },
  to: {
    opacity: 1,
    height: 100,
  },
});

const hideKeyframes = keyframes({
  from: {
    opacity: 1,
    height: 100,
  },
  to: {
    opacity: 0,
    height: 0,
  },
});

export const showStyle = style({
  animation: `${showKeyframes} 500ms forwards`,
});

export const hideStyle = style({
  animation: `${hideKeyframes} 500ms forwards`,
});

export const flexCol = style({
  display: 'flex',
  gap: 4,
  flexDirection: 'column',
});

export const animationWrapper = style({
  width: 100,
  height: 100,
});
