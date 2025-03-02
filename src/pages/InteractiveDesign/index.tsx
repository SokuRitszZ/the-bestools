import { RotateOperator } from './components/RotateOperator';
import { WheelOperator } from './components/WheelOperator';
import { defineTool } from '@/utils';

export const InteractiveDesign = () => {
  return (
    <div className={'flex flex-col gap-16px'}>
      <RotateOperator />
      <WheelOperator />
    </div>
  );
};

defineTool({
  name: 'InteractiveDesign',
  icon: <div className="i-mdi:button-pointer" />,
  description: '',
  component: <InteractiveDesign />,
});