import { useMemo } from 'react';
import { useModel } from '../ctx';
import { MaybeJson } from '@/types';
import { processMaybeJson } from '@/utils/maybe-json';

export const useJson = (): MaybeJson => {
  const { jsonText } = useModel();
  return useMemo((): MaybeJson => processMaybeJson(jsonText), [jsonText]);
};