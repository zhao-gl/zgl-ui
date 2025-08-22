// vite.config.js
import { defineConfig } from 'vite';
// @ts-ignore
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  root: 'src',
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});
