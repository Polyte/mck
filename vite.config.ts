import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'build',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'motion',
      'framer-motion',
    ],
    force: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  esbuild: {
    target: 'es2020',
  },
});
