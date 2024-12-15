import { useEffect, useState } from 'react';
import { useLatest } from '@/hooks/useLatest';

interface Props {
  audio?: HTMLAudioElement;
  onSampled?: (data: number[]) => void;
  fftSize: number
}

export const useTrackAudio = ({ audio, onSampled, fftSize }: Props) => {
  const onSampledGet = useLatest(onSampled);
  const [node, setNode] = useState<AnalyserNode>();

  useEffect(() => {
    if (!audio) {
      return ;
    }
    const audioElement = audio;
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(audioElement);
    const analyser = audioCtx.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    setNode(analyser);
  
    return () => {
      source.disconnect();
      analyser.disconnect();
    };
  }, [audio]);

  useEffect(() => {
    const analyser = node;
    if (!analyser) {
      return ;
    }

    analyser.fftSize = fftSize;

    const freqArray = new Uint8Array(fftSize >> 1);
    const domainArray = new Uint8Array(fftSize >> 1);
    
    const timer = window.setInterval(() => {
      analyser.getByteFrequencyData(freqArray);
      analyser.getByteTimeDomainData(domainArray);
      onSampledGet()?.([...freqArray]);
    }, 16);
    
    return () => {
      clearInterval(timer);
    };
  }, [node, fftSize]);
};