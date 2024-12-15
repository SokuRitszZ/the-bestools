import { IconButton, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { isNumber } from 'lodash';
import { AudioStatus } from './types';
import { dayjs } from '@/packages/dayjs';

interface Props {
  className?: string;
  audio: HTMLAudioElement;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onStatusChange?: (status: AudioStatus) => void;
}

export const AudioPlayer = ({ className, audio, onPlay, onPause, onStop, onStatusChange }: Props) => {
  const [status, setStatus] = useState<AudioStatus>('init');
  useEffect(() => {
    onStatusChange?.(status);
  }, [status]);
  useEffect(() => {
    const handlePlay = () => setStatus('play');
    audio.addEventListener('play', handlePlay);
    return () => audio.removeEventListener('play', handlePlay);
  }, [audio]);
  useEffect(() => {
    const handlePause = () => setStatus('pause');
    audio.addEventListener('pause', handlePause);
    return () => audio.removeEventListener('pause', handlePause);
  }, [audio]);
  useEffect(() => {
    const handleEnd = () => setStatus('init');
    audio.addEventListener('ended', handleEnd);
    return () => audio.removeEventListener('ended', handleEnd);
  }, [audio]);

  const handlePlay = () => {
    audio.play();
    onPlay?.();
  };
  const handlePause = () => {
    audio.pause();
    onPause?.();
  };
  const handleStop = () => {
    audio.pause();
    audio.currentTime = 0;
    onStop?.();
  };

  const [duration, setDuration] = useState<number>(0);
  useEffect(() => {
    const duration = isNaN(audio.duration) ? 0 : audio.duration;

    setDuration(duration);

    const handler = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener('loadedmetadata', handler);
    return () => {
      audio.removeEventListener('loadedmetadata', handler);
    };
  }, [audio]);
  
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const handler = () => setCurrent(audio.currentTime);
    const timer = window.setInterval(() => handler(), 100);
    audio.addEventListener('pause', handler);
    return () => {
      clearInterval(timer);
      audio.removeEventListener('pause', handler);
    };
  }, [audio]);

  const handleSliderChange = (timeStamp: number) => {
    audio.pause();

    const current = timeStamp / 1000;

    setCurrent(current);
    audio.currentTime = current;
  };

  const playNode = 
    <IconButton onClick={handlePlay}> 
      <div className="i-mdi:play-circle w-1em h-1em"></div>
    </IconButton>; 
  const pauseNode = 
    <IconButton onClick={handlePause}> 
      <div className="i-mdi:pause-circle w-1em h-1em"></div>
    </IconButton>; 
  const stopNode = 
    <IconButton onClick={handleStop}> 
      <div className="i-mdi:stop-circle w-1em h-1em"></div> 
    </IconButton>; 
  
  return (
    <div className={className}>
      {/* slider */}
      <div className={'font-mono flex items-center justify-between gap-16px'}>
        <span>{dayjs.duration(current * 1000).format('mm:ss')}</span>
        <div
          className={'flex-1 flex items-center'}
          onMouseUp={() => audio.play()}
        >
          <Slider
            size={'small'}
            min={0}
            max={duration * 1000}
            value={current * 1000}
            onChange={(_, t) => isNumber(t) && handleSliderChange(t)}
          />
        </div>
        <span>{dayjs.duration(duration * 1000).format('mm:ss')}</span>
      </div>
      {/* player */}
      <div className={'flex items-center justify-center gap-4px'}>
        {['init', 'pause'].includes(status) && playNode}
        {['play'].includes(status) && pauseNode}
        {stopNode}
      </div>
    </div>
  );
};