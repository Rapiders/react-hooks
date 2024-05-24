import { style } from '@vanilla-extract/css';

export const button = style({
  fontSize: 15,
});

export const flex = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 10,
});
