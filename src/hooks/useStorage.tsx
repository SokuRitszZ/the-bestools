import { createEffect, createSignal } from 'solid-js';
import { iife } from '../utils';

interface Props<T> {
    key: string;
    defaultValue: T; 
}

export const useStorage = <T, >({ key, defaultValue }: Props<T>) => {
  const [value, setValue] = createSignal(iife(() => {
    const str = localStorage.getItem(key) ?? '';
    try {
      return JSON.parse(str) as T;
    }
    catch {
      return defaultValue;
    }
  }));

  createEffect(() => {
    const str = iife(() => {
      try {
        return JSON.stringify(value());
      }
      catch {
        return '';
      }
    });
    localStorage.setItem(key, str);
  });

  return [value, setValue] as const;
};