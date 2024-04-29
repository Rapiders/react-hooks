import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/cjs/index.cjs',
      format: 'cjs',
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
      typescript({ tsconfig: './tsconfig.cjs.json' }),
    ],
  },
  {
    input: './dist/dts/index.d.ts',
    output: [{ file: 'dist/cjs/index.d.cts', format: 'cjs' }],
    plugins: [dts()],
  },
];
