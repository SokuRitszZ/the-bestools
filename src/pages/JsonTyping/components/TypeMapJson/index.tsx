import { generateTsCode, processJsonType } from '../../utils';
import { CodeHL } from '@/components/CodeHL';
import { Json } from '@/types';

interface Props {
  json: Json;
}

export const TypeMapJson = ({ json }: Props) => {
  const map = processJsonType(json);

  return (
    <pre>
      <CodeHL
        text={generateTsCode(map)}
        language={'ts'}
      />
    </pre>
  );
};