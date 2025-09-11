// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://femres.pages.dev',
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
    runtime: {
      mode: 'remote',
      type: 'pages'
    }
  }),
  trailingSlash: 'ignore',

  build: {
    inlineStylesheets: 'auto'
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['crypto', 'stream', 'util', 'buffer']
    }
  },

  integrations: [react()]
});