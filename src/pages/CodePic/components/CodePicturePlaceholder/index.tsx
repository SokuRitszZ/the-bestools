import { useRef } from 'react';
import { useCurrentCode } from '../../hooks/useCurrentCode';
import { CodeHL } from '@/components/CodeHL';

export const CodePicturePlaceholder = () => {
  const ref = useRef<HTMLDivElement>(null);
  const code = useCurrentCode();
  
  return (
    <div className={'pointer-events-none opacity-0 fixed top-0 left-0'}>
      <div ref={ref} className={'p-4'}>
        <div className={'bg-#fff whitespace-pre text-start p-2 px-4 pb-3 rounded-1'}>
          <CodeHL text={code?.text ?? ''} language={code?.language ?? 'text'} />
        </div> 
      </div>
    </div>
  );
};