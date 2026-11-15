'use strict';
// DREAMWEFT visual preview. Static public-only test content. Never promotes Atlas records to canon.
const objectData = {
  mirror: {code:'S001-OBJ-01 / WORKING OBJECT NAME',mark:'✧',title:'Dreamglass Mirror',description:'A doorway to the creator behind the universe.',lines:[
    'dr3ambunnii404 is the creator identity at the center of this project.',
    'DREAMWEFT is the original universe. The Velvet Burrow is its first creative sanctuary.',
    'This preview uses descriptive public-facing copy only. A finished About page will use content the creator explicitly approves.'
  ],action:{label:'Explore the Atlas',href:'#atlas'}},
  terminal: {code:'S001-OBJ-02 / WORKING OBJECT NAME',mark:'⌘',title:'Thread Terminal',description:'Where art, coding experiments and real projects will eventually live.',lines:[
    'Built so far: visual references, a graybox room, browser test evidence and this separate local visual preview.',
    'Still needed: verified accessibility/device tests, real portfolio content and separately approved production development.',
    'No imaginary published apps, fake GitHub links, or live AI systems are presented as finished work.'
  ],action:{label:'View the build log',href:'#roadmap'}},
  console: {code:'S001-OBJ-06 / WORKING OBJECT NAME',mark:'◇',title:'Ribbonline Console',description:'A proposed doorway into the interconnected records of DREAMWEFT.',lines:[
    'Atlas Slice A (Truthful Navigation) is separately authorized as an experiment, not yet approved production.',
    'Approved universe names are distinguished from descriptive story spaces and proposed new locations.',
    'Future realm travel, invitations and shared worlds remain fictional/product ideas, not functioning online features.'
  ],action:{label:'Open the Atlas preview',href:'#atlas'}}
};
const atlasData = {
  dreamweft:{kind:'UNIVERSE RECORD',status:'CONFIRMED',className:'confirmed',glyph:'✧',title:'DREAMWEFT',description:'The interconnected original dreamworld universe created by dr3ambunnii404. A place for imagination, art, coding, stories and the futures still being built.',source:'PROJECT CONTEXT v0.1 / C-002'},
  burrow:{kind:'ENVIRONMENT RECORD',status:'CONFIRMED',className:'confirmed',glyph:'⌂',title:'The Velvet Burrow',description:'The first confirmed DREAMWEFT environment: a private floating gothic cyberdream sanctuary and creative home base. Exact scene props and zone names are still working designs.',source:'PROJECT CONTEXT v0.1 / C-008'},
  bunnii:{kind:'CHARACTER RECORD',status:'WORKING',className:'working',glyph:'♡',title:'bunnii.exe',description:'Working name for the avatar/protagonist connected to the creator identity. Her Worldstitcher oath has creator-selected wording; the visual redesign remains paused. Exactly two bunny ears in any future artwork.',source:'PROJECT CONTEXT v0.1 / FIRST LAW RECORD'},
  shared:{kind:'DESCRIPTIVE STORY SPACE',status:'DESCRIPTIVE',className:'descriptive',glyph:'⟡',title:'The Shared Dreamworld',description:'A description of the original dream connection between two fictional dreamers. This is a story-space concept, not an independently approved realm name or a real multiplayer server.',source:'SHADOWLOG LORE SEED / STORY_001'},
  observatory:{kind:'PROPOSED LOCATION',status:'PROPOSED',className:'proposed',glyph:'✳',title:'The Unwritten Observatory',description:'A possible future location raised in an Atlas experiment. It has not been added to confirmed universe geography. No portal or world has been built for it.',source:'ATLAS-REVIEW-001 / PROPOSAL'}
};
const dialog = document.getElementById('object-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogDescription = document.getElementById('dialog-description');
const dialogCode = document.getElementById('dialog-code');
const dialogMark = document.getElementById('dialog-mark');
const dialogLines = document.getElementById('dialog-lines');
const dialogActions = document.getElementById('dialog-actions');
let dialogOpener = null;
function openObject(key, opener){
  const data=objectData[key]; if(!data) return;
  dialogOpener=opener; dialogTitle.textContent=data.title;dialogDescription.textContent=data.description;dialogCode.textContent=data.code;dialogMark.textContent=data.mark;
  dialogLines.replaceChildren();data.lines.forEach(line=>{const p=document.createElement('p');p.textContent=line;dialogLines.appendChild(p)});
  dialogActions.replaceChildren();const link=document.createElement('a');link.href=data.action.href;link.textContent=data.action.label+' ↗';link.addEventListener('click',()=>dialog.close());dialogActions.append(link);
  dialog.showModal();document.getElementById('dialog-close').focus();
}
document.querySelectorAll('[data-object]').forEach(button=>button.addEventListener('click',()=>openObject(button.dataset.object,button)));
document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{const fallback=dialogOpener?.dataset.object?document.querySelector('.door-card[data-object="'+dialogOpener.dataset.object+'"]'):null;
  if(dialogOpener&&dialogOpener.isConnected&&dialogOpener.getClientRects().length){dialogOpener.focus()} else if(fallback){fallback.focus()}
  dialogOpener=null;
});
function setMode(mode){
  if(mode!=='dream'&&mode!=='creator')return;
  document.body.classList.toggle('mode-creator',mode==='creator');document.body.classList.toggle('mode-dream',mode==='dream');
  for(const m of ['dream','creator']) {const button=document.getElementById('mode-'+m);button.classList.toggle('active',m===mode);button.setAttribute('aria-pressed',String(m===mode));}
  document.getElementById('mode-status').textContent=mode==='dream'?'DREAM MODE / ATMOSPHERE ONLINE':'CREATOR MODE / PROJECT VIEW ONLINE';
}
document.getElementById('mode-dream').addEventListener('click',()=>setMode('dream'));
document.getElementById('mode-creator').addEventListener('click',()=>setMode('creator'));
function selectAtlas(key){
  const d=atlasData[key];if(!d)return;
  document.querySelectorAll('.atlas-entry').forEach(b=>{const yes=b.dataset.entry===key;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes))});
  document.getElementById('detail-kind').textContent=d.kind;
  const status=document.getElementById('detail-status');status.textContent=d.status;status.className='status-tag '+d.className;
  document.getElementById('detail-sigil').textContent=d.glyph;document.getElementById('detail-title').textContent=d.title;
  document.getElementById('detail-description').textContent=d.description;document.getElementById('detail-source').textContent='SOURCE // '+d.source;
}
document.querySelectorAll('.atlas-entry').forEach(button=>button.addEventListener('click',()=>selectAtlas(button.dataset.entry)));
// No network requests, persistence, or external dependencies: this is a local visual sandbox.
