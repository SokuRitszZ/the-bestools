import { useModel } from '../contexts';

export const useCurrentCode = () => {
  const { codes, codeId } = useModel();
  return codes.find(code => code.id === codeId);
};