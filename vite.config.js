import { defineConfig } from 'vite';
import { glob } from 'glob';
import { relative, extname } from 'path';
import { readFileSync } from 'fs';

// Read package.json to get the version
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = packageJson.version;

// Find all .ts files in src, excluding .d.ts
const tsFiles = glob.sync('src/**/*.ts').filter(file => !file.endsWith('.d.ts'));

// Create entry points object for Vite, preserving directory structure
const entryPoints = Object.fromEntries(
  tsFiles.map(file => [
    // This will produce a key like 'floating-sharer' or 'components/button'
    relative('src', file.slice(0, file.length - extname(file).length)),
    // The value is the original file path
    file
  ])
);

export default defineConfig({
  build: {
    lib: {
      entry: entryPoints,
      name: 'LitComponents',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: `[name].v${version}.js`,
      },
    },
  },
});