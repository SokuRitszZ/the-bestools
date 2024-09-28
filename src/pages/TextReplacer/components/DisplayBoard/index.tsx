import { IconButton, Paper, Snackbar } from '@mui/material';
import cx from 'classnames';
import { useState } from 'react';

import { useCurrentTemplate } from '../../hooks/useCurrentTemplate';
import { VAR_TEMP_REG } from '../../consts';
import { ParameterBadge } from '../ParameterBadget';
import { useCurrentParameterMap } from '../../hooks/useCurrentParameterMap';
import { replaceAll, splitText } from '@/utils/text';


export const DisplayBoard = () => {
  const template = useCurrentTemplate();
  const map = useCurrentParameterMap();
  const parsedTemplate = splitText(template?.template ?? '', VAR_TEMP_REG);
  const [raw, setRaw] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const resultText = replaceAll(template?.template ?? '', map?.map ?? {});

  return (
    <Paper className={'flex-[1] whitespace-pre text-start text-12px p-4 relative break-all text-wrap overflow-scroll'} elevation={3}>
      {raw && resultText}
      {!raw && parsedTemplate.map(line => 
        <div className={'flex items-center flex-wrap'}>
          {line.map(text => 
            VAR_TEMP_REG.test(text)
              ? 
              <ParameterBadge id={text} />
              : 
              <span>{text}</span>,
          )}
        </div>,
      )}
      <div className={'sticky bottom-0 flex flex-row-reverse gap-8px'}>
        <IconButton 
          onClick={() => setRaw(r => !r)}
          className={cx('duration-300', {
            ['!bg-#335 !text-white']: !raw,
          })}
        >
          <div className="i-mdi:code w-1em h-1em" />
        </IconButton>
        <IconButton
          onClick={async () => {
            await navigator.clipboard.writeText(resultText);
            setSnackOpen(true);
          }}
        >
          <div className="i-mdi:clipboard-text-multiple-outline w-1em h-1em"></div>
        </IconButton>
      </div>
      <Snackbar
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={3000}
        message={'Copy successfully!'}
      />
    </Paper>
  );
};