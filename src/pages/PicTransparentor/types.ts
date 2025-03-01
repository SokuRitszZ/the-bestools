import { ParsedFrame } from 'gifuct-js';

export interface GifData {
  img: HTMLCanvasElement;
  frame: ParsedFrame;
}

export interface ImgAspect {
  width: number;
  height: number;
}