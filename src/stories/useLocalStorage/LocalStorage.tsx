import useInput from '@/useInput/useInput';
import useLocalStorage from '@/useLocalStorage/useLocalStorage';
import React from 'react';
import { button, flex, flexCol, info, input } from './LocalStorage.css';

export default function LocalStorage() {
  const [storageValue, setStorageValue] = useLocalStorage('key', 'value');
  const { value, onChange } = useInput('');

  return (
    <div className={flexCol}>
      <div className={info}>Local Storage (key) 에 저장된 값 : {storageValue}</div>
      <div>새로고침을 통해 확인해보세요!</div>

      <div className={flex}>
        <input type="text" onChange={onChange} className={input} placeholder="값 변경하기!" />
        <button onClick={() => setStorageValue(value)} className={button}>
          적용
        </button>
      </div>
    </div>
  );
}
