import { TypeName } from '@/types';

export interface JType {
  type: TypeName;
  name: string;
  optional?: boolean;
  item?: JType[];
}