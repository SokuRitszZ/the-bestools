export interface Parameter {
  name: string;
  value: string;
}

export interface ParameterMap {
  id: string;
  name: string;
  map: Record<string, string>;
}

export interface Template {
  id: string;
  name: string;
  template: string;
}

export interface TextReplacerProps {
  key?: string;
}