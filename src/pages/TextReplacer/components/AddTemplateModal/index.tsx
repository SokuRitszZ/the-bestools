import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from '@mui/material';
import { useTextReplacer } from '../../context';
import { useCurrentTemplate } from '../../hooks/useCurrentTemplate';
import { Template } from '../../types';
import { text } from '@/utils/form-callbacks';

type Props = DialogProps 

export const AddTemplateModal = ({ ...props }: Props) => {
  const { setTemplates } = useTextReplacer();
  const template = useCurrentTemplate();

  const handleUpdate = <K extends keyof Template>(field: K, value: Template[K]) => {
    if (!template) {
      return; 
    }

    template[field] = value;
    setTemplates(tmps => [...tmps]);
  };

  return (
    <Dialog {...props}>
      <DialogTitle id={'add-template-title'}>Configure Template</DialogTitle>
      <DialogContent>
        <div className={'py-2 flex flex-col gap-16px'}>
          <TextField
            required
            value={template?.name}
            label={'Name'} size={'small'}
            onChange={text(v => handleUpdate('name', v))}
          />
          <TextField
            className={'w-400px mt-2'}
            label="Template"
            multiline
            minRows={4}
            maxRows={20}
            value={template?.template}
            onChange={text(v => handleUpdate('template', v))}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose?.({}, 'backdropClick')}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};