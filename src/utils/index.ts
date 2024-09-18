export const iife = <T>(fn: () => T) => {
  return fn();
};