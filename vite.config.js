import { defineConfig } from 'vite';

// Browsers from September 2020: every relative color has to be computed at build time, and nothing newer than
// that can be left for the browser to work out
export const cssTarget = ['chrome85', 'edge85', 'firefox81', 'safari14', 'ios14', 'opera71'];

// `vite build` builds dist/philomena.css, `vite build --mode min` the minified dist/philomena.min.css
export default defineConfig(({ mode }) => {
  const minify = mode === 'min';
  return {
    publicDir: false,
    logLevel: 'warn',
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      cssTarget,
      cssMinify: minify,
      rolldownOptions: {
        input: { philomena: 'css/index.css' },
        output: { assetFileNames: minify ? 'philomena.min.css' : 'philomena.css' },
      },
    },
  };
});
