import React, {useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, ChevronDown, ChevronRight, Clock3, FileText, Folder, Italic, Bold, List, MessageSquare, Moon, MoreHorizontal, Plus, Redo2, Search, Settings2, Sparkles, Strikethrough, Underline, Undo2, Users, MapPin, X, Check, PanelLeftClose, AlignLeft} from 'lucide-react';
import './styles.css';

const outline = [
  {title:'The Arrival', level:1, words:'1,284'},
  {title:'A familiar stranger', level:2},
  {title:'The letter', level:2},
  {title:'The Glass House', level:1, words:'2,016'},
  {title:'What the walls remember', level:2},
  {title:'Low Tide', level:1, words:'860'},
];

const people = [
  {name:'Elena Vale', type:'Character', color:'#ee696f', icon:Users},
  {name:'Jonah Mercer', type:'Character', color:'#ee696f', icon:Users},
  {name:'Glass House', type:'Place', color:'#55b78a', icon:MapPin},
  {name:'Blackwater Bay', type:'Place', color:'#55b78a', icon:MapPin},
  {name:'The letter', type:'Object', color:'#c68ae7', icon:FileText},
];

function App(){
 const [tab,setTab]=useState('Outline'); const [query,setQuery]=useState(''); const [comments,setComments]=useState(true); const [focus,setFocus]=useState(false); const [theme,setTheme]=useState('Paper'); const [toast,setToast]=useState(''); const [commentText,setCommentText]=useState(''); const [commentList,setCommentList]=useState([{name:'You',time:'2 min ago',text:'Lean into the unease here — why does she already recognize the handwriting?',color:'#7357d4'}]);
 const editor=useRef();
 const filtered=useMemo(()=>people.filter(x=>x.name.toLowerCase().includes(query.toLowerCase())),[query]);
 const run=(cmd)=>{document.execCommand(cmd); editor.current?.focus()};
 const notify=(m)=>{setToast(m);setTimeout(()=>setToast(''),1800)};
 const addComment=()=>{if(!commentText.trim())return;setCommentList([...commentList,{name:'You',time:'Just now',text:commentText,color:'#277a68'}]);setCommentText('')};
 return <div className={`app theme-${theme.toLowerCase()} ${focus?'focus':''} ${!comments?'no-comments':''}`}>
   <header>
    <div className="brand"><div className="mark"><BookOpen size={19}/></div><b>Draftist</b></div>
    <div className="docname"><input defaultValue="The Cartographer’s Daughter"/><span>Saved just now</span></div>
    <div className="header-actions"><button className="icon"><Clock3/></button><button className={`icon ${comments?'active':''}`} onClick={()=>setComments(!comments)}><MessageSquare/></button><button className="share" onClick={()=>notify('Share link copied')}>Share</button><div className="avatar">EV</div></div>
   </header>
   <div className="workspace">
    <aside className="left">
     <div className="tabs">{['Outline','Story'].map(x=><button className={tab===x?'selected':''} onClick={()=>setTab(x)}>{x}</button>)}<button className="panel"><PanelLeftClose/></button></div>
     {tab==='Outline'?<><div className="outline-head"><span>DOCUMENT OUTLINE</span><button><MoreHorizontal/></button></div><nav className="outline">
       {outline.map((x,i)=><a key={x.title} className={`${x.level===2?'sub':''} ${i===0?'current':''}`}><span>{x.level===1&&<ChevronDown/>}{x.title}</span>{x.words&&<small>{x.words}</small>}</a>)}
       <button className="add-section" onClick={()=>notify('New section added')}><Plus/> Add section</button>
     </nav></>:<Story query={query} setQuery={setQuery} filtered={filtered}/>} 
     <div className="story-bible"><button onClick={()=>setTab('Story')}><BookOpen/><span><b>Story bible</b><small>5 items</small></span><ChevronRight/></button></div>
    </aside>
    <main>
     <div className="toolbar">
      <div className="history"><button onClick={()=>run('undo')}><Undo2/></button><button onClick={()=>run('redo')}><Redo2/></button></div><i></i>
      <button className="style">Paragraph <ChevronDown/></button><i></i>
      <button className="style">Literata <ChevronDown/></button><button className="size">18</button><i></i>
      <button onClick={()=>run('bold')}><Bold/></button><button onClick={()=>run('italic')}><Italic/></button><button onClick={()=>run('underline')}><Underline/></button><button onClick={()=>run('strikeThrough')}><Strikethrough/></button><i></i><button onClick={()=>run('insertUnorderedList')}><List/></button><button><AlignLeft/></button>
      <div className="spacer"/><button className="focusbtn" onClick={()=>setFocus(!focus)}><Sparkles/> {focus?'Exit focus':'Focus'}</button><button><MoreHorizontal/></button>
     </div>
     <div className="page-wrap"><article className="paper" contentEditable suppressContentEditableWarning ref={editor} spellCheck>
       <div className="chapter-no">CHAPTER ONE</div><h1>The Arrival</h1>
       <p>The train arrived at Blackwater Bay three hours late, dragging a ribbon of mist behind it.</p>
       <p>Elena Vale stepped down onto the empty platform with one suitcase, a leather folio, and the uncomfortable sense that someone had been waiting for her.</p>
       <p>Across the tracks, beyond the rusted iron fence, the town climbed the hillside in tiers of slate roofs and narrow chimneys. At the summit stood the Glass House—though there was nothing glass about it from this distance. It was a dark shape against a darker sky, all sharp angles and shuttered windows.</p>
       <p>Her mother had never spoken of this place.</p>
       <div className="break">•</div><h2>A familiar stranger</h2>
       <p>“Miss Vale?”</p><p>The man beneath the station clock knew her name before she offered it. He was tall, rain gathering at the shoulders of his wool coat, with the patient expression of someone accustomed to keeping secrets.</p>
       <p>“Jonah Mercer,” he said. “I knew your mother.”</p>
     </article></div>
     <div className="status"><span>Chapter 1 of 12</span><span>1,284 words</span><span>8 min read</span><span className="saved"><Check/> All changes saved</span></div>
    </main>
    {comments&&<aside className="comments"><div className="comment-head"><b>Comments</b><button onClick={()=>setComments(false)}><X/></button></div><div className="comment-selection">“the uncomfortable sense that someone had been waiting for her.”</div>{commentList.map((c,i)=><div className="comment" key={i}><div className="comment-meta"><span className="mini" style={{background:c.color}}>{c.name[0]}</span><b>{c.name}</b><small>{c.time}</small><MoreHorizontal/></div><p>{c.text}</p><button className="resolve" onClick={()=>setCommentList(commentList.filter((_,j)=>j!==i))}><Check/> Resolve</button></div>)}<div className="new-comment"><textarea placeholder="Add a comment…" value={commentText} onChange={e=>setCommentText(e.target.value)}/><button onClick={addComment}>Comment</button></div></aside>}
   </div>
   <div className="view-switcher"><button className={theme==='Paper'?'on':''} onClick={()=>setTheme('Paper')}>Paper</button><button className={theme==='Sepia'?'on':''} onClick={()=>setTheme('Sepia')}>Sepia</button><button className={theme==='Night'?'on':''} onClick={()=>setTheme('Night')}><Moon/> Night</button><button className="tune"><Settings2/></button></div>
   {toast&&<div className="toast"><Check/> {toast}</div>}
 </div>
}

function Story({query,setQuery,filtered}){return <div className="story"><div className="search"><Search/><input placeholder="Search story bible" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="tag-filter"><span className="red">Characters</span><span className="green">Places</span><span className="purple">Objects</span></div>{filtered.map(({name,type,color,icon:Icon})=><button className="story-item"><span className="item-icon" style={{background:color+'1c',color}}><Icon/></span><span><b>{name}</b><small>{type}</small></span></button>)}</div>}

createRoot(document.getElementById('root')).render(<App/>);
