import useBoolean from '../useBoolean/useBoolean';
import { useCallback } from 'react';

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;

export default function useDisclosure(defaultValue: boolean = false) {
  const [isOpen, setIsOpen] = useBoolean(defaultValue);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    open,
    close,
  };
}
