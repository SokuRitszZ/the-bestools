import { PropsWithChildren, useContext } from 'react';
import { Code, CodePicProps } from './types';
import { AnemicModel } from '@/types/common';
import { simpleContext } from '@/utils';
import { useAnemicModel } from '@/hooks/useAnemicModel';

export const PropsContext = simpleContext<CodePicProps>();

interface Model {
  codeId: string;
  codes: Code[];
}

export const ModelContext = simpleContext<AnemicModel<Model>>();

export const ModelProvider = ({ children }: PropsWithChildren) => {
  const states = useAnemicModel<Model>({
    codeId: '',
    codes: [],
  }, {
    prefix: 'CodePic',
    keys: ['codes', 'codeId'],
  });

  return (
    <ModelContext.Provider value={states}>
      {children}
    </ModelContext.Provider>
  );
};

export const useProps = () => {
  return useContext(PropsContext);
};

export const useModel = () => {
  return useContext(ModelContext);
};