
/* Articulated exercise rigs. Existing unsupported actions remain unsupported. */
(function(){
const supported=['chestpress','pecfly','dbpress','bbpress','cablefly','lat','seatedrow','row','bbrow','backext','machineohp','dbohp','raise','machineraise','curl','preachercurl','extension','overheadtri','leg','legextension','legcurl','hacksquat','smithsquat','hipthrust','hipabduction','hipadduction','standingcalf','seatedcalf','crunch','legraise','rollout','trxrow','battle'];
const machines={chestpress:'press',pecfly:'pecdeck',dbpress:'bench',bbpress:'bench',cablefly:'cable',lat:'pulldown',seatedrow:'seatedrow',row:'bench',bbrow:null,backext:'roman',machineohp:'shoulderpress',dbohp:'bench',raise:null,machineraise:'lateral',curl:null,preachercurl:'preacher',extension:'cable',overheadtri:'bench',leg:'legpress',legextension:'legext',legcurl:'pronecurl',hacksquat:'hack',smithsquat:'smith',hipthrust:'bench',hipabduction:'hipout',hipadduction:'hipin',standingcalf:'standcalf',seatedcalf:'seatcalf',crunch:'crunchmachine',legraise:'captain',rollout:'mat',trxrow:'trx',battle:'ropes'};
const add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i]),mul=(a,t)=>a.map(v=>v*t),len=a=>Math.hypot(...a),unit=a=>mul(a,1/(len(a)||1)),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=(a,b)=>a.reduce((t,v,i)=>t+v*b[i],0);
const interp=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
function ik(a,target,l1,l2,bend){let d=sub(target,a),dist=Math.max(.02,Math.min(len(d),l1+l2-.005)),axis=unit(d),end=add(a,mul(axis,dist)),proj=sub(bend,mul(axis,dot(bend,axis)));if(len(proj)<.01)proj=cross(axis,[1,0,0]);if(len(proj)<.01)proj=[0,0,1];let k=(dist*dist+l1*l1-l2*l2)/(2*dist),h=Math.sqrt(Math.max(0,l1*l1-k*k));return [add(a,add(mul(axis,k),mul(unit(proj),h))),end]}
function phase(ms){let p=(ms%6400)/6400;if(p<.12)return{u:0,stage:0};if(p<.46)return{u:(1-Math.cos((p-.12)/.34*Math.PI))/2,stage:1};if(p<.55)return{u:1,stage:1};if(p<.95)return{u:(1+Math.cos((p-.55)/.4*Math.PI))/2,stage:2};return{u:0,stage:0}}
const baseModels={};
function build(id,time){if(!supported.includes(id))throw Error('Unsupported 3D action '+id);time=((time%6400)+6400)%6400;const {u}=phase(time);let machine=machines[id],parts=machine?(baseModels[machine]??=MQEquipmentModels.build(machine)).map(p=>({...p,pos:[...p.pos]})):[];
const removeNames=(names)=>{parts=parts.filter(p=>!names.some(n=>p.name.includes(n)))};
const shape=(type,pos,size,color=[.50,.24,.70],name='三维示范人物',direction)=>{let p={type,pos,size,color,name};if(direction)p.direction=direction;parts.push(p);return p};
const sphere=(p,s,c,name)=>shape('sphere',p,s,c,name);
const rod=(a,b,r=.035,c=[.75,.45,.88],name='动作连接件')=>{let d=sub(b,a);if(len(d)>.0001)shape(({'上臂':'humanUpperArm','前臂':'humanForearm','大腿':'humanThigh','小腿':'humanShin'})[name]||'cylinder',mul(add(a,b),.5),[r,len(d),r],c,name,unit(d))};
const tube=(pts,r,c,n)=>{for(let i=1;i<pts.length;i++)rod(pts[i-1],pts[i],r,c,n)};
const dumbbell=p=>{rod(add(p,[-.12,0,0]),add(p,[.12,0,0]),.018,[.75,.64,.82],'哑铃握杆');for(const x of [-.12,.12])shape('cylinder',add(p,[x,0,0]),[.085,.07,.085],[.25,.10,.35],'哑铃配重',[1,0,0])};
const barbell=(p,w=.88)=>{rod(add(p,[-w,0,0]),add(p,[w,0,0]),.018,[.75,.64,.82],'杠铃杆');for(const x of [-w*.83,w*.83])shape('cylinder',add(p,[x,0,0]),[.15,.07,.15],[.25,.1,.35],'杠铃片',[1,0,0])};
let H=[0,.76,-.03],S=[0,1.25,.06],feet=[[-.17,.14,-.5],[.17,.14,-.5]],hands=[[-.27,1.02,-.22],[.27,1.02,-.22]],knees=null,elbowBends=[[-.5,-.2,.5],[.5,-.2,.5]],arms=true;
const standing=()=>{H=[0,1.0,-.03];S=[0,1.51,-.03];feet=[[-.18,.13,-.08],[.18,.13,-.08]];hands=[[-.25,1.0,-.06],[.25,1.,-.06]]};
if(id==='chestpress'){hands=[[-.35,1.05,-.20-.30*u],[.35,1.05,-.20-.30*u]];removeNames(['推胸握柄']);}
if(id==='pecfly'||id==='cablefly'){if(id==='cablefly')standing();let spread=.50-.36*u;hands=[[-spread,S[1]-.12,-.25-.21*u],[spread,S[1]-.12,-.25-.21*u]];removeNames(['夹胸臂','前臂垫','拉环']);}
if(id==='dbpress'||id==='bbpress'){H=[0,.75,-.28];S=[0,.75,.19];feet=[[-.22,.14,-.65],[.22,.14,-.65]];hands=[[-.32,.88+.36*u,.16],[.32,.88+.36*u,.16]];parts=parts.map(p=>p.name==='可调靠垫'?{...p,pos:[0,.58,.16],size:[.4,.08,.75],rot:[0,0,0]}:p);elbowBends=[[-1,0,0],[1,0,0]];}
if(id==='lat'){hands=[[-.39,1.76-.45*u,-.28],[.39,1.76-.45*u,-.28]];elbowBends=[[-1,0,-.2],[1,0,-.2]];removeNames(['下拉杆','拉索']);}
if(id==='seatedrow'){hands=[[-.18,1.06,-.53+.31*u],[.18,1.06,-.53+.31*u]];removeNames(['划船握柄','拉索']);}
if(id==='row'||id==='bbrow'){standing();H=[0,.94,.13];S=[0,1.18,-.31];feet=[[-.22,.13,.09],[.22,.13,.09]];hands=[[-.23,.67+.31*u,-.31],[.23,.67+.31*u,-.31]];if(id==='row'){hands[0]=[-.25,.77,-.12];parts=parts.map(p=>({...p,pos:add(p.pos,[-.48,0,0])}))}elbowBends=[[-.2,.1,.6],[.2,.1,.6]];}
if(id==='backext'){H=[0,.94,.15];S=[0,1.04+.28*u,-.31+.19*u];feet=[[-.13,.2,.58],[.13,.2,.58]];hands=[[-.12,S[1]-.09,S[2]-.02],[.12,S[1]-.09,S[2]-.02]];}
if(id==='machineohp'||id==='dbohp'){hands=[[-.34,1.35+.39*u,-.13],[.34,1.35+.39*u,-.13]];elbowBends=[[-1,0,0],[1,0,0]];removeNames(['肩推握柄']);}
if(id==='raise'||id==='machineraise'){if(id==='raise')standing();let a=.08+1.30*u;hands=[[-.22-.51*Math.sin(a),S[1]-.51*Math.cos(a),-.09],[.22+.51*Math.sin(a),S[1]-.51*Math.cos(a),-.09]];removeNames(['侧平举臂','肘垫']);elbowBends=[[-1,0,-.2],[1,0,-.2]];}
if(id==='curl'||id==='preachercurl'){if(id==='curl')standing();let ang=.05+2.12*u,ey=S[1]-.25,ez=S[2]-.03;if(id==='preachercurl'){ey=1.0;ez=-.28}hands=[[-.23,ey-.26*Math.cos(ang),ez-.26*Math.sin(ang)],[.23,ey-.26*Math.cos(ang),ez-.26*Math.sin(ang)]];elbowBends=[[-.1,-.5,.1],[.1,-.5,.1]];}
if(id==='extension'){standing();let a=-1.13+2.43*u;hands=[[-.16,1.23-.25*Math.sin(a),-.08-.25*Math.cos(a)],[.16,1.23-.25*Math.sin(a),-.08-.25*Math.cos(a)]];removeNames(['拉环']);}
if(id==='overheadtri'){let a=1.1-2.1*u;hands=[[-.07,1.57+.24*Math.cos(a),.01+.24*Math.sin(a)],[.07,1.57+.24*Math.cos(a),.01+.24*Math.sin(a)]];elbowBends=[[-.05,.5,.4],[.05,.5,.4]];}
if(id==='leg'){H=[0,.60,-.5];S=[0,1.03,-.70];feet=[[-.17,.95+.18*u,.03+.25*u],[.17,.95+.18*u,.03+.25*u]];hands=[[-.30,.65,-.42],[.30,.65,-.42]];removeNames(['推举踏板']);elbowBends=[[-.4,0,0],[.4,0,0]];}
if(id==='legextension'){let a=1.4*u;feet=[[-.15,.68-.48*Math.cos(a),-.43-.48*Math.sin(a)],[.15,.68-.48*Math.cos(a),-.43-.48*Math.sin(a)]];knees=[[-.15,.68,-.43],[.15,.68,-.43]];hands=[[-.30,.73,-.06],[.30,.73,-.06]];removeNames(['腿部滚垫']);}
if(id==='legcurl'){H=[0,.85,.10];S=[0,.85,-.38];knees=[[-.13,.85,.48],[.13,.85,.48]];feet=[[-.13,.85+.40*Math.sin(1.6*u),.48+.40*Math.cos(1.6*u)],[.13,.85+.40*Math.sin(1.6*u),.48+.40*Math.cos(1.6*u)]];hands=[[-.30,.68,-.52],[.30,.68,-.52]];removeNames(['腿部滚垫']);}
if(id==='hacksquat'||id==='smithsquat'){standing();H=[0,1-.38*u,.06+.13*u];S=[0,1.5-.35*u,.02+.08*u];feet=[[-.23,.25,-.30],[.23,.25,-.30]];hands=[[-.32,S[1]-.07,S[2]-.09],[.32,S[1]-.07,S[2]-.09]];removeNames(['杠铃杆','杠铃片','肩垫','滑动背垫']);}
if(id==='hipthrust'){S=[0,.77,.12];H=[0,.48+.27*u,-.35];feet=[[-.22,.14,-.85],[.22,.14,-.85]];hands=[[-.34,H[1]+.03,H[2]],[.34,H[1]+.03,H[2]]];}
if(id==='hipabduction'||id==='hipadduction'){let t=id==='hipabduction'?u:1-u;let w=.15+.25*t;knees=[[-w,.65,-.37],[w,.65,-.37]];feet=[[-w,.16,-.43],[w,.16,-.43]];hands=[[-.29,.79,.0],[.29,.79,.0]];removeNames(['腿部阻力垫']);}
if(id==='standingcalf'||id==='seatedcalf'){if(id==='standingcalf'){standing();removeNames(['座垫','靠垫'])}let lift=.06*u;H[1]+=lift;S[1]+=lift;feet=feet.map(p=>[p[0],p[1]+lift,p[2]]);hands=id==='standingcalf'?[[-.30,1.38,-.13],[.30,1.38,-.13]]:[[-.30,.80,-.23],[.30,.80,-.23]];}
if(id==='crunch'){S=[0,1.25-.13*u,.04-.19*u];hands=[[-.18,S[1]+.05,S[2]-.20],[.18,S[1]+.05,S[2]-.20]];removeNames(['卷腹握柄','胸垫']);}
if(id==='legraise'){removeNames(['座垫']);H=[0,1.05,.02];S=[0,1.54,.02];knees=[[-.14,.68+.42*u,-.04-.36*u],[.14,.68+.42*u,-.04-.36*u]];feet=[[-.14,.27+.38*u,-.07-.34*u],[.14,.27+.38*u,-.07-.34*u]];hands=[[-.34,1.35,-.30],[.34,1.35,-.30]];}
if(id==='rollout'){H=[0,.67-.18*u,.13-.18*u];S=[0,.96-.42*u,-.24-.28*u];knees=[[-.13,.22,.36],[.13,.22,.36]];feet=[[-.13,.13,.64],[.13,.13,.64]];hands=[[-.17,.31,-.54-.28*u],[.17,.31,-.54-.28*u]];}
if(id==='trxrow'){let lean=.60-.17*u;feet=[[-.15,.13,-.52],[.15,.13,-.52]];H=[0,.13+Math.cos(lean)*.83,-.52+Math.sin(lean)*.83];S=add(H,[0,Math.cos(lean)*.51,Math.sin(lean)*.51]);hands=[[-.18,S[1]+.08,S[2]-.40+.18*u],[.18,S[1]+.08,S[2]-.40+.18*u]];removeNames(['悬挂握环']);}
if(id==='battle'){standing();H[1]=.9;S[1]=1.41;let a=Math.sin(time/6400*Math.PI*8);hands=[[-.25,1.05+.15*a,-.39],[.25,1.05-.15*a,-.39]];parts=[];}
// Two-bone IK keeps limb lengths fixed while hands follow the apparatus.
let shoulders=[add(S,[-.22,0,0]),add(S,[.22,0,0])],hips=[add(H,[-.13,0,0]),add(H,[.13,0,0])],actualHands=[];
const skin=[.43,.13,.63],joint=[.57,.24,.77],clothes=[.32,.10,.47];
for(let side=0;side<2;side++){
 let [elbow,hand]=ik(shoulders[side],hands[side],.29,.27,elbowBends[side]);actualHands.push(hand);
 rod(shoulders[side],elbow,.062,skin,'上臂');rod(elbow,hand,.047,skin,'前臂');shape('humanHand',hand,[.035,.045,.030],skin,'手掌与手指',unit(sub(hand,elbow)));
 let knee,foot;if(knees){knee=knees[side];foot=feet[side]}else[knee,foot]=ik(hips[side],feet[side],.43,.43,[0,0,-1]);
 rod(hips[side],knee,.092,skin,'大腿');rod(knee,foot,.061,skin,'小腿');shape('humanFoot',add(foot,[0,-.015,-.055]),[.067,.048,.135],clothes,'训练鞋');
}
let spine=sub(S,H),axis=unit(spine),forward=unit(cross(axis,[1,0,0]));shape('humanTorso',mul(add(H,S),.5),[.225,len(spine)*.61,.125],skin,'连贯胸背与腰部',axis);shape('humanPelvis',H,[.207,.145,.135],skin,'骨盆与髋部轮廓',axis);
let neck=add(S,mul(axis,.12)),head=add(neck,mul(axis,.15));rod(S,neck,.055,skin,'颈部');shape('humanHead',head,[.087,.125,.095],skin,'头部与面部轮廓',axis);
if(['dbpress','dbohp','raise','curl','preachercurl','row'].includes(id)){if(id==='row')dumbbell(actualHands[1]);else for(const hand of actualHands)dumbbell(hand)}
if(['bbpress','bbrow','hipthrust'].includes(id))barbell(id==='hipthrust'?add(H,[0,.07,0]):mul(add(actualHands[0],actualHands[1]),.5));
if(id==='overheadtri')dumbbell(mul(add(actualHands[0],actualHands[1]),.5));
if(id==='lat'){rod(actualHands[0],actualHands[1],.022,[.66,.51,.76],'下拉杆');rod([0,1.89,-.32],mul(add(actualHands[0],actualHands[1]),.5),.006,[.68,.59,.76],'钢索')}
if(['chestpress','machineohp','pecfly','machineraise'].includes(id)){for(let i=0;i<2;i++){const hand=actualHands[i],side=i===0?-1:1;rod([side*.30,id==='machineohp'?1.5:1.4,.20],hand,.027,[.64,.42,.77],'器械活动连杆');rod(hand,add(hand,[.04,0,0]),.032,[.12,.06,.18],'握柄')}}
if(['cablefly','extension','seatedrow','trxrow'].includes(id))for(let i=0;i<2;i++)rod([i===0?-.5:.5,id==='seatedrow'?.75:1.7,.32],actualHands[i],id==='trxrow'?.012:.005,[.71,.49,.84],id==='trxrow'?'悬挂带':'钢索');
if(id==='leg'){let f=mul(add(feet[0],feet[1]),.5);shape('box',add(f,[0,0,.04]),[.68,.45,.08],[.38,.16,.52],'随动踏板').rot=[-.65,0,0]}
if(id==='legextension'||id==='legcurl')for(const f of feet)shape('cylinder',add(f,[0,.03,0]),[.07,.25,.07],[.24,.09,.34],'随动滚垫',[1,0,0]);
if(id==='hacksquat'){shape('box',add(mul(add(H,S),.5),[0,0,.1]),[.44,.75,.1],[.24,.09,.34],'滑动背垫').rot=[-.35,0,0]}
if(id==='smithsquat')barbell(add(S,[0,.03,.05]));
if(id==='hipabduction'||id==='hipadduction')for(const k of knees)shape('box',add(k,[k[0]<0?-.035:.035,.08,0]),[.08,.24,.18],[.27,.1,.36],'随动腿垫');
if(id==='rollout'){let p=mul(add(actualHands[0],actualHands[1]),.5);shape('cylinder',p,[.13,.09,.13],[.13,.06,.19],'健腹轮',[1,0,0]);rod(add(p,[-.23,0,0]),add(p,[.23,0,0]),.022,[.7,.5,.8],'健腹轮握柄')}
if(id==='battle')for(let i=0;i<2;i++){let pts=[];for(let j=0;j<=24;j++){let t=j/24;pts.push([actualHands[i][0]+(i?1:-1)*.25*t,Math.max(.12,actualHands[i][1]*(1-t)+.10*t+Math.sin(t*14-time/6400*Math.PI*8+i*Math.PI)*.10*(1-t)),actualHands[i][2]-1.1*t])}tube(pts,.018,[.40,.17,.52],'战绳')}
const focus=(['chestpress','pecfly','dbpress','bbpress','cablefly'].includes(id)?'chest':['lat','seatedrow','row','bbrow','trxrow'].includes(id)?'back':['crunch','legraise','rollout'].includes(id)?'core':['raise','machineraise','machineohp','dbohp'].includes(id)?'shoulder':['curl','preachercurl','extension','overheadtri'].includes(id)?'arm':['standingcalf','seatedcalf'].includes(id)?'calf':'leg');
for(const p of parts){p.focus=0;p.pulse=.55+.45*u;if(p.type==='humanTorso')p.focus=focus==='chest'?1:focus==='core'?2:focus==='back'?3:0;if(focus==='arm'&&['humanUpperArm','humanForearm'].includes(p.type))p.focus=4;if(focus==='shoulder'&&p.type==='humanUpperArm')p.focus=5;if(focus==='leg'&&p.type==='humanThigh')p.focus=4;if(focus==='calf'&&p.type==='humanShin')p.focus=4}
return parts;
}
window.MQMovementModels={supported,machines,build,phase,ik};
})();

