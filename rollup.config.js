import babel from '@rollup/plugin-babel';
import { dts } from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/esm/index.js',
      format: 'es',
    },
    plugins: [
      peerDepsExternal(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        extensions,
      }),
      resolve({
        extensions,
      }),
      terser(),
    ],
  },
  {
    input: './src/index.ts',
    output: [{ file: 'dist/esm/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: './src/index.ts',
    output: {
      file: './dist/cjs/index.cjs',
      format: 'cjs',
    },
    plugins: [
      peerDepsExternal(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        extensions,
      }),
      resolve({
        extensions,
      }),
    ],
  },
  {
    input: './src/index.ts',
    output: [{ file: 'dist/cjs/index.d.cts', format: 'cjs' }],
    plugins: [dts()],
  },
];
