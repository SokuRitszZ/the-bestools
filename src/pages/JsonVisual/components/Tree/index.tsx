import { isArray, keys } from 'lodash';
import { Json } from '../../types';
import { isJson } from '../../utils';
import { DisplayItem } from '../DisplayItem';
import { useModel } from '../../ctx';

interface Props<T extends Json> {
    json: T;
    stage?: number;
}

export const Tree = <T extends Json, >({ json, stage = 0 }: Props<T>) => {
  const { path, setPath } = useModel();
  const selectedValue = json[path[stage] as keyof typeof json];

  return (
    <>
      <div className={'h-200px min-w-266px overflow-y-auto'}>{
        isArray(json)
          ? 
          <>{
            json.map((value, index) => 
              <DisplayItem
                isActive={index === path[stage]}
                key={index}
                index={index}
                value={value}
                onClick={() => setPath(path => [...path.slice(0, stage), index])}
              />,
            )
          }</>
          : 
          <>{
            keys(json).map(key => 
              <DisplayItem
                isActive={key === path[stage]}
                key={key}
                index={key}
                value={json[key]}
                onClick={() => setPath(path => [...path.slice(0, stage), key])}
              />,
            )
          }</>
      }</div>
      {isJson(selectedValue) && <Tree json={selectedValue} stage={stage + 1} />}
    </>
  );
};