import useBoolean from '../useBoolean/useBoolean';
import { useCallback } from 'react';

export type UseSwitchReturn = ReturnType<typeof useSwitch>;

export default function useSwitch(defaultValue: boolean = false) {
  const [isOn, setOn] = useBoolean(defaultValue);

  const on = useCallback(() => {
    setOn(true);
  }, [setOn]);

  const off = useCallback(() => {
    setOn(false);
  }, [setOn]);

  const toggle = useCallback(() => {
    setOn((prev) => !prev);
  }, [setOn]);

  return {
    isOn,
    on,
    off,
    toggle,
  };
}
