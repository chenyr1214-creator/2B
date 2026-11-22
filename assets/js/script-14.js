
/* Native geometry catalogue. No bitmap planes or external model assets. */
(function(){
const metal=[.38,.15,.52],edge=[.65,.36,.76],chrome=[.65,.52,.74],rubber=[.09,.045,.14],pad=[.26,.10,.36],light=[1,.35,.75];
function build(id){let parts=[];
 const add=(type,pos,size,color=metal,rot=[0,0,0],name='机架',emission=0)=>{parts.push({type,pos,size,color,rot,name,emission});return parts[parts.length-1]};
 const box=(p,s,c=metal,r=[0,0,0],n='机架')=>add('box',p,s,c,r,n);
 const ball=(p,s,c=chrome,n='连接件')=>add('sphere',p,s,c,[0,0,0],n);
 const cyl=(p,r,h,c=metal,rot=[0,0,0],n='轴承')=>add('cylinder',p,[r,h,r],c,rot,n);
 const rod=(a,b,r=.035,c=metal,n='机架')=>{let d=b.map((x,i)=>x-a[i]),len=Math.hypot(...d);parts.push({type:'cylinder',pos:a.map((x,i)=>(x+b[i])/2),size:[r,len,r],direction:d.map(x=>x/len),color:c,name:n,emission:0})};
 const tube=(pts,r=.035,c=chrome,n='扶手')=>{for(let i=1;i<pts.length;i++)rod(pts[i-1],pts[i],r,c,n);for(let i=1;i<pts.length-1;i++)ball(pts[i],[r,r,r],c,n)};
 const torus=(p,r,t,c=edge,rot=[0,0,0],name='飞轮',emission=0)=>add('torus',p,[r,t,r],c,rot,name,emission);
 const feet=(w=.72,l=1.25)=>{for(const z of [-l/2,l/2]){rod([-w/2,.13,z],[w/2,.13,z],.055,metal,'底架');for(const x of [-w/2,w/2])box([x,.075,z],[.12,.1,.16],rubber,[0,0,0],'防滑脚垫')}};
 const seat=(p=[0,.7,.05],w=.42,d=.38)=>{box(p,[w,.075,d],pad,[0,0,0],'座垫');box([p[0],p[1]+.039,p[2]],[w*.96,.012,d*.95],edge,[0,0,0],'座垫缝线')};
 const back=(p=[0,1.05,.28],h=.62,ang=-.1)=>{box(p,[.40,h,.09],pad,[ang,0,0],'靠垫');box([p[0],p[1],p[2]+.05],[.32,h*.86,.012],metal,[ang,0,0],'靠垫支撑')};
 const stack=(x=.55,z=.28,h=1.7)=>{box([x,h/2+.16,z],[.36,h,.35],metal,[0,0,0],'配重塔');box([x,h/2+.16,z-.183],[.29,h*.89,.015],rubber,[0,0,0],'配重护罩');for(let i=0;i<13;i++)box([x,.27+i*.065,z-.20],[.255,.044,.022],chrome,[0,0,0],'配重片');for(const dx of [-.11,.11])rod([x+dx,.25,z-.24],[x+dx,h-.02,z-.24],.011,chrome,'导向杆');ball([x+.06,.68,z-.235],[.022,.022,.04],light,'配重插销')};
 const console=(p=[0,1.4,-.5],w=.46,h=.25,angle=-.3)=>{box(p,[w,h,.075],rubber,[angle,0,0],'控制台');box([p[0],p[1]+.014,p[2]-.045],[w*.86,h*.75,.01],[.10,.17,.38],[angle,0,0],'显示屏');for(let i=0;i<5;i++)box([p[0]-.15+i*.065,p[1]-.05,p[2]-.06],[.028,.01,.008],[.35,.62,1],[angle,0,0],'显示读数');for(let i=-1;i<2;i++)ball([p[0]+i*.09,p[1]-.10,p[2]-.055],[.017,.009,.009],i===0?light:chrome,'控制按钮')};
 const wheel=(p=[0,.43,.33],r=.37)=>{cyl(p,r,.23,rubber,[0,0,Math.PI/2],'飞轮壳');cyl([p[0]-.13,p[1],p[2]],r*.94,.025,metal,[0,0,Math.PI/2],'飞轮侧盖');torus([p[0]-.146,p[1],p[2]],r*.88,.013,light,[0,0,Math.PI/2],'发光飞轮环',.8);cyl([p[0]-.16,p[1],p[2]],.065,.03,chrome,[0,0,Math.PI/2],'飞轮轴')};
 const lever=(pivot,end,name='动作手柄')=>{rod(pivot,end,.035,chrome,name);ball(pivot,[.065,.065,.065],metal,'转轴');rod(end,[end[0],end[1],end[2]-.18],.038,rubber,name)};
 const pedal=(p,name='脚踏板')=>{box(p,[.27,.055,.45],rubber,[0,0,0],name);for(let i=0;i<8;i++)box([p[0],p[1]+.03,p[2]-.18+i*.05],[.24,.008,.012],chrome,[0,0,0],'防滑纹')};
 const bench=(incline=false)=>{feet(.6,1.05);rod([0,.18,-.4],[0,.55,-.2],.05);rod([0,.18,.4],[0,.55,.1],.05);seat([0,.57,-.30],.4,.35);box([0,incline?.92:.58,.16],[.4,incline?.75:.08,incline?.08:.75],pad,[incline?-.35:0,0,0],'可调靠垫')};
 const weight=(x,y,z,r=.25)=>{cyl([x,y,z],r,.055,rubber,[0,0,Math.PI/2],'杠铃片');torus([x-.03,y,z],r*.88,.008,edge,[0,0,Math.PI/2]);cyl([x-.035,y,z],r*.15,.01,chrome,[0,0,Math.PI/2],'杠铃孔')};
 if(id==='treadmill'){
  feet(.85,1.7);box([0,.24,0],[.87,.14,1.7]);box([0,.325,0],[.66,.03,1.5],rubber,[0,0,0],'跑带');for(let i=0;i<32;i++)box([0,.344,-.7+i*.045],[.64,.003,.009],[.18,.10,.22],[0,0,0],'跑带纹理');for(const x of [-.40,.40]){box([x,.34,0],[.11,.06,1.6],chrome,[0,0,0],'侧踏板');tube([[x,.35,.63],[x,1.13,.52],[x,1.37,.42]],.045);tube([[x,1.14,.5],[x,1.12,.1]],.035,rubber)}console([0,1.37,.50],.62,.29);rod([-.4,1.1,.43],[.4,1.1,.43],.03);ball([0,1.22,.44],[.025,.025,.02],light,'安全夹')
 }else if(id==='elliptical'){
  feet(.86,1.7);wheel([0,.47,.43],.38);tube([[0,.18,-.72],[0,.28,-.4],[0,.61,.2],[0,1.13,.49],[0,1.5,.39]],.065,metal,'主支架');console([0,1.43,.34],.40,.22);
  for(const side of [-1,1]){let x=side*.31;rod([x,.42,.43],[x,.21,-.63],.035,chrome,'踏板连杆');pedal([x,.27,-.40]);tube([[x,.27,-.4],[x,.76,.16],[x,1.12,.23],[x,1.56,.15],[x,1.89,.34]],.033,chrome,'活动扶手');tube([[x,1.57,.15],[x,1.89,.34]],.04,rubber,'握把');cyl([x,.48,.43],.085,.10,edge,[0,0,Math.PI/2],'曲柄轴');tube([[side*.09,1.26,.40],[side*.19,1.34,.25]],.028,rubber,'固定扶手')}
 }else if(['spin','airbike','recumbent'].includes(id)){
  const rec=id==='recumbent';feet(.7,1.35);wheel([0,.43,.42],id==='airbike'?.46:.34);tube([[0,.2,-.55],[0,.82,-.20],[0,.45,.42],[0,.16,-.55]],.055);if(rec){seat([0,.46,-.48],.46,.43);back([0,.76,-.7],.58);rod([0,.3,-.5],[0,.3,.6],.07)}else{rod([0,.5,-.28],[0,1.04,-.31],.035,chrome,'座高调节杆');seat([0,1.06,-.3],.28,.35)}tube([[0,.5,.4],[0,1.24,.55],[-.25,1.3,.4],[.25,1.3,.4]],.035);for(const x of [-.28,.28]){rod([0,.4,.04],[x,.4,-.08],.02,chrome,'曲柄');pedal([x,.39,-.08]);if(id==='airbike')tube([[x,.43,.4],[x,1.12,.5],[x,1.54,.34]],.035)}if(id==='airbike')for(let i=0;i<18;i++){let a=i*Math.PI/9;rod([-.13,.43,.42],[-.13,.43+Math.sin(a)*.4,.42+Math.cos(a)*.4],.006,chrome,'风扇辐条')}
 }else if(id==='erg'){
  feet(.7,1.8);box([0,.3,-.17],[.16,.10,1.7],chrome,[0,0,0],'滑轨');seat([0,.43,-.4],.42,.3);wheel([0,.62,.70],.40);rod([0,.75,.68],[0,1.12,.72],.025);console([0,1.14,.70],.25,.20);for(const x of [-.25,.25]){pedal([x,.39,.24]);rod([x,.43,.20],[x,.65,.22],.02)}rod([-.25,.82,.35],[.25,.82,.35],.025,rubber,'拉柄');rod([0,.82,.35],[0,.70,.65],.006,chrome,'拉索')
 }else if(id==='stairs'){
  feet(.9,1.2);box([0,.55,0],[.8,.65,1.1]);for(let i=0;i<5;i++)box([0,.25+i*.15,-.48+i*.19],[.67,.12,.22],rubber,[0,0,0],'踏阶');for(const x of [-.45,.45])tube([[x,.2,-.5],[x,1.05,-.3],[x,1.5,.5]],.035);console([0,1.55,.5],.45,.25)
 }else if(['dumbbell','barbell'].includes(id)){
  const db=id==='dumbbell';for(let j=0;j<(db?2:1);j++){let z=db?(j-.5)*.45:0,y=.34;rod([db?-.28:-.95,y,z],[db?.28:.95,y,z],.025,chrome,'握杆');for(const side of [-1,1]){if(db){for(let k=0;k<2;k++)cyl([side*(.20+k*.045),y,z],.16,.04,metal,[0,0,Math.PI/2],'六角配重',0)}else for(let k=0;k<3;k++)weight(side*(.68+k*.06),y,z,.28-k*.025)}}
 }else if(['rack','power','smith','cable'].includes(id)){
  feet(1.35,1.05);for(const x of [-.62,.62])for(const z of (id==='rack'?[.32]:[-.38,.38])){box([x,.99,z],[.065,1.8,.065]);for(let i=0;i<16;i++)cyl([x,.28+i*.09,z-.04],.012,.015,rubber,[Math.PI/2,0,0],'调节孔')}rod([-.62,1.88,.38],[.62,1.88,.38],.04);if(id==='cable'){stack(-.62,.32);stack(.62,.32);for(const x of [-.5,.5]){rod([x,1.7,.2],[x,1.1,-.2],.006,chrome,'钢索');torus([x,1.0,-.2],.09,.016,rubber,[Math.PI/2,0,0],'拉环')}}else{rod([-.95,1.12,.02],[.95,1.12,.02],.025,chrome,'杠铃杆');for(const side of [-1,1]){weight(side*.76,1.12,.02,.25);if(id==='smith')rod([side*.5,.2,0],[side*.5,1.8,0],.016,chrome,'导向杆');if(id==='power')rod([side*.59,.65,-.4],[side*.59,.65,.4],.03,chrome,'安全杠')}}
 }else if(['bench','roman','preacher'].includes(id)){
  bench(id!=='roman');if(id==='preacher'){box([0,1.03,.1],[.65,.1,.47],pad,[.45,0,0],'斜面托臂垫');rod([0,.2,.1],[0,.97,.1],.045)}if(id==='roman'){box([0,.85,.2],[.52,.12,.42],pad,[-.6,0,0],'髋部支撑');for(const x of [-.20,.2])cyl([x,.42,-.4],.08,.22,pad,[0,0,Math.PI/2],'踝部固定垫')}
 }else if(['legpress','hack'].includes(id)){
  feet(1.0,1.55);for(const x of [-.4,.4]){rod([x,.22,-.65],[x,1.68,.65],.025,chrome,'斜导轨');rod([x,.15,.7],[x,1.68,.65],.05);weight(x*1.6,1.05,.20,.24)}if(id==='legpress'){seat([0,.43,-.55]);back([0,.75,-.64],.55,-.35);box([0,1.2,.35],[.80,.55,.07],metal,[-.65,0,0],'推举踏板')}else{box([0,1.04,.18],[.5,.88,.1],pad,[-.70,0,0],'滑动背垫');for(const x of [-.22,.22])box([x,1.38,.37],[.17,.17,.28],pad,[-.7,0,0],'肩垫');box([0,.3,-.62],[.8,.08,.55],metal,[-.2,0,0],'站立踏板')}
 }else if(['mat','roller','ball','medicine','kettlebell','wheel','band','box','ropes','trx'].includes(id)){
  if(id==='mat'){box([0,.15,0],[.80,.035,1.45],pad);cyl([0,.30,.55],.16,.80,edge,[0,0,Math.PI/2],'卷起的垫子');for(let i=0;i<28;i++)rod([-.38,.17,-.68+i*.04],[.38,.17,-.68+i*.04],.002,edge,'防滑纹')}
  if(id==='roller'){cyl([0,.30,0],.22,.85,pad,[0,0,Math.PI/2]);for(let i=-4;i<=4;i++)torus([i*.08,.30,0],.22,.01,edge,[0,0,Math.PI/2],'按摩纹理')}
  if(id==='ball'||id==='medicine'){let r=id==='ball'?.18:.35;ball([0,r+.12,0],[r,r,r],metal,'球体');for(let i=0;i<6;i++)torus([0,r+.12,0],r,.005,edge,[i*Math.PI/6,0,0],'接缝')}
  if(id==='kettlebell'){ball([0,.38,0],[.30,.30,.25],metal,'壶铃主体');torus([0,.76,0],.21,.05,chrome,[Math.PI/2,0,0],'握把');box([0,.12,0],[.28,.05,.28],rubber)}
  if(id==='wheel'){cyl([0,.32,0],.24,.12,rubber,[0,0,Math.PI/2],'滚轮');torus([-.07,.32,0],.20,.015,edge,[0,0,Math.PI/2]);rod([-.4,.32,0],[.4,.32,0],.035,rubber,'握柄')}
  if(id==='box'){box([0,.45,0],[.70,.70,.65],pad);for(const x of [-.34,.34])for(const z of [-.32,.32])rod([x,.12,z],[x,.78,z],.008,chrome,'缝线')}
  if(id==='band')for(let j=0;j<3;j++){torus([0,.18+j*.08,j*.1],.30+j*.05,.024+j*.006,edge,[0,0,0],'弹力环')}
  if(id==='ropes')for(let j=0;j<2;j++)for(let i=0;i<4;i++)torus([(j-.5)*.55,.14+i*.035,0],.22-i*.025,.023,pad,[0,0,0],'战绳');
  if(id==='trx'){feet(.9,.65);for(const x of [-.45,.45])rod([x,.15,0],[x,1.7,0],.04);rod([-.45,1.7,0],[.45,1.7,0],.04);for(const x of [-.2,.2]){box([x,1.1,0],[.035,1.1,.018],pad);torus([x,.52,0],.10,.02,rubber,[Math.PI/2,0,0],'悬挂握环')}}
 }else{
  feet(.95,1.12);stack(.5,.33);rod([0,.14,-.45],[0,.75,0],.055);seat([0,.65,-.1]);back([0,1.0,.18],.62);
  if(['press','pecdeck','shoulderpress','lateral'].includes(id))for(const side of [-1,1]){let x=side*.3;if(id==='press')lever([x,1.4,.18],[side*.43,1.03,-.42],'推胸握柄');if(id==='pecdeck'){lever([x,1.63,.2],[side*.62,1.15,-.2],'夹胸臂');box([side*.58,1.08,-.20],[.11,.40,.12],pad,[0,0,0],'前臂垫')}if(id==='shoulderpress')lever([x,1.5,.22],[side*.42,1.5,-.24],'肩推握柄');if(id==='lateral'){lever([x,1.22,.20],[side*.52,1.08,-.15],'侧平举臂');cyl([side*.5,1.04,-.15],.09,.24,pad,[Math.PI/2,0,0],'肘垫')}}
  if(id==='pulldown'){rod([0,.13,.4],[0,1.9,.4],.055);rod([0,1.9,.4],[0,1.9,-.32],.045);rod([0,1.9,-.32],[0,1.58,-.32],.006,chrome,'拉索');tube([[-.52,1.50,-.32],[-.35,1.60,-.32],[.35,1.60,-.32],[.52,1.5,-.32]],.025,rubber,'下拉杆');for(const x of [-.18,.18])cyl([x,.88,-.30],.075,.28,pad,[0,0,Math.PI/2],'大腿压垫')}
  if(id==='seatedrow'){rod([0,.72,.2],[0,.72,-.45],.006,chrome,'拉索');tube([[-.17,.72,-.45],[0,.6,-.45],[.17,.72,-.45]],.025,rubber,'划船握柄');for(const x of [-.24,.24])pedal([x,.3,-.65])}
  if(['legext','seatedcurl','pronecurl'].includes(id)){if(id==='pronecurl'){box([0,.7,-.17],[.48,.1,.94],pad);back([0,.7,.15],.2)}for(const x of [-.18,.18]){rod([x,.62,-.25],[x,.3,-.54],.035);cyl([x,.30,-.55],.09,.26,pad,[0,0,Math.PI/2],'腿部滚垫');if(id==='seatedcurl')cyl([x,.8,-.25],.08,.25,pad,[0,0,Math.PI/2],'大腿压垫')}}
  if(id==='hipout'||id==='hipin')for(const side of [-1,1]){let x=side*(id==='hipin'?.38:.22);rod([0,.55,-.05],[x,.55,-.48],.035);box([x,.78,-.45],[.10,.32,.22],pad,[0,0,0],'腿部阻力垫')}
  if(id==='standcalf'){for(const x of [-.25,.25])box([x,1.4,-.12],[.18,.15,.28],pad,[0,0,0],'肩垫');box([0,.25,-.4],[.65,.10,.30],metal);}
  if(id==='seatcalf')box([0,.86,-.32],[.55,.14,.20],pad,[0,0,0],'大腿压垫');
  if(['curlmachine','tricepsmachine','crunchmachine','captain'].includes(id))for(const side of [-1,1]){if(id==='curlmachine'){box([0,.95,-.23],[.55,.12,.38],pad,[.4,0,0],'托臂垫');lever([side*.25,.75,-.35],[side*.25,1.10,-.48],'弯举握柄')}if(id==='tricepsmachine')lever([side*.30,.72,0],[side*.38,.98,-.25],'下压握柄');if(id==='crunchmachine'){lever([side*.20,1.5,.2],[side*.27,1.30,-.25],'卷腹握柄');box([0,1.1,-.1],[.30,.15,.12],pad,[0,0,0],'胸垫')}if(id==='captain'){rod([side*.34,.1,0],[side*.34,1.3,0],.045);box([side*.34,1.18,-.1],[.15,.08,.35],pad,[0,0,0],'前臂支撑');rod([side*.34,1.2,-.3],[side*.34,1.35,-.3],.025,rubber)}}
 }
 return parts;
}
window.MQEquipmentModels={build};
})();

