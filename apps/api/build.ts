Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: 'dist',
  sourcemap: 'external',
  target: 'bun',
  format: 'esm',
  minify: false,
})
