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
              // Vendor chunk for React and core libraries
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'vendor';
                }
                // Google AI SDK in separate chunk (loaded on-demand)
                if (id.includes('@google/genai')) {
                  return 'ai-sdk';
                }
                // Other node_modules
                return 'vendor-libs';
              }
              
              // Split each tool into its own chunk for lazy loading
              if (id.includes('/components/tools/')) {
                const toolName = id.split('/components/tools/')[1]?.split('.')[0];
                return toolName ? `tool-${toolName.toLowerCase()}` : 'tools';
              }
              
              // Page components in separate chunks
              if (id.includes('/components/') && !id.includes('/components/tools/')) {
                if (id.includes('ToolsPage') || id.includes('BlogPage') || id.includes('CategoryPage')) {
                  return 'pages';
                }
              }
            }
          }
        },
        chunkSizeWarningLimit: 500, // Lower threshold for better splitting
        minify: 'terser', // Better minification
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.logs in production
            drop_debugger: true
          }
        }
      },
      publicDir: 'public',
      assetsInclude: ['**/*.xml', '**/*.txt']
    };
});
