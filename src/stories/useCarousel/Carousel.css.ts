import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  gap: 15,
  justifyContent: 'center',
  alignItems: 'center',
});

export const carouselWrapper = style({
  width: 800,
  height: 600,
});

export const carouselDiv = style({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
});

export const carouselImage = style({
  objectFit: 'contain',
  width: '100%',
  height: '100%',
});
