export interface Story {
  id: string;
  title: string;
  description: string;
  html: string;
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const ucfirst = (value: string) => value[0].toUpperCase() + value.slice(1);

const alerts = `<div class="alert info">
  <div class="alert-icon">i</div>
  <div class="alert-content">
    <div class="alert-title">Info alert</div>
    <div class="alert-text">${lorem}</div>
  </div>
</div>
<div class="alert warning">
  <div class="alert-icon">!</div>
  <div class="alert-content">
    <div class="alert-title">Warning alert</div>
    <div class="alert-text">${lorem}</div>
  </div>
</div>
<div class="alert">
  <div class="alert-content">
    <div class="alert-title">Plain alert</div>
    <div class="alert-text">${lorem}</div>
  </div>
</div>
<div class="alert compact info">
  <div class="alert-content">
    <div class="alert-title">Compact alert title</div>
    <div class="alert-text">Compact alert text</div>
    <div class="alert-actions"><button type="button" class="button"><span class="button-content"><span class="button-text">Compact alert action</span></span></button></div>
  </div>
</div>`;

const loadingIndicator = '<svg class="loading-indicator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1em" height="1em"><path d="M35 32a3.001 3.001 0 0 1-6 0l3-26.074L35 32Z" class="minute"/><path d="M35 32a3.001 3.001 0 0 1-6 0l3-13.037L35 32Z" class="hour"/><g class="base"><circle cx="32" cy="32" r="29" class="face"/><path d="M32 3v7m0 44v7m22-29h7M3 32h7" class="ticking"/></g></svg>';

const buttonRow = (color?: string) => {
  const cls = color ? `button button-${color}` : 'button';
  const label = color ?? 'default';
  const btn = (extra: string, attrs: string, text: string, loading = false) =>
    `  <button type="button" class="${cls}${extra}"${attrs}>${loading ? `<span class="loading-icon">${loadingIndicator}</span>` : ''}<span class="button-content"><span class="button-text">${text}</span></span></button>`;
  return `<div class="button-group separated">
${btn('', '', `${ucfirst(label)}`)}
${btn('', ' disabled', 'Disabled')}
${btn(' pressed', '', 'Pressed')}
${btn(' loading', ' disabled', 'Loading', true)}
</div>`;
};

const buttons = [undefined, 'primary', 'success', 'danger', 'warning', 'light', 'dark'].map(buttonRow).join('\n');

const formFields = (state: 'regular' | 'readonly' | 'disabled') => {
  const attr = state === 'regular' ? '' : ` ${state}`;
  return `<div class="form-control-group vertical">
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control">
      <label class="form-control-label" for="${state}-text">Text input</label>
      <input id="${state}-text" class="input-field" type="text" value="Hello"${attr}>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control">
      <label class="form-control-label" for="${state}-select">Select</label>
      <div class="form-control-select">
        <select id="${state}-select" class="form-select-input input-field"${attr}>
          <option>First</option>
          <option>Second</option>
        </select>
        <span class="form-select-icon">&#9662;</span>
      </div>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control-checkbox">
      <span class="form-checkbox-input-wrap">
        <input id="${state}-check" class="form-checkbox-input" type="checkbox" checked${state === 'regular' ? '' : ' disabled'}>
        <span class="form-checkbox-check-icon">&#10003;</span>
      </span>
      <label class="form-checkbox-label" for="${state}-check">Checkbox</label>
    </div>
  </div>
  <div class="form-control-wrap${state === 'disabled' ? ' disabled' : ''}">
    <div class="form-control-radio">
      <span class="form-radio-input-wrap">
        <input id="${state}-radio" class="form-radio-input" type="radio" name="${state}-radio" checked${state === 'regular' ? '' : ' disabled'}>
        <span class="form-radio-select-icon"></span>
      </span>
      <label class="form-radio-label" for="${state}-radio">Radio</label>
    </div>
  </div>
</div>`;
};

const badgeColors = [undefined, 'green', 'blue', 'cyan', 'purple', 'red', 'yellow', 'muted'];
const badgeGroup = (prefix?: string, suffix?: string) => `<span class="badge-group">
${badgeColors.map(color => {
  const label = `${color ? ucfirst(color) : 'Default'} badge`;
  return `  <span class="badge${color ? ` badge-${color}` : ''}">${prefix ? `<span class="badge-prefix">${prefix}</span>` : ''}<span class="badge-content">${label}</span>${suffix ? `<span class="badge-suffix">${suffix}</span>` : ''}</span>`;
}).join('\n')}
</span>`;

export const stories: Story[] = [
  { id: 'alerts', title: 'Alerts', description: 'Info and warning variants, plus a compact layout with actions.', html: alerts },
  { id: 'buttons', title: 'Buttons', description: 'Every colour in the default, disabled, pressed and loading state. The loading state puts a .loading-icon (a slot for any icon, here the clock indicator) over the dimmed content, on a gradient in the button colour.', html: buttons },
  { id: 'forms-regular', title: 'Forms: regular', description: 'Input, select, checkbox and radio.', html: formFields('regular') },
  { id: 'forms-readonly', title: 'Forms: readonly', description: 'The same controls with the readonly attribute.', html: formFields('readonly') },
  { id: 'forms-disabled', title: 'Forms: disabled', description: 'The same controls disabled.', html: formFields('disabled') },
  { id: 'badges', title: 'Badges', description: 'Colours, with optional prefix and suffix.', html: [badgeGroup(), badgeGroup('Prefixed'), badgeGroup(undefined, 'Suffixed'), badgeGroup('Prefixed', 'Suffixed')].join('\n') },
  { id: 'table', title: 'Table', description: 'Header, body header cell and footer. Add .responsive to the wrapper to scroll on narrow screens.', html: `<div class="table-wrap">
  <table class="table">
    <thead>
      <tr><th>Table header cell 1</th><th>Table header cell 2</th><th>Table header cell 3</th></tr>
    </thead>
    <tbody>
      <tr><td>Data cell 1 / 1</td><td>Data cell 1 / 2</td><td>Data cell 1 / 3</td></tr>
      <tr><th>Body header cell 2 / 1</th><td>Data cell 2 / 2</td><td>Data cell 2 / 3</td></tr>
    </tbody>
    <tfoot>
      <tr><td>Footer cell 1</td><td>Footer cell 2</td><td>Footer cell 3</td></tr>
    </tfoot>
  </table>
</div>` },
  { id: 'collapsible', title: 'Collapsible', description: 'Styling hooks only: toggle .visible (and set an explicit height) from your own script. This demo toggles it with the button.', html: `<button type="button" class="button" data-demo-toggle="#collapsible-demo"><span class="button-content"><span class="button-text">Toggle visibility</span></span></button>
<div id="collapsible-demo" class="collapsible animate visible">
  <div class="collapsible-inner">
    <p>This is the contents of the collapsible container.</p>
    <p>Visibility is controlled with the <code class="code-span">.visible</code> class.</p>
  </div>
</div>` },
  { id: 'card', title: 'Card', description: 'A container with an optional header.', html: `<article class="card">
  <header class="card-header"><h2>Card title</h2></header>
  <p>${lorem}</p>
</article>` },
];
