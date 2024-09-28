import { Chip, Popover, TextField } from '@mui/material';
import { useState } from 'react';
import { useCurrentParameterMap } from '../../hooks/useCurrentParameterMap';
import { useTextReplacer } from '../../context';
import { text } from '@/utils/form-callbacks';

interface Props {
  id: string;
}

export const ParameterBadge = ({ id }: Props) => {
  const parameterMap = useCurrentParameterMap();
  const map = parameterMap?.map ?? {};
  const trueId = id.replace('{{', '').replace('}}', '');
  const [el, setEl] = useState<HTMLElement>();
  const [open, setOpen] = useState(false);
  const [disabledOpen, setDisabledOpen] = useState(false);
  const { setParameterMaps } = useTextReplacer(); 

  const handleUpdate = (value: string) => {
    const newMap = {
      ...map,
      [trueId]: value,
    };
    // 可修改之后，可以保证一定存在
    parameterMap!.map = newMap;
    setParameterMaps(maps => [...maps]);
  };

  return (
    <span
      ref={el => el && setEl(el)}
      onMouseEnter={() => setDisabledOpen(true)}
      onMouseLeave={() => setDisabledOpen(false)}
    >
      <Chip 
        className={'!whitespace-pre !text-ellipsis !max-w-400px'}
        disabled={!parameterMap}
        onClick={() => setOpen(true)}
        variant={'outlined'}
        size={'small'}
        label={map[trueId] || id} 
      />
      {!parameterMap && 
        <Popover 
          open={disabledOpen}
          anchorEl={el}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          onClose={() => setDisabledOpen(false)}
        >
          <div className={'p-4'}>
            There is not any Parameter Map created.
          </div>
        </Popover>
      }
      <Popover
        open={open}
        anchorEl={el}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        onClose={() => setOpen(false)}
      >
        <div className={'p-4'}>
          <TextField
            className={'w-400px'}
            onInput={text(handleUpdate)}
            label={(
              <div>
                Text of <span className={'font-600'}>{trueId}</span>
              </div>
            )}
            value={map[trueId]}
            multiline
            minRows={1}
            maxRows={20}
          />
        </div>
      </Popover>
    </span>
  );
};