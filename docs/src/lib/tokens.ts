import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface Token {
  name: string;
  value: string;
  /** The light theme's value, for colors (`value` is the dark theme's, the default) */
  light?: string;
}

export interface TokenGroup {
  id: string;
  title: string;
  tokens: Token[];
}

// The build runs from docs/, the stylesheet is built into the repository root's dist/
const cssPath = resolve(process.cwd(), '../dist/philomena.css');

const declarations = (block: string) => block.matchAll(/^ {2}(--[a-z0-9-]+):\s*(.+?);$/gm);

/**
 * Reads the custom properties of the published stylesheet, where every color is already computed: the dark theme
 * and the values from the top-level `:root` blocks (the first occurrence is the default, later ones are breakpoint
 * overrides), the light theme's colors from the `:root[data-theme="light"]` block. Properties set inside components
 * (`--_border-color`) are not tokens and are skipped.
 */
export const getTokenGroups = (): TokenGroup[] => {
  const css = readFileSync(cssPath, 'utf8');
  const seen = new Map<string, Token>();
  for (const block of css.matchAll(/^:root \{\n([\s\S]*?)^\}/gm)) {
    for (const match of declarations(block[1])) {
      if (!seen.has(match[1])) seen.set(match[1], { name: match[1], value: match[2] });
    }
  }
  const light = css.match(/^:root\[data-theme="light"\] \{\n([\s\S]*?)^\}/m);
  if (light) {
    for (const match of declarations(light[1])) {
      const token = seen.get(match[1]);
      if (token) token.light = match[2];
    }
  }
  const groups: TokenGroup[] = [
    { id: 'colors', title: 'Colors (--*-color, per theme)', tokens: [] },
    { id: 'fonts', title: 'Fonts (--*-font)', tokens: [] },
    { id: 'values', title: 'Sizes and other values', tokens: [] },
    { id: 'z-index', title: 'Layering (--z-*)', tokens: [] },
  ];
  for (const token of seen.values()) {
    let group = 2;
    if (token.name.endsWith('-color')) group = 0;
    else if (token.name.endsWith('-font')) group = 1;
    else if (token.name.startsWith('--z-')) group = 3;
    groups[group].tokens.push(token);
  }
  return groups.filter(group => group.tokens.length > 0);
};
