import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  external: ['react','react-dom','react-spring','@use-gesture/react'],
  output: [
    { file: 'dist/index.cjs.js', format: 'cjs', exports: 'named' },
    { file: 'dist/index.esm.js', format: 'es' },
  ],
  plugins: [resolve(), commonjs(), typescript()],
};
