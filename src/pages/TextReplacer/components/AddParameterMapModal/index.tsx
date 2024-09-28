import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from '@mui/material';
import { ParameterMap } from '../../types';
import { useCurrentParameterMap } from '../../hooks/useCurrentParameterMap';
import { useTextReplacer } from '../../context';
import { text } from '@/utils/form-callbacks';

type Props = DialogProps

export const AddParameterMapModal = ({ ...props }: Props) => {
  const pMap = useCurrentParameterMap();
  const { setParameterMaps } = useTextReplacer();

  const handleUpdate = <K extends keyof ParameterMap>(key: K, value: ParameterMap[K]) => {
    if (!pMap) {
      return ;
    }

    pMap[key] = value;
    setParameterMaps(maps => [...maps]);
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Configure Parameter Map</DialogTitle>
      <DialogContent>
        <div className={'py-2 flex flex-col'}>
          <TextField
            required
            className={'w-400px'}
            value={pMap?.name}
            label={'Name'} size={'small'}
            onChange={text(v => handleUpdate('name', v))}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose?.({}, 'backdropClick')}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};