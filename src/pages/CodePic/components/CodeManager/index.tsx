import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { useModel } from '../../contexts';
import { text } from '@/utils/form-callbacks';

export const CodeManager = () => {
  const { codeId, setCodeId, codes } = useModel();
    
  return (
    <div className={'w-full flex items-center gap-4px'}>
      <FormControl className={'bg-white flex-1'}>
        <InputLabel size={'small'} id={'code'}>Code</InputLabel>
        <Select
          size={'small'}
          label={'Code'}
          labelId={'code'}
          variant={'outlined'}
          value={codeId}
          onChange={text(setCodeId)}
        >
          {codes.map(code => 
            <MenuItem key={code.id} value={code.id}>
              {code.name}
            </MenuItem>,
          )}
        </Select>
      </FormControl>
      <IconButton>
        <div className="i-mdi:settings w-1em h-1em"></div>
      </IconButton>
      <IconButton>
        <div className="i-mdi:receipt-text-plus w-1em h-1em"></div>
      </IconButton>
      <IconButton>
        <div className="i-mdi:receipt-text-minus w-1em h-1em"></div>
      </IconButton>
    </div>
  );
};