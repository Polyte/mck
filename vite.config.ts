  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      host: true,
      strictPort: true,
      allowedHosts: [
        'localhost',
      ],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'motion',
        'framer-motion',
      ],
    },
  });