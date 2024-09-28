import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), unocss(), copy({
    targets: [
      {
        src: './_redirects',
        dest: '',
      },
    ],
  }), tsconfigPaths()],

  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
});
