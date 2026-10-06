const P=[
{id:0,n:'Sofia',a:24,loc:'North America, Canvas',c:['#6d5547','#1f3a3a'],tags:['Not married','In relation','Fashion','Degree','Modeling','10+'],bio:'Hey! Love fashion shoots and long coffee dates.'},
{id:1,n:'Navas',a:29,loc:'Toronto, Canada',c:['#a0674b','#2b3350'],tags:['Single','Fitness','Music','Travel'],bio:'Gym in the morning, guitar at night.'},
{id:2,n:'Naina',a:26,loc:'London, UK',c:['#d9a57a','#7a2f5c'],tags:['Single','Art','Books','Cats'],bio:'Bookshops and gallery Sundays.'},
{id:3,n:'Katrine',a:25,loc:'Oslo, Norway',c:['#c97b63','#2f4a63'],tags:['Hiking','Photography','Coffee'],bio:'Chasing sunsets with a camera.'},
{id:4,n:'Sam Jon',a:31,loc:'Chicago, USA',c:['#7b8aa0','#3a2c3f'],tags:['Chef','Cinema','Dogs'],bio:'I cook, you pick the movie.'},
{id:5,n:'Iraj',a:30,loc:'Dubai, UAE',c:['#8d7a66','#1d2c4a'],tags:['Business','Gym','Travel'],bio:'Always up for a new city.'}];
const $=s=>document.querySelector(s);
const sil=c=>`<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice"><circle cx="50" cy="38" r="16" fill="rgba(255,255,255,.28)"/><path d="M12 100c0-26 16-40 38-40s38 14 38 40z" fill="rgba(255,255,255,.28)"/></svg>`;
const ph=(p,cls='')=>`<div class="ph ${cls}" style="--a:${p.c[0]};--b:${p.c[1]}">${sil()}</div>`;
let stack=[],hist=[],cur=P[0],chats={},liked=new Set(),tm;
$('#stories').innerHTML='<div class="st"><div class="ring add">+</div>my story</div>'+P.slice(1).map(p=>`<div class="st"><div class="ring">${ph(p,'av')}</div>${p.n}</div>`).join('');
const heart='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>';
$('#pop').innerHTML=P.slice(0,4).map(p=>`<div class="pc ph" style="--a:${p.c[0]};--b:${p.c[1]}">${sil()}<div class="bar">${heart.replace('<svg','<svg width=18 height=18 fill=none stroke=currentColor stroke-width=2')}</div></div>`).join('');
$('#best').innerHTML=P.slice(2).map(p=>`<div class="pc ph" style="--a:${p.c[0]};--b:${p.c[1]}">${sil()}<span>${p.n}, ${p.a}</span></div>`).join('');
document.querySelectorAll('.stories,.row').forEach(row=>{
 let startX=0,startY=0,startLeft=0,startTop=0,axis='',dragged=false,pointerId;
 const scroller=row.closest('.scroll');
 row.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;
  pointerId=e.pointerId;startX=e.clientX;startY=e.clientY;
  startLeft=row.scrollLeft;startTop=scroller.scrollTop;axis='';dragged=false;
  row.setPointerCapture(pointerId);
 });
 row.addEventListener('pointermove',e=>{
  if(e.pointerId!==pointerId)return;
  const dx=e.clientX-startX,dy=e.clientY-startY;
  if(!axis&&Math.max(Math.abs(dx),Math.abs(dy))>6)axis=Math.abs(dx)>Math.abs(dy)?'x':'y';
  if(!axis)return;
  e.preventDefault();
  if(axis==='x')row.scrollLeft=startLeft-dx;
  else scroller.scrollTop=startTop-dy;
  dragged=true;
 });
 const finish=e=>{
  if(e.pointerId!==pointerId)return;
  if(dragged)row.dataset.dragged='true';
  pointerId=undefined;
 };
 row.addEventListener('pointerup',finish);
 row.addEventListener('pointercancel',finish);
 row.addEventListener('click',e=>{
  if(row.dataset.dragged!=='true')return;
  delete row.dataset.dragged;
  e.preventDefault();e.stopPropagation();
 },true);
});

const IC={acc:'M12 3.5a1.5 1.5 0 1 0 0 .01M5 8l7 1.500 7-1.500M12 9.500V14m-3 7 3-7 3 7',lang:'M4 5h9M8 3v2c0 4-2 7-5 8M6 8c1 2 3 4 6 5M13 21l4-10 4 10m-6.500-3h5',media:'M4 20v-2M9 20v-6M14 20v-10M19 20V4',notif:'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',priv:'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z',block:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.600 5.600l12.800 12.800',perm:'M4 5h16v11H4zM8 20h8M12 16v4',prem:'M5 20V10M12 20V4M19 20v-7',pay:'M3 7h18v12H3zM3 11h18',help:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 1-1 1.700M12 17v.01',about:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 7.500v.01',out:'M9 4H5v16h4M16 8l4 4-4 4M20 12H9'};
const SEC=[['Your preferences',['acc','Accessibility and translations'],['lang','Language'],['media','Media quality'],['notif','Notifications']],['Privacy and safety',['priv','Privacy'],['block','Blocked people'],['perm','App permissions']],['For subscribers',['prem','Account type and premium'],['pay','Orders and payments']],['More info and support',['help','Help centre'],['about','About']]];
const D={
acc:['Accessibility and translations',['seg','Text size','z',['Default','Large']],['tg','High contrast','hc'],['tg','Reduce motion','rm'],['tg','Captions on calls','cap'],['tg','Translate messages automatically','tr']],
lang:['Language',['rad','','lang',['English','اردو','Español','Français','Deutsch']]],
media:['Media quality',['tg','Upload highest quality','hq'],['tg','Use less mobile data','ld'],['tg','Autoplay stories on mobile data','ap']],
notif:['Notifications',['tg','New matches','n1',1],['tg','Messages','n2',1],['tg','Likes','n3',1],['tg','Calls','n4',1]],
priv:['Privacy',['tg','Show my distance','p1',1],['tg','Show online status','p2',1],['tg','Read receipts','p3'],['tg','Hide my profile','p4']],
block:['Blocked people',['p','You haven\'t blocked anyone. People you block can\'t see your profile or message you.']],
perm:['App permissions',['tg','Location','l1',1],['tg','Camera','l2',1],['tg','Microphone','l3',1],['tg','Photos','l4']],
prem:['Account type and premium',['plan','Free','See who liked you is locked. 20 likes per day.',1],['plan','Premium','Unlimited likes, see who liked you, and rewind.']],
pay:['Orders and payments',['p','No orders or payments yet.']],
help:['Help centre',['p','Browse safety tips, report a profile, or contact support.']],
about:['About',['p','Match & Meet prototype, version 1.0. Frontend only, with sample data.']]};
const st={lang:0,z:0};
function renderMe(){const a=document.getElementById('mebody');
 a.innerHTML=`<div class="r2" style="padding:16px 0"><div class="av ph" style="--a:#8a6a55;--b:#3c2f2a;width:60px;height:60px"></div><div><b>James Bond</b><div style="font-size:12px;color:var(--mut)">28 · London</div></div></div>`+
 SEC.map(sc=>`<div class="sec"><div class="sl">${sc[0]}</div>${sc.slice(1).map(r=>`<button class="r2" onclick="openSet('${r[0]}')"><svg class="i" viewBox="0 0 24 24"><path d="${IC[r[0]]}"/></svg>${r[1]}<span class="ch">›</span></button>`).join('')}</div>`).join('')+
 `<div class="sec"><button class="r2" style="color:var(--p)" onclick="go('login')"><svg class="i" viewBox="0 0 24 24"><path d="${IC.out}"/></svg>Log out</button></div>`}
function openSet(k){document.getElementById('stt').textContent=D[k][0];const b=document.getElementById('sbody');
 b.innerHTML=D[k].slice(1).map(r=>{
  if(r[0]==='tg'){if(st[r[2]]===undefined)st[r[2]]=!!r[3];return`<div class="r2">${r[1]}<button class="tg ${st[r[2]]?'on':''}" role="switch" aria-checked="${!!st[r[2]]}" aria-label="${r[1]}" onclick="tgl('${r[2]}','${k}')"></button></div>`}
  if(r[0]==='seg')return`<div class="r2">${r[1]}<div class="segc">${r[3].map((x,i)=>`<button class="${st.z===i?'on':''}" onclick="st.z=${i};document.getElementById('app').classList.toggle('big',${i}===1);openSet('${k}')">${x}</button>`).join('')}</div></div>`;
  if(r[0]==='rad')return r[3].map((x,i)=>`<button class="r2" onclick="st.lang=${i};openSet('${k}')">${x}<span class="ch" style="color:var(--p)">${st.lang===i?'✓':''}</span></button>`).join('');
  if(r[0]==='plan')return`<div class="pcard ${r[3]?'on':''}"><b>${r[1]}${r[3]?' (current)':''}</b><p>${r[2]}</p></div>`;
  return`<p style="font-size:14px;color:var(--mut);padding:16px 0">${r[1]}</p>`}).join('');go('set')}
function tgl(k,from){st[k]=!st[k];const a=document.getElementById('app');if(k==='hc')a.classList.toggle('hc',st[k]);if(k==='rm')a.classList.toggle('rm',st[k]);openSet(from)}
renderMe();
function go(s){document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id===s));
 $('#nav').style.display=['home','disc','likes','chats','me'].includes(s)?'flex':'none';
 document.querySelectorAll('nav button').forEach((b,i)=>b.classList.toggle('on',b.dataset.s===s));
 if(s==='disc'&&!stack.length&&!$('#deck').children.length)deal();
 if(s==='chats')renderChats();if(s==='likes')renderLikes()}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>go(b.dataset.s));
function deal(){stack=P.slice();hist=[];draw()}
function draw(){const d=$('#deck');d.innerHTML='';
 if(!stack.length){d.innerHTML='<div class="empty"><h2>You\'re all caught up</h2><p>New people show up here every day.</p><button class="cta" onclick="deal()">Start over</button></div>';return}
 const p=stack[0];cur=p;
 d.innerHTML=`<div class="card" id="top">${ph(p)}<div class="shade"></div><div class="stamp" id="sl" style="left:20px;color:#66e0a3;transform:rotate(-12deg)">LIKE</div><div class="stamp" id="sn" style="right:20px;color:#ff5c8a;transform:rotate(12deg)">NOPE</div>
 <div class="info"><span class="badge">New here</span><h2>${p.n}, <small>${p.a}</small></h2><p>${p.loc}</p><p style="margin-top:6px">${p.bio}</p><p style="margin-top:8px">Interested in</p><div class="tags">${p.tags.map(t=>'<b>'+t+'</b>').join('')}</div></div></div>`;
 drag($('#top'))}
function drag(el){let x0=0,dx=0,on=false;
 el.onpointerdown=e=>{on=true;x0=e.clientX;el.style.transition='none';el.setPointerCapture(e.pointerId)};
 el.onpointermove=e=>{if(!on)return;dx=e.clientX-x0;el.style.transform=`translateX(${dx}px) rotate(${dx/20}deg)`;$('#sl').style.opacity=Math.max(0,dx/100);$('#sn').style.opacity=Math.max(0,-dx/100)};
 el.onpointerup=()=>{on=false;el.style.transition='';if(Math.abs(dx)>90)swipe(dx>0?1:-1);else{el.style.transform='';$('#sl').style.opacity=$('#sn').style.opacity=0}dx=0}}
function swipe(dir){const el=$('#top');if(!el)return;el.style.transition='transform .3s';el.style.transform=`translateX(${dir*500}px) rotate(${dir*25}deg)`;
 const p=stack.shift();hist.push(p);if(dir>0)liked.add(p.id);
 setTimeout(()=>{if(dir>0&&(p.id%2===0||p.id===1)){cur=p;$('#mt').textContent=`You and ${p.n} liked each other.`;$('#mav').outerHTML=`<div class="av ph" id="mav" style="--a:${p.c[0]};--b:${p.c[1]}"></div>`;chats[p.id]=chats[p.id]||[{t:'Hey! 👋',me:false}];go('match');draw()}else draw()},280)}
function undo(){if(!hist.length)return;const p=hist.pop();liked.delete(p.id);stack.unshift(p);draw()}
function renderLikes(){$('#llist').innerHTML=liked.size?[...liked].map(i=>{const p=P[i];return`<div class="pc ph" style="--a:${p.c[0]};--b:${p.c[1]};width:auto;height:190px">${sil()}<span style="position:absolute;left:10px;top:10px;color:#fff;font-size:13px;font-weight:500;z-index:2">${p.n}, ${p.a}</span><div class="bar"><button aria-label="Message ${p.n}" onclick="openChat(${i})"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4z"/></svg></button></div></div>`}).join(''):'<div class="empty" style="position:static;grid-column:1/3;padding-top:80px"><b>No likes yet</b><p style="font-size:13px;color:var(--mut)">Swipe right on Discover and people you like appear here.</p><button class="cta" onclick="go(\'disc\')">Go to Discover</button></div>'}
function startCall(t){$('#kav').style.cssText=`--a:${cur.c[0]};--b:${cur.c[1]};width:110px;height:110px;position:relative;z-index:2`;$('#kn').textContent=cur.n;
 const v=t==='video';$('#vid').style.display=$('#self').style.display=v?'block':'none';$('#vid').style.cssText+=`;--a:${cur.c[0]};--b:${cur.c[1]}`;$('#vid').innerHTML=sil();
 $('#kt').textContent=(v?'Video':'Audio')+' calling…';$('#call').classList.add('on');clearInterval(tm);
 setTimeout(()=>{if(!$('#call').classList.contains('on'))return;let s=0;tm=setInterval(()=>{s++;$('#kt').textContent=String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0')},1000)},1800)}
function endCall(){clearInterval(tm);$('#call').classList.remove('on')}
function renderChats(){const ids=Object.keys(chats);$('#clist').innerHTML=ids.length?ids.map(i=>{const p=P[i],l=chats[i].at(-1);return`<button class="item" onclick="openChat(${i})">${ph(p,'av').replace('class="ph ','class="av ph ')}<div><b style="font-size:14px">${p.n}</b><p>${l.t}</p></div></button>`}).join(''):'<div class="empty" style="position:static;padding-top:80px"><b>No messages yet</b><p style="font-size:13px;color:var(--mut)">Like someone on Discover to start a chat.</p><button class="cta" onclick="go(\'disc\')">Go to Discover</button></div>'}
function openChat(i){cur=P[i];chats[i]=chats[i]||[{t:'Hey! 👋',me:false}];$('#cname').textContent=cur.n;$('#cav').style.cssText=`--a:${cur.c[0]};--b:${cur.c[1]}`;paint();go('chat');$('#nav').style.display='none'}
function paint(){const m=$('#msgs');m.innerHTML=chats[cur.id].map(x=>`<div class="m ${x.me?'me':''}">${x.t}</div>`).join('');m.scrollTop=1e5}
function sendMsg(){const v=$('#ci').value.trim();if(!v)return;const c=chats[cur.id];c.push({t:v,me:true});$('#ci').value='';paint();
 const r=['Haha, tell me more!','That sounds fun 😊','Coffee this weekend?','I was thinking the same!'];setTimeout(()=>{c.push({t:r[Math.random()*r.length|0],me:false});paint()},900)}