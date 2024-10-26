import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),commonjs(), nodeResolve()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  build: {
    minify: 'esbuild', // alternatively, try 'terser' if Rollup parsing fails
    sourcemap: false,
  },
  resolve: {
    alias: {
      react: require.resolve('react'),
    },
  },

});
