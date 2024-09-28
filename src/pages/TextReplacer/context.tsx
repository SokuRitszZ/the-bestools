import { PropsWithChildren, useContext } from 'react';
import { ParameterMap, Template, TextReplacerProps } from './types';
import { AnemicModel } from '@/types/common';
import { simpleContext } from '@/utils';
import { useAnemicModel } from '@/hooks/useAnemicModel';

interface Model {
  templateKey?: string;
  templates: Template[];
  parameterMaps: ParameterMap[];
  parameterMapKey?: string;
}

export const TextReplacerContext = simpleContext<AnemicModel<Model>>();
export const TextReplacerProvider = ({ children }: PropsWithChildren) => {
  const model = useAnemicModel<Model>({
    templateKey: undefined,
    parameterMapKey: undefined,
    parameterMaps: [],
    templates: [],
  }, {
    prefix: 'TextReplacer',
    keys: ['templateKey', 'templates', 'parameterMapKey', 'parameterMaps'],
  });

  return (
    <TextReplacerContext.Provider value={model}>
      {children}
    </TextReplacerContext.Provider>
  );
};

export const useTextReplacer = () => {
  return useContext(TextReplacerContext);
};

export const TextReplacerPropsContext = simpleContext<TextReplacerProps>();

export const useTextReplacerProps = () => {
  return useContext(TextReplacerPropsContext);
};