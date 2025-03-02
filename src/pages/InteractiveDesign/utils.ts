import { Vec } from './types';

/**
 * 二维向量叉乘
 * @param a 
 * @param b 
 */
export const cross2d = (a: Vec, b: Vec) => {
  return a[0] * b[1] - a[1] * b[0];
};