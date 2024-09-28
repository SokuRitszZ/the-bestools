import { useTextReplacer } from '../context';

export const useCurrentTemplate = () => {
  const { templateKey, templates } = useTextReplacer();
  return templates.find(t => t.id === templateKey);
};