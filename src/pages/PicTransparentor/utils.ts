// disposal methods: https://www.matthewflickinger.com/lab/whatsinagif/animation_and_transparency.asp
import GIF from 'gif.js';
import { decompressFrames, parseGIF } from 'gifuct-js';
import { compact } from 'lodash';
import { GifData, ImgAspect } from './types';

export const getImgAspect = async (file: File): Promise<ImgAspect> => {
  const img = new Image();
  
  img.src = URL.createObjectURL(file);

  return await new Promise((resolve) => {
    img.addEventListener('load', () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    });
  });
};

export const createCanvas = (aspect: ImgAspect) => {
  const canvas = document.createElement('canvas');
  
  canvas.width = aspect.width;
  canvas.height = aspect.height;

  return canvas;
};

/**
 * 解析 Gif 帧
 * @param file 
 * @returns 
 */
export const extractGifFrames = async (file: File): Promise<GifData[]> => {
  const buffer = await file.arrayBuffer();
  const gif = parseGIF(buffer);
  const frames = decompressFrames(gif, true);
  
  return compact(frames.map(frame => {
    const canvas = createCanvas({
      width: frame.dims.width,
      height: frame.dims.height,
    });
    const ctx = canvas.getContext('2d', { alpha: true });

    if (!ctx) {
      return ;
    }

    ctx.globalCompositeOperation = 'source-over';

    const img = ctx.createImageData(frame.dims.width, frame.dims.height);
    
    ctx.clearRect(0, 0, frame.dims.width, frame.dims.height);
    img.data.set(frame.patch);
    frame.pixels.forEach((pixel, i) => {
      const offset = i * 4;
      const color = frame.colorTable[pixel];
      
      if (color) return ;

      img.data[offset + 3] = 0;
    });
    ctx.putImageData(img, 0, 0);
    
    return {
      img: canvas,
      frame,
    };
  }));
};

export const transparentGif = async (file: File, opacity = 1): Promise<Blob> => {
  const aspect = await getImgAspect(file);
  const { width, height } = aspect;
  const gif = new GIF({
    workers: 2,
    quality: 30,
    width,
    height,
    transparent: '0x0000FF',
    // background: '0x0000FF00',
  });
  const frames = await extractGifFrames(file);
  const canvas = createCanvas(aspect);
  const ctx = canvas.getContext('2d', { alpha: true });

  if (!ctx) return new Blob();

  ctx.globalCompositeOperation = 'source-over';

  frames.forEach(({ img, frame }) => {
    const dims = frame.dims;
    
    if (frame.disposalType === 2) {
      ctx.clearRect(0, 0, width, height);
    }

    ctx.drawImage(img, dims.left, dims.top, dims.width, dims.height);

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    
    for (let i = 0; i < height; ++i) {
      let crossBlack = false;
      const handle = (x: number, y: number) => {
        const index = (y * width + x) * 4;
        const [r, g, b, a] = data.slice(index, index + 4);
        if (!crossBlack && a === 0) {
          data[index] = 0;
          data[index + 1] = 0;
          data[index + 2] = 255; 
          data[index + 3] = 255;
        }
        else if (!crossBlack && r + g + b !== 0) {
          crossBlack = true;
        }
      };
      for (let j = 0; j < width; ++j) {
        handle(j, i);
      }
      // reverse
      crossBlack = false;
      for (let j = width - 1; j >= 0; --j) {
        handle(j, i);
      }
    }

    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b, a] = data.slice(i, i + 4);
      if (r === 0 && g === 0 && b === 255 && a === 255) {
        continue;
      }
      // const [r, g, b, a] = data.slice(i, i + 4);
      if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
      else {
        data[i + 3] = opacity;
      }
    // const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b | 0;
    // const newAlpha = (255 - luminance) * a / 255;
    // data[i] = 0;
    // data[i + 1] = 0;
    // data[i + 2] = luminance;
    // data[i + 3] = newAlpha;
    }
    
    const tmpCanvas = createCanvas(aspect);
    const tmpCtx = tmpCanvas.getContext('2d', { alpha: true });

    if (!tmpCtx) return ;

    tmpCtx?.clearRect(0, 0, width, height);
    tmpCtx.putImageData(imgData, 0, 0);
    gif.addFrame(tmpCanvas, { delay: frame.delay });
  });

  return new Promise(resolve => {
    gif.on('finished', blob => resolve(blob));
    gif.render();
  });
};