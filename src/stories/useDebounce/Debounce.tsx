import React, { useState } from 'react';
import useDebounce from '../../useDebounce/useDebounce';
import { button, flex } from './Debounce.css';

export default function Debounce({ time }: { time: number }) {
  const [counter, setCounter] = useState(0);
  const [realCounter, setRealCounter] = useState(0);

  const debounce = useDebounce(() => setCounter((prev) => prev + 1), time);

  const handleClick = () => {
    debounce();
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
