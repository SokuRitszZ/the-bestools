import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Tool } from '@/types';
import { CallbackReturn } from '@/types/common';

interface Props {
  onSelect: () => CallbackReturn;
  onOk: () => CallbackReturn;
  tool: Tool;
  open: boolean;
}

export const Window = ({ tool, open, onSelect, onOk }: Props) => {
  return (
    <>
      {/* TODO: DESCRIPTION */}
      <Card className={'w-300px'}>
        <CardContent>
          <Typography className={'flex items-center gap-2'} gutterBottom variant={'h5'} component={'div'}>
            {tool.icon} {tool.name}
          </Typography>
          <Typography variant={'body2'} sx={{ color: 'text.secondary' }}>
            {tool.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onSelect}>
            TRY IT
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open}>
        <DialogTitle>
          {tool.name}
        </DialogTitle>
        <DialogContent className={'w-500px h-500px !overflow-hidden'}>
          {tool.component}
        </DialogContent>
        <DialogActions>
          <Button onClick={onOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};