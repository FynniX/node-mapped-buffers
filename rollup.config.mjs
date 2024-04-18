// rollup.config.mjs
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import multi from '@rollup/plugin-multi-entry'
import eslint from '@rollup/plugin-eslint'

export default {
  input: 'lib/**/*.ts',
  external: ['fs'],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      preserveModules: true,
    },
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    }
  ],
  plugins: [
    typescript(),
    commonjs(),
    multi({
      preserveModules: true,
    }),
    eslint()
  ]
}
