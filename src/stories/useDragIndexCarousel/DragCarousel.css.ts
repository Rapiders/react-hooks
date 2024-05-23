import { style } from '@vanilla-extract/css';

export const carouselWrapper = style({
  width: 500,
  height: 500,
});

export const carouselDiv = style({
  width: '100%',
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const carouselImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});
