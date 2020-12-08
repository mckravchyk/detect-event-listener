/**
 * Add TypeScript plugin for Rollup
 * 
 * Using rollup-plugin-typescript2 rather than the official one as there were problems
 * with generating declaration files
 * https://github.com/rollup/plugins/issues/105
 * https://github.com/rollup/plugins/issues/247
 * 
 **/
//import typescript from '@rollup/plugin-typescript'
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const defaults = {
	input: 'src/detect-event-listener.ts',
	external: [
    ...Object.keys(pkg.dependencies || {}), 
    ...Object.keys(pkg.peerDependencies || {})
  ],
	plugins: [
		typescript()
	]
}

export default [
  {
    ...defaults,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      { 
        file: pkg.browser,
        name: 'detectEventListener',
        format: 'umd'
      }
    ],
  },
  {
    ...defaults,
    output: {
      file: pkg.module,
      format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: "tsconfig.json",
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: './dist'
          }
        },
        useTsconfigDeclarationDir: true,
      }),
    ],
  },

];