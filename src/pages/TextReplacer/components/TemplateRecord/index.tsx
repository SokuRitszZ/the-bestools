import { Button, FormControl, IconButton, InputLabel, MenuItem, Popover, Select } from '@mui/material';
import { useState } from 'react';
import { useTextReplacer } from '../../context';
import { AddTemplateModal } from '../AddTemplateModal';
import { Template } from '../../types';
import { text } from '@/utils/form-callbacks';

export const TemplateRecord = () => {
  const { templates, templateKey, setTemplateKey, setTemplates } = useTextReplacer();
  const [open, setOpen] = useState(false);
  const [deleteEl, setDeleteEl] = useState<HTMLElement>();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    const newTemplates = templates.filter(tmp => tmp.id !== templateKey);

    setTemplates(newTemplates);
    setTemplateKey(newTemplates[0]?.id);
    setDeleteOpen(false);
  };

  const handleAdd = () => {
    const id = '' + Date.now();
    const newTemplate: Template = {
      id,
      name: '',
      template: '',
    };

    setTemplateKey(id);
    setTemplates(tmps => [...tmps, newTemplate]);
    setOpen(true);
  };

  return (
    <div className={'flex items-center flex-0 gap-4px'}>
      <FormControl className={'bg-white flex-1'}>
        <InputLabel id={'template'}>Template</InputLabel>
        <Select 
          size={'small'}
          label={'Template'}
          labelId={'template'}
          variant={'outlined'}
          value={templateKey} onChange={text(setTemplateKey)} >
          {templates.map(template => 
            <MenuItem key={template.id} value={template.id}>
              {template.name}
            </MenuItem>,
          )}
        </Select>
      </FormControl>
      {/* <TextField size={'small'} label={'Name'} value={currentTemplate?.name} onInput={text(value => updateTemplate({ name: value }))} className={'flex-1'} /> */}
      <IconButton onClick={() => setOpen(true)}>
        <div className="i-mdi:settings w-1em h-1em"></div>
      </IconButton>
      <IconButton onClick={handleAdd}>
        <div className="i-mdi:text-box-plus w-1em h-1em" />
      </IconButton>
      <IconButton ref={el => el && setDeleteEl(el)} onClick={() => setDeleteOpen(true)}>
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
      <AddTemplateModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};