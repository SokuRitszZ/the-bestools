import { createContext } from 'react';

export const iife = <T>(fn: () => T) => {
  return fn();
};

export const simpleContext = <T> () => {
  return createContext<T>(undefined as any);
};