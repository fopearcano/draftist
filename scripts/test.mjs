import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

const [html, script, css] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('src/main.js', 'utf8'),
  readFile('src/styles.css', 'utf8'),
]);
const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

assert.equal(packageJson.scripts.dev, 'node scripts/server.mjs');
assert.equal(packageJson.scripts.start, packageJson.scripts.dev);
assert.equal(packageJson.scripts.doctor, 'node scripts/doctor.mjs');

assert.match(html, /rel="stylesheet" href="\/src\/styles\.css"/);
assert.match(html, /type="module" src="\/src\/main\.js"/);
assert.ok(!script.includes('data-mode='), 'Draftist must remain a novel-only workspace');
for (const view of ['contracted', 'expanded', 'focus', 'focus-wide', 'typewriter', 'inverted', 'grayscale', 'retro', 'future']) {
  assert.ok(script.includes(`data-view="${view}"`), `missing viewing preset: ${view}`);
}
for (const entity of ['character', 'place', 'object', 'music', 'sound']) {
  assert.ok(script.includes(`entity ${entity}`), `missing entity styling: ${entity}`);
}
assert.ok(script.includes('data-filter="music"') && script.includes('data-filter="sound"'), 'story bible must filter music and sounds');
assert.match(css, /\.story-glyph\.music/);
assert.match(css, /\.story-glyph\.sound/);
assert.ok(script.includes('id="import-button"') && script.includes('id="export-button"'), 'missing import/export controls');
assert.ok(!script.includes('id="share-button"'), 'obsolete share control is still present');
for (const command of ['italic', 'strikeThrough', 'removeFormat', 'insertOrderedList', 'justifyCenter']) {
  assert.ok(script.includes(`data-cmd="${command}"`), `missing formatting command: ${command}`);
}
assert.ok(script.includes('Atkinson Hyperlegible') && script.includes('OpenDyslexic'), 'accessible font choices are missing');
assert.match(script, /id="focus-exit"/);
assert.match(script, /event\.key==='Escape'.*view-focus/, 'focus mode must support Escape');
assert.match(script, /const icons = \{/);
assert.match(script, /class="menu-icon"/);
assert.match(script, /function rememberSelection/, 'formatting controls must preserve and reflect the editor selection');
assert.match(script, /aria-expanded/, 'project menu must expose its open state');
assert.ok(script.includes('Chapter (H1)') && script.includes('Section (H2)'), 'toolbar structure names must match the outline');
assert.match(script, /data-side="help"/);
assert.match(script, /function changeZoom/);
assert.match(script, /overall-italic/);
assert.match(script, /event\.metaKey\|\|event\.ctrlKey/, 'global shortcuts must work on macOS and other platforms');
assert.match(script, /function centerTypewriterCaret/, 'typewriter mode must keep the caret centered');
assert.match(script, /\$\$\('h1,h2'/, 'outline must derive from document headings');
assert.match(script, /canvas\.scrollTo/, 'outline navigation must scroll only the editor canvas');
assert.ok(!script.includes("scrollIntoView({behavior:'smooth',block:'center'})"), 'outline navigation must not scroll the whole application viewport');
assert.match(script, /syncOutlineToScroll/, 'outline selection must follow manual scrolling');
assert.match(script, /function renameHeading/, 'outline headings must be renameable');
assert.ok(script.includes('data-add-heading="h1"') && script.includes('data-add-heading="h2"'), 'outline must offer chapter and section creation');
assert.match(script, /function removeHeading/, 'outline headings must be removable');
assert.ok(!script.includes("prompt('Rename heading'"), 'heading names should be edited inline, not through a prompt');
assert.match(css, /\.workspace,.editor-shell,.canvas\{min-height:0\}/, 'nested editor flex containers must permit canvas scrolling');
assert.match(css, /\.workspace\{overflow:hidden\}/, 'the application viewport must remain fixed while the canvas scrolls');
assert.match(css, /\.view-expanded \.workspace/);
assert.match(css, /\.view-inverted/);
assert.match(css, /\.view-grayscale\{filter:grayscale\(1\)\}/);
assert.match(css, /\.view-retro/);
assert.match(css, /\.view-future/);
assert.match(css, /\.view-focus-wide/);
assert.match(css, /@media print/);
assert.match(css, /\.paper \*\{color:#000!important;background:transparent!important/);
console.log('Draftist feature checks passed');
