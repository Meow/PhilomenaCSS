import { defineConfig } from 'astro/config';

// Project page: https://wentthefox.github.io/HammerTimeCSS/
export default defineConfig({
  site: 'https://wentthefox.github.io',
  base: '/HammerTimeCSS',
  trailingSlash: 'ignore',
  // Compression removes the newline whitespace between text and inline elements, gluing words together
  compressHTML: false,
});
