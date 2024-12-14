import { ReactNode } from 'react';
import cx from 'classnames';

interface Props {
  className?: string;
  icon: ReactNode;
  text: string;
}

export const ErrorMention = ({ className, icon, text }: Props) => {
  return (
    <div className={cx('flex flex-col items-center justify-center border-1 border-solid border-#737a87 rounded-8px p-4 box-border', className)}>
      {icon}
      <div className={'w-70% text-center text-24px text-#0c0d0e mt-3'}>
        {text}
      </div>
    </div>
  );
};