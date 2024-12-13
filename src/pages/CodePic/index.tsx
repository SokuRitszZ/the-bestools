import { FormControl, IconButton, InputLabel, MenuItem, Popover, Select, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import hc from 'html2canvas';
import cx from 'classnames';
import commonSt from '../../common.module.scss';
import { LANGUAGES } from './consts';
import { CodePicturePlaceholder } from './components';
import { ModelProvider } from './contexts';
import { defineTool } from '@/utils';
import { text } from '@/utils/form-callbacks';
import { CodeHL } from '@/components/CodeHL';

 
const RawCodePic = () => {
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const paperRef = useRef<HTMLElement>();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [hasClip, setHasClip] = useState(false);
  useEffect(() => {
    setHasClip(false);
  }, [code]);
  const handleClip = async () => {
    if (hasClip) {
      setOpen(true);
    }
    else {
      const el = paperRef.current;
      if (!el) return; 

      const pic = await hc(el, { backgroundColor: null });
      setUrl(pic.toDataURL());
      setOpen(true);
      setHasClip(true);
    }
  };

  const [anchor, setAnchor] = useState<HTMLElement>();
  const picRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <CodePicturePlaceholder />
      <div className={'w-full h-full pt-2 flex flex-col gap-4'}>
        <div className={'flex-[0] flex items-stretch gap-1'}>
          <FormControl className={'bg-white flex-1'}>
            <InputLabel size={'small'} id={'language'}>Language</InputLabel>
            <Select 
              size={'small'}
              label={'Language'}
              labelId={'language'}
              variant={'outlined'}
              value={language}
              onChange={text(setLanguage)}
            >
              {LANGUAGES.map(itLanguage => 
                <MenuItem key={itLanguage.id} value={itLanguage.id}>
                  {itLanguage.name}
                </MenuItem>,
              )}
            </Select>
          </FormControl>
          <IconButton ref={el => el && setAnchor(el)} onClick={handleClip}>
            <div className="i-mdi:file-code w-1em h-1em"></div>
          </IconButton>
        </div>
        <TextField className={cx(commonSt.textarea, 'flex-1')} multiline rows={18} label={'Code'} value={code} onChange={text(setCode)} />
        <pre ref={el => el && (paperRef.current = el)} className={' fixed top-200vh left-200vw bg-white'}>
          <CodeHL language={language} text={code} />
        </pre>
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchor}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
        >
          <div ref={el => el && (paperRef.current = el)} className={'max-w-400px max-h-400px box-border p-4'}>
            <img 
              ref={picRef}
              src={url}
              alt={'code'}
              className={'w-full'}
            />
          </div>
        </Popover>
      </div>
    </>
  );
};

export const CodePic = () => {
  return (
    <ModelProvider>
      <RawCodePic />
    </ModelProvider>
  );
};

defineTool({
  name: 'CodePic',
  description: 'CodePic',
  icon: <div className="i-mdi:code-block-tags w-1em h-1em" />,
  component: <CodePic />,
});