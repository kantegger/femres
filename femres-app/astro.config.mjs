// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://femres.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',

  build: {
    inlineStylesheets: 'auto'
  },

  vite: {
    plugins: [tailwindcss()]
  }
});