import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import unocss from 'unocss/vite';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [solid(), unocss(), copy({
    targets: [
      {
        src: './_redirects',
        dest: '',
      },
    ],
  })],
});
