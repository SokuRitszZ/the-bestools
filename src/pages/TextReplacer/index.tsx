import { TextReplacerProps } from './types';
import { TextReplacerPropsContext, TextReplacerProvider } from './context';
import { TemplateRecord } from './components/TemplateRecord';
import { ParameterMapRecord } from './components/ParameterMapRecord';
import { DisplayBoard } from './components/DisplayBoard';

export const RawTextReplacer = () => {

  return (
    <div className={'w-full h-full flex flex-col gap-16px p-4px rounded-10px'}>
      <TemplateRecord />
      <ParameterMapRecord />
      <DisplayBoard />
    </div>
  );
};

export const TextReplacer = (props: TextReplacerProps) => {
  return (
    <TextReplacerPropsContext.Provider value={props}>
      <TextReplacerProvider>
        <RawTextReplacer />
      </TextReplacerProvider>
    </TextReplacerPropsContext.Provider>
  );
};