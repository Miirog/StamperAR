// vite.config.js or vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/StamperAR/' : '/',
  };
});