import { MouseEventHandler, WheelEventHandler } from 'react';
import { useStep } from '../../hooks/useStep';
import { useToast } from '@/components/Toast/ctx';

export const WheelOperator = () => {
  const { count, stepOne, step, setStep } = useStep({});
  const { notice } = useToast();

  const noticeStep = () => {
    notice({
      className: '!p-1 !text-30 w-200px h-150px font-mono',
      children: step,
      duration: 1000,
    });
  };

  const handleClick: MouseEventHandler = (e) => {
    e.shiftKey && setStep(step => step + 5);
    e.altKey && setStep(step => Math.max(5, step - 5));
    noticeStep();
  };

  const handleWheel: WheelEventHandler = (e) => {
    e.deltaY && stepOne(e.deltaY > 0);
  };
  
  return (
    <div
      className={'flex items-center justify-center gap-16px'}
      onWheel={handleWheel}
    >
      <div 
        onClick={handleClick}
        className={'rounded-12px w-25 h-25 shadow-xl flex items-center justify-center'}
      >
        <div className="i-mdi:mouse-scroll-wheel w-3em h-3em text-#737a87"></div>
      </div>
      <div className={'text-15 w-100px font-500 font-mono'}>
        {count}
      </div>
    </div>
  );
};