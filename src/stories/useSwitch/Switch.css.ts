import { ComplexStyleRule, style } from '@vanilla-extract/css';

/* The switch - the box around the slider */
export const switchLabel = style({
  position: 'relative',
  display: 'inline-block',
  width: 60,
  height: 34,
});

export const switchCirble: ComplexStyleRule = {
  position: 'absolute',
  content: '',
  height: 26,
  width: 26,
  left: 4,
  bottom: 4,
  backgroundColor: 'white',
  WebkitTransition: '.4s',
  transition: '.4s',
};

/* Hide default HTML checkbox */
export const switchInput = style({
  opacity: 0,
  width: 0,
  height: 0,
});

/* The slider */
export const baseSlider = style({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#ccc',
  WebkitTransition: '.4s',
  transition: '.4s',
  '::before': {
    ...switchCirble,
  },
});

export const checkedSlider = style({
  backgroundColor: '#2196F3',
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  '::before': {
    ...switchCirble,
    transform: 'translateX(26px)',
    WebkitTransform: 'translateX(26px)',
    msTransform: 'translateX(26px)',
  },
});

/* Rounded sliders */
export const round = style({
  borderRadius: 34,
  '::before': {
    borderRadius: '50%',
  },
});
