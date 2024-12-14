import { useEffect, useRef } from 'react';
import { useModel } from '../../ctx';
import { useJson } from '../../hooks/useJson';
import { Tree } from '../Tree';
import { ErrorMention } from '@/components/ErrorMention';

export const Cascader = () => {
  const maybeJson = useJson();
  const { path } = useModel();

  const ref = useRef<HTMLElement>();

  useEffect(() => {
    ref.current?.scroll({ left: 9999, behavior: 'smooth' });
  }, [path]);

  return (
    <div className={'w-full overflow-x-auto'} ref={el => el && (ref.current = el)}>
      {maybeJson.status === 'ok' && 
        <div className={'flex'} >
          <Tree json={maybeJson.item} />
        </div>
      }
      {maybeJson.status === 'error' && 
        <ErrorMention
          className={'w-full'}
          icon={<div className="i-mdi:file-document-alert w-7em h-7em"></div>}
          text={'The json is invalid.'}
        />
      }
    </div>
  );
};