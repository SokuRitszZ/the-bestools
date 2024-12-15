import { isNumber, times } from 'lodash';
import { useState } from 'react';
import { Button, Slider } from '@mui/material';
import { useTrackAudio } from './hooks/useTrackAudio';
import { AudioPlayer } from './components/AudioPlayer';
import { WaveForm } from './components/WaveForm';
import { defineTool } from '@/utils';
import { file } from '@/utils/form-callbacks';
import { lg } from '@/utils/lg';

export const AudioWaving = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [fftSize, setFftSize] = useState(2048);
  const [data, setData] = useState(times(fftSize >> 1, () => 0));
  // const [avgs, setAvgs] = useState<number[]>([]);
  useTrackAudio({
    audio,
    onSampled: (data) => setData(data),
    fftSize,
  });

  const handleUpload = (file: FileList) => {
    const audioFile = file.item(0);
    if (!audioFile) {
      setAudio(undefined);
      return ;
    }

    const url = URL.createObjectURL(audioFile);
    setAudio(new Audio(url));
  };

  return (
    <div className={'w-full'}>
      {/* wave */}
      <WaveForm data={data} />
      <Slider
        marks={[5, 6, 7, 8, 9, 10, 11].map(x=> ({ value: x, label: 1 << x }))}
        className={'w-75% mt-6'}
        min={5} 
        max={11}
        step={1}
        value={lg(fftSize)}
        onChange={(_, t) => isNumber(t) && setFftSize(1 << t)}
      />
      {/* upload */}
      <div className={'flex justify-center'}>
        <Button
          component={'label'}
          className={'w-fit'}
        >
          Select Audio File 
          <input
            onChange={file(handleUpload)}
            className={'hidden'} type={'file'}
          />
        </Button>
      </div>
      {/* player */}
      {audio ? 
        <AudioPlayer audio={audio} className={'w-full'}/>
        : undefined}
    </div>
  );
};

defineTool({
  name: 'AudioWaving',
  description: 'Visual audio wave.',
  component: <AudioWaving />,
  icon: <div className="i-mdi:waveform w-1em h-1em"></div>,
});