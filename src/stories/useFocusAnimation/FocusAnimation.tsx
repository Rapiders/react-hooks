import useFocusAnimation from '@/useFocusAnimation/useFocusAnimation';
import React from 'react';
import { show, hide, left, right } from './FocusAnimation.css';

export default function FocusAnimation() {
  const redRef = useFocusAnimation<HTMLDivElement>(show, hide, 0.1, '0px 0px 0px 0px');
  const coralRef = useFocusAnimation<HTMLDivElement>(left, right, 0.1, '-30% 0px -30% 0px');
  const skyRef = useFocusAnimation<HTMLDivElement>(show, hide, 0.1, '-30% 0px -30% 0px');

  return (
    <div
      style={{
        height: 2000,
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 400,
      }}
    >
      <div
        ref={redRef}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'red',
          borderRadius: 15,
        }}
      />
      <div
        ref={coralRef}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'coral',
          borderRadius: 15,
        }}
      />
      <div
        ref={skyRef}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'deepskyblue ',
          borderRadius: 15,
        }}
      />
    </div>
  );
}
