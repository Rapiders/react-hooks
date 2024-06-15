import { useEffect, useState } from 'react';
import { isServer } from '../utils/isServer';

interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (storedValue: string) => T;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | null,
  options: UseLocalStorageOptions<T> = {},
): [T | null, (value: T) => void, () => void] {
  const serialize = (plainValue: T) => {
    if (options.serializer) return options.serializer(plainValue);
    return JSON.stringify(plainValue);
  };

  const deserialize = (serializedValue: string): T => {
    if (options.deserializer) return options.deserializer(serializedValue);
    return JSON.parse(serializedValue) as T;
  };

  const getStoredValue = () => {
    if (isServer()) return initialValue;

    const storedObj = window.localStorage.getItem(key);
    if (!storedObj) return initialValue;

    return deserialize(storedObj);
  };

  const [value, setValue] = useState<T | null>(getStoredValue());

  const saveValue = (newValue: T) => {
    window.localStorage.setItem(key, serialize(newValue));
    setValue(newValue);
    window.dispatchEvent(new StorageEvent('local-storage', { key }));
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setValue(initialValue);
    window.dispatchEvent(new StorageEvent('local-storage', { key }));
  };

  useEffect(() => {
    setValue(getStoredValue());
  }, []);

  const handleStorageChange = (event: StorageEvent | CustomEvent) => {
    if ((event as StorageEvent).key && (event as StorageEvent).key !== key) return;
    setValue(getStoredValue());
  };

  useEffect(() => {
    window.addEventListener('local-storage', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  });

  return [value, saveValue, removeValue];
}
