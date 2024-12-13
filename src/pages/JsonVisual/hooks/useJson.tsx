import { useMemo } from 'react';
import { useModel } from '../ctx';
import { Json } from '../types';

export interface OkJson {
    status: 'ok';
    text: string;
    item: Json;
}

export interface ErrorJson {
    status: 'error';
    text: string;
}

export type MaybeJson = OkJson | ErrorJson;

export const useJson = (): MaybeJson => {
  const { jsonText } = useModel();
  return useMemo((): MaybeJson => {
    try {
      const item = JSON.parse(jsonText);
      return {
        status: 'ok',
        text: jsonText,
        item,
      };
    }
    catch {
      return {
        status: 'error',
        text: jsonText,
      };
    }
  }, [jsonText]);
};