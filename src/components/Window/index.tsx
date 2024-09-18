import { ParentProps } from 'solid-js';

interface Props extends ParentProps {}

export const Window = (props: Props) => {

  return (
    <div class={'w-500px h-500px'}>{props.children}</div>
  );
};