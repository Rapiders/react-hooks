import React, { useState } from 'react';
import useInterval from '../../useInterval/useInterval';
const STRING = 'Interval 수행!\n';
export default function Interval({ time }: { time: number }) {
  const { intervalRunning, stop, continueTimer } = useInterval(() => setString((prev) => prev + STRING), time);
  const [string, setString] = useState('');

  return (
    <>
      <div
        style={{
          width: 400,
          height: 400,
          whiteSpace: 'pre-wrap',
          overflowY: 'auto',
        }}
      >
        {string}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 5,
        }}
      >
        <button onClick={intervalRunning ? stop : continueTimer}>{intervalRunning ? 'STOP' : string === '' ? 'START' : 'CONTINUE'}</button>
        <button onClick={() => setString('')}>RESET</button>
      </div>
    </>
  );
}
