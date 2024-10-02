import { TextReplacerProps } from './types';
import { TextReplacerPropsContext, TextReplacerProvider } from './context';
import { TemplateRecord } from './components/TemplateRecord';
import { ParameterMapRecord } from './components/ParameterMapRecord';
import { DisplayBoard } from './components/DisplayBoard';
import { defineTool } from '@/utils';

export const RawTextReplacer = () => {

  return (
    <div className={'w-full h-full flex flex-col gap-16px pt-2 rounded-10px'}>
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

defineTool({
  name: 'TextReplacer',
  description: 'TextReplacer',
  icon: <div className="i-mdi:receipt-text w-1em h-1em" />,
  component: <TextReplacer />,
});