import { style } from '@vanilla-extract/css';

export const flex = style({
  display: 'flex',
  gap: 10,
});

export const flexCol = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const info = style({
  fontSize: 20,
});
export const input = style({
  padding: 15,
  fontSize: 15,
  borderRadius: 15,
});

export const button = style({
  fontSize: 15,
  padding: 15,
});
