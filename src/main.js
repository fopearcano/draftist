import './styles.css';

const icon = (name) => `<span class="ui-icon" aria-hidden="true">${name}</span>`;
const outline = [
  ['The Arrival', '1,284', false], ['A familiar stranger', '', true],
  ['The letter', '', true], ['The Glass House', '2,016', false],
  ['What the walls remember', '', true], ['Low Tide', '860', false],
];
const storyItems = [
  ['Elena Vale', 'Character', 'red', '♙'], ['Jonah Mercer', 'Character', 'red', '♙'],
  ['Glass House', 'Place', 'green', '⌖'], ['Blackwater Bay', 'Place', 'green', '⌖'],
  ['The letter', 'Object', 'purple', '▤'],
];

document.querySelector('#root').innerHTML = `
<div class="app theme-paper">
  <header><div class="brand"><div class="mark">${icon('◫')}</div><b>Draftist</b></div>
    <div class="docname"><input aria-label="Document title" value="The Cartographer’s Daughter"><span>Saved just now</span></div>
    <div class="header-actions"><button class="icon" aria-label="History">${icon('◷')}</button><button class="icon active" id="comments-toggle" aria-label="Toggle comments">${icon('▢')}</button><button class="share">Share</button><div class="avatar">EV</div></div>
  </header>
  <div class="workspace">
    <aside class="left"><div class="tabs"><button class="selected" data-tab="outline">Outline</button><button data-tab="story">Story</button><button class="panel">${icon('◧')}</button></div>
      <section id="outline-panel"><div class="outline-head"><span>DOCUMENT OUTLINE</span><button>•••</button></div><nav class="outline">
        ${outline.map(([title,words,sub],i)=>`<a class="${sub?'sub':''} ${i===0?'current':''}"><span>${sub?'':'⌄ '}${title}</span><small>${words}</small></a>`).join('')}
        <button class="add-section">＋ Add section</button></nav></section>
      <section id="story-panel" hidden><div class="story"><div class="search">${icon('⌕')}<input id="story-search" placeholder="Search story bible"></div><div class="tag-filter"><span class="red">Characters</span><span class="green">Places</span><span class="purple">Objects</span></div><div id="story-results"></div></div></section>
      <div class="story-bible"><button id="story-shortcut">${icon('▤')}<span><b>Story bible</b><small>5 items</small></span>${icon('›')}</button></div>
    </aside>
    <main><div class="toolbar"><div class="history"><button data-command="undo">↶</button><button data-command="redo">↷</button></div><i></i><button class="style">Paragraph⌄</button><i></i><button class="style">Literata⌄</button><button class="size">18</button><i></i><button data-command="bold"><b>B</b></button><button data-command="italic"><em>I</em></button><button data-command="underline"><u>U</u></button><button data-command="strikeThrough"><s>S</s></button><i></i><button data-command="insertUnorderedList">☷</button><button>≡</button><div class="spacer"></div><button class="focusbtn" id="focus-toggle">✦ Focus</button><button>•••</button></div>
      <div class="page-wrap"><article class="paper" contenteditable="true" spellcheck="true"><div class="chapter-no">CHAPTER ONE</div><h1>The Arrival</h1><p>The train arrived at Blackwater Bay three hours late, dragging a ribbon of mist behind it.</p><p>Elena Vale stepped down onto the empty platform with one suitcase, a leather folio, and the uncomfortable sense that someone had been waiting for her.</p><p>Across the tracks, beyond the rusted iron fence, the town climbed the hillside in tiers of slate roofs and narrow chimneys. At the summit stood the Glass House—though there was nothing glass about it from this distance. It was a dark shape against a darker sky, all sharp angles and shuttered windows.</p><p>Her mother had never spoken of this place.</p><div class="break">•</div><h2>A familiar stranger</h2><p>“Miss Vale?”</p><p>The man beneath the station clock knew her name before she offered it. He was tall, rain gathering at the shoulders of his wool coat, with the patient expression of someone accustomed to keeping secrets.</p><p>“Jonah Mercer,” he said. “I knew your mother.”</p></article></div>
      <div class="status"><span>Chapter 1 of 12</span><span>1,284 words</span><span>8 min read</span><span class="saved">✓ All changes saved</span></div>
    </main>
    <aside class="comments"><div class="comment-head"><b>Comments</b><button id="comments-close">×</button></div><div class="comment-selection">“the uncomfortable sense that someone had been waiting for her.”</div><div id="comment-list"><div class="comment"><div class="comment-meta"><span class="mini">Y</span><b>You</b><small>2 min ago</small><span>•••</span></div><p>Lean into the unease here — why does she already recognize the handwriting?</p><button class="resolve">✓ Resolve</button></div></div><div class="new-comment"><textarea placeholder="Add a comment…"></textarea><button id="add-comment">Comment</button></div></aside>
  </div>
  <div class="view-switcher"><button class="on" data-theme="paper">Paper</button><button data-theme="sepia">Sepia</button><button data-theme="night">◐ Night</button><button class="tune">☷</button></div>
  <div class="toast" hidden>✓ <span></span></div>
</div>`;

const app = document.querySelector('.app');
const editor = document.querySelector('.paper');
const showToast = (message) => { const toast=document.querySelector('.toast'); toast.querySelector('span').textContent=message; toast.hidden=false; setTimeout(()=>toast.hidden=true,1600); };
const switchTab = (tab) => { document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('selected',b.dataset.tab===tab)); document.querySelector('#outline-panel').hidden=tab!=='outline'; document.querySelector('#story-panel').hidden=tab!=='story'; };
const renderStory = (query='') => { document.querySelector('#story-results').innerHTML=storyItems.filter(x=>x[0].toLowerCase().includes(query.toLowerCase())).map(([name,type,color,glyph])=>`<button class="story-item"><span class="item-icon ${color}">${glyph}</span><span><b>${name}</b><small>${type}</small></span></button>`).join(''); };
renderStory();
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
document.querySelector('#story-shortcut').addEventListener('click',()=>switchTab('story'));
document.querySelector('#story-search').addEventListener('input',e=>renderStory(e.target.value));
document.querySelectorAll('[data-command]').forEach(b=>b.addEventListener('click',()=>{ document.execCommand(b.dataset.command); editor.focus(); }));
document.querySelectorAll('[data-theme]').forEach(b=>b.addEventListener('click',()=>{ app.className=`app theme-${b.dataset.theme}`; document.querySelectorAll('[data-theme]').forEach(x=>x.classList.toggle('on',x===b)); }));
const toggleComments=()=>app.classList.toggle('no-comments');
document.querySelector('#comments-toggle').addEventListener('click',toggleComments); document.querySelector('#comments-close').addEventListener('click',toggleComments);
document.querySelector('#focus-toggle').addEventListener('click',e=>{app.classList.toggle('focus');e.currentTarget.textContent=app.classList.contains('focus')?'✦ Exit focus':'✦ Focus';});
document.querySelector('.share').addEventListener('click',()=>showToast('Share link copied'));
document.querySelector('.add-section').addEventListener('click',()=>showToast('New section added'));
document.querySelector('#comment-list').addEventListener('click',e=>{if(e.target.closest('.resolve'))e.target.closest('.comment').remove();});
document.querySelector('#add-comment').addEventListener('click',()=>{const box=document.querySelector('.new-comment textarea');if(!box.value.trim())return;document.querySelector('#comment-list').insertAdjacentHTML('beforeend',`<div class="comment"><div class="comment-meta"><span class="mini">Y</span><b>You</b><small>Just now</small></div><p>${box.value.replace(/[<>]/g,'')}</p><button class="resolve">✓ Resolve</button></div>`);box.value='';});
