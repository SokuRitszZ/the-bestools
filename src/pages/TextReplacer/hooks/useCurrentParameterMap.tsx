import { useTextReplacer } from '../context';

export const useCurrentParameterMap = () => {
  const { parameterMapKey, parameterMaps } = useTextReplacer();
  return parameterMaps.find(p => p.id === parameterMapKey);
};