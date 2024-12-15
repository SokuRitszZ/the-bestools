import { chunk, max, mean, min } from 'lodash';

export const getAudioDomainData = async (file: File) => {
  const ctx = new AudioContext();
  const buffer = await file.arrayBuffer();
  const audioBuffer = await ctx.decodeAudioData(buffer);
  const channelData = audioBuffer.getChannelData(0);
  const chunkSize = channelData.length / 10000;
  const chunks = chunk(channelData, chunkSize);
  const data = chunks.map(mean);
  const minData = min(data)!;
  const maxData = max(data)!;
  const a = maxData - minData;
  
  return data.map(x => (x - minData) / a);
};
