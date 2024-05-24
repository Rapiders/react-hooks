import useInput from '@/useInput/useInput';
import React from 'react';
import { button, buttonWrapper, flex, input } from './Input.css';

export default function Input() {
  const { value, reset, onChange } = useInput('');
  return (
    <>
      <form
        className={flex}
        onSubmit={(e) => {
          e.preventDefault();
          alert(value);
        }}
      >
        <input value={value} onChange={onChange} className={input} />
        <div className={buttonWrapper}>
          <button className={button} type="submit">
            SUBMIT
          </button>
          <button className={button} onClick={reset} type="button">
            RESET
          </button>
        </div>
      </form>
    </>
  );
}
