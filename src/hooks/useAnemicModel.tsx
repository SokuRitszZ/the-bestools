import { assign, keysIn, upperFirst } from 'lodash';
import { useState } from 'react';
import { useStorage } from './useStorage';
import { iife } from '@/utils';
import { AnemicModel, StringKeyOf, WeakRequired } from '@/types/common';

interface PersistentConfig<T> {
  keys: StringKeyOf<T>[];
  prefix: string;
  storageKey?: (prefix: string, key: StringKeyOf<T>) => string;
}

export const useAnemicModel = <T, >(defaultValue: WeakRequired<T>, persistentConfig?: PersistentConfig<T>): AnemicModel<T> => {
  const prefix = persistentConfig?.prefix ?? '';
  const storageKey = persistentConfig?.storageKey ?? ((prefix: string, key: StringKeyOf<T>) => `${prefix}-${key}`);
  return assign({}, ...keysIn(defaultValue).map(k => {
    const [v, sv] = iife(() => {
      if (persistentConfig?.keys.includes(k as StringKeyOf<T>)) {
        const key = storageKey(prefix, k as StringKeyOf<T>);
        return useStorage({
          key,
          defaultValue: defaultValue[k as StringKeyOf<T>],
        });
      }
      return useState(defaultValue[k as keyof T]);
    });
    
    return {
      [k]: v,
      [`set${upperFirst(k)}`]: sv,
    };
  }));
};