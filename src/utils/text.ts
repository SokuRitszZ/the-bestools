import { entries, flatten, flow, isUndefined, zip } from 'lodash';
import { filter, replace } from 'lodash/fp';


export const splitText = (text: string, regex: RegExp): string[][] => {
  const lines = text.split('\n');
  return lines.map(text => {
    const texts = text.split(regex);
    const matches = [...text.matchAll(regex)];
    
    return flow(zip, flatten, filter(x => !isUndefined(x)))(texts, matches.map(match => match[0])) as string[];
  });
};

export const replaceAll = (text: string, map: Record<string, string>) => {
  return flow(
    ...entries(map).map(([k, v]) => replace(new RegExp(`{{${k}}}`, 'g'), v)),
  )(text);
};