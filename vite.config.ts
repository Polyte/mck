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
      target: 'es2020',
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
        external: [],
      },
      minify: 'terser',
      sourcemap: false,
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
      force: true,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    },
  });