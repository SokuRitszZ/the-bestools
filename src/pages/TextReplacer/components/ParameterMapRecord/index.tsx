import { Button, FormControl, IconButton, InputLabel, MenuItem, Popover, Select } from '@mui/material';
import { useState } from 'react';
import { useTextReplacer } from '../../context';
import { useCurrentParameterMap } from '../../hooks/useCurrentParameterMap';
import { AddParameterMapModal } from '../AddParameterMapModal';
import { ParameterMap } from '../../types';
import { text } from '@/utils/form-callbacks';

export const ParameterMapRecord = () => {
  const { parameterMapKey, setParameterMapKey, parameterMaps, setParameterMaps } = useTextReplacer();
  const currentParameterMap = useCurrentParameterMap();
  const [open, setOpen] = useState(false);
  const [deleteEl, setDeleteEl] = useState<HTMLElement>();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    const newMaps = parameterMaps.filter(map => map.id !== parameterMapKey);

    setParameterMaps(newMaps);
    setParameterMapKey(newMaps[0]?.id);
    setDeleteOpen(false);
  };

  const handleAdd = () => {
    const id = '' + Date.now();
    const newParameterMap: ParameterMap = {
      id,
      name: '',
      map: {},
    };

    setParameterMapKey(id);
    setParameterMaps(maps => [...maps, newParameterMap]); 
    setOpen(true);
  };

  return (
    <div className={'flex items-stretch flex-0 gap-4px'}>
      <FormControl className={'bg-white flex-1'}>
        <InputLabel id={'parameter-map'}>Parameter Map</InputLabel>
        <Select 
          size={'small'}
          label={'Parameter Map'}
          labelId={'parameter-map'}
          variant={'outlined'}
          value={currentParameterMap?.id}
          onChange={text(setParameterMapKey)} 
        >
          {parameterMaps.map(parameterMap => 
            <MenuItem key={parameterMap.id} value={parameterMap.id}>
              {parameterMap.name}
            </MenuItem>,
          )}
        </Select>
      </FormControl>
      {/* <TextField size={'small'} label={'Name'} value={currentTemplate?.name} onInput={text(value => updateTemplate({ name: value }))} className={'flex-1'} /> */}
      <IconButton onClick={() => setOpen(true)}>
        <div className="i-mdi:settings w-1em h-1em" />
      </IconButton>
      <IconButton onClick={handleAdd}>
        <div className="i-mdi:text-box-plus w-1em h-1em" />
      </IconButton>
      <IconButton
        ref={el => el && setDeleteEl(el)}
        onClick={() => setDeleteOpen(true)}
      >
        <div className="i-mdi:text-box-minus w-1em h-1em" />
      </IconButton>
      <Popover
        anchorEl={deleteEl}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
        <Button onClick={handleDelete} variant={'contained'} color={'error'}>
          CONFIRM DELETE
        </Button>
      </Popover>
      <AddParameterMapModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};