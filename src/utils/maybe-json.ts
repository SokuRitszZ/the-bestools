import { MaybeJson } from '@/types';

export const processMaybeJson = (text: string): MaybeJson => {
  try {
    const item = JSON.parse(text);
    return {
      status: 'ok',
      text: text,
      item,
    };
  }
  catch {
    return {
      status: 'error',
      text: text,
    };
  }
};