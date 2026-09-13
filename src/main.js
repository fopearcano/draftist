const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const projects = [
  { title: 'The Cartographer’s Daughter', meta: 'Novel · 24,680 words' },
  { title: 'The Last Signal', meta: 'Screenplay · 42 pages' },
  { title: 'Fox & Ember', meta: 'Graphic novel · 18 pages' },
];
const storyItems = [
  { name: 'Elena Vale', type: 'character', glyph: 'E' },
  { name: 'Jonah Mercer', type: 'character', glyph: 'J' },
  { name: 'Glass House', type: 'place', glyph: '⌖' },
  { name: 'Blackwater Bay', type: 'place', glyph: '⌖' },
  { name: 'The letter', type: 'object', glyph: '◇' },
  { name: 'The winter storm', type: 'event', glyph: '✦' },
];

const manuscripts = {
  novel: `<h1>The Arrival</h1><p>The train arrived at <mark class="entity place" data-entity="Blackwater Bay">Blackwater Bay</mark> three hours late, dragging a ribbon of mist behind it.</p><p><mark class="entity character" data-entity="Elena Vale">Elena Vale</mark> stepped down onto the empty platform with one suitcase, a leather folio, and the uncomfortable sense that someone had been waiting for her.</p><p>Across the tracks, beyond the rusted iron fence, the town climbed the hillside in tiers of slate roofs and narrow chimneys. At the summit stood the <mark class="entity place" data-entity="Glass House">Glass House</mark>—a dark shape against a darker sky, all sharp angles and shuttered windows.</p><h2>A familiar stranger</h2><p>“Miss Vale?”</p><p>The man beneath the station clock knew her name before she offered it.</p><p>“<mark class="entity character" data-entity="Jonah Mercer">Jonah Mercer</mark>,” he said. “I knew your mother.”</p><h2>The letter</h2><p>He held out <mark class="entity object" data-entity="The letter">the letter</mark>. Her name crossed the envelope in her mother’s unmistakable hand.</p><h1>The Glass House</h1><p>By dusk, every window reflected the sea.</p>`,
  screenplay: `<h1>1. EXT. BLACKWATER BAY STATION — DUSK</h1><p class="action">Rain needles an empty platform. A train exhales steam.</p><p class="character-cue">ELENA</p><p class="dialogue">This is the last stop?</p><p class="character-cue">CONDUCTOR</p><p class="dialogue">It is for you.</p><h1>2. EXT. STATION FORECOURT — CONTINUOUS</h1><p class="action">JONAH waits beneath the clock, holding a sealed letter.</p>`,
  graphic: `<h1>PAGE 1 — FIVE PANELS</h1><h2>Panel 1</h2><p class="panel-copy">Wide establishing shot. The train cuts through fog along the coast.</p><h2>Panel 2</h2><p class="panel-copy">Close on ELENA’s hand gripping the suitcase handle.</p><p class="character-cue">ELENA (CAPTION)</p><p class="dialogue">My mother erased this town from every map she drew.</p><h2>Panel 3</h2><p class="panel-copy">The Glass House watches from the hill.</p><h1>PAGE 2 — THREE PANELS</h1><h2>Panel 1</h2><p class="panel-copy">Jonah holds out the letter.</p>`,
};

const root = $('#root');
root.innerHTML = `
<div class="app view-page mode-novel" data-theme="light">
  <header class="topbar">
    <button class="brand" id="projects-toggle" aria-label="Open projects"><span class="logo">D</span><span>Draftist</span><span class="chevron">⌄</span></button>
    <div class="document-title"><input value="The Cartographer’s Daughter" aria-label="Document title"><span id="save-state">All changes saved</span></div>
    <div class="top-actions"><button class="icon-button" id="theme-toggle" aria-label="Toggle dark mode">◐</button><button class="icon-button active" id="comments-toggle" aria-label="Toggle comments">▢</button><button class="primary" id="share-button">Share</button><span class="avatar">EV</span></div>
  </header>
  <div class="project-popover" id="project-popover" hidden><div class="popover-title"><b>Projects</b><button id="new-project">＋ New</button></div><div id="project-list"></div></div>
  <div class="workspace">
    <aside class="left-panel">
      <div class="side-tabs"><button class="active" data-side="outline">Outline</button><button data-side="story">Story bible</button></div>
      <section class="side-view" id="outline-view"><div class="section-label"><span>DOCUMENT OUTLINE</span><button id="refresh-outline">↻</button></div><nav id="outline-list"></nav><button class="subtle-action" id="add-section">＋ Add heading</button></section>
      <section class="side-view" id="story-view" hidden><label class="search">⌕<input id="story-search" placeholder="Search people, places…"></label><div class="tag-filters"><button class="active" data-filter="all">All</button><button data-filter="character">Characters</button><button data-filter="place">Places</button><button data-filter="object">Objects</button></div><div id="story-list"></div></section>
      <div class="project-summary"><span>PROJECT</span><strong>The Cartographer’s Daughter</strong><small><span id="total-words">0</span> words · 3 chapters</small></div>
    </aside>
    <main class="editor-shell">
      <div class="modebar"><span>Writing mode</span><div class="segmented" id="mode-picker"><button class="active" data-mode="novel">Novel</button><button data-mode="screenplay">Screenplay</button><button data-mode="graphic">Graphic novel</button></div><span class="mode-hint" id="mode-hint">Prose & chapters</span></div>
      <div class="toolbar" role="toolbar" aria-label="Text formatting"><button data-cmd="undo">↶</button><button data-cmd="redo">↷</button><i></i><select id="block-format" aria-label="Text style"><option value="p">Paragraph</option><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="blockquote">Quote</option></select><select id="font-family" aria-label="Font"><option value="Literata">Literata</option><option value="Georgia">Georgia</option><option value="Arial">Arial</option><option value="Courier New">Courier</option></select><button data-cmd="bold"><b>B</b></button><button data-cmd="italic"><i>I</i></button><button data-cmd="underline"><u>U</u></button><button data-cmd="insertUnorderedList">☷</button><label class="color-control" title="Text color">A<input type="color" id="text-color" value="#322f30"></label><label class="color-control highlight" title="Highlight color">●<input type="color" id="highlight-color" value="#f7d774"></label><div class="toolbar-space"></div><button id="focus-toggle">✦ Focus</button></div>
      <div class="canvas"><article id="editor" class="paper" contenteditable="true" spellcheck="true" aria-label="Manuscript editor">${manuscripts.novel}</article></div>
      <footer class="statusbar"><span id="section-status">The Arrival</span><span id="word-count">0 words</span><span id="reading-time">0 min read</span><span class="save-ok">✓ Saved locally</span></footer>
    </main>
    <aside class="comments-panel"><div class="comments-header"><b>Comments</b><button id="comments-close">×</button></div><div class="selection-quote">“the uncomfortable sense that someone had been waiting for her.”</div><div id="comments-list"><article class="comment"><div><span class="avatar small">Y</span><b>You</b><small>2 min ago</small></div><p>Lean into the unease here. Why does she recognize the handwriting?</p><button class="resolve">✓ Resolve</button></article></div><div class="comment-compose"><textarea id="comment-input" placeholder="Add a comment…"></textarea><button id="add-comment">Comment</button></div></aside>
  </div>
  <div class="view-dock"><span>View</span><button class="active" data-view="page">Page</button><button data-view="flow">Flow</button><button data-view="focus">Focus</button><button data-view="typewriter">Typewriter</button></div>
  <div class="toast" hidden></div>
</div>`;

const app = $('.app');
const editor = $('#editor');
let currentFilter = 'all';
let saveTimer;

function escapeHtml(value) { const node=document.createElement('div'); node.textContent=value; return node.innerHTML; }
function toast(message) { const el=$('.toast'); el.textContent=message; el.hidden=false; clearTimeout(el.timer); el.timer=setTimeout(()=>el.hidden=true,1800); }
function updateStats() { const words=(editor.innerText.match(/\b[\w’'-]+\b/g)||[]).length; $('#word-count').textContent=`${words.toLocaleString()} words`; $('#total-words').textContent=words.toLocaleString(); $('#reading-time').textContent=`${Math.max(1,Math.ceil(words/225))} min read`; }
function updateOutline() {
  const headings=$$('h1,h2',editor); const list=$('#outline-list');
  list.innerHTML=headings.length?headings.map((heading,index)=>`<button class="outline-item level-${heading.tagName.toLowerCase()} ${index===0?'active':''}" data-heading="${index}"><span>${heading.tagName==='H1'?'⌄':''} ${escapeHtml(heading.textContent||'Untitled')}</span></button>`).join(''):'<p class="empty">Add headings to build your outline.</p>';
  $$('.outline-item',list).forEach(button=>button.addEventListener('click',()=>headings[Number(button.dataset.heading)].scrollIntoView({behavior:'smooth',block:'center'})));
}
function renderStory() { const query=$('#story-search').value.toLowerCase(); const visible=storyItems.filter(item=>(currentFilter==='all'||item.type===currentFilter)&&item.name.toLowerCase().includes(query)); $('#story-list').innerHTML=visible.map(item=>`<button class="story-item" data-name="${item.name}"><span class="story-glyph ${item.type}">${item.glyph}</span><span><b>${item.name}</b><small>${item.type}</small></span><i class="tag-dot ${item.type}"></i></button>`).join('')||'<p class="empty">No story items found.</p>'; $$('.story-item').forEach(button=>button.addEventListener('click',()=>{const match=$(`[data-entity="${button.dataset.name}"]`,editor);if(match){match.scrollIntoView({behavior:'smooth',block:'center'});match.classList.add('pulse');setTimeout(()=>match.classList.remove('pulse'),1200);}else toast('Item is not used in this draft');})); }
function renderProjects() { $('#project-list').innerHTML=projects.map((project,index)=>`<button class="project-row ${index===0?'current':''}"><span class="project-cover">${project.title[0]}</span><span><b>${project.title}</b><small>${project.meta}</small></span>${index===0?'<i>✓</i>':''}</button>`).join(''); }
function setSide(name) { $$('[data-side]').forEach(b=>b.classList.toggle('active',b.dataset.side===name)); $('#outline-view').hidden=name!=='outline'; $('#story-view').hidden=name!=='story'; }
function setMode(mode) { if(!confirm('Switch writing mode? The sample layout will replace the current editor content.')) return; editor.innerHTML=manuscripts[mode]; app.classList.remove('mode-novel','mode-screenplay','mode-graphic');app.classList.add(`mode-${mode}`);$$('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));$('#mode-hint').textContent={novel:'Prose & chapters',screenplay:'Scenes & dialogue',graphic:'Pages & panels'}[mode]; updateOutline();updateStats();saveDraft(); }
function saveDraft(){ $('#save-state').textContent='Saving…';clearTimeout(saveTimer);saveTimer=setTimeout(()=>{try{localStorage.setItem('draftist-document',editor.innerHTML);}catch{}$('#save-state').textContent='All changes saved';},350); }
function toggleComments(){app.classList.toggle('comments-hidden');}

renderProjects(); renderStory(); updateOutline(); updateStats();
$$('[data-side]').forEach(b=>b.addEventListener('click',()=>setSide(b.dataset.side)));
$('#story-search').addEventListener('input',renderStory);
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{currentFilter=b.dataset.filter;$$('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderStory();}));
$('#projects-toggle').addEventListener('click',()=>{$('#project-popover').hidden=!$('#project-popover').hidden;});
$('#new-project').addEventListener('click',()=>toast('New project created'));
$('#share-button').addEventListener('click',()=>toast('Share link copied'));
$('#comments-toggle').addEventListener('click',toggleComments); $('#comments-close').addEventListener('click',toggleComments);
$('#theme-toggle').addEventListener('click',()=>{app.dataset.theme=app.dataset.theme==='dark'?'light':'dark';});
$('#refresh-outline').addEventListener('click',()=>{updateOutline();toast('Outline refreshed');});
$('#add-section').addEventListener('click',()=>{editor.focus();document.execCommand('formatBlock',false,'h2');document.execCommand('insertText',false,'New section');updateOutline();saveDraft();});
$$('[data-cmd]').forEach(b=>b.addEventListener('click',()=>{document.execCommand(b.dataset.cmd);editor.focus();}));
$('#block-format').addEventListener('change',e=>{document.execCommand('formatBlock',false,e.target.value);editor.focus();updateOutline();});
$('#font-family').addEventListener('change',e=>{document.execCommand('fontName',false,e.target.value);editor.focus();});
$('#text-color').addEventListener('input',e=>document.execCommand('foreColor',false,e.target.value));
$('#highlight-color').addEventListener('input',e=>document.execCommand('hiliteColor',false,e.target.value));
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(!b.classList.contains('active'))setMode(b.dataset.mode);}));
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>{app.classList.remove('view-page','view-flow','view-focus','view-typewriter');app.classList.add(`view-${b.dataset.view}`);$$('[data-view]').forEach(x=>x.classList.toggle('active',x===b));}));
$('#focus-toggle').addEventListener('click',()=>{$('[data-view="focus"]').click();});
editor.addEventListener('input',()=>{updateStats();updateOutline();saveDraft();});
$('#comments-list').addEventListener('click',e=>{if(e.target.closest('.resolve'))e.target.closest('.comment').remove();});
$('#add-comment').addEventListener('click',()=>{const input=$('#comment-input');if(!input.value.trim())return;$('#comments-list').insertAdjacentHTML('beforeend',`<article class="comment"><div><span class="avatar small">Y</span><b>You</b><small>Just now</small></div><p>${escapeHtml(input.value)}</p><button class="resolve">✓ Resolve</button></article>`);input.value='';});
