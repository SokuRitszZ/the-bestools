import { Button, Slider } from '@mui/material';
import { useMemo, useState } from 'react';
import { isNumber } from 'lodash';
import { createCanvas, extractGifFrames, getImgAspect, transparentGif } from './utils';
import { GifData } from './types';
import { defineTool } from '@/utils';
import { file } from '@/utils/form-callbacks';

export const PicTransparentor = () => {
  const [currentFile, setCurrentFile] = useState<File>();
  const [afterUrl, setAfterUrl] = useState<string>();
  const [data, setData] = useState<GifData[]>();
  const currentUrl = useMemo(() => {
    if (!currentFile) {
      return '';
    }
    return URL.createObjectURL(currentFile);
  }, [currentFile]);

  const handleUpload = async (fl: FileList) => {
    const file = fl.item(0);

    if (!file) {
      return ;
    }

    setCurrentFile(file);

    const data = await extractGifFrames(file);

    setData(data);

    const gif = await transparentGif(file, 240);

    setAfterUrl(URL.createObjectURL(gif));
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState('');

  const handleSetCurrentIndex = async (index: number) => {
    setCurrentIndex(index);
    const frame = data?.[index];

    if (!frame || !currentFile) return ;
    
    const aspect = await getImgAspect(currentFile);
    const canvas = createCanvas(aspect);
    const ctx = canvas.getContext('2d', { alpha: true });

    if (!ctx) return ;

    const dims = frame.frame.dims;

    ctx.clearRect(0, 0, aspect.width, aspect.height);
    ctx.drawImage(frame.img, dims.left, dims.top, dims.width, dims.height);
    setCurrentFrame(canvas.toDataURL());
  };

  return (
    <div className={'h-full overflow-scroll'}>
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
      <div className={'w-full flex items-center justify-center'}>
        {currentUrl && <img className={'h-200px'} src={currentUrl} />}
      </div>
      <div className={'w-full flex items-center justify-center'}>
        {afterUrl && <img className={'h-200px'} src={afterUrl} />}
      </div>
      <div className={'w-full flex items-center justify-center h-200px'}>
        <img src={currentFrame} className={'h-200px'} />
      </div>
      <div className={'p-6 box-border w-full'}>
        {data ? 
          <Slider size={'small'}
            min={0}
            max={data?.length}
            value={currentIndex}
            onChange={(_, t) => isNumber(t) && handleSetCurrentIndex(t)}
            valueLabelDisplay={'auto'}
          />
          : undefined}
      </div>
    </div>
  );
};

defineTool({
  name: 'PicTransparentor',
  description: 'PicTransparentor',
  icon: <div className="i-mdi:square-transparent w-1em h-1em" />,
  component: <PicTransparentor />,
});