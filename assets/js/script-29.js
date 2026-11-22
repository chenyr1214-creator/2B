
function mqLayoutJump(target){const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;target?.scrollIntoView({block:'start',behavior:reduced?'auto':'smooth'});}
function mqLayoutEnhance(){
 if(page==='home'||page==='welcome')return;
 const main=document.querySelector('main');if(!main)return;
 const active=document.querySelector('aside .nav-item.current'),aside=active?.parentElement;
 if(active&&aside&&window.innerWidth<=800){const a=active.getBoundingClientRect(),b=aside.getBoundingClientRect();aside.scrollLeft+=a.left-b.left-10;}
 const selectors={survival:'.survival-zones,.survival-practice',muscle:'.muscle-layout>.anatomy,.muscle-layout>article',equipment:'.mq-top-browser>.detail>h4',move:'.mq-top-browser>.detail>h4,.mq-top-browser>.detail>.steps>div>h4',sport:'.sport-neon-detail-art,.sport-detail>h4,.sport-demo,.sport-walkthrough,.sport-quiz',quest:'.quest-banner,.quest-list',passport:'.passport-cover,.passport-columns>.mq-passport-column'};
 const candidates=Array.from(main.querySelectorAll(selectors[page]||'h2')).filter(node=>!node.closest('dialog'));
 const labels=[];
 for(const node of candidates){let text=node.matches('h2,h3,h4')?node.textContent.trim():node.querySelector('h2,h3,h4')?.textContent.trim();if(!text&&node.classList.contains('survival-zones'))text=tr(T('训练区域','훈련 구역','Training zones'));if(!text&&node.classList.contains('anatomy'))text=tr(T('人体肌肉地图','인체 근육 지도','Muscle map'));if(!text&&node.classList.contains('quest-banner'))text=tr(T('完成进度','완료 진행률','Progress'));if(!text&&node.classList.contains('quest-list'))text=tr(modules[5][1]);if(!text||labels.some(item=>item.text===text))continue;labels.push({node,text});if(labels.length>=8)break;}
 if(labels.length>1){const nav=document.createElement('nav');nav.className='mq-page-shortcuts';nav.setAttribute('aria-label',tr(T('本页快速定位','페이지 바로가기','On this page')));for(const {node,text} of labels){node.classList.add('mq-layout-target');const button=document.createElement('button');button.type='button';button.textContent=text;button.onclick=()=>mqLayoutJump(node);nav.append(button);}const anchor=main.querySelector('.page-title,.survival-intro');if(anchor)anchor.after(nav);else main.prepend(nav);}
 let top=document.getElementById('mq-back-top');if(!top){top=document.createElement('button');top.id='mq-back-top';top.className='mq-back-top';top.type='button';top.textContent='↑';top.onclick=()=>window.scrollTo({top:0,behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});document.body.append(top);}top.setAttribute('aria-label',tr(T('返回顶部','맨 위로','Back to top')));mqLayoutScroll();
}
function mqLayoutScroll(){const top=document.getElementById('mq-back-top');if(top)top.hidden=page==='home'||page==='welcome'||window.scrollY<600;}
window.addEventListener('scroll',mqLayoutScroll,{passive:true});
const mqRenderBeforeLayoutPolish=render;
render=function(){mqRenderBeforeLayoutPolish();mqLayoutEnhance();mqLayoutScroll();};
render();
