// rollup.config.js
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.js',
  output: {
    name: 'ElDataTable',
    exports: 'named'
  },
  plugins: [
    vue({
      css:true,
      compileTemplate: true
      // preprocessStyles: true //处理less或scss
    }),
    typescript(),
    postcss({
      extract: true
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
}

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(terser())
}

export default config