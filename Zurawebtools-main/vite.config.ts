import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              // Split vendor libraries (React, etc.) into separate chunk
              if (id.includes('node_modules')) {
                return 'vendor';
              }
              // Each tool component becomes its own chunk automatically via lazy()
              // This ensures minimal bundle size on each page load
            }
          }
        },
        chunkSizeWarningLimit: 1000
      },
      publicDir: 'public',
      assetsInclude: ['**/*.xml', '**/*.txt']
    };
});
