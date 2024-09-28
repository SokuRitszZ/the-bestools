import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export const Window = (props: Props) => {

  return (
    <div className={'w-500px h-500px'}>{props.children}</div>
  );
};