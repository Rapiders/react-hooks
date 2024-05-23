import useInput from '@/useInput/useInput';
import React from 'react';
import './input.css';

export default function Input() {
  const { value, reset, onChange } = useInput('');
  return (
    <>
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          alert(value);
        }}
      >
        <input value={value} onChange={onChange} />
        <div className="button-wrapper">
          <button type="submit">SUBMIT</button>
          <button onClick={reset} type="button">
            RESET
          </button>
        </div>
      </form>
    </>
  );
}
