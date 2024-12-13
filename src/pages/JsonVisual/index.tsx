import { TextField } from '@mui/material';
import cx from 'classnames';
import commonSt from '../../common.module.scss';
import { Path } from './components/Path';
import { Cascader } from './components/Cascader';
import { ModelProvider, useModel } from './ctx';
import { useJson } from './hooks/useJson';
import { defineTool } from '@/utils';
import { text } from '@/utils/form-callbacks';

const RawJsonVisual = ()=> {
  const { jsonText, setJsonText, path } = useModel();
  const json = useJson();

  return (
    <div className={'w-full pt-1'}>
      <TextField
        className={cx(commonSt.textarea, 'w-full font-mono')}
        multiline
        rows={3}
        value={jsonText}
        onChange={text(setJsonText)}
      />
      <div className={'mt-1 w-full'}>
        <Path />
        <Cascader />
        {json.status === 'ok' && 
        <pre className={'h-130px overflow-auto'}>
          {JSON.stringify(path.reduce((pre, path) => {
            return pre[path];
          }, json.item as any), null, 2)}
        </pre>
        }
      </div>
    </div>
  );
};

export const JsonVisual = () => {
  return (
    <ModelProvider>
      <RawJsonVisual />
    </ModelProvider>
  );
};

defineTool({
  icon: <div className="i-mdi:code-json w-1em h-1em"></div>,
  name: 'JsonVisual',
  description: 'Visual Json',
  component: <JsonVisual />,
});