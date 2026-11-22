
/* Smooth anatomical contour meshes, built as continuous ring surfaces. */
(function(){
const definitions={
 humanTorso:[[-1,.66,.80],[-.8,.70,.84],[-.48,.74,.83],[-.18,.84,.87],[.16,1.02,.93],[.42,1.12,1],[.64,1.04,.91],[.78,.80,.77],[.9,.34,.50],[1,.28,.46]],
 humanPelvis:[[-1,.48,.66],[-.8,.73,.82],[-.45,.93,.98],[0,1,1],[.45,.96,.92],[.8,.81,.83],[1,.71,.79]],
 humanUpperArm:[[-.5,.72,.75],[-.43,.88,.88],[-.27,1.05,1.03],[-.08,1.14,1.10],[.15,1.07,1.02],[.34,.94,.91],[.5,.78,.79]],
 humanForearm:[[-.5,.60,.67],[-.32,.65,.75],[-.05,.79,.90],[.16,1,1.05],[.36,1.04,1.02],[.5,.87,.88]],
 humanThigh:[[-.5,.62,.72],[-.35,.73,.82],[-.13,.93,1.03],[.12,1.10,1.14],[.34,1.13,1.13],[.5,.98,1.00]],
 humanShin:[[-.5,.47,.54],[-.37,.50,.59],[-.17,.60,.72],[.04,.87,1.04],[.23,1.06,1.14],[.39,.98,1.01],[.5,.72,.76]],
 humanHead:[[-1,.27,.47],[-.89,.47,.62],[-.68,.65,.73],[-.43,.81,.82],[-.18,.91,.88],[.1,.94,.94],[.42,.92,1],[.70,.79,.91],[.9,.52,.66],[1,.12,.16]],
 humanHand:[[-1,.28,.47],[-.78,.58,.58],[-.48,.83,.63],[-.12,.93,.65],[.18,.89,.58],[.40,.76,.49],[.55,.62,.42]],
 humanFoot:[[-1,.55,.65],[-.7,.81,.93],[-.35,.97,1],[.1,1,.94],[.55,.91,.84],[.85,.66,.66],[1,.14,.25]]
};
function mesh(type){let rows=definitions[type];if(!rows)return null;let vertices=[],n=64;const controlRows=rows;const sampled=[];for(let k=0;k<=72;k++){const y=controlRows[0][0]+(controlRows[controlRows.length-1][0]-controlRows[0][0])*k/72;let i=0;while(i<controlRows.length-2&&controlRows[i+1][0]<y)i++;const t=(y-controlRows[i][0])/(controlRows[i+1][0]-controlRows[i][0]);const val=c=>{const a=controlRows[Math.max(0,i-1)][c],b=controlRows[i][c],c1=controlRows[i+1][c],d=controlRows[Math.min(controlRows.length-1,i+2)][c];return Math.max(.05,.5*((2*b)+(-a+c1)*t+(2*a-5*b+4*c1-d)*t*t+(-a+3*b-3*c1+d)*t*t*t))};sampled.push([y,val(1),val(2)])}rows=sampled;const subtract=(a,b)=>a.map((v,i)=>v-b[i]);
 function tri(a,b,c,na,nb,nc){vertices.push(...a,...na,...b,...nb,...c,...nc)}
 function point(i,j){let [y,rx,rz]=rows[Math.max(0,Math.min(rows.length-1,i))],a=Math.PI*2*j/n,x=rx*Math.cos(a),z=rz*Math.sin(a);const gauss=(v,c,w)=>Math.exp(-Math.pow((v-c)/w,2));const front=Math.pow(Math.max(0,-Math.sin(a)),4),rear=Math.pow(Math.max(0,Math.sin(a)),4);if(type==='humanTorso'){
 const pec=(gauss(x,-.45,.32)+gauss(x,.45,.32))*gauss(y,.40,.25);
 const abs=(gauss(x,-.28,.19)+gauss(x,.28,.19))*(gauss(y,-.04,.105)+gauss(y,-.29,.105)+gauss(y,-.53,.10));
 z-=front*(.31*pec+.14*abs+.07*gauss(Math.abs(x),.68,.22)*gauss(y,-.30,.43));
 z+=rear*(.13*gauss(Math.abs(x),.55,.36)*gauss(y,.18,.50)-.045*gauss(x,0,.09));
 }
 if(type==='humanUpperArm'){z-=front*.12*gauss(y,-.05,.22);z+=rear*.10*gauss(y,.05,.25)}
 if(type==='humanThigh'){z-=front*(.12*gauss(x,-.35,.35)+.10*gauss(x,.35,.35))*gauss(y,.04,.30)}
 if(type==='humanShin'){z+=rear*.13*gauss(y,.10,.24)}
 if(type==='humanPelvis'){z+=rear*.14*(gauss(x,-.42,.35)+gauss(x,.42,.35))*gauss(y,-.15,.55)}
 if(type==='humanHead'){
  // Jaw, cheekbones, brow, nose bridge and nose tip are sculpted into one mesh.
  const face=Math.pow(Math.max(0,-Math.sin(a)),14),nose=Math.exp(-Math.pow((y+.23)/.19,2));z-=face*(.28*nose+.055*Math.exp(-Math.pow((y-.03)/.10,2)));
  z+=face*.06*Math.exp(-Math.pow((y+.04)/.06,2));
 z+=face*.08*(gauss(x,-.40,.19)+gauss(x,.40,.19))*gauss(y,-.02,.12);z-=face*.055*gauss(y,-.48,.05);z-=face*.035*gauss(y,-.68,.15);
 }return[x,y,z]}
 function normal(i,j){let p0=point(i,j-1),p1=point(i,j+1),p2=point(Math.max(0,i-1),j),p3=point(Math.min(rows.length-1,i+1),j),u=subtract(p1,p0),v=subtract(p3,p2),r=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],l=Math.hypot(...r)||1;return r.map(x=>-x/l)}
 for(let i=0;i<rows.length-1;i++)for(let j=0;j<n;j++){let a=point(i,j),b=point(i,j+1),c=point(i+1,j+1),d=point(i+1,j),na=normal(i,j),nb=normal(i,j+1),nc=normal(i+1,j+1),nd=normal(i+1,j);tri(a,b,c,na,nb,nc);tri(a,c,d,na,nc,nd)}
 for(const [i,sign]of [[0,-1],[rows.length-1,1]])for(let j=0;j<n;j++)tri([0,rows[i][0],0],point(i,j),point(i,j+1),[0,sign,0],[0,sign,0],[0,sign,0]);
 if(type==='humanHand'){
  // Four individually tapered fingers, rounded at their tips, attached to palm.
  const finger=(cx,base,length,width,z=0)=>{const rings=[[base,width,.30],[base+length*.5,width*.91,.26],[base+length*.88,width*.72,.21],[base+length,width*.1,.05]];for(let k=0;k<rings.length-1;k++)for(let j=0;j<12;j++){const p=(r,t)=>[cx+r[1]*Math.cos(t),r[0],z+r[2]*Math.sin(t)];let a=j*Math.PI/6,b=(j+1)*Math.PI/6,na=[Math.cos(a),0,Math.sin(a)],nb=[Math.cos(b),0,Math.sin(b)];tri(p(rings[k],a),p(rings[k],b),p(rings[k+1],b),na,nb,nb);tri(p(rings[k],a),p(rings[k+1],b),p(rings[k+1],a),na,nb,na)}};
  finger(-.57,.3,.90,.18);finger(-.17,.4,1.03,.18);finger(.22,.38,.95,.17);finger(.57,.3,.74,.14);finger(-.91,-.15,.65,.22,.03);
 }
 if(['humanForearm','humanThigh','humanShin'].includes(type)){for(let i=0;i<vertices.length;i+=6){vertices[i+1]*=-1;vertices[i+4]*=-1}}
 return new Float32Array(vertices)
}
window.MQHumanGeometry={mesh,types:Object.keys(definitions)};
})();

