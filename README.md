# @philomena/philomena-css

The design of [Philomena](https://philomena.dev) as an extensible, **HTML/CSS-only** framework.
No JavaScript components are included, the stateful components only ship the styling hooks
(`.visible`, `[open]`, `.is-open`, ...) that your own markup or script toggles.

## Usage

Use the compiled stylesheet:

```html
<link rel="stylesheet" href="node_modules/@philomena/philomena-css/dist/philomena.css">
```

`dist/philomena.css` (and `.min.css`) works in browsers from September 2020 onwards: every color is computed at
build time. Everything is still controlled with custom properties, so single tokens can be overridden in plain CSS:

```css
:root {
  --ht-value-button-border-radius: .5rem;    /* any value token */
  --ht-color-card-bg-light: #fff;            /* any color token, per theme: -light / -dark */
  --ht-value-spacing-2: .75em;               /* the .m-*, .p-* utilities follow --ht-value-spacing-* */
}
```

Token reference:

| Property | Meaning |
| --- | --- |
| `--ht-value-*` | Sizes, spacing, radii, typography. Responsive ones have breakpoint overrides inside the stylesheet |
| `--ht-color-*-light` / `--ht-color-*-dark` | Per-theme colors, `--ht-color-*` is the alias that follows the active theme |
| `--ht-z-index-*` | Layering |

Themes are switched with `data-theme="light|dark"` on `:root` (defaults to `prefers-color-scheme`), RTL with
`dir="rtl"`. To change a responsive value at one breakpoint, override the property inside your own `@media` rule.
To retheme the alias `--ht-color-*` in the dark theme, set the `-dark` variant, or use a selector as specific as
`:root[data-theme="dark"]`.

### Building from the sources (PostCSS)

The sources in `css/` are plain CSS files built with PostCSS and three plugins, the same ones and in the same order
as Philomena: [postcss-mixins](https://github.com/postcss/postcss-mixins),
[postcss-simple-vars](https://github.com/postcss/postcss-simple-vars) and
[@csstools/postcss-relative-color-syntax](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-relative-color-syntax).
`@import`s are inlined by your bundler (Vite does it out of the box). You can reuse the package's configuration:

```js
// postcss.config.js
export { default } from '@philomena/philomena-css/postcss.config.js';
```

Configuration is done with `$variables`. Because they are substituted where they are defined, set them in a file of
your own that is imported **between** the configuration and the framework (all `@import`s have to come first, so
they cannot go in the same file):

```css
/* philomena-overrides.css */
$brand-color: #e8590c;
$breakpoint-md: 800px;
$breakpoint-below-md: 799px;
```

```css
/* your stylesheet */
@import "@philomena/philomena-css/css/config.css";
@import "./philomena-overrides.css";
@import "@philomena/philomena-css/css/framework.css";
```

See [`css/config.css`](css/config.css) for every setting. The colors derived from the brand color use relative
color syntax on `$variables` (`hsl(from $brand-color h s min(l + 22, 100))`), which the plugin computes into a
static color. Use `$variables` and not `var(--variables)` as the origin of a relative color: a `var()` can't be
computed at build time and would be left for the browser, which older browsers don't understand.

The page background gradient is opt-in and off by default (the `dist/` stylesheets do not include it). Import
`css/design/background-gradient.css` after the framework to enable it. Its colors and layout are the
`bg-gradient-*` tokens (`--ht-color-bg-gradient-*`, `--ht-value-bg-gradient-*`). The middle of the gradient is the
brand color, the start and end follow it too (a hue shift of the brand color) unless you override
`--ht-color-bg-gradient-start-light`/`-dark` and `--ht-color-bg-gradient-end-light`/`-dark`.

Single components can be used on their own, after the design layer:

```css
@import "@philomena/philomena-css/css/config.css";
@import "@philomena/philomena-css/css/design/index.css";
@import "@philomena/philomena-css/css/components/button.css";
```

The design layer also defines the mixins the framework is built with (`css/design/mixins.css`), for example
`@mixin button-color-variation accent;` adds `.button.button-accent` from `--ht-color-button-accent-*` tokens, and
`@mixin margin-utilities 5;` adds the margin utilities for a `--ht-value-spacing-5` token.

## Markup notes

The framework is plain CSS, so some structure is on you:

- **Icons are slots, none are shipped.** `.form-checkbox-check-icon`, `.form-select-icon`, `.button-icon` and
  `.loading-icon` are positioned for a fixed-width icon (about `1.25em` wide, `1em` tall, e.g. an inline SVG
  or Font Awesome's `fa-fw`). A text glyph will not line up.
- **Loading buttons need a `.loading-icon` element** placed before `.button-content` inside the button. The
  gradient and the dimmed content come from it, `.loading` alone shows neither.
- **Radio controls:** before v0.1.2, whitespace between `.form-radio-input-wrap` and `.form-radio-label` pushed
  the label out of line with checkbox labels. From v0.1.2 the control is a flex row and formatting is free.
- **`<summary>` has no marker.** The CSS reset removes the disclosure marker, so give `<details>` toggles their own
  affordance (chevron, border, pointer cursor).

See the [documentation site](https://meow.github.io/PhilomenaCSS/) for rendered examples.

## Status

Based on [HammerTimeCSS](https://github.com/WentTheFox/HammerTimeCSS) and adapted for use in the [Philomena](https://github.com/philomena-dev/philomena) project, work in progress. Documentation and live demo: <https://meow.github.io/PhilomenaCSS/> (source in [`docs/`](docs), an Astro site that is not part of the npm package).

## Releases

Releases are automatic. Commits to `main` follow [Conventional Commits](https://www.conventionalcommits.org/)
(enforced by commitlint, locally through a Husky hook and in CI). On every push to `main` the next
[semantic version](https://semver.org/) is computed from the commits since the last tag:

| Commit | Release |
| --- | --- |
| `fix:` | patch |
| `feat:` | minor |
| `feat!:` / `BREAKING CHANGE:` | major |
| `docs:`, `chore:`, `ci:`, `refactor:` ... | none |

The package is built and published to npm, then the `vX.Y.Z` tag and a GitHub release with the changelog are created.
`package.json` always says `0.0.0`, the version only lives in the tag.

## License

MIT
