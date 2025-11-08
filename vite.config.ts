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
            manualChunks: {
              vendor: ['react', 'react-dom'],
              tools: [
                './components/tools/WordCounter',
                './components/tools/RemoveExtraSpaces',
                './components/tools/CaseConverter',
                './components/tools/LoremIpsumGenerator',
                './components/tools/TimeDifferenceCalculator',
                './components/tools/PercentageChangeCalculator',
                './components/tools/HexToRGBConverter',
                './components/tools/AccessibleColorContrastChecker',
                './components/tools/JSONFormatterValidator',
                './components/tools/ShadowCSSGenerator',
                './components/tools/ColorHarmonyChecker'
              ]
            }
          }
        },
        chunkSizeWarningLimit: 1000
      },
      publicDir: 'public',
      assetsInclude: ['**/*.xml', '**/*.txt']
    };
});
