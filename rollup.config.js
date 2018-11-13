import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: './src/rehook/index.js',
    external: ['react', 'react-dom'],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
    ],
    output: [
      {
        file: 'dist/rehook.js',
        format: 'cjs',
      },
      {
        file: 'dist/rehook.umd.js',
        format: 'umd',
        name: '@synvox/rehook/',
      },
    ],
  },
  {
    input: './src/rehook/test-utils.js',
    external: ['react', 'react-dom', 'enzyme'],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve(),
      commonjs({
        include: 'node_modules/**',
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
    ],
    output: [
      {
        file: 'test-utils/index.js',
        format: 'cjs',
      },
      {
        file: 'test-utils/index.umd.js',
        format: 'umd',
        name: '@synvox/rehook/test-utils',
      },
    ],
  },
]
