import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as fontAwesome from '@fortawesome/free-solid-svg-icons';

/**
 * Icons are only used by the docs, they are read from the packages at build time and never ship with the framework,
 * which only provides empty slots (.form-checkbox-check-icon, .form-select-icon, .button-icon, .loading-icon, ...).
 *
 * - Font Awesome Free solid icons: https://fontawesome.com, icons are CC BY 4.0
 * - Lucide: https://lucide.dev, ISC license
 */
export type IconSet = 'fontawesome' | 'lucide';
export type IconName =
  | 'check'
  | 'chevron-down'
  | 'clipboard'
  | 'spinner'
  | 'star'
  | 'arrow-up'
  | 'arrow-down'
  | 'comments'
  | 'eye-slash'
  | 'users'
  | 'gear'
  | 'question'
  | 'exclamation'
  | 'tags'
  | 'pen'
  | 'eye'
  | 'code'
  | 'gavel'
  | 'book'
  | 'image'
  | 'upload'
  | 'pen-square'
  | 'link'
  | 'envelope'
  | 'user'
  | 'sign-out'
  | 'search'
  | 'bell'
  | 'activity'
  | 'video'
  | 'images'
  | 'palette'
  | 'bars'
  | 'trash'
  | 'flag'
  | 'quote'
  | 'reply'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'underline';

export const iconSetLabels: Record<IconSet, string> = {
  fontawesome: 'Font Awesome Free',
  lucide: 'Lucide',
};

const faIcons: Record<IconName, { icon: [number, number, unknown, unknown, string] }> = {
  check: fontAwesome.faCheck as never,
  'chevron-down': fontAwesome.faChevronDown as never,
  clipboard: fontAwesome.faClipboard as never,
  spinner: fontAwesome.faSpinner as never,
  star: fontAwesome.faStar as never,
  'arrow-up': fontAwesome.faArrowUp as never,
  'arrow-down': fontAwesome.faArrowDown as never,
  comments: fontAwesome.faComments as never,
  'eye-slash': fontAwesome.faEyeSlash as never,
  users: fontAwesome.faUsers as never,
  gear: fontAwesome.faGear as never,
  question: fontAwesome.faCircleQuestion as never,
  exclamation: fontAwesome.faCircleExclamation as never,
  tags: fontAwesome.faTags as never,
  pen: fontAwesome.faPen as never,
  eye: fontAwesome.faEye as never,
  code: fontAwesome.faCode as never,
  gavel: fontAwesome.faGavel as never,
  book: fontAwesome.faBook as never,
  image: fontAwesome.faImage as never,
  upload: fontAwesome.faUpload as never,
  'pen-square': fontAwesome.faSquarePen as never,
  link: fontAwesome.faLink as never,
  envelope: fontAwesome.faEnvelope as never,
  user: fontAwesome.faUser as never,
  'sign-out': fontAwesome.faRightFromBracket as never,
  search: fontAwesome.faMagnifyingGlass as never,
  bell: fontAwesome.faBell as never,
  activity: fontAwesome.faChartLine as never,
  video: fontAwesome.faVideo as never,
  images: fontAwesome.faImages as never,
  palette: fontAwesome.faPalette as never,
  bars: fontAwesome.faBars as never,
  trash: fontAwesome.faTrash as never,
  flag: fontAwesome.faFlag as never,
  quote: fontAwesome.faQuoteRight as never,
  reply: fontAwesome.faReply as never,
  bold: fontAwesome.faBold as never,
  italic: fontAwesome.faItalic as never,
  strikethrough: fontAwesome.faStrikethrough as never,
  underline: fontAwesome.faUnderline as never,
};

// The build runs from docs/
// Lucide has no 'spinner', its equivalent is 'loader-circle'
const lucideFiles: Partial<Record<IconName, string>> = {
  spinner: 'loader-circle',
  comments: 'messages-square',
  'eye-slash': 'eye-off',
  gear: 'settings',
  question: 'circle-help',
  exclamation: 'circle-alert',
  pen: 'pencil',
  'pen-square': 'square-pen',
  envelope: 'mail',
  'sign-out': 'log-out',
  bars: 'menu',
  trash: 'trash-2',
};
const lucideDir = resolve(process.cwd(), 'node_modules/lucide-static/icons');

/** Returns an inline `<svg>` sized to the text, `fixedWidth` mirrors Font Awesome's fa-fw */
export const icon = (set: IconSet, name: IconName, className = ''): string => {
  const cls = className ? ` class="${className}"` : '';
  if (set === 'fontawesome') {
    const [width, height, , , path] = faIcons[name].icon;
    return `<svg${cls} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="1.25em" height="1em" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;
  }
  const body = readFileSync(resolve(lucideDir, `${lucideFiles[name] ?? name}.svg`), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .match(/<svg[^>]*>([\s\S]*)<\/svg>/)![1]
    .replace(/\s+/g, ' ')
    .trim();
  return `<svg${cls} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.25em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
};
