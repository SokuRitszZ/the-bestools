import { camelCase, compact, flow, keys, upperFirst, flatten, intersectionBy } from 'lodash';
import { map, prop, uniq, uniqBy } from 'lodash/fp';
import { getType } from '../JsonVisual/utils';
import { JType } from './types';
import { Json } from '@/types';
import { iife } from '@/utils';

const processName = flow(camelCase, upperFirst);

export const processJsonType = (json: Json, name = 'root'): JType => {
  const typeName = getType(json);

  name = processName(name);

  switch (typeName) {
  case 'array': {
    const jsonTypes = (json as Json[]).map((item) => processJsonType(item, `${name}Item`));
    const uniqueTypeNames = 
      flow(
        map(prop('type')),
        uniq,
      )(jsonTypes);
    
    return {
      type: uniqueTypeNames.length > 1 ? 'tuple' : 'array',
      name,
      item: jsonTypes,
    };
  }
  case 'object':
    return {
      type: 'object',
      name: processName(name),
      item: keys(json).map(key => {
        return processJsonType((json as any)[key] as Json, key);
      }),
    };
  default:
    return {
      type: typeName,
      name,
    };
  }
};

const TAB = '  ';

const INTERFACE_TEMPLATE = `
export interface {name} {
${TAB}{maps}
}
`;

const TYPE_TEMPLATE = `
export type {name} = {maps};
`;

const getTypeString = (type: JType): string => {
  switch (type.type) {
  case 'array': {
    const itemTypeName = !type.item?.length ? '[]' :
      ['tuple', 'array', 'object'].includes(type.item[0].type) ? 
        `${type.name}Item[]` : `${type.item[0].type}[]`;
    return itemTypeName;
  }
  case 'tuple': 
  case 'object': {
    return type.name;
  }
  default: {
    return type.type;
  }
  }
};

export const generateTsCode = (type: JType): string => {
  const tsCode = iife(() => {
    switch (type.type) {
    case 'object':
      return INTERFACE_TEMPLATE
        .replace('{name}', type.name)
        .replace('{maps}', type.item ? type.item.map(x => {
          return `${x.name}${x.optional ? '?' : ''}: ${getTypeString(x)};`;
        }).join(`\n${TAB}`) : '{}');
    case 'array': {
      if (!type.item) {
        return; 
      }
      const typeNames = type.item.map(prop('type'));
      const uniqueTypeNames = uniq(typeNames);
      const mergedObject = iife(() => {
        if (uniqueTypeNames.includes('object')) {
          const objectTypes = type.item?.filter(typeItem => typeItem.type === 'object');
          const propsGroups = compact(objectTypes?.map(prop('item')));
          const totalProps = flow(flatten, compact, uniqBy(prop('name')))(objectTypes?.map(prop('item')));
          const commonPropNames = intersectionBy(...propsGroups ?? [], prop('name')).map(prop('name'));
          const obj: JType = {
            name: `${type.name}Item`,
            type: 'object',
            item: totalProps.map(prop => {
              return commonPropNames.includes(prop.name)
                ? prop
                : {
                  ...prop,
                  optional: true,
                };
            }),
          };
          return obj;
        }
      });
      return mergedObject ? generateTsCode(mergedObject) : undefined;
    }
    case 'tuple':
      return TYPE_TEMPLATE
        .replace('{name}', `${type.name}`)
        .replace('{maps}', `[${type.item?.map(getTypeString).join(', ')}]`);
    default: 
    }
  });

  return compact([tsCode, ...type.type !== 'array' ? type.item?.map(generateTsCode) ?? [] : []]).join('');
};