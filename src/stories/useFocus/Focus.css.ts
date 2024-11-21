import { style } from '@vanilla-extract/css';

export const backgroundDiv = style({
  height: 100,
});

export const scrollDiv = style({
  position: 'absolute',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  padding: 16,
  top: 200,
});
