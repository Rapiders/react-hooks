import React, { useState } from 'react';
import useFocus from '@/useFocus/useFocus';
import { backgroundDiv, scrollDiv } from './Focus.css';

export default function Focus() {
  const [message, setMessage] = useState('NOT FOCUS');
  const ref = useFocus<HTMLDivElement>(() => setMessage('FOCUS!'), 1, '-10px');

  return (
    <div className={backgroundDiv}>
      <div ref={ref} className={scrollDiv}>
        {message}
      </div>
    </div>
  );
}
