import { mean, times } from 'lodash';

export const getAudioDomainData = (url: string, fftSize = 64, step = 100) => {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onloadedmetadata = async () => {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      const source = ctx.createMediaElementSource(audio);
      const points = times(Math.floor(audio.duration * 1000 / step), (index) => {
        return index * 100;
      });
      const uint8Array = new Uint8Array(fftSize >> 1); 

      source.connect(analyser);
      audio.play();

      const data = await Promise.all(points.map(async point => {
        audio.currentTime = point;
        
        analyser.getByteFrequencyData(uint8Array);
        return mean([...uint8Array]);
      }));

      resolve(data);
    };
  });
};