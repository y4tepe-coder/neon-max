import { fileLimitMB, maxFiles, megabyte, submissionLimitMB } from './limits'

export const routePath = '/kunden/website-d7f40a39bf624a5c'
const filesPath = routePath + '?nachreichen=1'
export type Values = Record<string, string>
export type Mode = 'full' | 'files'

type Field = {
  key: string
  label: string
  hint?: string
  type?: 'name' | 'email' | 'text'
  required?: boolean
  wide?: boolean
  folded?: boolean
}
type Section = { title: string; fields: Field[] }

export const sections: Section[] = [
  {
    title: 'Impressum',
    fields: [
      { key: 'name', label: 'Vor- und Nachname', type: 'name', required: true },
      { key: 'address', label: 'Geschäftsanschrift', hint: 'Straße, Hausnummer, Postleitzahl und Ort für Ihr Impressum.', required: true },
      { key: 'publicEmail', label: 'Öffentliche E-Mail-Adresse', type: 'email', hint: 'Welche Adresse soll im Impressum stehen? Eine Wunschadresse können Sie bereits angeben.' },
      { key: 'contact', label: 'Öffentliche Telefonnummer', type: 'text', hint: 'Freiwillig, wenn Sie telefonisch erreichbar sein möchten.' },
      { key: 'company', label: 'Angaben zum Unternehmen', hint: 'Bei einer Gesellschaft bitte Firmennamen, Rechtsform und Vertretung nennen. Register, Registergericht, Registernummer, USt-IdNr. oder W-IdNr. nur ergänzen, soweit vorhanden. Bitte keine persönliche Steuer-ID oder Steuernummer eintragen.', wide: true, folded: true },
    ],
  },
  {
    title: 'Datenschutz',
    fields: [
      { key: 'email', label: 'E-Mail-Adresse für Rückfragen', type: 'email', required: true, wide: true, hint: 'Über diese Adresse erreicht NEON BW Sie während des Projekts.' },
      { key: 'recipient', label: 'Wer bearbeitet Ihre Website-Anfragen?', hint: '„Nur ich“ genügt. Falls Sie Anfragen weiterleiten, geben Sie bitte an, wer sie erhält.' },
      { key: 'retention', label: 'Wann löschen Sie Anfragen ohne Auftrag?', hint: 'Eine ungefähre Frist oder Ihr übliches Vorgehen genügt. Offene Fragen klären wir gemeinsam.' },
    ],
  },
  {
    title: 'Sonstige Unterlagen',
    fields: [
      { key: 'project', label: 'Projekt oder Unternehmen (optional)', type: 'text', wide: true, hint: 'Unter welchem Namen führen Sie das Projekt mit NEON BW?' },
      { key: 'notes', label: 'Ihre Nachricht zum Projekt', hint: 'Hier ist Platz für Fragen, Änderungswünsche, Bildfreigaben und Bildnachweise. Beziehen Sie sich auf ein Foto, nennen Sie bitte den Dateinamen.', wide: true },
    ],
  },
]

export const fields = sections.flatMap(section => section.fields)
export const limit = (field: Field) => field.type === 'name' ? 120 : field.type === 'email' ? 254 : field.type === 'text' ? 300 : 1500
const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

function input(field: Field, values: Values, errors: Values) {
  const { key, label, hint, type } = field
  const error = errors[key]
  const description = [hint && key + '-hint', error && key + '-error'].filter(Boolean).join(' ')
  const attributes = [
    `name="${key}" id="${key}" maxlength="${limit(field)}"`,
    field.required && 'required',
    description && `aria-describedby="${description}"`,
    error && 'aria-invalid="true"',
  ].filter(Boolean).join(' ')
  const value = escapeHtml(values[key] || '')
  const control = type
    ? `<input ${attributes} type="${type === 'email' ? 'email' : key === 'contact' ? 'tel' : 'text'}" autocomplete="${key === 'name' ? 'name' : key === 'email' ? 'email' : 'off'}" value="${value}">`
    : `<textarea ${attributes} rows="${key === 'address' ? 1 : 3}">${value}</textarea>`
  return `<div class="field${field.wide ? ' wide' : ''}">
    <label for="${key}">${label}${field.required ? ' <span aria-hidden="true">*</span>' : ''}</label>
    ${control}
    <div class="field-help">
      ${hint ? `<p class="hint" id="${key}-hint">${hint}</p>` : ''}
      ${error ? `<p class="issue" id="${key}-error">${escapeHtml(error)}</p>` : ''}
    </div>
  </div>`
}

function fileInput(key: 'photos' | 'documents', errors: Values) {
  const photo = key === 'photos'
  const accept = photo ? '.jpg,.jpeg,.png,.webp,.heic,.heif' : '.pdf,.docx'
  return `<div class="upload">
    <label for="${key}">${photo ? 'Fotos im Original' : 'Weitere Dokumente'}</label>
    <p class="hint" id="${key}-hint">${photo ? 'Ihr Porträt und weitere Fotos als JPG, PNG, WebP, HEIC oder HEIF.' : 'Texte und Freigaben als PDF oder Word-Datei (.docx). Auch Word-Dateien mit eingefügten Fotos gehören hierher.'}</p>
    <input id="${key}" name="${key}" type="file" accept="${accept}" multiple aria-describedby="${key}-hint${errors[key] ? ' ' + key + '-error' : ''}" ${errors[key] ? 'aria-invalid="true"' : ''}>
    ${errors[key] ? `<p class="issue" id="${key}-error">${escapeHtml(errors[key])}</p>` : ''}
  </div>`
}

function attachments(errors: Values) {
  return `<p class="section-note">Sie können Fotos und Dokumente als einzelne Dateien hochladen und mehrere auf einmal auswählen.</p>
    <div class="uploads">${fileInput('photos', errors)}${fileInput('documents', errors)}</div>
    <p class="hint">Bis zu ${maxFiles} Dateien pro Abgabe, höchstens ${fileLimitMB} MB pro Datei und ${submissionLimitMB} MB insgesamt. Weitere Dateien können Sie separat nachreichen.</p>
    <p class="hint" id="file-selection" role="status" aria-live="polite"></p>
    <p class="hint email-option"><a href="mailto:y4tepe@gmail.com?subject=${encodeURIComponent('NEON BW · Kundenportal – Unterlagen')}">Unterlagen per E-Mail schicken</a> – die Dateien fügen Sie als Anhang in Ihrem Mailprogramm hinzu.</p>`
}

function sectionPanel(section: Section, index: number, values: Values, errors: Values) {
  const standard = section.fields.filter(field => !field.folded)
  const folded = section.fields.filter(field => field.folded)
  const specialCases = folded.length ? `<details${folded.some(field => values[field.key] || errors[field.key]) ? ' open' : ''}>
    <summary>Angaben zu Gesellschaft, Register oder Unternehmens-ID ergänzen</summary>
    <div class="field-grid">${folded.map(field => input(field, values, errors)).join('')}</div>
  </details>` : ''
  return `<section class="panel" id="teil-${index + 1}" aria-labelledby="heading-${index}">
    <h2 id="heading-${index}">${section.title}</h2>
    ${index === 2 ? attachments(errors) : ''}
    <div class="field-grid">${standard.map(field => input(field, values, errors)).join('')}</div>
    ${specialCases}
  </section>`
}

export const selectionScript = `(() => {
  const inputs = Array.from(document.querySelectorAll('input[type="file"]'));
  const status = document.getElementById('file-selection');
  const format = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
  function check(changed) {
    let count = 0;
    let bytes = 0;
    let message = '';
    let invalid = changed;
    for (const input of inputs) {
      input.setCustomValidity('');
      for (const file of input.files) {
        count++;
        bytes += file.size;
        if (!message && (file.size === 0 || file.size > ${fileLimitMB * megabyte})) {
          message = file.size === 0
            ? '„' + file.name + '“ ist leer. Bitte wählen Sie eine andere Datei.'
            : '„' + file.name + '“ ist zu groß. Erlaubt sind ${fileLimitMB} MB pro Datei.';
          invalid = input;
        }
      }
    }
    if (!message && count > ${maxFiles}) message = 'Bitte verteilen Sie die Dateien auf mehrere Abgaben mit jeweils höchstens ${maxFiles} Dateien.';
    if (!message && bytes > ${submissionLimitMB * megabyte}) message = 'Die Auswahl überschreitet ${submissionLimitMB} MB. Bitte reichen Sie einen Teil der Dateien separat nach.';
    invalid.setCustomValidity(message);
    status.className = message ? 'issue' : 'hint';
    status.textContent = message || (count ? count + (count === 1 ? ' Datei' : ' Dateien') + ' ausgewählt (' + format.format(bytes / ${megabyte}) + ' MB).' : '');
  }
  for (const input of inputs) input.addEventListener('change', () => check(input));
})();`

const css = `
@font-face {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/13971731025ec697-s.p.woff2") format("woff2");
}
:root { color-scheme: light; --lime: #c5f74f; --ink: #171815; --muted: #54574e; --paper: #f8f7f4; --line: #d7d9d1; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 20px; }
body { margin: 0; color: var(--ink); background: var(--paper); font: 16px/1.5 "DM Sans",system-ui,sans-serif; }
a { color: inherit; text-underline-offset: .2em; }
a:hover { text-decoration-thickness: 2px; }
header { background: #131313; color: white; }
.bar, .layout, footer { width: min(1110px,91%); margin: auto; }
.bar { min-height: 70px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.logo { display: inline-flex; gap: 12px; align-items: center; text-decoration: none; }
.logo strong { font-size: 30px; letter-spacing: -.08em; line-height: 1; font-weight: 850; }
.logo i { color: var(--lime); font-style: normal; }
.logo small { border-left: 1px solid #74776f; padding-left: 12px; font-size: 12px; line-height: 1.15; font-weight: 620; }
.bar > span { font-size: 14px; color: #eee; }
.layout { display: grid; grid-template-columns: minmax(210px,.72fr) minmax(0,1.6fr); align-items: start; gap: clamp(32px,5vw,75px); padding: 55px 0 75px; }
.intro { position: sticky; top: 24px; }
h1,h2 { text-wrap: balance; }
h1 { margin: 0 0 20px; font-size: clamp(40px,4.35vw,62px); line-height: 1; letter-spacing: -.062em; }
.intro p,.thanks p { color: var(--muted); margin: 0 0 14px; max-width: 40ch; }
.intro nav { display: grid; border-top: 1px solid var(--line); margin: 30px 0 20px; }
.intro nav a { display: flex; justify-content: space-between; border-bottom: 1px solid var(--line); padding: 10px 0; text-decoration: none; }
.intro nav a::after { content: '↓'; color: var(--muted); }
.intro nav a:hover { text-decoration: underline; }
.shortcut { display: inline-block; font-size: 15px; font-weight: 600; }
.panel { background: white; border: 1px solid var(--line); border-radius: 16px; padding: clamp(20px,3vw,34px); margin: 0 0 18px; }
h2 { line-height: 1.1; font-size: clamp(25px,2.4vw,32px); letter-spacing: -.045em; margin: 0 0 22px; }
.field-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 21px 18px; }
.field { min-width: 0; }
.wide { grid-column: 1/-1; }
.field label,.upload label { display: block; font-size: 15px; font-weight: 680; }
.field > input,.field textarea { display: block; align-self: start; appearance: none; background: #fcfcfa; color: var(--ink); border: 1px solid #aeb2a6; border-radius: 8px; width: 100%; min-height: 46px; padding: 10px 12px; font: inherit; margin: 7px 0 0; }
.field textarea { resize: vertical; display: block; }
@supports (grid-template-rows: subgrid) {
  .field-grid { row-gap: 0; }
  .field-grid > .field { display: grid; grid-template-rows: subgrid; grid-row: span 3; }
  .field-grid > .field > .field-help { padding-bottom: 20px; }
  .field-grid > .field:not(.wide):nth-last-child(-n + 2) > .field-help,
  .field-grid > .field:last-child > .field-help { padding-bottom: 0; }
}
.hint,.section-note,.privacy { color: var(--muted); }
.hint { font-size: 13px; line-height: 1.45; margin: 4px 0 0; }
.section-note { font-size: 15px; margin: -4px 0 16px; }
details { border-top: 1px solid var(--line); margin: 24px 0 0; padding-top: 14px; }
summary { font-size: 14px; font-weight: 640; cursor: pointer; }
details .field-grid { margin-top: 15px; }
.uploads { display: grid; gap: 12px; }
.upload { border: 1px dashed #9aab85; border-radius: 10px; padding: 13px 15px; background: #fafbf7; }
.upload input { display: block; font: inherit; font-size: 14px; margin-top: 10px; max-width: 100%; }
.upload input::file-selector-button { font-family: inherit; font-weight: 650; color: var(--ink); background: #edf2e2; border: 1px solid #b1be9e; padding: 7px 11px; border-radius: 6px; cursor: pointer; margin-right: 7px; }
.uploads + .hint { margin-top: 9px; }
.email-option { margin: 6px 0 22px; }
.privacy { font-size: 14px; margin: 5px 0 16px; }
.submit { color: var(--ink); background: var(--lime); border: 1px solid #b1d457; border-radius: 999px; padding: 13px 24px; font: inherit; font-weight: 680; cursor: pointer; }
.submit:hover { background: #b6ed3c; }
:focus-visible { outline: 3px solid #547319; outline-offset: 3px; }
[aria-invalid=true] { border-color: #963726 !important; }
.notice,.issue { color: #852b1b; }
.notice { padding: 12px 15px; margin: 0 0 15px; border: 1px solid #d5ab99; background: #fff3ea; border-radius: 8px; }
.issue { margin: 5px 0 0; font-size: 14px; }
.trap { position: absolute; width: 1px; height: 1px; left: -10000px; overflow: hidden; }
.thanks { width: min(690px,91%); margin: clamp(60px,10vw,140px) auto; }
.thanks p { max-width: 50ch; font-size: 18px; }
.thanks a { display: inline-block; margin-top: 6px; }
.footline { border-top: 1px solid var(--line); }
footer { display: flex; justify-content: space-between; gap: 16px; padding: 22px 0; font-size: 14px; }
footer div { display: flex; gap: 16px; }
@media (max-width: 820px) {
  .layout { grid-template-columns: 1fr; gap: 25px; padding-top: 34px; }
  .intro { position: static; }
  .intro nav { display: none; }
  .intro p { max-width: 58ch; }
  .bar { min-height: 60px; }
}
@media (max-width: 560px) {
  .field-grid { grid-template-columns: 1fr; gap: 18px; }
  .field-grid > .field { display: block; grid-row: auto; }
  .field-grid > .field > .field-help { padding-bottom: 0; }
  .panel { padding: 19px; border-radius: 12px; }
  .submit { width: 100%; }
  footer { flex-wrap: wrap; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`

export function render(values: Values = {}, errors: Values = {}, notice = '', sent = false, token = '', mode: Mode = 'full') {
  const filesOnly = mode === 'files'
  const title = filesOnly ? 'Unterlagen oder Nachricht nachreichen' : 'Kundenportal'
  const introduction = filesOnly
    ? 'Geben Sie Ihren Namen und Ihre E-Mail-Adresse an. Sie können uns eine Nachricht zu Ihrem Projekt schreiben, Dateien hochladen oder beides zusammen übermitteln.'
    : 'Übermitteln Sie uns Ihre Angaben für Impressum und Datenschutz sowie Fotos und weitere Projektunterlagen. Pflichtfelder sind mit * gekennzeichnet.'
  const navigation = filesOnly ? '' : `<nav aria-label="Abschnitte">${sections.map((s, i) => `<a href="#teil-${i + 1}">${s.title}</a>`).join('')}</nav>`
  const panels = filesOnly
    ? `<section class="panel"><h2>Ihre Angaben</h2><div class="field-grid">${fields.filter(f => f.key === 'name' || f.key === 'email').map(f => input({ ...f, wide: false, hint: undefined }, values, errors)).join('')}</div>
         <div style="margin-top:24px">${attachments(errors)}</div>
         <div class="field-grid">${sections[2].fields.map(field => input(field, values, errors)).join('')}</div></section>`
    : sections.map((s, i) => sectionPanel(s, i, values, errors)).join('')
  const form = `<main class="layout"><aside class="intro">
    <h1>${escapeHtml(title)}</h1><p>${introduction}</p>${navigation}
    <a class="shortcut" href="${filesOnly ? routePath : filesPath}">${filesOnly ? 'Zum vollständigen Formular' : 'Unterlagen oder Nachricht nachreichen'}</a>
  </aside>
  <form method="post" enctype="multipart/form-data" accept-charset="UTF-8" action="${filesOnly ? filesPath : routePath}">
    <input type="hidden" name="submission" value="${escapeHtml(token)}"><input type="hidden" name="mode" value="${filesOnly ? 'files' : 'full'}">
    <div class="trap" aria-hidden="true"><label>Bitte frei lassen<input name="address2" tabindex="-1" autocomplete="off"></label></div>
    ${notice ? `<div role="alert" class="notice">${escapeHtml(notice)}</div>` : ''}
    ${panels}
    <p class="privacy">NEON BW speichert Ihre Angaben und Dateien für die Bearbeitung Ihres Projekts in einem privaten Ordner bei Hostinger. Eine kurze Nachricht an unser Projektpostfach bei Gmail ordnet den Eingang über Ihre Kontakt- und Projektangaben zu. Ihre hochgeladenen Dateien bleiben im Projektordner. Auf Ihrer Website veröffentlichen wir nur freigegebene Inhalte. <a href="/datenschutz">Datenschutzhinweise</a></p>
    <button class="submit" type="submit">${filesOnly ? 'An NEON BW übermitteln' : 'Angaben an NEON BW übermitteln'}</button>
  </form></main>`
  const thanks = `<main class="thanks"><h1>Vielen Dank!</h1><p>Ihre Angaben sind bei NEON BW eingegangen. Bei Rückfragen erreichen wir Sie unter der angegebenen E-Mail-Adresse.</p><a href="${filesPath}">Weitere Unterlagen oder eine Nachricht nachreichen</a></main>`
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>${sent ? 'Vielen Dank' : escapeHtml(title)} · NEON BW</title><style>${css}</style></head>
    <body><header><div class="bar"><a class="logo" href="/" aria-label="NEON BW – Startseite"><strong>NEON<i>.</i></strong><small>Webdesign<br>&amp; KI</small></a><span>Kundenbereich</span></div></header>
    ${sent ? thanks : form + `<script>${selectionScript}</script>`}
    <div class="footline"><footer><span>NEON BW · Region Stuttgart</span><div><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div></footer></div></body></html>`
}
