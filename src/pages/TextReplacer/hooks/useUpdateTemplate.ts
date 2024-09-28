import { useTextReplacer } from '../context';
import { Template } from '../types';

export const useUpdateTemplate = () => {
  const { setTemplates, templateKey } = useTextReplacer();
  // update template config
  const handleUpdateTemplate = (templateDiff: Partial<Template>) => {
    setTemplates(templates => templates.map(template => template.id === templateKey ? {
      ...template,
      ...templateDiff,
    } : template));

  };

  return handleUpdateTemplate; 
};