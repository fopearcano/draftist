const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icons = {
  import: '<path d="M12 3v12m0-12-4 4m4-4 4 4M5 14v5h14v-5"/>',
  export: '<path d="M12 15V3m0 12-4-4m4 4 4-4M5 17v2h14v-2"/>',
  moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
  comments: '<path d="M4 5h16v11H8l-4 4V5Z"/>',
  undo: '<path d="M9 7 4 12l5 5M5 12h8a6 6 0 0 1 6 6"/>',
  redo: '<path d="m15 7 5 5-5 5m4-5h-8a6 6 0 0 0-6 6"/>',
  bullets: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  numbers: '<path d="M10 6h10M10 12h10M10 18h10M4 5h2v3M4 11h2l-2 3h2M4 17h2v3H4"/>',
  left: '<path d="M4 6h16M4 10h11M4 14h16M4 18h11"/>',
  center: '<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
  right: '<path d="M4 6h16M9 10h11M4 14h16M9 18h11"/>',
  focus: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5m13 5h5v-5"/>',
  refresh: '<path d="M20 6v5h-5M4 18v-5h5M6.1 9a7 7 0 0 1 11.7-2.6L20 11M4 13l2.2 4.6A7 7 0 0 0 18 15"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/>',
};
const svgIcon = name => `<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;

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
  { name: 'Mother’s waltz', type: 'music', glyph: '♫' },
  { name: 'Station bell', type: 'sound', glyph: '◖' },
];

const manuscripts = {
  novel: `<h1>The Arrival</h1><p>The train arrived at <mark class="entity place" data-entity="Blackwater Bay">Blackwater Bay</mark> three hours late, dragging a ribbon of mist behind it.</p><p><mark class="entity character" data-entity="Elena Vale">Elena Vale</mark> stepped down onto the empty platform with one suitcase, a leather folio, and the uncomfortable sense that someone had been waiting for her. The <mark class="entity sound" data-entity="Station bell">station bell</mark> rang once.</p><p>Across the tracks, beyond the rusted iron fence, the town climbed the hillside in tiers of slate roofs and narrow chimneys. At the summit stood the <mark class="entity place" data-entity="Glass House">Glass House</mark>—a dark shape against a darker sky, all sharp angles and shuttered windows.</p><h2>A familiar stranger</h2><p>“Miss Vale?”</p><p>The man beneath the station clock knew her name before she offered it. Somewhere nearby, a radio played <mark class="entity music" data-entity="Mother’s waltz">Mother’s waltz</mark>.</p><p>“<mark class="entity character" data-entity="Jonah Mercer">Jonah Mercer</mark>,” he said. “I knew your mother.”</p><h2>The letter</h2><p>He held out <mark class="entity object" data-entity="The letter">the letter</mark>. Her name crossed the envelope in her mother’s unmistakable hand.</p><h1>The Glass House</h1><p>By dusk, every window reflected the sea.</p>`,
  screenplay: `<h1>1. EXT. BLACKWATER BAY STATION — DUSK</h1><p class="action">Rain needles an empty platform. A train exhales steam.</p><p class="character-cue">ELENA</p><p class="dialogue">This is the last stop?</p><p class="character-cue">CONDUCTOR</p><p class="dialogue">It is for you.</p><h1>2. EXT. STATION FORECOURT — CONTINUOUS</h1><p class="action">JONAH waits beneath the clock, holding a sealed letter.</p>`,
  graphic: `<h1>PAGE 1 — FIVE PANELS</h1><h2>Panel 1</h2><p class="panel-copy">Wide establishing shot. The train cuts through fog along the coast.</p><h2>Panel 2</h2><p class="panel-copy">Close on ELENA’s hand gripping the suitcase handle.</p><p class="character-cue">ELENA (CAPTION)</p><p class="dialogue">My mother erased this town from every map she drew.</p><h2>Panel 3</h2><p class="panel-copy">The Glass House watches from the hill.</p><h1>PAGE 2 — THREE PANELS</h1><h2>Panel 1</h2><p class="panel-copy">Jonah holds out the letter.</p>`,
};

const root = $('#root');
root.innerHTML = `
<div class="app view-contracted mode-novel" data-theme="light">
  <header class="topbar">
    <button class="brand" id="projects-toggle" aria-label="Open projects"><span class="logo">D</span><span>Draftist</span><span class="chevron">⌄</span></button>
    <div class="document-title"><input value="The Cartographer’s Daughter" aria-label="Document title"><span id="save-state">All changes saved</span></div>
    <div class="top-actions"><input id="import-file" type="file" accept=".html,.htm,.txt,.md" hidden><button class="text-button" id="import-button">${svgIcon('import')}<span>Import</span></button><button class="text-button" id="export-button">${svgIcon('export')}<span>Export</span></button><button class="icon-button" id="theme-toggle" aria-label="Use dark mode" title="Use dark mode">${svgIcon('moon')}</button><button class="icon-button active" id="comments-toggle" aria-label="Hide comments" title="Hide comments">${svgIcon('comments')}</button></div>
  </header>
  <div class="project-popover" id="project-popover" hidden><div class="popover-title"><b>Projects</b><button id="new-project">＋ New</button></div><div id="project-list"></div></div>
  <div class="workspace">
    <aside class="left-panel">
      <div class="side-tabs"><button class="active" data-side="outline">Outline</button><button data-side="story">Story bible</button></div>
      <section class="side-view" id="outline-view"><div class="section-label"><span>DOCUMENT OUTLINE</span><button id="refresh-outline" title="Refresh outline" aria-label="Refresh outline">${svgIcon('refresh')}</button></div><nav id="outline-list"></nav><div class="outline-add"><button data-add-heading="h1">＋ Chapter</button><button data-add-heading="h2">＋ Section</button></div><p class="outline-help">Edit titles here, or format text as Heading 1/2 in the manuscript.</p></section>
      <section class="side-view" id="story-view" hidden><label class="search">⌕<input id="story-search" placeholder="Search story elements…"></label><div class="tag-filters"><button class="active" data-filter="all">All</button><button data-filter="character">Characters</button><button data-filter="place">Places</button><button data-filter="object">Objects</button><button data-filter="event">Events</button><button data-filter="music">Music</button><button data-filter="sound">Sounds</button></div><div class="story-legend">Color identifies each element type</div><div id="story-list"></div></section>
      <div class="project-summary"><span>PROJECT</span><strong>The Cartographer’s Daughter</strong><small><span id="total-words">0</span> words · 3 chapters</small></div>
    </aside>
    <main class="editor-shell">
      <div class="modebar"><span>Writing mode</span><div class="segmented" id="mode-picker"><button class="active" data-mode="novel">Novel</button><button data-mode="screenplay">Screenplay</button><button data-mode="graphic">Graphic novel</button></div><span class="menu-divider"></span><span>View</span><div class="segmented view-segments" id="view-picker"><button class="active" data-view="contracted">Contracted</button><button data-view="expanded">Expanded</button><button data-view="focus">Focus</button><button data-view="typewriter">Typewriter</button><button data-view="inverted">Inverted</button><button data-view="grayscale">B&amp;W</button></div></div>
      <div class="toolbar" role="toolbar" aria-label="Text formatting"><button data-cmd="undo" title="Undo" aria-label="Undo">${svgIcon('undo')}</button><button data-cmd="redo" title="Redo" aria-label="Redo">${svgIcon('redo')}</button><i></i><select id="block-format" aria-label="Text style"><option value="p">Paragraph</option><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="blockquote">Quote</option></select><select id="font-family" aria-label="Font"><option value="Literata">Literata</option><option value="Georgia">Georgia</option><option value="Garamond">Garamond</option><option value="Times New Roman">Times New Roman</option><option value="Arial">Arial</option><option value="Helvetica">Helvetica</option><option value="Verdana">Verdana</option><option value="Trebuchet MS">Trebuchet</option><option value="Atkinson Hyperlegible">Atkinson Hyperlegible</option><option value="OpenDyslexic">OpenDyslexic</option><option value="Courier New">Courier</option></select><button data-cmd="bold" title="Bold"><b>B</b></button><button data-cmd="italic" title="Italic"><i>I</i></button><button data-cmd="underline" title="Underline"><u>U</u></button><button data-cmd="strikeThrough" title="Strikethrough"><s>S</s></button><button data-cmd="removeFormat" title="Clear formatting">Tx</button><i></i><button data-cmd="insertUnorderedList" title="Bulleted list" aria-label="Bulleted list">${svgIcon('bullets')}</button><button data-cmd="insertOrderedList" title="Numbered list" aria-label="Numbered list">${svgIcon('numbers')}</button><button data-cmd="justifyLeft" title="Align left" aria-label="Align left">${svgIcon('left')}</button><button data-cmd="justifyCenter" title="Align center" aria-label="Align center">${svgIcon('center')}</button><button data-cmd="justifyRight" title="Align right" aria-label="Align right">${svgIcon('right')}</button><label class="color-control" title="Text color">A<input type="color" id="text-color" value="#322f30"></label><label class="color-control highlight" title="Highlight color">●<input type="color" id="highlight-color" value="#f7d774"></label><div class="toolbar-space"></div><button id="focus-toggle">${svgIcon('focus')}<span>Focus</span></button></div>
      <div class="canvas"><article id="editor" class="paper" contenteditable="true" spellcheck="true" aria-label="Manuscript editor">${manuscripts.novel}</article></div>
      <footer class="statusbar"><span id="section-status">The Arrival</span><span id="word-count">0 words</span><span id="reading-time">0 min read</span><span class="save-ok">✓ Saved locally</span></footer>
    </main>
    <aside class="comments-panel"><div class="comments-header"><b>Comments</b><button id="comments-close">×</button></div><div class="selection-quote">“the uncomfortable sense that someone had been waiting for her.”</div><div id="comments-list"><article class="comment"><div><span class="avatar small">Y</span><b>You</b><small>2 min ago</small></div><p>Lean into the unease here. Why does she recognize the handwriting?</p><button class="resolve">✓ Resolve</button></article></div><div class="comment-compose"><textarea id="comment-input" placeholder="Add a comment…"></textarea><button id="add-comment">Comment</button></div></aside>
  </div>
  <div class="toast" hidden></div>
  <button class="focus-exit" id="focus-exit">Exit focus <kbd>Esc</kbd></button>
</div>`;

const app = $('.app');
const editor = $('#editor');
let currentFilter = 'all';
let saveTimer;
let editorRange;

function escapeHtml(value) { const node=document.createElement('div'); node.textContent=value; return node.innerHTML; }
function escapeAttribute(value) { return escapeHtml(value).replace(/"/g,'&quot;'); }
function toast(message) { const el=$('.toast'); el.textContent=message; el.hidden=false; clearTimeout(el.timer); el.timer=setTimeout(()=>el.hidden=true,1800); }
function updateStats() { const words=(editor.innerText.match(/\b[\w’'-]+\b/g)||[]).length; $('#word-count').textContent=`${words.toLocaleString()} words`; $('#total-words').textContent=words.toLocaleString(); $('#reading-time').textContent=`${Math.max(1,Math.ceil(words/225))} min read`; }
function updateOutline() {
  const headings=$$('h1,h2',editor); const list=$('#outline-list');
  list.innerHTML=headings.length?headings.map((heading,index)=>`<div class="outline-row level-${heading.tagName.toLowerCase()}"><button class="outline-jump outline-item ${index===0?'active':''}" data-heading="${index}" title="Go to heading">${heading.tagName==='H1'?'⌄':'·'}</button><input class="outline-name" data-name-heading="${index}" value="${escapeAttribute(heading.textContent||'Untitled')}" aria-label="Edit heading title"><button class="outline-delete" data-delete-heading="${index}" title="Change to paragraph" aria-label="Change heading to paragraph">${svgIcon('trash')}</button></div>`).join(''):'<p class="empty">No headings yet. Add a chapter or section below.</p>';
  $$('.outline-jump',list).forEach(button=>button.addEventListener('click',()=>navigateToHeading(headings[Number(button.dataset.heading)],button)));
  $$('.outline-name',list).forEach(input=>input.addEventListener('change',()=>renameHeading(headings[Number(input.dataset.nameHeading)],input.value)));
  $$('.outline-name',list).forEach(input=>input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();input.blur();}if(event.key==='Escape'){input.value=headings[Number(input.dataset.nameHeading)].textContent;input.blur();}}));
  $$('.outline-delete',list).forEach(button=>button.addEventListener('click',()=>removeHeading(headings[Number(button.dataset.deleteHeading)])));
}
function renameHeading(heading,name){
  if(!name.trim()){updateOutline();return;}
  heading.textContent=name.trim();
  updateOutline(); saveDraft();
  toast('Heading renamed');
}
function removeHeading(heading){heading.outerHTML=`<p>${escapeHtml(heading.textContent)}</p>`;updateOutline();saveDraft();toast('Heading changed to paragraph');}
function addHeading(level){const heading=document.createElement(level);heading.textContent=level==='h1'?'New chapter':'New section';editor.append(heading,document.createElement('p'));updateOutline();updateStats();saveDraft();const headings=$$('h1,h2',editor);navigateToHeading(heading,$$('.outline-jump').at(-1));placeCaretAtEnd(heading);}
function placeCaretAtEnd(element){editor.focus({preventScroll:true});const range=document.createRange();range.selectNodeContents(element);range.collapse(false);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);}
function navigateToHeading(heading,button){
  scrollEditorTarget(heading);
  $$('.outline-item').forEach(item=>item.classList.toggle('active',item===button));
  $('#section-status').textContent=heading.textContent||'Untitled section';
  editor.focus({preventScroll:true});
}
function scrollEditorTarget(target,center=false){
  const canvas=$('.canvas');
  const top=editor.offsetTop+target.offsetTop-(center?canvas.clientHeight/2:48);
  canvas.scrollTo({top:Math.max(0,top),behavior:'smooth'});
}
function syncOutlineToScroll(){
  const canvas=$('.canvas'); const headings=$$('h1,h2',editor); if(!headings.length)return;
  const position=canvas.scrollTop-editor.offsetTop+80;
  let active=0; headings.forEach((heading,index)=>{if(heading.offsetTop<=position)active=index;});
  $$('.outline-item').forEach((item,index)=>item.classList.toggle('active',index===active));
  $('#section-status').textContent=headings[active].textContent||'Untitled section';
}
function renderStory() { const query=$('#story-search').value.toLowerCase(); const visible=storyItems.filter(item=>(currentFilter==='all'||item.type===currentFilter)&&item.name.toLowerCase().includes(query)); $('#story-list').innerHTML=visible.map(item=>`<button class="story-item" data-name="${item.name}"><span class="story-glyph ${item.type}">${item.glyph}</span><span><b>${item.name}</b><small>${item.type}</small></span><i class="tag-dot ${item.type}"></i></button>`).join('')||'<p class="empty">No story items found.</p>'; $$('.story-item').forEach(button=>button.addEventListener('click',()=>{const match=$(`[data-entity="${button.dataset.name}"]`,editor);if(match){scrollEditorTarget(match,true);match.classList.add('pulse');setTimeout(()=>match.classList.remove('pulse'),1200);}else toast('Item is not used in this draft');})); }
function renderProjects() { $('#project-list').innerHTML=projects.map((project,index)=>`<button class="project-row ${index===0?'current':''}"><span class="project-cover">${project.title[0]}</span><span><b>${project.title}</b><small>${project.meta}</small></span>${index===0?'<i>✓</i>':''}</button>`).join(''); }
function setSide(name) { $$('[data-side]').forEach(b=>b.classList.toggle('active',b.dataset.side===name)); $('#outline-view').hidden=name!=='outline'; $('#story-view').hidden=name!=='story'; }
function setMode(mode) { if(!confirm('Switch writing mode? The sample layout will replace the current editor content.')) return; editor.innerHTML=manuscripts[mode]; app.classList.remove('mode-novel','mode-screenplay','mode-graphic');app.classList.add(`mode-${mode}`);$$('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));$('#mode-hint').textContent={novel:'Prose & chapters',screenplay:'Scenes & dialogue',graphic:'Pages & panels'}[mode]; updateOutline();updateStats();saveDraft(); }
function saveDraft(){ $('#save-state').textContent='Saving…';clearTimeout(saveTimer);saveTimer=setTimeout(()=>{try{localStorage.setItem('draftist-document',editor.innerHTML);}catch{}$('#save-state').textContent='All changes saved';},350); }
function toggleComments(){app.classList.toggle('comments-hidden');}
function centerTypewriterCaret(){if(!app.classList.contains('view-typewriter'))return;const selection=getSelection();if(!selection?.rangeCount)return;const caret=selection.getRangeAt(0).getBoundingClientRect();const canvas=$('.canvas').getBoundingClientRect();if(caret.height) $('.canvas').scrollBy({top:caret.top-(canvas.top+canvas.height/2),behavior:'smooth'});}
function setView(view){app.classList.remove('view-contracted','view-expanded','view-focus','view-typewriter','view-inverted','view-grayscale');app.classList.add(`view-${view}`);$$('[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===view));if(view==='typewriter')centerTypewriterCaret();}
function rememberSelection(){const selection=getSelection();if(selection?.rangeCount&&editor.contains(selection.anchorNode)){editorRange=selection.getRangeAt(0).cloneRange();$$('[data-cmd]').forEach(button=>button.classList.toggle('is-active',['bold','italic','underline','strikeThrough'].includes(button.dataset.cmd)&&document.queryCommandState(button.dataset.cmd)));}}
function restoreSelection(){if(!editorRange)return;const selection=getSelection();selection.removeAllRanges();selection.addRange(editorRange);}

renderProjects(); renderStory(); updateOutline(); updateStats();
$$('[data-side]').forEach(b=>b.addEventListener('click',()=>setSide(b.dataset.side)));
$('#story-search').addEventListener('input',renderStory);
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{currentFilter=b.dataset.filter;$$('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderStory();}));
$('#projects-toggle').setAttribute('aria-expanded','false');
$('#projects-toggle').addEventListener('click',()=>{const popover=$('#project-popover');popover.hidden=!popover.hidden;$('#projects-toggle').setAttribute('aria-expanded',String(!popover.hidden));});
$('#new-project').addEventListener('click',()=>toast('New project created'));
$('#import-button').addEventListener('click',()=>$('#import-file').click());
$('#import-file').addEventListener('change',async event=>{const [file]=event.target.files;if(!file)return;const contents=await file.text();editor.innerHTML=/\.html?$/i.test(file.name)?contents:`<p>${escapeHtml(contents).replace(/\n{2,}/g,'</p><p>').replace(/\n/g,'<br>')}</p>`;updateOutline();updateStats();saveDraft();toast(`Imported ${file.name}`);event.target.value='';});
$('#export-button').addEventListener('click',()=>{const title=$('.document-title input').value||'Draftist manuscript';const documentHtml=`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body>${editor.innerHTML}</body></html>`;const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([documentHtml],{type:'text/html'}));link.download=`${title.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').toLowerCase()||'manuscript'}.html`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),0);toast('Manuscript exported');});
$('#comments-toggle').addEventListener('click',()=>{toggleComments();const hidden=app.classList.contains('comments-hidden');$('#comments-toggle').classList.toggle('active',!hidden);$('#comments-toggle').setAttribute('aria-label',hidden?'Show comments':'Hide comments');}); $('#comments-close').addEventListener('click',()=>$('#comments-toggle').click());
$('#theme-toggle').addEventListener('click',()=>{app.dataset.theme=app.dataset.theme==='dark'?'light':'dark';const dark=app.dataset.theme==='dark';$('#theme-toggle').classList.toggle('active',dark);$('#theme-toggle').setAttribute('aria-label',dark?'Use light mode':'Use dark mode');});
$('#refresh-outline').addEventListener('click',()=>{updateOutline();toast('Outline refreshed');});
$$('[data-add-heading]').forEach(button=>button.addEventListener('click',()=>addHeading(button.dataset.addHeading)));
$$('[data-cmd]').forEach(button=>button.addEventListener('mousedown',event=>event.preventDefault()));
$$('[data-cmd]').forEach(b=>b.addEventListener('click',()=>{restoreSelection();document.execCommand(b.dataset.cmd);editor.focus();rememberSelection();}));
$('#block-format').addEventListener('change',e=>{restoreSelection();document.execCommand('formatBlock',false,e.target.value);editor.focus();updateOutline();});
$('#font-family').addEventListener('change',e=>{restoreSelection();document.execCommand('fontName',false,e.target.value);editor.focus();});
$('#text-color').addEventListener('input',e=>{restoreSelection();document.execCommand('foreColor',false,e.target.value);});
$('#highlight-color').addEventListener('input',e=>{restoreSelection();document.execCommand('hiliteColor',false,e.target.value);});
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(!b.classList.contains('active'))setMode(b.dataset.mode);}));
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
$('#focus-toggle').addEventListener('click',()=>setView('focus'));
$('#focus-exit').addEventListener('click',()=>setView('contracted'));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&app.classList.contains('view-focus'))setView('contracted');});
editor.addEventListener('input',()=>{updateStats();updateOutline();saveDraft();centerTypewriterCaret();});
editor.addEventListener('keyup',centerTypewriterCaret);
document.addEventListener('selectionchange',rememberSelection);
$('.canvas').addEventListener('scroll',syncOutlineToScroll,{passive:true});
$('#comments-list').addEventListener('click',e=>{if(e.target.closest('.resolve'))e.target.closest('.comment').remove();});
$('#add-comment').addEventListener('click',()=>{const input=$('#comment-input');if(!input.value.trim())return;$('#comments-list').insertAdjacentHTML('beforeend',`<article class="comment"><div><span class="avatar small">Y</span><b>You</b><small>Just now</small></div><p>${escapeHtml(input.value)}</p><button class="resolve">✓ Resolve</button></article>`);input.value='';});
