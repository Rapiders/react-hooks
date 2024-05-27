import { useState } from 'react';

export type UseBooleanReturn = ReturnType<typeof useBoolean>;

export default function useBoolean(defaultValue: boolean = false) {
  return useState<boolean>(defaultValue);
}
