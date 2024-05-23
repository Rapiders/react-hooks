import React, { useState } from 'react';
import useThrottle from '../../useThrottle/useThrottle';

export default function Throttle({ time }: { time: number }) {
  const [counter, setCounter] = useState(0);
  const [realCounter, setRealCounter] = useState(0);

  const throttle = useThrottle(() => setCounter((prev) => prev + 1), time);

  const handleClick = () => {
    throttle();
    setRealCounter((prev) => prev + 1);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div>
        {realCounter}번 눌렀는데, {counter}회 실행되었습니다.
      </div>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}
