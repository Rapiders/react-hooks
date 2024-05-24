import React, { useState } from 'react';
import useThrottle from '../../useThrottle/useThrottle';
import { button, flex } from './Throttle.css';

export default function Throttle({ time }: { time: number }) {
  const [counter, setCounter] = useState(0);
  const [realCounter, setRealCounter] = useState(0);

  const throttle = useThrottle(() => setCounter((prev) => prev + 1), time);

  const handleClick = () => {
    throttle();
    setRealCounter((prev) => prev + 1);
  };
  return (
    <div className={flex}>
      <div>
        {realCounter}번 눌렀는데, {counter}회 실행되었습니다.
      </div>
      <button onClick={handleClick} className={button}>
        Click Me!
      </button>
    </div>
  );
}
