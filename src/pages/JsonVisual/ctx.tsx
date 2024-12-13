import { PropsWithChildren, useContext } from 'react';
import { useAnemicModel } from '@/hooks/useAnemicModel';
import { Key } from '@/types';
import { simpleContext } from '@/utils';
import { AnemicModel } from '@/types/common';

export interface Model {
  path: Key[];
  jsonText: string;
}

const ModelContext = simpleContext<AnemicModel<Model>>();

export const useModel = () => useContext(ModelContext);

export const ModelProvider = ({ children }: PropsWithChildren) => {
  const values = useAnemicModel<Model>({
    path: [],
    jsonText: '',
  });
  return (
    <ModelContext.Provider value={values}>
      {children}
    </ModelContext.Provider>
  );
};