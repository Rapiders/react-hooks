import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/esm/index.js',
      format: 'es',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: './dist/dts/index.d.ts',
    output: [{ file: 'dist/esm/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
