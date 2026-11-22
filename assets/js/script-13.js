
/* Generated equipment catalogue illustrations; original content/controls retained. */
const neonEquipmentIds=['treadmill','elliptical','spin','recumbent','erg','stairs','airbike','press','pecdeck','shoulderpress','lateral','pulldown','seatedrow','roman','legpress','legext','pronecurl','seatedcurl','hipout','hipin','hack','standcalf','seatcalf','preacher','curlmachine','tricepsmachine','crunchmachine','captain','dumbbell','barbell','rack','power','smith','cable','bench','kettlebell','medicine','ropes','trx','box','roller','ball','mat','wheel','band'];
const neonEquipmentArt=Object.fromEntries(neonEquipmentIds.map((id,i)=>[id,{sheet:Math.floor(i/9)+1,col:i%3,row:Math.floor(i%9/3)}]));
function neonEquipmentPicture(id,thumbnail=false){
 const entry=neonEquipmentArt[id];if(!entry)throw Error('Missing neon equipment image: '+id);
 const rowBounds=entry.sheet===2?[0,418,795,1254]:entry.sheet===3?[0,414,822,1254]:[0,418,836,1254];
 const x=entry.col*418,y=rowBounds[entry.row],height=rowBounds[entry.row+1]-y;
 return `<svg class="neon-equipment-art ${thumbnail?'neon-equipment-thumb':''}" xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} 418 ${height}" ${thumbnail?'aria-hidden="true"':`role="img" aria-label="${tr(nameFor('equipment',id))}"`} preserveAspectRatio="xMidYMid meet"><image href="${mqEmbeddedAssets['assets/equipment-neon/sheet-'+entry.sheet+'.png']}" width="1254" height="1254"/></svg>`;
}
equipmentImage=function(id){return `<figure class="equipment-picture neon-equipment-picture" data-equipment-image="${id}">${neonEquipmentPicture(id)}<figcaption><span>${tr(nameFor('equipment',id))}</span><small>${tr(T('原创霓虹器械插图 · 非特定品牌或型号','네온 기구 일러스트 · 특정 브랜드·모델 아님','Original neon equipment illustration · No specific brand or model'))}</small></figcaption></figure>`};
const equipmentResultsBeforeNeon=equipmentResults;
equipmentResults=function(arr){
 let html=equipmentResultsBeforeNeon(arr);
 if(!arr.length)return html;
 html=html.replace('<div class="split">','<div class="split neon-equipment-split">');
 // Enrich existing navigation buttons while keeping their original selection action.
 const start=html.indexOf('<div class="item-list">'),end=html.indexOf('</div>',start);
 if(start>=0&&end>start){let list=html.slice(start,end);for(const a of arr){const label=tr(a[1]);list=list.replace('>'+label+'</button>','>'+neonEquipmentPicture(a[0],true)+'<span class="neon-equipment-name">'+label+'</span></button>')}html=html.slice(0,start)+list+html.slice(end)}
 return html;
};
render();

