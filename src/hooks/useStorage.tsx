import { useEffect, useState } from 'react';
import { iife } from '../utils';

interface Props<T> {
    key: string;
    defaultValue: T; 
}

export const useStorage = <T, >({ key, defaultValue }: Props<T>) => {
  const [value, setValue] = useState(iife(() => {
    const str = localStorage.getItem(key) ?? '';
    try {
      return JSON.parse(str) as T;
    }
    catch {
      return defaultValue;
    }
  }));

  useEffect(() => {
    const str = iife(() => {
      try {
        return JSON.stringify(value);
      }
      catch {
        return '';
      }
    });
    localStorage.setItem(key, str);
  }, [value]);

  return [value, setValue] as const;
};