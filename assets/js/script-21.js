
/* Scene artwork is separate from accessible, localized HTML controls. */
const sportNeonSlots={climb:[1,0,0],hike:[1,1,0],swim:[1,2,0],cycle:[1,0,1],run:[1,1,1],tennis:[1,2,1],badminton:[2,0,0],yoga:[2,1,0],pilates:[2,0,1],boxing:[2,1,1]};
function sportNeonArt(id){const [atlas,x,y]=sportNeonSlots[id];return `<span class="sport-neon-art atlas-${atlas}" style="--sx:${atlas===1?x*50:x*100}%;--sy:${y*100}%" role="img" aria-label="${esc(tr(entity('sport',id)[2]))}"></span>`}
const sportsBeforeNeon=sportsPage;
sportsPage=function(){
 if(selected){let html=sportsBeforeNeon();return html.replace(/<figure class="sport-scene-hero">[\s\S]*?<\/figure>/,`<figure class="sport-neon-detail-art">${sportNeonArt(selected)}</figure>`)}
 const order=['climb','hike','swim','cycle','run','tennis','badminton','yoga','pilates','boxing'];
 return `<section class="sport-neon-heading"><button class="sport-neon-back" onclick="go('home')" aria-label="${esc(tr(ui.home))}">←</button><div><h1>${tr(modules[4][1])}</h1><p>${tr(T('走出健身房，探索不同运动，发现身体的更多可能。','헬스장을 넘어, 다양한 운동을 탐색하고 새로운 가능성을 발견해 보세요.','Explore beyond the gym and discover new ways to move.'))}</p></div></section><div class="sports-neon-grid">${order.map((id,i)=>{const s=entity('sport',id);return `<button class="sport-neon-card" onclick="go('sport','${id}')"><span class="sport-neon-number">SPORT ${String(i+1).padStart(2,'0')}</span><span class="sport-neon-slashes" aria-hidden="true">///</span>${sportNeonArt(id)}<span class="sport-neon-copy"><span class="sport-neon-icon" aria-hidden="true">${s[1]}</span><span><h2>${tr(s[2])}<span class="sport-neon-arrow" aria-hidden="true">↗</span></h2><p>${tr(s[4])}</p></span></span></button>`}).join('')}</div>`;
};
const sportsNeonPreviousRender=render;
render=function(){document.body.classList.toggle('sports-neon-page',page==='sport');sportsNeonPreviousRender()};
render();

