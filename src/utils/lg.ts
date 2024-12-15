export const lg = (x: number) => {
  let i = 0;
  let c = x;
  while (c > 1) {
    c = c >> 1;
    ++i;
  }
  return i;
};