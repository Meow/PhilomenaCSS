import { icon, iconSetLabels, type IconName, type IconSet } from './icons';

export interface Story {
  id: string;
  title: string;
  description: string;
  html: string;
  /** Markup pitfalls shown next to the story, trusted HTML */
  notes?: string[];
}

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const ucfirst = (value: string) => value[0].toUpperCase() + value.slice(1);

// Markup helpers for the pieces the stories repeat
const button = (text: string, classes = '', attrs = '') =>
  `<button type="button" class="button${classes ? ` ${classes}` : ''}"${attrs ? ` ${attrs}` : ''}><span class="button-content"><span class="button-text">${text}</span></span></button>`;
const badge = (text: string, classes = '') =>
  `<span class="badge${classes ? ` ${classes}` : ''}"><span class="badge-content">${text}</span></span>`;
const block = (title: string, body: string) =>
  `<section class="block"><header class="block-header"><span class="block-header-title">${title}</span></header><div class="block-content">${body}</div></section>`;

const alertIcon = (name: IconName) => `<span class="alert-icon">${icon('fontawesome', name)}</span>`;
const alerts = `<div class="alert alert-primary">${alertIcon('question')}<div class="alert-text">Primary alert. ${lorem} <a href="#">A link</a>.</div></div>
<div class="alert alert-warning">${alertIcon('exclamation')}<div class="alert-text">Warning alert. ${lorem} <a href="#">A link</a>.</div></div>
<div class="alert alert-success">${alertIcon('check')}<div class="alert-text">Success alert. ${lorem} <a href="#">A link</a>.</div></div>
<div class="alert alert-danger">${alertIcon('flag')}<div class="alert-text">Danger alert. ${lorem} <a href="#">A link</a>.</div></div>
<div class="alert alert-special">${alertIcon('star')}<div class="alert-text">Special alert. ${lorem} <a href="#">A link</a>.</div></div>
<div class="alert">Plain alert without an icon. ${lorem} <a href="#">A link</a>.</div>`;

const loadingIndicator =
  '<svg class="loading-indicator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1em" height="1em"><path d="M35 32a3.001 3.001 0 0 1-6 0l3-26.074L35 32Z" class="minute"/><path d="M35 32a3.001 3.001 0 0 1-6 0l3-13.037L35 32Z" class="hour"/><g class="base"><circle cx="32" cy="32" r="29" class="face"/><path d="M32 3v7m0 44v7m22-29h7M3 32h7" class="ticking"/></g></svg>';

// With `spinner` the loading slot holds the set's spinning icon instead of the clock indicator
const buttonRow =
  (set: IconSet, spinner = false) =>
  (color?: string) => {
    const loadingContent = spinner ? icon(set, 'spinner', 'docs-spin') : loadingIndicator;
    const cls = color ? `button button-${color}` : 'button';
    const label = color ?? 'default';
    const btn = (extra: string, attrs: string, text: string, loading = false) =>
      `  <button type="button" class="${cls}${extra}"${attrs}>${loading ? `<span class="loading-icon">${loadingContent}</span>` : ''}<span class="button-content"><span class="button-text">${text}</span></span></button>`;
    const iconBtn = (extra: string, attrs: string, loading = false) =>
      `  <button type="button" class="${cls} icon-only${extra}"${attrs} aria-label="${ucfirst(label)} icon-only button">${loading ? `<span class="loading-icon">${loadingContent}</span>` : ''}<span class="button-content"><span class="button-icon">${icon(set, 'clipboard')}</span></span></button>`;
    return `<div class="button-group separated">
${btn('', '', `${ucfirst(label)}`)}
${btn('', ' disabled', 'Disabled')}
${btn(' pressed', '', 'Pressed')}
${btn(' loading', ' disabled', 'Loading', true)}
${iconBtn('', '')}
${iconBtn('', ' disabled')}
${iconBtn(' loading', ' disabled', true)}
</div>`;
  };

const badgeSizedButtons = `<div class="docs-stack">
<div class="button-group separated button-size-badge">
  ${button('Default')}
  ${button('Primary', 'button-primary')}
  ${button('Success', 'button-success')}
  ${button('Warning', 'button-warning')}
  ${button('Danger', 'button-danger')}
  ${button('Special', 'button-special')}
  ${button('Disabled', '', 'disabled')}
  <button type="button" class="button icon-only" aria-label="Copy"><span class="button-content"><span class="button-icon">${icon('fontawesome', 'clipboard')}</span></span></button>
</div>
<div class="button-group button-size-badge">
  ${button('Newest')}
  ${button('Score', 'pressed')}
  ${button('Relevance')}
  ${button('Random')}
</div>
<div class="button-group button-size-badge">
  ${button('Upvote', 'button-primary')}
  ${button('Fave', 'button-primary')}
  ${button('Hide', 'button-primary')}
</div>
<div>
  ${button('A single badge-sized button', 'button-size-badge button-special')}
</div>
</div>`;

// Pagination: the links of a page in the middle, on the first page (First and Prev unavailable), colored, and with a count
const pageLink = (n: number | string, current = false) =>
  current
    ? `<span class="pagination-link current" aria-current="page">${n}</span>`
    : `<a class="pagination-link" href="#">${n}</a>`;
const pagination = (type?: string, first = false) => {
  const end = (text: string, glyph: string, after = false) => {
    const slot = `<span class="pagination-icon">${glyph}</span>`;
    const content = after ? `${text}${slot}` : `${slot}${text}`;
    if (first && !after) return `<span class="pagination-link">${content}</span>`;
    return `<a class="pagination-link" href="#">${content}</a>`;
  };
  const current = first ? 1 : 12;
  const numbers = first
    ? [pageLink(1, true), pageLink(2), pageLink(3), pageLink(4), pageLink(5)]
    : [pageLink(10), pageLink(11), pageLink(12, true), pageLink(13), pageLink(14)];
  return `<nav class="pagination${type ? ` pagination-${type}` : ''}" aria-label="Pages (${type ?? 'default'}, page ${current})">
  ${end('First', '«')}
  ${end('Prev', '‹')}
  ${first ? '' : '<span class="pagination-gap">…</span>\n  '}${numbers.join('\n  ')}
  <span class="pagination-gap">…</span>
  ${end('Next', '›', true)}
  ${end('Last', '»', true)}
</nav>`;
};
const paginations = `<div class="docs-stack">
${pagination()}
${pagination(undefined, true)}
<div class="pagination-bar">
  ${pagination('primary').replaceAll('\n', '\n  ')}
  <span class="pagination-info">Showing 276–300 of 1,234 results</span>
</div>
${pagination('success')}
<div class="pagination-bar">
  ${pagination('special').replaceAll('\n', '\n  ')}
  <div class="button-group button-size-badge">
    ${button('Newest', 'button-special')}
    ${button('Score', 'button-special pressed')}
  </div>
  ${button('Jump to page', 'button-size-badge')}
</div>
</div>`;

const comboboxItem = (main: string, state = '', addon?: string, mark?: string) => {
  const text = mark ? main.replace(mark, `<mark>${mark}</mark>`) : main;
  return `      <div class="combobox-suggestion-item${state}" role="option">
        <div class="combobox-suggestion-item-label">
          <span class="combobox-suggestion-item-text"><span class="combobox-suggestion-item-main-text">${text}</span></span>${
            addon
              ? `
          <span class="combobox-suggestion-item-addon">${addon}</span>`
              : ''
          }
        </div>
      </div>`;
};

const combobox = (set: IconSet = 'fontawesome') => `<div class="form-control-group vertical">
  <div class="form-control-wrap">
    <div class="form-control">
      <label class="form-control-label" for="combobox-closed">Closed (select only)</label>
      <div class="form-control-select form-control-combobox full-width">
        <input id="combobox-closed" class="form-select-input input-field full-width" type="text" role="combobox" aria-expanded="false" value="Europe/Warsaw" readonly>
        <span class="form-select-icon">${icon(set, 'chevron-down')}</span>
      </div>
    </div>
  </div>
  <div class="form-control-wrap">
    <div class="form-control">
      <label class="form-control-label" for="combobox-open">Open (typing allowed)</label>
      <div class="form-control-select form-control-combobox allow-typing suggestions-open has-suggestions full-width">
        <input id="combobox-open" class="form-select-input input-field full-width" type="text" role="combobox" aria-expanded="true" value="eu">
        <span class="form-select-icon">${icon(set, 'chevron-down')}</span>
        <div class="combobox-suggestions" role="listbox">
          <div class="combobox-suggestion-header combobox-suggestion-header-overlay">Europe</div>
${comboboxItem('Europe/London', '', 'UTC+0', 'Eu')}
${comboboxItem('Europe/Warsaw', ' selected', 'UTC+1', 'Eu')}
${comboboxItem('Europe/Berlin', ' highlighted', 'UTC+1', 'Eu')}
${comboboxItem('Europe/Helsinki', '', 'UTC+2', 'Eu')}
          <div class="combobox-suggestion-header">Other</div>
${comboboxItem('Africa/Cairo', '', 'UTC+2')}
${comboboxItem('America/Argentina/Buenos_Aires (Argentina Standard Time)', ' addon-mode-dynamic label-truncated', 'UTC-3')}
        </div>
      </div>
    </div>
  </div>
</div>`;

const buttonsFor = (set: IconSet) =>
  `<div class="docs-stack">\n${[undefined, 'primary', 'success', 'danger', 'warning', 'special'].map(buttonRow(set)).join('\n')}\n</div>`;

const formFields = (state: 'regular' | 'disabled', set: IconSet = 'fontawesome', prefix: string = state) => {
  const attr = state === 'regular' ? '' : ` ${state}`;
  return `<div class="form-control-group vertical">
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control">
      <label class="form-control-label" for="${prefix}-text">Text input</label>
      <input id="${prefix}-text" class="input-field" type="text" value="Hello"${attr}>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control">
      <label class="form-control-label" for="${prefix}-select">Select</label>
      <div class="form-control-select">
        <select id="${prefix}-select" class="form-select-input input-field"${attr}>
          <option>First</option>
          <option>Second</option>
        </select>
        <span class="form-select-icon">${icon(set, 'chevron-down')}</span>
      </div>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control-checkbox">
      <span class="form-checkbox-input-wrap">
        <input id="${prefix}-check" class="form-checkbox-input" type="checkbox" checked${state === 'regular' ? '' : ' disabled'}>
        ${icon(set, 'check', 'form-checkbox-check-icon')}
      </span>
      <label class="form-checkbox-label" for="${prefix}-check">Checkbox</label>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control-switch">
      <input id="${prefix}-switch-on" class="form-switch-input" type="checkbox" checked${state === 'regular' ? '' : ' disabled'}>
      <label class="form-switch-label" for="${prefix}-switch-on">Switch, on</label>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control-switch">
      <input id="${prefix}-switch-off" class="form-switch-input" type="checkbox"${state === 'regular' ? '' : ' disabled'}>
      <label class="form-switch-label" for="${prefix}-switch-off">Switch, off</label>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control-radio">
      <span class="form-radio-input-wrap">
        <input id="${prefix}-radio" class="form-radio-input" type="radio" name="${prefix}-radio" checked${state === 'regular' ? '' : ' disabled'}>
        <span class="form-radio-select-icon"></span>
      </span><label class="form-radio-label" for="${prefix}-radio">Radio</label>
    </div>
  </div>
</div>`;
};

const readonlyFields = `<div class="form-control-group vertical">
  <div class="form-control-wrap">
    <div class="form-control">
      <label class="form-control-label" for="readonly-text">Text input</label>
      <input id="readonly-text" class="input-field" type="text" value="Hello" readonly>
    </div>
  </div>
  <div class="form-control-wrap">
    <div class="form-control">
      <label class="form-control-label" for="readonly-textarea">Textarea</label>
      <textarea id="readonly-textarea" class="input-field" rows="3" cols="40" readonly>${lorem}</textarea>
    </div>
  </div>
</div>`;

const editorButton = (name: IconName, title: string, extra = '') =>
  `        <button class="editor-button${extra}" type="button" title="${title}" aria-label="${title}">${icon('fontawesome', name)}</button>`;
const editor = `<div class="docs-stack">
  <div class="editor">
    <div class="editor-toolbar" role="toolbar" aria-label="Formatting">
      <div class="editor-toolbar-group">
${editorButton('bold', 'Bold')}
${editorButton('italic', 'Italic', ' active')}
${editorButton('underline', 'Underline')}
${editorButton('strikethrough', 'Strikethrough')}
      </div>
      <div class="editor-toolbar-group">
${editorButton('quote', 'Quote')}
${editorButton('code', 'Code')}
${editorButton('eye-slash', 'Spoiler')}
      </div>
      <div class="editor-toolbar-group">
${editorButton('link', 'Link')}
${editorButton('image', 'Image')}
        <button class="editor-button" type="button" disabled>Escape</button>
      </div>
      <span class="editor-toolbar-spacer"></span>
      <button class="editor-button" type="button">${icon('fontawesome', 'eye')}Preview</button>
    </div>
    <textarea class="editor-input" rows="6" aria-label="Comment" placeholder="Write a comment. The lower edge resizes the box.">Some *italic* text, with the Italic button marked .active.</textarea>
    <div class="editor-footer"><span>Markdown is supported. <a href="#">Syntax help</a></span><span>58 / 2,000</span></div>
  </div>
  <div class="editor">
    <textarea class="editor-input mono" rows="3" aria-label="Bare editor" placeholder="Without a toolbar or footer, in the monospace font (.mono)."></textarea>
  </div>
  <div class="form-control">
    <label class="form-control-label" for="editor-plain">A plain textarea (.input-field), resized by its lower edge as well</label>
    <textarea id="editor-plain" class="input-field full-width" rows="3"></textarea>
  </div>
</div>`;

const tagCategories: [string | undefined, string, number][] = [
  [undefined, 'space opera', 1234],
  ['rating', 'safe', 987654],
  ['spoiler', 'spoiler:season finale', 321],
  ['origin', 'artist:drew struzan', 45],
  ['oc', 'oc:captain nova', 6],
  ['error', 'error', 7],
  ['character', 'ellen ripley', 89012],
  ['official', 'official art', 34],
  ['fanmade', 'fan art', 56],
  ['species', 'android', 7890],
  ['body', 'cyborg', 123],
];
const tagList = () =>
  tagCategories
    .map(
      ([cat, name, count]) =>
        `  <span class="tag${cat ? ` tag-${cat}` : ''}"><a class="tag-name" href="#">${name}</a><span class="tag-count">${count}</span></span>`,
    )
    .join('\n');

// Placeholder pictures for the media stories: an SVG gradient of that size, with the size written on it
const picture = (w: number, h: number, from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="${Math.min(w, h) / 8}" fill="#fff" opacity=".85">${w} × ${h}</text></svg>`)}`;
// A spoiler image as Philomena's tags have: an SVG emblem that is shown instead of the thumbnail
const spoilerImage = (name: Parameters<typeof icon>[1], bg: string, fg: string) => {
  const [, viewBox, path] = icon('fontawesome', name).match(/viewBox="([^"]+)".*<path d="([^"]+)"/)!;
  const [, , w, h] = viewBox.split(' ').map(Number);
  const scale = 110 / Math.max(w, h);
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"><rect width="250" height="250" fill="${bg}"/><path transform="translate(${125 - (w * scale) / 2} ${125 - (h * scale) / 2}) scale(${scale})" fill="${fg}" d="${path}"/></svg>`)}`;
};
const mediaBoxes = (items: [string, number, number, string, string, string][]) =>
  items
    .map(([title, w, h, from, to, extra]) => {
      const cls = extra.replace(' notitle', '');
      const header = extra.includes('notitle')
        ? ''
        : `\n    <div class="media-box-header"><a href="#">${title}</a></div>`;
      const badges = extra.includes('notitle')
        ? '<span class="media-box-overlays"><span>12 comments</span><span class="media-primary">safe</span></span><span class="media-box-overlay bottom">★ 34</span>'
        : '';
      return `  <figure class="media-box${cls}">${header}
    <a class="media-box-content" href="#"><img src="${picture(w, h, from, to)}" alt="${title}">${badges}</a>
  </figure>`;
    })
    .join('\n');

// A thumbnail as on Philomena: fave, upvote, score, downvote, comments and hide in the header
const imageBox = (
  w: number,
  h: number,
  from: string,
  to: string,
  faves: number,
  score: number,
  comments: number,
  active = '',
) => {
  const fa = (name: Parameters<typeof icon>[1]) => icon('fontawesome', name);
  const on = (kind: string) => (active === kind ? ' active' : '');
  return `  <figure class="media-box">
    <div class="media-box-header actions">
      <a class="media-box-action fave${on('fave')}" href="#" title="Fave">${fa('star')}<span>${faves}</span></a>
      <a class="media-box-action upvote${on('upvote')}" href="#" title="Upvote">${fa('arrow-up')}</a>
      <span class="media-box-score" title="Score">${score}</span>
      <a class="media-box-action downvote${on('downvote')}" href="#" title="Downvote">${fa('arrow-down')}</a>
      <a class="media-box-action comments" href="#" title="Comments">${fa('comments')}<span>${comments}</span></a>
      <a class="media-box-action hide${on('hide')}" href="#" title="Hide">${fa('eye-slash')}</a>
    </div>
    <a class="media-box-content" href="#"><img src="${picture(w, h, from, to)}" alt="A thumbnail"></a>
  </figure>`;
};

// Philomena's navigation: the secondary header's links and their menus, and the user menu at the end, which is held
// open with .open so that a menu shows in the docs
type FaName = Parameters<typeof icon>[1];
const navbar = (() => {
  const fa = (name: FaName) => icon('fontawesome', name);
  const entry = ([text, name]: [string, (FaName | '')?]) =>
    `        <a class="navbar-menu-item" href="#">${name === undefined ? '' : `<span class="navbar-menu-icon">${name ? fa(name) : ''}</span>`}<span class="navbar-menu-text">${text}</span></a>`;
  const dropdown = (
    name: FaName,
    text: string,
    entries: [string, (FaName | '')?][],
  ) => `    <div class="navbar-dropdown">
      <a class="navbar-item caret" href="#" aria-haspopup="true"><span class="navbar-icon">${fa(name)}</span>${text}</a>
      <div class="navbar-menu">
${entries.map(entry).join('\n')}
      </div>
    </div>`;
  return `<div style="min-height: 34rem">
  <input class="burger-toggle" type="checkbox" id="navbar-burger">
  <nav class="navbar" aria-label="Site">
    <label class="navbar-item navbar-burger" for="navbar-burger"><span class="navbar-icon">${fa('bars')}</span>Menu</label>
${dropdown('image', 'Images', [['Random']])}
${dropdown('activity', 'Activity', [['Comments']])}
${dropdown('comments', 'Forums', [
  ['Site and Policy', ''],
  ['General Discussion', ''],
  ['Art Chat', ''],
  ['Tagging Discussion', ''],
  ['Post Search', 'search'],
])}
${dropdown('tags', 'Tags', [['Tag Changes']])}
    <a class="navbar-item" href="#"><span class="navbar-icon">${fa('video')}</span><span class="hidden-below-xl">Livestreams</span> ${badge('3 live', 'badge-danger')}</a>
    <a class="navbar-item" href="#"><span class="navbar-icon">${fa('images')}</span><span class="hidden-below-xl">Galleries</span></a>
    <a class="navbar-item" href="#"><span class="navbar-icon">${fa('palette')}</span><span class="hidden-below-xl">Commissions</span></a>
    <span class="navbar-spacer"></span>
    <a class="navbar-item navbar-pinned" href="#" title="Notifications"><span class="navbar-icon counter-anchor">${fa('bell')}<span class="counter counter-danger corner">12</span></span></a>
    <a class="navbar-item navbar-pinned" href="#" title="Conversations"><span class="navbar-icon counter-anchor">${fa('envelope')}<span class="counter counter-danger corner">3</span></span></a>
    <div class="navbar-dropdown navbar-pinned open">
      <a class="navbar-item caret" href="#" aria-haspopup="true" aria-expanded="true"><span class="navbar-icon">${fa('user')}</span><span class="hidden-below-xxl">Username</span></a>
      <div class="navbar-menu end">
${(
  [
    ['Watched', 'eye'],
    ['Faves', 'star'],
    ['Upvotes', 'arrow-up'],
    ['Galleries', 'image'],
    ['Uploads', 'upload'],
    ['Comments', 'comments'],
    ['Posts', 'pen-square'],
    ['Links', 'link'],
    ['Settings', 'gear'],
    ['Messages', 'envelope'],
    ['Account', 'user'],
  ] as [string, FaName][]
)
  .map(entry)
  .join('\n')}
        <hr class="navbar-menu-divider">
${entry(['Logout', 'sign-out'])}
      </div>
    </div>
  </nav>
  ${burgerPanel('navbar-burger')}
</div>`;
})();

// Stories for the navigation pieces and helpers that came from Philomena's general styles
const fai = (name: FaName) => icon('fontawesome', name);
const dropdownItem = ([text, name, extra]: [string, FaName, string?]) =>
  `      <a class="dropdown-item${extra ?? ''}" href="#"><span class="dropdown-icon">${fai(name)}</span>${text}</a>`;
const dropdowns = `<div class="flex flex-wrap gap-md" style="min-height: 13rem; align-items: flex-start">
  <div class="dropdown">
    ${button('Hover or focus me', '', 'aria-haspopup="true"')}
    <div class="dropdown-menu">
${(
  [
    ['Edit', 'pen'],
    ['Copy link', 'link'],
    ['Hide', 'eye-slash'],
  ] as [string, FaName][]
)
  .map(dropdownItem)
  .join('\n')}
      <hr class="dropdown-divider">
${dropdownItem(['Delete', 'trash', ' dropdown-danger'])}
    </div>
  </div>
  <div class="dropdown manual open">
    ${button('Held open with .open', 'button-primary', 'aria-haspopup="true" aria-expanded="true"')}
    <div class="dropdown-menu">
      <a class="dropdown-item current" href="#">Newest first</a>
      <a class="dropdown-item" href="#">Oldest first</a>
      <a class="dropdown-item" href="#">Top rated</a>
    </div>
  </div>
  <div class="dropdown">
    <a href="#" aria-haspopup="true">A plain link as the trigger</a>
    <div class="dropdown-menu end">
      <a class="dropdown-item" href="#">Aligned to the end</a>
      <a class="dropdown-item" href="#">of its trigger</a>
    </div>
  </div>
</div>`;

// The panel and overlay of a burger menu toggled by the checkbox with the given id (a hoisted function: the navbar
// story above uses it too)
function burgerPanel(id: string) {
  const item = ([text, name]: [string, FaName]) =>
    `  <a class="burger-item" href="#"><span class="burger-icon">${icon('fontawesome', name)}</span>${text}</a>`;
  const links: [string, FaName][] = [
    ['Images', 'image'],
    ['Activity', 'activity'],
    ['Forums', 'comments'],
    ['Tags', 'tags'],
    ['Livestreams', 'video'],
    ['Galleries', 'images'],
    ['Commissions', 'palette'],
  ];
  return `<nav class="burger" aria-label="Menu">
  <div class="burger-header">Menu <label class="burger-close" for="${id}" aria-label="Close">×</label></div>
${links.map(item).join('\n')}
  <hr class="burger-divider">
${item(['Settings', 'gear'])}
${item(['Logout', 'sign-out'])}
</nav>
<label class="burger-overlay" for="${id}"></label>`;
}

const burger = `<input class="burger-toggle" type="checkbox" id="burger-demo">
<label class="button" for="burger-demo"><span class="button-content"><span class="button-icon">${fai('bars')}</span><span class="button-text">Open the menu</span></span></label>
${burgerPanel('burger-demo')}`;

const sideTabs = `<div class="docs-stack">
<div class="side-tabs">
  <input class="side-tabs-toggle" type="checkbox" id="side-tabs-toggle-1" aria-label="Show all sections">
  <nav class="tabs" role="tablist" aria-orientation="vertical" aria-label="Settings">
    <label class="side-tabs-expand" for="side-tabs-toggle-1"></label>
    <span class="tabs-title">Content</span>
    <a class="tab selected" href="#" role="tab" aria-selected="true" data-tab="side-tabs-1">${fai('eye')}Watch list</a>
    <a class="tab" href="#" role="tab" aria-selected="false" data-tab="side-tabs-2">${fai('tags')}Tag filters <span class="counter subtle">3</span></a>
    <a class="tab" href="#" role="tab" aria-selected="false" data-tab="side-tabs-3">${fai('image')}Display</a>
    <span class="tabs-title">Site</span>
    <a class="tab" href="#" role="tab" aria-selected="false" data-tab="side-tabs-4">${fai('comments')}Comments</a>
    <span class="tab disabled">${fai('bell')}Notifications</span>
  </nav>
  <div id="side-tabs-1" class="tab-panel selected" role="tabpanel"><h4>Watch list</h4><p>The panel of the selected tab sits next to the column. ${lorem}</p><p>${lorem}</p></div>
  <div id="side-tabs-2" class="tab-panel" role="tabpanel"><h4>Tag filters</h4><p>The tag filters panel.</p></div>
  <div id="side-tabs-3" class="tab-panel" role="tabpanel"><h4>Display</h4><p>The display panel.</p></div>
  <div id="side-tabs-4" class="tab-panel" role="tabpanel"><h4>Comments</h4><p>The comments panel.</p></div>
</div>
<div class="side-tabs">
  <input class="side-tabs-toggle" type="checkbox" id="side-tabs-toggle-2" aria-label="Show all pages">
  <nav class="tabs" aria-label="Account">
    <label class="side-tabs-expand" for="side-tabs-toggle-2"></label>
    <a class="tab selected" href="#" aria-current="page">${fai('user')}Account settings</a>
    <a class="tab" href="#">${fai('gear')}Content settings</a>
    <a class="tab" href="#">${fai('image')}Avatar</a>
    <a class="tab" href="#">${fai('pen')}Username</a>
    <a class="tab" href="#">${fai('link')}Two-factor authentication</a>
  </nav>
  <div class="tab-panel selected"><h4>Account settings</h4><p>Here the tabs are plain links to other pages: each page has this one panel and marks its own link .selected, and no script is involved.</p></div>
</div>
</div>`;

const tabs = `<div class="docs-stack">
<div>
  <div class="tabs" role="tablist">
    <a class="tab selected" href="#" role="tab" aria-selected="true" data-tab="tabs-demo-1">Comments <span class="counter subtle">12</span></a>
    <a class="tab" href="#" role="tab" aria-selected="false" data-tab="tabs-demo-2">Favourites</a>
    <a class="tab" href="#" role="tab" aria-selected="false" data-tab="tabs-demo-3">History</a>
    <span class="tab disabled">Disabled</span>
  </div>
  <div id="tabs-demo-1" class="tab-panel selected" role="tabpanel"><p>The comments panel. ${lorem}</p></div>
  <div id="tabs-demo-2" class="tab-panel" role="tabpanel"><p>The favourites panel.</p></div>
  <div id="tabs-demo-3" class="tab-panel" role="tabpanel"><p>The history panel.</p></div>
</div>
<section class="block">
  <header class="block-header"><span class="block-header-title">Tabs in a block</span></header>
  <div class="tabs" role="tablist">
    <a class="tab selected" href="#" role="tab" aria-selected="true" data-tab="tabs-block-1">Preview</a>
    <a class="tab" href="#" role="tab" aria-selected="false" data-tab="tabs-block-2">Source</a>
  </div>
  <div id="tabs-block-1" class="tab-panel selected" role="tabpanel"><p>The block draws the frame, the tabs sit under its header.</p></div>
  <div id="tabs-block-2" class="tab-panel" role="tabpanel"><pre class="code-block"><code>&lt;div class="tabs"&gt;…&lt;/div&gt;</code></pre></div>
</section>
</div>`;

const spoilers = `<p>The detective gathers everyone in the library and announces that the killer is <span class="spoiler" tabindex="0">the butler, who was <a href="#">seen in the garden</a></span>. Hover the bar, or focus it with the keyboard, to read it.</p>
<p>Already revealed: <span class="spoiler revealed">the butler did it</span>.</p>
<hr>
<p>A separator above, a thin one below.</p>
<hr class="separator thin">
<div class="flex flex-center">
  <a href="#">First</a><span class="separator vertical"></span><a href="#">Prev</a><span class="separator vertical"></span><a href="#">Next</a>
</div>`;

const sliders = `<div class="form-control-group vertical">
  <div class="form-control-wrap">
    <div class="form-control">
      <label class="form-control-label" for="slider-demo-1">Volume</label>
      <input id="slider-demo-1" class="slider" type="range" min="0" max="100" value="40" data-slider-fill>
    </div>
  </div>
  <div class="form-control-wrap full-width">
    <div class="form-control">
      <label class="form-control-label" for="slider-demo-2">Full width, in steps</label>
      <input id="slider-demo-2" class="slider full-width" type="range" min="0" max="10" step="1" value="7" data-slider-fill>
    </div>
  </div>
  <div class="form-control-wrap">
    <div class="form-control">
      <label class="form-control-label" for="slider-demo-3">Disabled</label>
      <input id="slider-demo-3" class="slider" type="range" value="25" style="--slider-fill: 25%" disabled>
    </div>
  </div>
</div>`;

const layoutHelpers = `<div class="docs-stack">
<div class="layout-columns">
  <aside class="layout-side">${block('.layout-side', `<p>A side column of a fixed width. It stacks over the main column on narrow screens.</p>`)}</aside>
  <div class="layout-main">${block('.layout-main', `<p>${lorem} ${lorem}</p>`)}</div>
</div>
<div class="layout-narrow layout-center"><div class="alert">.layout-narrow .layout-center: a readable column, centered.</div></div>
<div class="flex flex-wrap flex-center flex-between gap-md">
  ${badge('.flex .flex-center .flex-between .gap-md')}
  ${badge('second', 'badge-primary')}
  ${badge('third', 'badge-success')}
</div>
<div class="flex flex-wrap gap-md">
  ${badge('.hidden-below-md: wide screens only', 'badge-primary hidden-below-md')}
  ${badge('.hidden-from-md: narrow screens only', 'badge-warning hidden-from-md')}
  ${badge('.hidden-below-xl', 'badge-special hidden-below-xl')}
  ${badge('.hidden-from-xl', 'badge-danger hidden-from-xl')}
  ${badge('.hidden: never shown', 'hidden')}
</div>
</div>`;

const face = (from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><circle cx="50" cy="40" r="18" fill="#fff" opacity=".85"/><ellipse cx="50" cy="95" rx="32" ry="30" fill="#fff" opacity=".85"/></svg>`)}`;
const avatars = `<div class="docs-stack">
<div class="flex flex-wrap flex-center gap-lg">
  <img class="avatar avatar-xs" src="${face('#4dabf7', '#1864ab')}" alt="28px avatar">
  <img class="avatar avatar-sm" src="${face('#69db7c', '#2b8a3e')}" alt="50px avatar">
  <img class="avatar avatar-md" src="${face('#ffa94d', '#d9480f')}" alt="100px avatar">
  <img class="avatar avatar-lg" src="${face('#da77f2', '#862e9c')}" alt="125px avatar">
</div>
<div class="flex flex-wrap flex-center gap-lg">
  <span class="avatar avatar-xs">A</span>
  <span class="avatar avatar-sm">LF</span>
  <span class="avatar avatar-sm square">LF</span>
  <span class="avatar avatar-sm" role="img" aria-label="Generated avatar"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5"><rect width="5" height="5" fill="#e7f5ff"/><path d="M1 0h1v2H1zM3 0h1v2H3zM0 2h5v1H0zM1 3h1v2H1zM3 3h1v2H3z" fill="#1971c2"/></svg></span>
  <img class="avatar avatar-sm square" src="${face('#f783ac', '#a61e4d')}" alt="Square avatar">
  <span class="counter-anchor"><img class="avatar avatar-sm" src="${face('#63e6be', '#087f5b')}" alt="Avatar with a badge"><span class="counter counter-danger corner">3</span></span>
  <span class="avatar-group">
    <img class="avatar avatar-sm" src="${face('#4dabf7', '#1864ab')}" alt="First">
    <img class="avatar avatar-sm" src="${face('#ffa94d', '#d9480f')}" alt="Second">
    <img class="avatar avatar-sm" src="${face('#da77f2', '#862e9c')}" alt="Third">
    <span class="avatar avatar-sm">+5</span>
  </span>
</div>
</div>`;

// Comments: a short one (the "Show more" label stays out of sight), a long one cut after six lines, one cut after
// three with --communication-max-height, and a deleted one
const communication = (
  id: string,
  name: string,
  colors: [string, string],
  body: string,
  extra = '',
  style = '',
  notice = '',
) =>
  `<article class="communication${extra}"${style ? ` style="${style}"` : ''}>${notice ? `\n  <div class="communication-notice">${notice}</div>` : ''}
  <div class="communication-body">
    <img class="avatar avatar-md square communication-avatar" src="${face(...colors)}" alt="">
    <div class="communication-content">
      <div class="communication-author">
        <a class="communication-author-name" href="#">${name}</a>${extra ? '' : `\n        ${badge('Moderator', 'badge-success')}`}
      </div>
      <input class="clamp-toggle" type="checkbox" id="${id}">
      <div class="communication-text clamp">
${body}
        <label class="clamp-more" for="${id}">Show more</label>
        <label class="clamp-less" for="${id}">Show less</label>
      </div>
    </div>
  </div>
  <div class="communication-options">
    <div>Posted 2 hours ago <a href="#">${fai('flag')}Report</a></div>
    <div><a href="#">${fai('link')}Link</a><a href="#">${fai('quote')}Quote</a><a href="#">${fai('reply')}Reply</a></div>
  </div>
</article>`;
const longText = `        <p>${lorem} ${lorem}</p>
        <p>${lorem} ${lorem} ${lorem}</p>
        <blockquote><p>A quote inside the comment. ${lorem}</p></blockquote>
        <p>The last paragraph, which is only visible once the comment is expanded. ${lorem}</p>`;
const communications = `<div class="docs-stack">
${communication('communication-demo-1', 'Short comment', ['#4dabf7', '#1864ab'], '        <p>A short comment fits, so it is shown whole and no label appears, although the toggle is in the markup.</p>')}
${communication('communication-demo-2', 'Long comment', ['#69db7c', '#2b8a3e'], longText)}
${communication('communication-demo-3', 'Cut after three lines', ['#ffa94d', '#d9480f'], longText, '', '--communication-max-height: calc(3em * var(--text-line-height))')}
${communication(
  'communication-demo-4',
  'Deleted comment',
  ['#da77f2', '#862e9c'],
  `        <p><strong>Deletion reason: Rule #0 (Princess Luna)</strong>, typed by the author: it stays ordinary text.</p>
        <p>${lorem} ${lorem} ${lorem} ${lorem} ${lorem} ${lorem}</p>`,
  ' deleted',
  '',
  `${fai('trash')}Deleted: Rule #1 <span class="communication-notice-by">Moderator</span>`,
)}
</div>`;

// Clamped text on its own: an image description in a block, cut after six lines, a short one, and one cut at 4rem
const clampBox = (id: string, title: string, body: string, style = '') => `<section class="block">
  <header class="block-header"><span class="block-header-title">${title}</span></header>
  <div class="block-content">
    <input class="clamp-toggle" type="checkbox" id="${id}">
    <div class="clamp"${style ? ` style="${style}"` : ''}>
${body}
      <label class="clamp-more" for="${id}">Show more</label>
      <label class="clamp-less" for="${id}">Show less</label>
    </div>
  </div>
</section>`;
const clamps = `<div class="docs-stack">
${clampBox(
  'clamp-demo-1',
  'Description',
  `      <p>Commissioned for the anniversary of the comic. ${lorem} ${lorem}</p>
      <p>${lorem} ${lorem} ${lorem}</p>
      <p>${lorem} ${lorem} ${lorem} ${lorem}</p>
      <p>${lorem} ${lorem} ${lorem}</p>
      <p>Source files and a timelapse are linked below. ${lorem} <a href="#">A link</a>.</p>`,
)}
${clampBox('clamp-demo-2', 'A short description', '      <p>Short text is shown whole. No label, no fade.</p>')}
${clampBox('clamp-demo-3', 'Cut at 4rem', `      <p>${lorem} ${lorem} ${lorem} ${lorem} ${lorem} ${lorem}</p>`, '--clamp-max-height: 4rem')}
</div>`;

// Stories for the older components, after upstream HammerTimeCSS's
const accordion = `<div class="accordion">
  <details class="accordion-item" open>
    <summary class="accordion-item-header">What is this?</summary>
    <div class="accordion-item-body">
      <p>${lorem}</p>
      <p>Paragraphs in the body are spaced, and links use the content link style: <a href="#">a link</a>.</p>
    </div>
  </details>
  <details class="accordion-item">
    <summary class="accordion-item-header">How do I open it?</summary>
    <div class="accordion-item-body"><p>These are native details elements, no script is involved.</p></div>
  </details>
  <details class="accordion-item">
    <summary class="accordion-item-header">A third item</summary>
    <div class="accordion-item-body"><p>${lorem}</p></div>
  </details>
</div>`;

const progressBar = (value: number, type = '') =>
  `<div class="progress${type ? ` progress-${type}` : ''}" role="progressbar" aria-label="${type || 'primary'} progress" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width: ${value}%"></div></div>`;
const progress = `<div class="docs-stack">
${[
  [25, ''],
  [40, 'success'],
  [55, 'warning'],
  [70, 'danger'],
  [85, 'special'],
  [100, 'primary'],
]
  .map(([value, type]) => progressBar(value as number, type as string))
  .join('\n')}
</div>`;

const inputFields = `<div class="docs-stack">
<div class="flex flex-wrap gap-md">
  <input class="input-field" type="text" value="Text input" aria-label="Text input">
  <input class="input-field" type="text" placeholder="Placeholder" aria-label="Placeholder input">
  <input class="input-field" type="text" value="Disabled" aria-label="Disabled input" disabled>
  <input class="input-field" type="color" value="#546c99" aria-label="Colour input">
</div>
<div class="flex flex-wrap gap-md">
  <input class="input-field" type="email" placeholder="Required, empty: not red" aria-label="Required input" required>
  <input class="input-field invalid" type="text" value="Marked .invalid" aria-label="Invalid input">
</div>
<input class="input-field full-width" type="text" value="Full width" aria-label="Full width input">
<div class="form-input-group">
  <input class="input-field" type="text" value="An input group" aria-label="Search">
  ${button('Search', 'button-primary button-size-input')}
</div>
<div class="form-control-wrap">
  <div class="form-control">
    <label class="form-control-label" for="input-message-demo">With messages</label>
    <input id="input-message-demo" class="input-field invalid" type="text" value="taken">
    <span class="form-message form-message-error">That name is taken.</span>
    <span class="form-message form-message-success">A success message.</span>
    <span class="form-message form-message-description">A description, with <a href="#">a link</a>.</span>
  </div>
</div>
</div>`;

const copyableText = `<div class="copyable-text">
  <button type="button" class="button button-primary icon-only" data-copy-text="--surface-color" aria-label="Copy to clipboard" title="Copy to clipboard"><span class="button-content"><span class="button-icon docs-icon-copy">${icon('fontawesome', 'clipboard')}</span><span class="button-icon docs-icon-copied">${icon('fontawesome', 'check')}</span></span></button>
  <code class="code-span copyable-text-data">--surface-color</code>
</div>`;

const navs = `<div class="layout-columns">
  <aside class="layout-side">
    <nav class="nav" aria-label="Section">
      <a class="nav-link current" href="#">${icon('fontawesome', 'gear')}Settings</a>
      <a class="nav-link" href="#">${icon('fontawesome', 'user')}Account</a>
      <a class="nav-link" href="#">${icon('fontawesome', 'bell')}Notifications</a>
      <a class="nav-link" href="#">${icon('fontawesome', 'link')}Links</a>
    </nav>
  </aside>
  <div class="layout-main">
    <nav class="nav horizontal" aria-label="Views">
      <a class="nav-link current" href="#">Overview</a>
      <a class="nav-link" href="#">Uploads</a>
      <a class="nav-link" href="#">Comments</a>
      <a class="nav-link" href="#">Favourites</a>
    </nav>
    <p>A column by default, a row with .horizontal.</p>
  </div>
</div>`;

const headers = `<div class="docs-stack">
<div style="position: relative">
  <header class="header non-stick" style="position: relative">
    <a class="header-brand" href="#"><span class="header-brand-text">Brand</span></a>
    <nav class="nav" aria-label="Header"><a class="nav-link current" href="#">Home</a><a class="nav-link" href="#">About</a><a class="nav-link" href="#">Contact</a></nav>
  </header>
</div>
<div>
  <header class="header borderless" style="position: relative">
    <a class="header-brand" href="#"><span class="header-brand-text">Brand</span></a>
    <nav class="nav" aria-label="Account"><a class="nav-link" href="#">Sign in</a></nav>
  </header>
  <nav class="navbar flush" aria-label="Under a borderless header">
    <a class="navbar-item navbar-pinned current" href="#"><span class="navbar-icon">${icon('fontawesome', 'image')}</span>Images</a>
    <a class="navbar-item navbar-pinned" href="#"><span class="navbar-icon">${icon('fontawesome', 'comments')}</span>Forums</a>
    <a class="navbar-item navbar-pinned" href="#"><span class="navbar-icon">${icon('fontawesome', 'tags')}</span>Tags</a>
  </nav>
</div>
<div style="position: relative; min-height: 9rem">
  <input class="burger-toggle" type="checkbox" id="header-burger">
  <header class="header non-stick" style="position: relative">
    <a class="header-brand" href="#"><span class="header-brand-text">Brand</span></a>
    <nav class="navbar" aria-label="Header with a navbar">
      <label class="navbar-item navbar-burger" for="header-burger"><span class="navbar-icon">${icon('fontawesome', 'bars')}</span>Menu</label>
      <a class="navbar-item" href="#"><span class="navbar-icon">${icon('fontawesome', 'image')}</span>Images</a>
      <div class="navbar-dropdown">
        <a class="navbar-item caret" href="#" aria-haspopup="true"><span class="navbar-icon">${icon('fontawesome', 'tags')}</span>Tags</a>
        <div class="navbar-menu end">
          <a class="navbar-menu-item" href="#"><span class="navbar-menu-text">Tag Changes</span></a>
          <a class="navbar-menu-item" href="#"><span class="navbar-menu-text">Aliases</span></a>
        </div>
      </div>
      <a class="navbar-item navbar-pinned" href="#" title="Notifications"><span class="navbar-icon counter-anchor">${icon('fontawesome', 'bell')}<span class="counter counter-danger corner">2</span></span></a>
    </nav>
  </header>
  ${burgerPanel('header-burger')}
</div>
</div>`;

const popups = `<div class="flex flex-wrap gap-lg" style="align-items: flex-start">
  <div class="popup visible" style="position: relative">
    <h3>A popup</h3>
    <p>${lorem}</p>
    <div class="button-group separated">${button('Confirm', 'button-primary')}${button('Cancel')}</div>
  </div>
  <div class="popup wide visible" style="position: relative">
    <h3>A wide popup</h3>
    <p>${lorem} ${lorem}</p>
  </div>
</div>`;

const loadingIndicators = `<div class="flex flex-center gap-lg">${[1, 2, 4].map(em => loadingIndicator.replace('width="1em" height="1em"', `width="${em}em" height="${em}em"`)).join('')}</div>`;

const cardForms = `<div class="card-forms">
${['one', 'two']
  .map(
    n => `  <section class="card-forms-section card">
    <header class="card-header"><h3>Section ${n}</h3></header>
    <div class="form-control-wrap full-width"><div class="form-control"><label class="form-control-label" for="card-forms-${n}">Field</label><input id="card-forms-${n}" class="input-field full-width" type="text"></div></div>
    <div class="form-control-submit">${button('Save', 'button-primary')}<span class="form-message form-message-description">Not saved yet.</span></div>
  </section>`,
  )
  .join('\n')}
</div>`;

const utilities = `<div class="docs-stack">
<div class="flex flex-wrap flex-center gap-md">
  ${['0', 'xs', 'sm', 'md', 'lg', 'xl'].map(key => `<span class="badge"><span class="badge-content p-${key}">.p-${key}</span></span>`).join('\n  ')}
</div>
<div class="flex flex-wrap flex-center gap-md">
  ${[10, 15, 20].map(step => `<span class="avatar s-${step} fs-${step === 10 ? 10 : 10}" style="font-size: 1rem" title=".s-${step}">${step}</span>`).join('\n  ')}
  <span class="fs-10">.fs-10</span><span class="fs-15">.fs-15</span><span class="fs-20">.fs-20</span>
</div>
<div class="grid-flex gap-md">
  <div class="grid-flex-item flex-basis-20">${badge('.flex-basis-20')}</div>
  <div class="grid-flex-item flex-basis-30">${badge('.flex-basis-30', 'badge-primary')}</div>
  <div class="grid-flex-item flex-basis-40">${badge('.flex-basis-40', 'badge-success')}</div>
</div>
<p class="text-center">.text-center, <span class="cursor-help">.cursor-help</span>, <span class="cursor-pointer">.cursor-pointer</span>, <span class="user-select-none">.user-select-none</span>, <span class="user-select-all">.user-select-all</span></p>
<p class="text-right">.text-right</p>
</div>`;

const cell = (text: string, extra = '') => `<div class="alert${extra ? ` ${extra}` : ''}">${text}</div>`;
const tailwindUtilities = `<div class="docs-stack">
<div class="flex flex-wrap items-baseline gap-x-lg gap-y-sm">
  ${['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map(key => `<span class="text-${key}">.text-${key}</span>`).join('\n  ')}
</div>
<div class="flex items-center gap-md">
  ${cell('.flex-none', 'flex-none')}
  ${cell('.flex-1, shares the room', 'flex-1 alert-primary')}
  ${cell('.flex-1', 'flex-1 alert-primary')}
  ${cell('.shrink-0', 'shrink-0')}
</div>
<div class="flex flex-wrap justify-between items-center gap-sm">
  ${badge('.justify-between')}${badge('.items-center', 'badge-primary')}${badge('.flex-wrap', 'badge-success')}
</div>
<div class="flex gap-sm">
  ${badge('first')}${badge('.ms-auto pushes the rest to the end', 'badge-special ms-auto')}${badge('last')}
</div>
<div class="flex flex-col items-start gap-xs">
  ${badge('.flex-col')}${badge('.items-start', 'badge-primary')}${badge('.gap-xs', 'badge-success')}
</div>
<div class="grid grid-cols-4 gap-md">
  ${cell('.col-span-2', 'col-span-2 alert-primary')}
  ${cell('1')}
  ${cell('1')}
  ${cell('1')}
  ${cell('.col-span-3', 'col-span-3 alert-success')}
  ${cell('.col-span-full', 'col-span-full alert-special')}
</div>
<div class="grid grid-cols-auto gap-x-md gap-y-sm">
  ${[1, 2, 3, 4, 5].map(n => cell(`.grid-cols-auto ${n}`)).join('\n  ')}
</div>
<div class="grid grid-cols-3 gap-md">
  ${cell('.p-0', 'p-0')}
  ${cell('.px-xl .py-xs', 'px-xl py-xs')}
  ${cell('.pl-xl', 'pl-xl')}
</div>
<div class="alert mx-auto text-center" style="inline-size: 60%">.mx-auto centers a block</div>
</div>`;

const buttonLayouts = `<div class="docs-stack">
<div class="button-group">
  ${button('Joined', 'button-primary')}${button('group')}${button('of buttons')}
</div>
${button('Full width, centered', 'button-primary full-width justify-center')}
${button('Full width, at the end', 'full-width justify-end')}
<div style="max-width: 12rem">
  ${button('A long label that is cut off with an ellipsis', 'full-width')}
</div>
<div style="max-width: 12rem">
  ${button('A long label that is allowed to wrap', 'full-width allow-overflow')}
</div>
<div class="form-input-group">
  <input class="input-field" type="text" value=".button-size-input matches an input" aria-label="Demo">
  ${button('Go', 'button-primary button-size-input')}
</div>
</div>`;

const contentContainer = `<div class="content-container">
  <div class="content">
    <p>First block of a .content inside a .content-container, which centers it up to --content-container-max-width.</p>
    <p>Second block, spaced from the first.</p>
  </div>
</div>`;

// Menus with controls: a dropdown of checkboxes with a switch row (open, so that the menu shows), one of radios, and
// a navbar menu with a switch and a checkbox at the end of its rows
const checkItem = (text: string, checked = false, extra = '', name = '') =>
  `      <label class="dropdown-item"><input class="menu-check-input" type="${name ? 'radio' : 'checkbox'}"${name ? ` name="${name}"` : ''}${checked ? ' checked' : ''}${extra}><span class="menu-check-box"></span>${text}</label>`;
const menuControls = `<div class="docs-stack">
<div class="flex flex-wrap gap-md" style="align-items: flex-start; min-height: 21rem">
  <details class="dropdown" open>
    <summary class="button"><span class="button-content"><span class="button-text">Ratings</span><span class="counter subtle">2</span></span></summary>
    <div class="dropdown-menu">
${checkItem('Safe', true)}
${checkItem('Suggestive', true)}
${checkItem('Questionable')}
${checkItem('Unavailable', false, ' disabled')}
      <hr class="dropdown-divider">
      <label class="dropdown-item"><span class="dropdown-icon">${fai('eye-slash')}</span>Hide seen<input class="form-switch-input menu-end" type="checkbox"></label>
      <label class="dropdown-item"><span class="dropdown-icon">${fai('star')}</span>Favourites only<input class="form-switch-input menu-end" type="checkbox" checked></label>
      <hr class="dropdown-divider">
      <div class="dropdown-actions">${button('Clear', 'button-size-badge')}${button('Apply', 'button-primary button-size-badge')}</div>
    </div>
  </details>
  <details class="dropdown">
    <summary class="button"><span class="button-content"><span class="button-text">Sort by: Score</span></span></summary>
    <div class="dropdown-menu">
${checkItem('Newest', false, '', 'check-sort')}
${checkItem('Score', true, '', 'check-sort')}
${checkItem('Relevance', false, '', 'check-sort')}
    </div>
  </details>
</div>
<div style="min-height: 13rem">
  <nav class="navbar" aria-label="Preferences">
    <div class="navbar-dropdown navbar-pinned open">
      <a class="navbar-item caret" href="#" aria-haspopup="true" aria-expanded="true"><span class="navbar-icon">${fai('gear')}</span>Preferences</a>
      <div class="navbar-menu">
        <label class="navbar-menu-item"><span class="navbar-menu-icon">${fai('eye')}</span><span class="navbar-menu-text">Dark theme</span><input class="form-switch-input menu-end" type="checkbox" checked></label>
        <label class="navbar-menu-item"><span class="navbar-menu-icon">${fai('video')}</span><span class="navbar-menu-text">Autoplay videos</span><input class="form-switch-input menu-end" type="checkbox"></label>
        <hr class="navbar-menu-divider">
        <label class="navbar-menu-item"><span class="navbar-menu-icon">${fai('image')}</span><span class="navbar-menu-text">Show thumbnails</span><input class="menu-check-input" type="checkbox" checked><span class="menu-check-box menu-end"></span></label>
        <label class="navbar-menu-item"><span class="navbar-menu-icon">${fai('bell')}</span><span class="navbar-menu-text">Notifications</span><input class="menu-check-input" type="checkbox"><span class="menu-check-box menu-end"></span></label>
      </div>
    </div>
    <a class="navbar-item navbar-pinned" href="#"><span class="navbar-icon">${fai('user')}</span>Account</a>
  </nav>
</div>
</div>`;

// Quotes nested `depth` levels deep, numbered from the outside in
const nestedQuotes = (depth: number): string => {
  let html = '';
  for (let level = depth; level >= 1; level--) {
    html = `<blockquote>\n  <p>Level ${level}${level >= 7 ? ', the gap is small from here on' : ''}.</p>\n${html}</blockquote>\n`;
  }
  return html.trimEnd();
};

const badgeColors = [undefined, 'primary', 'success', 'warning', 'danger', 'special'];
const badgeGroup = (prefix?: string, suffix?: string) => `<span class="badge-group">
${badgeColors
  .map(color => {
    const label = `${color ? ucfirst(color) : 'Default'} badge`;
    return `  <span class="badge${color ? ` badge-${color}` : ''}">${prefix ? `<span class="badge-prefix">${prefix}</span>` : ''}<span class="badge-content">${label}</span>${suffix ? `<span class="badge-suffix">${suffix}</span>` : ''}</span>`;
  })
  .join('\n')}
</span>`;

const iconStory = (set: IconSet): Story => ({
  id: `icons-${set}`,
  title: `Icons: ${iconSetLabels[set]}`,
  description: `The framework ships no icons, only empty slots for them: .form-checkbox-check-icon, .form-select-icon, .button-icon and .loading-icon. These demos fill them with ${set === 'fontawesome' ? 'Font Awesome Free solid icons (CC BY 4.0, fontawesome.com)' : 'Lucide icons (ISC, lucide.dev)'}, which are only used by this documentation and are not part of the package. The loading buttons here use the set's spinner icon (${set === 'fontawesome' ? 'spinner' : 'loader-circle'}) rotated by a docs-only animation, the main demos use the clock indicator. Any inline SVG or icon font works.`,
  html: `${formFields('regular', set, `icons-${set}`)}
${buttonRow(set, true)('primary')}`,
});

export const stories: Story[] = [
  {
    id: 'alerts',
    title: 'Alerts',
    description:
      "A flat tinted bar of text and links, as Philomena's flash notices. An alert is neutral without a colour; .alert-{color} tints it and colours its links and its optional .alert-icon (put the text in an .alert-text next to one). Here: primary, warning, success, danger and special, and a plain one.",
    html: alerts,
  },
  {
    id: 'buttons',
    title: 'Buttons',
    description:
      'Every colour in the default, disabled, pressed and loading state. Buttons have a very subtle bevel, raised at rest: hovering darkens the fill a little, pressing (or .pressed) darkens it more and turns the bevel into a well. Icon-only variants (.icon-only with a .button-icon) follow. The loading state puts a .loading-icon (a slot for any icon, here the clock indicator) over the content, which fades to 20%.',
    html: buttonsFor('fontawesome'),
    notes: [
      'Loading: put a <code class="code-span">.loading-icon</code> element before <code class="code-span">.button-content</code> inside the button. The dimming of the content comes from it, a button with only <code class="code-span">.loading</code> only changes the cursor. It is a slot for any icon or spinner. <code class="code-span">.icon-only</code> buttons put their icon in <code class="code-span">.button-icon</code>.',
    ],
  },
  {
    id: 'button-layouts',
    title: 'Button layouts',
    description:
      'A joined .button-group, .full-width buttons with .justify-center and .justify-end, a label that is cut off and one that may wrap (.allow-overflow), and .button-size-input, which matches a button to the input next to it in a .form-input-group.',
    html: buttonLayouts,
  },
  {
    id: 'button-sizes',
    title: 'Badge-sized buttons and groups',
    description:
      'Buttons the size and shape of a badge (and of pagination links), for toolbars and list rows: .button-size-badge on a button, or on a .button-group to size every button in it. A separated group of every colour, a joined group with a pressed option, a joined primary group and a single one.',
    html: badgeSizedButtons,
  },
  {
    id: 'pagination',
    title: 'Pagination',
    description:
      "Philomena's pagination: a pill of bold links at badge size, the current page filled like a button, gaps where pages are skipped and the border of a button, so it lines up with badge-sized buttons. In order: a page in the middle, the first page (First and Prev are spans, so unavailable), a primary one in a .pagination-bar with a .pagination-info text, then success and special, the last one next to badge-sized buttons.",
    html: paginations,
    notes: [
      'The glyphs in <code class="code-span">.pagination-icon</code> are plain text here; the slot takes an icon of about 1.25em too. A <code class="code-span">&lt;span class="pagination-link"&gt;</code> (no href) or <code class="code-span">.disabled</code> is an unavailable link.',
    ],
  },
  {
    id: 'header',
    title: 'Header',
    description:
      'The bar across the top of a site: a .header-brand, then whatever follows, pushed to the other side. It is sticky by default and .non-stick makes it absolute; .borderless takes the line along its bottom off, for a header with a navbar right under it (the second one here). A .nav in it becomes a row in the header colours; a .navbar fills its height, and collapses to its burger and pinned items below the md breakpoint. This page uses a header as its own.',
    html: headers,
    notes: ['The demos keep the header in the flow with an inline <code class="code-span">position: relative</code>.'],
  },
  {
    id: 'navbar',
    title: 'Navbar',
    description:
      "A navigation bar in the header colours with dropdown menus, here with Philomena's navigation: the site links with their menus, then (after a .navbar-spacer) notifications with a corner .counter, conversations and the user menu. Menus open while their .navbar-dropdown is hovered or has the focus inside, no script is needed; .open holds one open (as on the user menu here). The bar is one row and never wraps: below the md breakpoint only the .navbar-burger item and the .navbar-pinned ones stay, and the burger opens a burger menu with the links; below xl the less important items here drop their text (.hidden-below-xl). Resize the window to see it.",
    html: navbar,
    notes: [
      'The bar works on its own or inside a <code class="code-span">.header</code>, where it fills the height. <code class="code-span">.navbar-menu.end</code> aligns a menu with the end of its item, for items near the end of the bar.',
    ],
  },
  {
    id: 'nav',
    title: 'Nav',
    description:
      'A list of links for sidebars and section menus: a column by default, a row with .horizontal. A link tints under the pointer and .current is filled like a primary button.',
    html: navs,
  },
  {
    id: 'dropdown',
    title: 'Dropdown',
    description:
      'A menu under any trigger. It opens while the .dropdown is hovered or has the focus inside, with no script; .open holds it open and .manual turns the hover off, for a click toggle of your own (the second one here). Items can have an icon, .dropdown-danger colours one, .dropdown-menu.end aligns the menu with the end of its trigger and .up opens it above.',
    html: dropdowns,
  },
  {
    id: 'menu-controls',
    title: 'Menus with checkboxes and switches',
    description:
      'Menu items that are labels holding a control, so the whole row toggles it, in a dropdown and in a navbar menu. Both styles of checkbox work: the box drawn in CSS (.menu-check-input and .menu-check-box, round for radios) and the switch (.form-switch-input). .menu-end puts the control at the end of the row. The dropdowns are native <details> with the trigger as their <summary>, so they open on click and stay open while you tick boxes, without a script.',
    html: menuControls,
    notes: [
      'The inputs are real ones inside labels, so they submit with a form and work from the keyboard. A <code class="code-span">&lt;details&gt;</code> does not close when you click elsewhere or press Escape, and the count on the trigger is yours to update: add a script for those.',
    ],
  },
  {
    id: 'burger',
    title: 'Burger menu',
    description:
      'A panel that slides in from the start side of the screen over a dimmed page. This one is toggled by a hidden checkbox (.burger-toggle) that the button, the close mark and the overlay are labels of, so it needs no script; .open on the panel and the overlay does the same from a script.',
    html: burger,
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description:
      "Philomena's tabbed headers: a row of .tab links over the .tab-panel of the selected one. The framework styles the states, moving .selected between tabs and panels is your script's job (this page does it for the demo). On their own they are framed, in a .block the block draws the frame.",
    html: tabs,
  },
  {
    id: 'side-tabs',
    title: 'Side tabs',
    description:
      'The same tabs as a column at the start with the panel next to it (.side-tabs), for settings pages: with .tabs-title headings between groups and a panel per tab (this page moves .selected on click), or, as in the second one, as a list of plain links to other pages, each of which marks its own link .selected. Below the md breakpoint the column is a selector over the panel: only the selected tab shows until it is clicked, through a hidden checkbox (.side-tabs-toggle) and a label (.side-tabs-expand), without a script. Narrow the window to see it.',
    html: sideTabs,
  },
  {
    id: 'spoiler',
    title: 'Spoiler text and separators',
    description:
      'Inline spoiler text is blacked out until it is hovered or focused; .revealed shows it for good (this page sets it on click). Below it: <hr> and .separator draw a rule in the border tint, .thin keeps a smaller distance and .vertical separates the items of a row.',
    html: spoilers,
  },
  {
    id: 'slider',
    title: 'Slider',
    description:
      'A range input with a track in the input material and a knob filled like a button. Firefox fills the track up to the knob by itself; elsewhere --slider-fill does, set to the value as a percentage (this page keeps it up to date).',
    html: sliders,
  },
  {
    id: 'layout',
    title: 'Layout and visibility helpers',
    description:
      'A side column next to a main one that stack on narrow screens, a readable centered column, the flex helpers with gaps from the spacing scale, and the visibility utilities: .hidden-below-{breakpoint} and .hidden-from-{breakpoint} for sm, md, lg, xl and xxl. Resize the window to see the badges in the last row swap.',
    html: layoutHelpers,
  },
  {
    id: 'popup',
    title: 'Popup',
    description:
      'A floating panel in the surface colour with a thick border and a drop shadow. .visible shows it, .wide makes it wider, .allow-overflow lets children escape. It is positioned absolutely, with an anchor where the browser supports it (.has-anchor and --position-anchor-name), and sits above the header and the menus. Below the md breakpoint it is meant to be a modal, and the page stops scrolling while a <dialog class="popup"> is open.',
    html: popups,
    notes: [
      'The demos keep the popups in the flow with an inline <code class="code-span">position: relative</code>; a real one is placed by your script or anchored.',
    ],
  },
  {
    id: 'forms-regular',
    title: 'Forms: regular',
    description:
      'Input, select, checkbox, switch (a checkbox drawn as a sliding toggle, red when off and green when on) and radio.',
    html: formFields('regular'),
    notes: [
      'Icons are slots: the framework ships none. <code class="code-span">.form-checkbox-check-icon</code> and <code class="code-span">.form-select-icon</code> are positioned for a fixed-width icon (about 1.25em wide, 1em tall, such as Font Awesome\'s <code class="code-span">fa-fw</code>), a text glyph will not line up.',
    ],
  },
  {
    id: 'input-field',
    title: 'Input fields, groups and messages',
    description:
      'The bare .input-field outside the form control wrappers, a .form-input-group that joins an input and a button, and .form-message texts under a control. An empty required field is not red: the invalid look appears once the user has edited the field, or when you mark it .invalid.',
    html: inputFields,
  },
  {
    id: 'combobox',
    title: 'Forms: combobox',
    description:
      'A select-like input with a suggestion list. The framework only styles it: filtering, keyboard handling and toggling the state classes (.suggestions-open, .has-suggestions, .allow-typing, and .selected / .highlighted on items) is up to your script. Both controls here are static; the second one is shown open, with a selected item (filled like a primary button), a highlighted item (tinted, like a hovered one), matches wrapped in <mark>, addons and a truncated label (hover it to see the addon move into the corner).',
    html: combobox(),
    notes: [
      'The suggestion list is absolutely positioned under the control and overlays what follows it, so leave room for it in your layout. Matching items (those containing a <code class="code-span">&lt;mark&gt;</code>) are sorted before the rest.',
      '<code class="code-span">.allow-typing</code> is what makes the input editable-looking: without it the input gets a default cursor and no text selection. Put <code class="code-span">.combobox-suggestion-header-overlay</code> on a header to keep it sticky while the list scrolls.',
      'Addons: <code class="code-span">.addon-mode-dynamic.label-truncated</code> on an item moves the addon into the corner on hover to give a truncated label the full width. Your script sets <code class="code-span">.label-truncated</code> when it detects the label overflowing, the last item in the demo has it set.',
    ],
  },
  {
    id: 'forms-readonly',
    title: 'Forms: readonly',
    description:
      'Read-only fields: their text can be focused, selected and copied, and is submitted, but not edited. They are flat, with a dashed border. Only text inputs and textareas can be read-only; a select, checkbox, switch or radio that must not change is disabled instead.',
    html: readonlyFields,
  },
  {
    id: 'forms-disabled',
    title: 'Forms: disabled',
    description: 'The same controls disabled.',
    html: formFields('disabled'),
  },
  {
    id: 'editor',
    title: 'Editor',
    description:
      "A textarea in one frame with a toolbar and a footer, the scaffolding for a Markdown editor: groups of flat .editor-buttons divided by a line, a spacer that pushes Preview to the end, a resizable .editor-input and an .editor-footer. The frame shows the hover and the focus of the textarea. What the buttons do is your script's job.",
    html: editor,
    notes: [
      'The buttons take any icon or a short text. Give icon-only buttons a <code class="code-span">title</code> and an <code class="code-span">aria-label</code>.',
    ],
  },
  iconStory('fontawesome'),
  iconStory('lucide'),
  {
    id: 'card-forms',
    title: 'Card forms',
    description:
      'Cards laid out in a wrapping row for settings pages: sections take the full width, and half each from the xl breakpoint. .form-control-submit is the row with the submit button and a message.',
    html: cardForms,
  },
  {
    id: 'badges',
    title: 'Badges',
    description: 'The default, primary, success, warning, danger and special colours, with optional prefix and suffix.',
    html: `<div class="docs-stack">\n${[badgeGroup(), badgeGroup('Prefixed'), badgeGroup(undefined, 'Suffixed'), badgeGroup('Prefixed', 'Suffixed')].join('\n')}\n</div>`,
  },
  {
    id: 'counters',
    title: 'Counters',
    description:
      'A small pill with a number. It is filled like a button of its colour (.counter-{color}); .subtle is a shaded chip in the colour of what it sits on, for bars and buttons. In a .counter-anchor, .corner pins it to the corner of an icon as an unread badge.',
    html: `<div class="docs-stack">
<div class="badge-group">
${badgeColors.map(color => `  <span class="counter${color ? ` counter-${color}` : ''}">${color === 'danger' ? '99+' : 7}</span>`).join('\n')}
</div>
<div class="button-group separated">
  <button type="button" class="button"><span class="button-content"><span class="button-text">Inbox</span><span class="counter subtle">4</span></span></button>
  <button type="button" class="button button-primary"><span class="button-content"><span class="button-text">Reports</span><span class="counter subtle">128</span></span></button>
  <button type="button" class="button"><span class="button-content"><span class="button-text">Queue</span><span class="counter counter-danger">2</span></span></button>
  <button type="button" class="button icon-only" aria-label="Notifications"><span class="button-content"><span class="button-icon counter-anchor">${icon('fontawesome', 'bell')}<span class="counter counter-danger corner">12</span></span></span></button>
  <button type="button" class="button icon-only" aria-label="Messages"><span class="button-content"><span class="button-icon counter-anchor">${icon('fontawesome', 'envelope')}<span class="counter counter-success corner">3</span></span></span></button>
</div>
</div>`,
  },
  {
    id: 'avatars',
    title: 'Avatars',
    description:
      "A round picture or initials. The sizes are Philomena's: .avatar-xs 28px, .avatar-sm 50px, .avatar-md 100px and .avatar-lg 125px; the two large ones step down a size on narrow screens. .square takes the roundness off, a .counter can be pinned to one and .avatar-group overlaps a row of them. An avatar can hold an image, initials or an inline SVG, such as a generated pattern, which fills it.",
    html: avatars,
  },
  {
    id: 'clamp',
    title: 'Clamped text',
    description:
      'Text that is cut off after a maximum height, with the rest behind a Show more label, for image descriptions and other text of unknown length. It works without a script, through a hidden checkbox right before the text. The limit is --clamp-max-height, six lines by default and 4rem on the last one here. The label and the fade only appear when at least a line is cut, so the short description is left alone.',
    html: clamps,
    notes: [
      'The fade ends in the surface colour. On another background set <code class="code-span">--clamp-bg-color</code> to it. The communication below uses the same clamp for its text.',
    ],
  },
  {
    id: 'communication',
    title: 'Communication',
    description:
      'A comment, post or message: an avatar next to the author and the text, over a bar of options, laid out as the comments on Philomena: a square avatar, the name over the role label, the time and Report on one side of the bar and the actions on the other. On narrow screens the avatar and the author become a header row over the text. Long text is cut off after --communication-max-height (six lines by default, three on the third one here) and the rest is behind a Show more label, which works without a script. The label only appears when the text is longer than the limit, as the first comment shows. .deleted tints a removed one. The last one is deleted: what the site says about it is a .communication-notice bar outside the text, which nothing typed into a comment can imitate.',
    html: communications,
    notes: [
      'The cut works with the clamp: a hidden checkbox (<code class="code-span">.clamp-toggle</code>) right before <code class="code-span">.communication-text.clamp</code>, and the two labels inside the text. Leave them out and the text is never cut. The limit is a height, so any length works: <code class="code-span">--communication-max-height: 200px</code>.',
    ],
  },
  {
    id: 'progress',
    title: 'Progress',
    description:
      'A track in the input material with a bar inside, whose width you set. The bar is primary, .progress-{color} takes the other colours.',
    html: progress,
  },
  {
    id: 'loading-indicator',
    title: 'Loading indicator',
    description:
      'An animated clock, sized by its width and height and coloured by the text colour. The loading buttons use it.',
    html: loadingIndicators,
  },
  {
    id: 'copyable-text',
    title: 'Copyable text',
    description:
      'A button joined to a value that selects as a whole. The copying is up to your script; this page wires it up.',
    html: copyableText,
  },
  {
    id: 'tags',
    title: 'Tags',
    description:
      'Tags: a bold name with an optional count, colored by category with .tag-{category}. They are borderless; set --tag-border to a width to draw a border in the count colour and --tag-border-radius for other corners (the second list does both, inline, with square corners). Add .muted for spoilered or hidden tags.',
    html: `<div class="docs-stack">
<div class="tag-list">
${tagList()}
</div>
<div class="tag-list" style="--tag-border: .0625rem; --tag-border-radius: 0">
${tagList()}
</div>
<div class="tag-list">
  <span class="tag tag-rating"><span class="tag-icon">${icon('fontawesome', 'check')}</span><a class="tag-name" href="#">with icon</a><span class="tag-count">12</span></span>
  <span class="tag muted"><a class="tag-name" href="#">muted tag</a><span class="tag-count">3</span></span>
  <span class="tag tag-origin"><a class="tag-name" href="#">no count</a></span>
</div>
</div>`,
    notes: [
      'The icon slot <code class="code-span">.tag-icon</code> is optional and sized for a fixed-width icon, like the other slots. The count is optional too.',
    ],
  },
  {
    id: 'tag-box',
    title: 'Tag box',
    description:
      "An editable tag list in the input material, as Philomena's tags input: tags with a .tag-remove control and an .input-field that is as wide as its placeholder and grows as you type (field-sizing: content; browsers without it use the size attribute). It grows with its content up to a limit, then scrolls, and can be resized vertically. Styling only, removing and adding tags is your script's job.",
    html: `<div class="tag-box">
${tagCategories
  .slice(0, 6)
  .map(
    ([cat, name]) =>
      `  <span class="tag${cat ? ` tag-${cat}` : ''}"><a class="tag-name" href="#">${name}</a><button type="button" class="tag-remove" aria-label="Remove ${name}">×</button></span>`,
  )
  .join('\n')}
  <input class="input-field" type="text" size="12" placeholder="Add a tag..." aria-label="Add a tag">
</div>`,
  },
  {
    id: 'table',
    title: 'Table',
    description:
      'A framed table with the header row in the input material and thin row dividers. Add .striped for zebra rows and .hover to tint the row under the pointer, .numeric on a column aligns its numbers. Wrap it in .table-wrap, with .responsive to scroll sideways on narrow screens.',
    html: `<div class="table-wrap responsive">
  <table class="table striped hover">
    <thead>
      <tr><th>Genre</th><th>Title</th><th class="numeric">Year</th></tr>
    </thead>
    <tbody>
      <tr><td>Space opera</td><td><a href="#">Dune</a></td><td class="numeric">1965</td></tr>
      <tr><td>Cyberpunk</td><td><a href="#">Neuromancer</a></td><td class="numeric">1984</td></tr>
      <tr><td>Hard SF</td><td><a href="#">The Martian</a></td><td class="numeric">2011</td></tr>
      <tr><td>Fantasy</td><td><a href="#">The Hobbit</a></td><td class="numeric">1937</td></tr>
    </tbody>
    <tfoot>
      <tr><td>4 genres</td><td>4 titles</td><td class="numeric">1937–2011</td></tr>
    </tfoot>
  </table>
</div>`,
  },
  {
    id: 'table-colors',
    title: 'Table colours',
    description:
      'The standard colours on tables: .table-{color} on the table colours its header, footer and frame, and the same class on a row or a cell colours just that. Links in a coloured row take the highlight colour.',
    html: `<div class="table-wrap">
  <table class="table table-success">
    <thead>
      <tr><th>Check</th><th>Result</th><th class="numeric">Time</th></tr>
    </thead>
    <tbody>
      <tr><td>Build</td><td><a href="#">passed</a></td><td class="numeric">12 s</td></tr>
      <tr class="table-warning"><td>Lint</td><td><a href="#">3 warnings</a></td><td class="numeric">4 s</td></tr>
      <tr class="table-danger"><td>Tests</td><td><a href="#">1 failure</a></td><td class="numeric">48 s</td></tr>
      <tr class="table-special"><td>Review</td><td>assistant approved</td><td class="numeric">—</td></tr>
      <tr><td>Deploy</td><td class="table-primary">queued</td><td class="numeric">—</td></tr>
    </tbody>
    <tfoot>
      <tr><td colspan="2">4 of 5 steps done</td><td class="numeric">64 s</td></tr>
    </tfoot>
  </table>
</div>
${['primary', 'warning', 'danger', 'special']
  .map(
    c => `<div class="table-wrap">
  <table class="table table-${c}">
    <thead><tr><th>${c[0].toUpperCase() + c.slice(1)} table</th><th class="numeric">Count</th></tr></thead>
    <tbody><tr><td>Row</td><td class="numeric">1</td></tr></tbody>
  </table>
</div>`,
  )
  .join('\n')}`,
  },
  {
    id: 'accordion',
    title: 'Accordion',
    description:
      'A framed column of items, each a header bar with a caret over a padded body. With native <details> elements, as here, it opens and closes without a script; with other elements toggle .open on the item.',
    html: accordion,
  },
  {
    id: 'collapsible',
    title: 'Collapsible',
    description:
      'Styling hooks only: toggle .visible (and set an explicit height) from your own script. This demo toggles it with the button.',
    html: `${button('Toggle visibility', '', 'data-demo-toggle="#collapsible-demo"')}
<div id="collapsible-demo" class="collapsible animate visible">
  <div class="collapsible-inner">
    <p>This is the contents of the collapsible container.</p>
    <p>Visibility is controlled with the <code class="code-span">.visible</code> class.</p>
  </div>
</div>`,
    notes: [
      'Details: the CSS reset removes the disclosure marker of <code class="code-span">&lt;summary&gt;</code> (<code class="code-span">list-style: none</code>), so a <code class="code-span">&lt;details&gt;</code> toggle shows no hint that it can be clicked. Give <code class="code-span">&lt;summary&gt;</code> its own affordance, such as a chevron, a border or a pointer cursor (see the &quot;HTML source&quot; toggles on this page). The framework only styles <code class="code-span">.collapsible</code>, it never drives <code class="code-span">.visible</code> for you.',
    ],
  },
  {
    id: 'code',
    title: 'Code',
    description:
      'Inline code spans and code blocks share the input material, as in Philomena. A block scrolls horizontally, add .wrap to wrap long lines instead.',
    html: `<p>Inline <code class="code-span">.code-span</code> next to text, also in <code class="code-span base-font">.base-font</code> and <code class="code-span small">.small</code>.</p>
<pre class="code-block"><code>@import "@philomena/philomena-css/css/config.css";
$base-color-light: #e8590c;
@import "@philomena/philomena-css/css/framework.css";</code></pre>
<pre class="code-block wrap"><code>A wrapping block: ${lorem} ${lorem}</code></pre>`,
  },
  {
    id: 'media',
    title: 'Media boxes and lists',
    description:
      "A media box holds an image in a square area (fitted inside it like a thumbnail, .cover crops it to fill) with an optional title bar and overlay badges; .media-{color} colours the bar and border, .muted fades spoilered media. A media list fills the row with as many boxes as fit, at least the thumbnail width (250px, 150px on small screens) each; .small uses the 150px width. The pictures are the sizes Philomena's thumbnailer produces: a 250 × 250 box with wider or taller images fitted inside, and 150 × 150 for the small ones. The last row is Philomena's image thumbnail: a .media-box-header.actions row with fave, upvote, score, downvote, comments and hide (.media-box-action with its kind, filled when hovered or .active).",
    html: `<div class="media-list">
${mediaBoxes([
  ['A wide picture', 250, 141, '#5c7cfa', '#364fc7', ''],
  ['A tall picture', 141, 250, '#f783ac', '#a61e4d', ''],
  ['A square one', 250, 250, '#63e6be', '#087f5b', ' media-success'],
  ['Cropped to fill', 250, 141, '#ffd43b', '#e67700', ' cover'],
  ['Spoilered', 250, 250, '#845ef7', '#5f3dc4', ' muted'],
  ['Untitled, with badges', 250, 250, '#ff922b', '#d9480f', ' notitle'],
])}
</div>
<div class="media-list small">
${mediaBoxes([
  ['Small', 150, 150, '#4dabf7', '#1864ab', ''],
  ['Wide', 150, 84, '#69db7c', '#2b8a3e', ''],
  ['Tall', 84, 150, '#ffa94d', '#d9480f', ''],
  ['Boxes', 150, 150, '#da77f2', '#862e9c', ''],
])}
</div>
<div class="media-list">
${[
  imageBox(250, 250, '#3bc9db', '#0b7285', 12, 34, 5),
  imageBox(250, 141, '#9775fa', '#5f3dc4', 87, 412, 31, 'fave'),
  imageBox(141, 250, '#ff8787', '#c92a2a', 3, 9, 0, 'upvote'),
  imageBox(250, 250, '#a9e34b', '#5c940d', 0, -2, 1, 'downvote'),
].join('\n')}
</div>`,
  },
  {
    id: 'media-fits',
    title: 'Media box fits',
    description:
      '.scale-down on a media box fits a picture without enlarging it, so that a small one (the 100 × 60 and 60 × 100 pictures here) keeps its size, centered in the area, while a large one is fitted as usual.',
    html: `<div class="media-list">
${mediaBoxes([
  ['Scaled down', 100, 60, '#da77f2', '#862e9c', ' scale-down'],
  ['Scaled down, tall', 60, 100, '#f783ac', '#a61e4d', ' scale-down'],
  ['Scaled down, large', 400, 300, '#63e6be', '#087f5b', ' scale-down'],
])}
</div>`,
  },
  {
    id: 'media-overlays',
    title: 'Media overlays',
    description:
      'Overlays as Philomena marks its thumbnails: a .media-box-overlay label across the top of the image (.bottom for the bottom), several stacked in a .media-box-overlays wrapper, .media-{color} for the palette. A .media-box-veil covers the image with a centered label and .spoilered on the box blurs the image under it, for sites without spoiler artwork. The third box is how Philomena spoilers: the thumbnail is swapped for the SVG spoiler image of the tag, with the tag named in an overlay; your script removes them to reveal.',
    html: `<div class="media-list">
  <figure class="media-box">
    <div class="media-box-header"><a href="#">Video</a></div>
    <a class="media-box-content" href="#"><img src="${picture(250, 250, '#4dabf7', '#1864ab')}" alt="Video"><span class="media-box-overlay media-primary">WebM</span></a>
  </figure>
  <figure class="media-box spoilered">
    <div class="media-box-header"><a href="#">Spoilered</a></div>
    <a class="media-box-content" href="#"><img src="${picture(250, 250, '#f783ac', '#a61e4d')}" alt="Spoilered"><span class="media-box-veil">Spoiler: season finale</span></a>
  </figure>
  <figure class="media-box">
    <div class="media-box-header"><a href="#">Spoiler image</a></div>
    <a class="media-box-content" href="#"><img src="${spoilerImage('eye-slash', '#2b2140', '#b197fc')}" alt="Spoilered: season finale"><span class="media-box-overlay">season finale</span></a>
  </figure>
  <figure class="media-box media-danger">
    <div class="media-box-header"><a href="#">Deleted</a></div>
    <a class="media-box-content" href="#"><img src="${picture(250, 250, '#868e96', '#343a40')}" alt="Deleted"><span class="media-box-overlay media-danger">Deleted: rule violation</span></a>
  </figure>
  <figure class="media-box">
    <div class="media-box-header"><a href="#">Stacked</a></div>
    <a class="media-box-content" href="#"><img src="${picture(250, 250, '#ffd43b', '#e67700')}" alt="Stacked"><span class="media-box-overlays"><span class="media-warning">Marked duplicate</span><span class="media-primary">WebM</span><span>1920 × 1080</span></span><span class="media-box-overlay media-special bottom">★ featured</span></a>
  </figure>
</div>`,
  },
  {
    id: 'blockquote',
    title: 'Blockquote',
    description:
      'Quoted text and reply threads: a bar on the start side with a large gap to the text. A quote inside a quote adds another bar, so the depth of a thread shows as a row of bars; from the seventh level on the gap becomes small so that deep threads keep room for the text. <blockquote> and .blockquote both work.',
    html: `<blockquote>
  <p>A quoted paragraph. ${lorem}</p>
  <p>A second paragraph in the same quote.</p>
</blockquote>
${nestedQuotes(8)}`,
  },
  {
    id: 'block',
    title: 'Block',
    description:
      'A block as on Philomena: a tinted header bar at text size, with a plain title, bold links and room for actions, over bordered content. .block-header.sub is a lighter bar for a section inside, .block-{color} colours the bar, the border and the content links.',
    html: `<section class="block">
  <header class="block-header"><span class="block-header-title">Recent uploads</span><a href="#">View all</a><div class="block-header-actions"><a href="#">Refresh</a></div></header>
  <div class="block-content"><p>${lorem} <a href="#">A link</a>.</p></div>
  <header class="block-header sub"><a href="#">Comments</a><a href="#">Favourites</a><a href="#">History</a></header>
  <div class="block-content"><p>${lorem}</p></div>
</section>
<div class="docs-playground-grid">
${['primary', 'success', 'warning', 'danger', 'special']
  .map(
    c => `  <section class="block block-${c}">
    <header class="block-header"><span class="block-header-title">${c[0].toUpperCase() + c.slice(1)} block</span><a href="#">Link</a></header>
    <div class="block-content"><p>Content with <a href="#">a link</a>.</p></div>
  </section>`,
  )
  .join('\n')}
</div>`,
  },
  {
    id: 'content',
    title: 'Content container',
    description:
      'Centers its content up to a maximum width and spaces the direct children of .content apart. Inside this page the maximum is not reached.',
    html: contentContainer,
  },
  {
    id: 'tailwind-utilities',
    title: 'Utilities: spacing, flex, grid and text size',
    description:
      'Utilities named as in Tailwind, on the scales of the framework: text sizes (.text-xs to .text-3xl), flex containers and items (.flex, .flex-col, .items-*, .justify-*, .flex-1, .shrink-0 ...), gaps (.gap-{key}, .gap-x-, .gap-y-), grids (.grid, .grid-cols-{n}, .grid-cols-auto, .col-span-{n}), and padding and margin for a side, an axis or all sides (.p-, .px-, .pl- ..., .mx-auto, .ms-auto). They are !important, so they win over the styles of a component.',
    html: tailwindUtilities,
    notes: [
      'The keys are the steps of the spacing scale (<code class="code-span">0</code>, <code class="code-span">xs</code>, <code class="code-span">sm</code>, <code class="code-span">md</code>, <code class="code-span">lg</code>, <code class="code-span">xl</code>), not the numbers of Tailwind. There are no responsive or state variants.',
    ],
  },
  {
    id: 'utilities',
    title: 'Utilities',
    description:
      'Padding and margin utilities for every step of the spacing scale (.p-{key}, .m-{key} and the per-side forms), size utilities (.s-{step}, .fs-{step}), the older .grid-flex with .flex-basis-{n}, text alignment, cursors and text selection (.user-select-none, .user-select-all). The layout and visibility helpers have their own story.',
    html: utilities,
  },
  {
    id: 'card',
    title: 'Card',
    description:
      'A container with an optional header band, separated from the body by the card border. Links in the body use the link colour; .card-{color} colours the band, the border, the links and the default buttons with the standard palette and tints the body faintly.',
    html: `<article class="card">
  <header class="card-header"><h2>Card title</h2></header>
  <p>${lorem} <a href="#">A link</a>.</p>
</article>
<div class="docs-playground-grid">
${['primary', 'success', 'warning', 'danger', 'special']
  .map(
    c => `  <article class="card card-${c}">
    <header class="card-header"><h3>${c[0].toUpperCase() + c.slice(1)} card</h3></header>
    <p>A card with the ${c} header and <a href="#">a link</a> in its colour.</p>
    ${button('Button')}
  </article>`,
  )
  .join('\n')}
</div>
<article class="card">
  <header class="card-header"><h2>Header only</h2></header>
</article>`,
  },
];
