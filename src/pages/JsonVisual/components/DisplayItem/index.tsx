import { isArray, isBoolean, isNull, isObject } from 'lodash';
import cx from 'classnames';
import { BasicType, Json } from '../../types';
import { ICON_MAP } from '../../consts';
import { getType } from '../../utils';
import { Key } from '@/types';

interface Props {
  index: Key;
  value: BasicType | Json | Json[];
  isActive?: boolean;
  onClick: () => void;
}

export const DisplayItem = ({ index, value, isActive, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={cx('cursor-pointer font-mono flex items-center px-2 py-1 bg-#eee hover:bg-#ddd rounded-4px', {
        ['bg-blue! text-white!']: isActive,
      }, 'whitespace-nowrap overflow-hidden text-ellipsis')}
    >
      <span className={'mr-1'}>
        {ICON_MAP[getType(value)]}
      </span>
      <span className={''}> {index} </span>
      {/* <span className={'mx-1'}>
        {!isNull(value) ? ':' : '' }
      </span> */}
      {/* {isArray(value) 
        ? `${value.length}` 
        : isObject(value) 
          ? '{...}' 
          : isBoolean(value)
            ? `${value}` : value} */}
    </div>
  );
};