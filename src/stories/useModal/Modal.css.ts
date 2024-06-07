import { keyframes, style } from '@vanilla-extract/css';

export const Overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ModalContainer = style({
  backgroundColor: 'white',
  padding: '30px 60px 30px 60px',
  borderRadius: 25,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 10,
});

const showKeyframe = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
});

const hideKeyframe = keyframes({
  from: {
    opacity: 1,
    transform: ' scale(1)',
  },
  to: {
    opacity: 0,
    transform: 'scale(0)',
  },
});
const overlayShowKeyframe = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const overlayHideKeyframe = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

export const showStyle = style({
  animation: `${showKeyframe} 500ms forwards`,
});

export const hideStyle = style({
  animation: `${hideKeyframe} 500ms forwards`,
});

export const overlayShow = style({
  animation: `${overlayShowKeyframe} 500ms forwards`,
});
export const overlayHide = style({
  animation: `${overlayHideKeyframe} 500ms forwards`,
});
