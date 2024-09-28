import { defineConfig, presetIcons, presetMini } from 'unocss';

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons(),
  ],
  shortcuts: {
    center: 'flex justify-center items-center',
  },
});
