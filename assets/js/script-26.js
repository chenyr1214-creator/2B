
const mqBrowserEntries={};
const mqDetailBeforeTopBrowser=selectedDetail;
selectedDetail=function(kind,arr,body){
 const html=mqDetailBeforeTopBrowser(kind,arr,body);
 if(!['move','equipment'].includes(kind)||!arr.length)return html;
 mqBrowserEntries[kind]=arr.map(a=>a[0]);
 const start=html.indexOf('<div class="item-list">'),end=html.indexOf('</div>',start);
 if(start<0||end<0)return html;
 const index=arr.findIndex(a=>a[0]===selected),id='mq-browser-'+kind;
 const options=arr.map(a=>`<option value="${esc(a[0])}" ${a[0]===selected?'selected':''}>${esc(tr(a[1]))}</option>`).join('');
 const controls=`<section class="mq-browser-controls" aria-label="${esc(tr(T('快速选择','빠른 선택','Quick selection')))}"><label for="${id}">${tr(kind==='move'?T('选择动作','동작 선택','Choose an exercise'):T('选择器械','기구 선택','Choose equipment'))} · ${index+1} / ${arr.length}</label><div class="mq-browser-row"><select id="${id}" onchange="mqBrowserSelect('${kind}',this.value)">${options}</select><button type="button" ${index<=0?'disabled':''} onclick="mqBrowserStep('${kind}',-1)">${tr(T('← 上一项','← 이전','← Previous'))}</button><button type="button" ${index>=arr.length-1?'disabled':''} onclick="mqBrowserStep('${kind}',1)">${tr(T('下一项 →','다음 →','Next →'))}</button></div><details><summary>${tr(T('展开完整清单 / 搜索','전체 목록 / 검색','Browse all / search'))}</summary><input class="mq-browser-search" type="search" aria-label="${esc(tr(T('搜索清单','목록 검색','Search list')))}" placeholder="${esc(tr(T('输入名称快速查找','이름으로 검색','Search by name')))}" oninput="mqBrowserFilter(this)">${html.slice(start,end+6)}<p class="mq-browser-empty" hidden>${tr(T('没有匹配项目','일치하는 항목 없음','No matching items'))}</p></details></section>`;
 return (html.slice(0,start)+controls+html.slice(end+6)).replace('<div class="split">',`<div class="split mq-top-browser ${kind==='equipment'?'neon-equipment-split':''}">`);
};
function mqBrowserSelect(kind,id){if(!mqBrowserEntries[kind]?.includes(id))return;selected=id;render();requestAnimationFrame(()=>document.querySelector('.mq-top-browser')?.scrollIntoView({block:'start',behavior:'smooth'}));}
function mqBrowserStep(kind,delta){const arr=mqBrowserEntries[kind]||[],i=arr.indexOf(selected),id=arr[i+delta];if(id)mqBrowserSelect(kind,id);}
function mqBrowserFilter(input){const box=input.closest('details'),q=input.value.trim().toLocaleLowerCase();let count=0;box.querySelectorAll('.item-list>button').forEach(button=>{button.hidden=!button.textContent.toLocaleLowerCase().includes(q);if(!button.hidden)count++;});box.querySelector('.mq-browser-empty').hidden=count>0;}
render();
