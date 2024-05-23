import { useState } from 'react';
import { isServer } from '@/utils/isServer';

interface LocalStorageDataWithExpire<T> {
  value: T;
  expire: number | null;
}

interface UseLocalStorageOptions {
  expire?: number;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | null,
  options?: UseLocalStorageOptions,
): [T | null, (value: T) => void, () => void] {
  const serializer = (plainValue: LocalStorageDataWithExpire<T>) => {
    return JSON.stringify(plainValue);
  };

  const deserializer = (serializedValue: string): LocalStorageDataWithExpire<T> => {
    return JSON.parse(serializedValue) as LocalStorageDataWithExpire<T>;
  };

  const getStoredValue = () => {
    if (isServer()) return initialValue;

    const storedObj = window.localStorage.getItem(key);

    if (!storedObj) return initialValue;

    const { value: storedValue, expire } = deserializer(storedObj);

    if (expire && Date.now() > expire) {
      window.localStorage.removeItem(key);
      return initialValue;
    }

    return storedValue;
  };

  const [value, setValue] = useState<T | null>(() => getStoredValue());

  const saveValue = (newValue: T) => {
    const expire = options?.expire ? Date.now() + options.expire : null;
    const newData = { value: newValue, expire };

    window.localStorage.setItem(key, serializer(newData));
    setValue(newValue);
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setValue(initialValue);
  };

  return [value, saveValue, removeValue];
}
