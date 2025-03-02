import { useState } from 'react';

interface Props {

}

export const useStep = ({ }: Props) => {
  const [count, setCount] = useState(0);
  const [stepOffset, setStepOffset] = useState(0);
  const [step, setStep] = useState(5);

  const handleStep = (go: boolean) => {
    const newSo = stepOffset + (go ? 1 : -1); 

    setCount(c => c += 
      newSo >= step 
        ? 1 : newSo < 0 
          ? -1 : 0,
    );
    setStepOffset(newSo >= step ? 0 : newSo < 0 ? step - 1 : newSo);
  };

  return {
    count,
    setCount,
    step,
    setStep,
    stepOffset,
    setStepOffset,
    stepOne: handleStep,
  };
};