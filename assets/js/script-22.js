
/* Preserve each original pose and its timing; recolor the native vector scene. */
const sportGuideOriginalScene=sportScene;
function sportReferenceScene(id,t=0){
 const phase=((t%1)+1)%1,angle=phase*Math.PI*2;
 if(id==='badminton'){
  const u=phase<.58?(1-Math.cos(phase/.58*Math.PI))/2:(1+Math.cos((phase-.58)/.42*Math.PI))/2;
  const hip=[335+54*u,232],shoulder=[330+38*u,149],head=[shoulder[0],113],backFoot=[235+20*u,321],frontFoot=[410+30*u,321],hand=[shoulder[0]+97*u,207-18*u],elbow=[shoulder[0]+43*u,184];
  const bg=sportPath('M65 326L186 234H548L644 326Z','#e0e8d2','#b5c5a4',2)+sportStroke([[516,126],[516,291]],'#b0c2a0',4)+sportStroke([[516,145],[640,145]],'#b0c2a0',2);
  const body=sportFigure({hip,shoulder,head,leftFoot:backFoot,rightFoot:frontFoot,leftKnee:[282+13*u,275],rightKnee:[400+26*u,276],leftHand:[shoulder[0]-75,shoulder[1]+42],rightHand:hand,rightElbow:elbow});
  const racket=sportRacket(hand,-.68,true),shuttle=sportPath('M155 88l17 -20 16 19 -16 8Z','#dce7d2','#799568')+sportCircle(172,88,4,'#799568');
  return `<rect width="700" height="370" fill="#eef0e6"/>${bg}${body}${racket}${shuttle}`;
 }
 if(id==='yoga'){
  const settle=phase<.2?(1-Math.cos(phase/.2*Math.PI))/2:1,frontKnee=[405,269+7*settle],hip=[333,230],shoulder=[333,143];
  const bg=sportPath('M100 316L566 306 605 335 133 347Z','#c1d0a8')+sportStroke([[198,327],[474,321]],'#a8b98f',2);
  const body=sportFigure({hip,shoulder,head:[333,107],leftFoot:[189,318],rightFoot:[465,318],leftKnee:[262,270],rightKnee:frontKnee,leftHand:[192,143],rightHand:[475,143],leftElbow:[257,143],rightElbow:[410,143]});
  return `<rect width="700" height="370" fill="#eef0e6"/>${bg}${body}`;
 }
 if(id==='pilates'){
  const breath=Math.sin(angle)*2,hip=[334,281],shoulder=[265,224+breath],head=[246,193+breath],kneeA=[377,232-breath],kneeB=[397,246-breath],footA=[435,224-breath],footB=[455,238-breath];
  const bg=sportPath('M105 306L532 296 585 325 155 340Z','#c1d0a8');
  const body=sportStroke([hip,kneeA,footA],'#294b37',12)+sportStroke([hip,kneeB,footB],'#79936b',11)+sportStroke([hip,[301,249+breath],shoulder],'#294b37',17)+sportCircle(head[0],head[1],18)+sportStroke([[shoulder[0]+12,shoulder[1]+15],[324,227+breath],[366,226-breath]],'#6c8952',10);
  return `<rect width="700" height="370" fill="#eef0e6"/>${bg}${body}`;
 }
 if(id==='boxing'){
  const u=phase<.38?(1-Math.cos(phase/.38*Math.PI))/2:phase<.72?(1+Math.cos((phase-.38)/.34*Math.PI))/2:0,sway=Math.sin(angle)*2;
  const bagTop=76,bagBottom=260,bagX=470+5*u,hip=[315,235],shoulder=[323+sway,147],lead=[shoulder[0]+135*u,shoulder[1]-5*u],rear=[shoulder[0]+23,shoulder[1]+28];
  const bg=sportStroke([[61,326],[646,326]],'#c5d0b9',3)+sportStroke([[bagX,28],[bagX,bagTop]],'#a4b797',3)+sportPath(`M${bagX-27} ${bagTop}Q${bagX} ${bagTop-8} ${bagX+27} ${bagTop}L${bagX+23} ${bagBottom-10}Q${bagX} ${bagBottom+4} ${bagX-23} ${bagBottom-10}Z`,'#e0e7d6','#bdcbb1',2);
  const body=sportFigure({hip,shoulder,head:[shoulder[0],110],leftFoot:[265,325],rightFoot:[375,325],leftHand:rear,rightHand:lead,leftElbow:[shoulder[0]-17,184],rightElbow:[shoulder[0]+73*u,181-5*u]});
  const gloves=sportCircle(...rear,11,'#8ca771')+sportCircle(...lead,12,'#6e8b53');
  return `<rect width="700" height="370" fill="#eef0e6"/>${bg}${body}${gloves}`;
 }
 return null;
}
sportScene=function(id,t=0){let scene=sportReferenceScene(id,t)||sportGuideOriginalScene(id,t);if(id==='hike')scene+=sportStroke([[164,147],[145,258]],'#79916a',4)+sportStroke([[211,143],[231,224]],'#79916a',4)+sportStroke([[477,152],[467,243]],'#79916a',4)+sportStroke([[530,148],[552,264]],'#79916a',4);const colors={
 '#eef0e6':'#170d29','#294b37':'#edafff','#79936b':'#aa61cb','#8ba477':'#b66cdb','#5e7b45':'#d58ff1',
 '#d9e2cc':'#382047','#e0e8d2':'#2e193e','#c1d0a8':'#713289','#e1e7d6':'#301b43','#b9c99e':'#512b64',
 '#edf1e4':'#2b173e','#e5ecd8':'#492052','#e0e7d6':'#382047','#dce7d2':'#f8b5ff',
 '#bac98b':'#ffbc90','#93a877':'#ec89eb','#c5d0b9':'#a44ac7','#dde4d1':'#593071'};
 scene=scene.replace(/#[0-9a-f]{6}/gi,c=>colors[c.toLowerCase()]||'#ae70cb');
 scene=scene.replace('<rect width="700" height="370" fill="#170d29"/>','');
 const grid=Array.from({length:10},(_,i)=>`<path d="M350 235 L${-350+i*155} 370"/>`).join('')+Array.from({length:5},(_,i)=>`<path d="M0 ${265+i*24}H700"/>`).join('');
 return `<rect width="700" height="370" fill="#170d29"/><g stroke="#9b3abc" stroke-width=".6" opacity=".22">${grid}</g><ellipse cx="350" cy="338" rx="270" ry="18" fill="#a33ec4" fill-opacity=".1" stroke="#ec86ff" stroke-width="2"/><ellipse cx="350" cy="338" rx="265" ry="13" fill="none" stroke="#ffb7e8" stroke-opacity=".3" stroke-width="6"/><g class="sport-guide-vector">${scene}</g>`;
};
function sportGuideSelect(id,index){if(!validSport(id))return;state.sportTutorialSteps[id]=Math.max(0,Math.min(sportExperience[id].steps.length-1,index));persist();render()}
const sportGuideOriginalPanel=sportInteractionPanel;
sportInteractionPanel=function(id){let html=sportGuideOriginalPanel(id);const ex=sportExperience[id],index=sportTutorialIndex(id);
 const rail=`<div class="sport-guide-progress" role="group" aria-label="${esc(tr(sportLabels.step))}">${ex.steps.map((s,i)=>`<button type="button" class="sport-guide-stop ${i===index?'is-current':i<index?'is-past':''}" aria-current="${i===index?'step':'false'}" onclick="sportGuideSelect('${id}',${i})"><span class="sport-guide-stop-number">${String(i+1).padStart(2,'0')}</span><span>${tr(s.name)}</span></button>`).join('')}</div>`;
 html=html.replace('<section class="sport-walkthrough">','<section class="sport-walkthrough sport-guide-neon">');
 html=html.replace('<div class="sport-step-grid">',rail+'<div class="sport-step-grid">');
 html=html.replace('<div class="sport-step-picture">',`<div class="sport-step-picture"><div class="sport-guide-scene-label"><span>MOVEQUEST / ${esc(tr(entity('sport',id)[2]))}</span><span>${String(index+1).padStart(2,'0')} / ${String(ex.steps.length).padStart(2,'0')}</span></div>`);
 return html;
};
render();

