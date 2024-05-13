import { defineConfig } from "vite";
import path from 'path'


export default defineConfig({
  root: './',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: [
      {
        find: /^src\/utils/,
        replacement: '',
        customResolver(source, importer, options) {
            return path.join('./src/utils', `${source}.ts`)
        },
      }
    ]
  },
  build: {
    target: 'ES2015',
    outDir: 'build',
    minify:false
  }
})

// D:\qifeng\pont-demo\src\utils\pontFetch.ts