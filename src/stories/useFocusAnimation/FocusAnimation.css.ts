import { keyframes, style } from '@vanilla-extract/css';

const showKeyframe = keyframes({
  from: {
    opacity: 0,
    transform: 'rotate(360deg) scale(0)',
  },
  to: {
    opacity: 1,
    transform: 'rotate(0deg) scale(1)',
  },
});

const hideKeyframe = keyframes({
  from: {
    opacity: 1,
    transform: 'rotate(0deg) scale(1)',
  },
  to: {
    opacity: 0,
    transform: 'rotate(360deg) scale(0)',
  },
});

const leftKeyframe = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0%)',
  },
});
const rightKeyframe = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0%)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
});

export const show = style({
  animation: `${showKeyframe} 500ms forwards`,
});

export const hide = style({
  animation: `${hideKeyframe} 500ms forwards`,
});

export const left = style({
  animation: `${leftKeyframe} 500ms forwards`,
});

export const right = style({
  animation: `${rightKeyframe} 500ms forwards`,
});
