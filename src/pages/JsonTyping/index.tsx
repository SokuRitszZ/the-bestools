import { TextField } from '@mui/material';
import { useState } from 'react';
import cx from 'classnames';
import commonSt from '../../common.module.scss';
import { TypeMapJson } from './components/TypeMapJson';
import { defineTool } from '@/utils';
import { text } from '@/utils/form-callbacks';
import { processMaybeJson } from '@/utils/maybe-json';

const RawJsonTyping = () => {
  const [jsonText, setJsonText] = useState('');
  const json = processMaybeJson(jsonText);
  
  return (
    <div className={'mt-1'}>
      <TextField value={jsonText} onChange={text(setJsonText)} className={cx(commonSt.textarea, 'w-full')} multiline rows={3} />
      <div 
        className={'gap-6px h-400px overflow-auto'}
      >
        {json.status === 'ok' && 
          <TypeMapJson json={json.item} />
        }
      </div>
    </div>
  );
};

defineTool({
  icon: <div className="i-mdi:code-block-json w-1em h-1em" />,
  name: 'JsonTyping',
  description: 'Get runtime type of json.',
  component: <RawJsonTyping />,
});
