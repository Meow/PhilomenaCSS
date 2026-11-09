import { defineConfig } from 'astro/config';

// Project page: https://meow.github.io/PhilomenaCSS/
export default defineConfig({
  site: 'https://meow.github.io',
  base: '/PhilomenaCSS',
  trailingSlash: 'ignore',
  // Compression removes the newline whitespace between text and inline elements, gluing words together
  compressHTML: false,
});
