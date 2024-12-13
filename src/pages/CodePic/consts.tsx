import { entriesIn } from 'lodash';
import { Language } from './types';

export const LANGUAGE_MAP: Record<string, string> = {
  cpp: 'C/C++',
  java: 'Java',
  csharp: 'C#',
  ts: 'JavaScript/TypeScript',
};

export const LANGUAGES: Language[] = entriesIn(LANGUAGE_MAP).map(([id, name]) => ({ id, name }));