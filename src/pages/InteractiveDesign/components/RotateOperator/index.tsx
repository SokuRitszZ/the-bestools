import { MouseEventHandler, useRef, useState } from 'react';
import cx from 'classnames';
import { cross2d } from '../../utils';
import { Vec } from '../../types';
import { useStep } from '../../hooks/useStep';
import { useToast } from '@/components/Toast/ctx';

export const RotateOperator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const placeRef = useRef<HTMLElement>();
  const [cw, setCw] = useState(false);
  const { step, setStep, count, stepOne } = useStep({});

  const handleCw = (cw: boolean) => {
    setCw(cw);
    stepOne(cw);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const el = placeRef.current;
    if (!el) return ;

    const rect = el.getBoundingClientRect();
    const [cx, cy] = [e.clientX, e.clientY];
    const [ox, oy] = [rect.left + rect.width / 2, rect.top + rect.height / 2];
    const moveVec = [e.movementX, e.movementY] as Vec;
    const offsetVec = [cx - ox, cy - oy] as Vec;
    const cross = cross2d(offsetVec, moveVec);

    cross && handleCw(cross > 0);
  };
  
  const { notice } = useToast();
  
  const noticeStep = () => {
    notice({
      className: '!p-1 !text-30 w-200px h-150px font-mono',
      children: step,
      duration: 1000,
    });
  };

  const handleClick: MouseEventHandler = (e) => {
    if (e.shiftKey) {
      setStep(s => s + 5);
      noticeStep();
    }
    else if (e.altKey) {
      setStep(s => Math.max(5, s - 5));
      noticeStep();
    }
    else {
      setIsOpen(i => !i);
    }
  }; 
  return (
    <div className={'flex items-center justify-center gap-16px'}>
      <div
        ref={el => el && (placeRef.current = el)}
        onClick={handleClick}
        onMouseMove={e => isOpen && handleMouseMove(e)}
        className={cx(
          'w-25 h-25 bg-#fff rounded-full shadow-md',
          isOpen && 'shadow-xl',
          'flex items-center justify-center',
          'font-bold text-#737a87',
        )}
      >
        {cw
          ? <div className="i-mdi:rotate-clockwise w-3em h-3em"></div> 
          : <div className="i-mdi:rotate-counter-clockwise w-3em h-3em"></div>
        }
      </div>
      <div className={'text-15 font-mono w-100px'}>{count}</div>
    </div>
  );
};