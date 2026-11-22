
const mqMotionFrames={"climb":{"count":8,"frames":["assets/images/b6337949075cc8de.webp","assets/images/e66b8570232cf16c.webp","assets/images/f67a0735d53b17bc.webp","assets/images/2b7fcdd70f71fd9f.webp","assets/images/fe2a1adc9b465f7b.webp","assets/images/5762bdc1ff5db10c.webp","assets/images/78131bf0207ff50e.webp","assets/images/ed20755b980be5e0.webp"]},"hike":{"count":4,"frames":["assets/images/19fed99207d8c565.webp","assets/images/def90b4918178775.webp","assets/images/b81f8f9bec802bc5.webp","assets/images/8eb0c137ecdb3484.webp"]},"swim":{"count":3,"frames":["assets/images/eb348bad6fa8b80c.webp","assets/images/9f7f577d03075e4b.webp","assets/images/4c316e1ac3c581fd.webp"]},"cycle":{"count":6,"frames":["assets/images/48c6a4fcbe8f5035.webp","assets/images/75705ca0fc944717.webp","assets/images/97730b53572517f6.webp","assets/images/95e32ea3c9736f96.webp","assets/images/154176924301b8e4.webp","assets/images/48c69b9b4c8708c8.webp"]},"run":{"count":3,"frames":["assets/images/0c480e6ecc287468.webp","assets/images/014a3d3e614c8751.webp","assets/images/c6d4b06586c3d29b.webp"]},"tennis":{"count":6,"frames":["assets/images/d2b7eaaffb204253.webp","assets/images/523a05c7a8d9c6dc.webp","assets/images/2f66568784b343e3.webp","assets/images/65927f715bc93672.webp","assets/images/bf86c0c9909f043d.webp","assets/images/cb75445d88f00e77.webp"]},"badminton":{"count":6,"frames":["assets/images/2a0f3e6b992b0cce.webp","assets/images/6c77ef086e55bd4b.webp","assets/images/ad28bca2395ffb8b.webp","assets/images/6c39906973062ec6.webp","assets/images/f13526db7f5ffe77.webp","assets/images/d2373749bb740cb3.webp"]},"yoga":{"count":4,"frames":["assets/images/88a8c879815ddbe4.webp","assets/images/8fa32b00afa8a0e7.webp","assets/images/ddcc1561f9542f8f.webp","assets/images/74aaa8d1f7c88b2e.webp"]},"pilates":{"count":4,"frames":["assets/images/fa6d55873b7cd3e1.webp","assets/images/edabce67874e35b2.webp","assets/images/15d065088b25c2bd.webp","assets/images/920cfd2253867ca3.webp"]},"boxing":{"count":4,"frames":["assets/images/d465e97f481d64bd.webp","assets/images/4067f65a05cad427.webp","assets/images/fe1d53b8050656f0.webp","assets/images/cce205909566e48d.webp"]}};
const mqDemoPanelOriginal=sportInteractionPanel;
function mqMotionIndex(id){const b=mqMotionFrames[id];return Math.floor(sportPlayer(id).time/900)%b.count;}
sportInteractionPanel=function(id){let html=mqDemoPanelOriginal(id);const b=mqMotionFrames[id];if(!b||!sportPlayer(id).open)return html;const i=mqMotionIndex(id);
 const frame=`<div class="mq-demo-freezeframe" id="mq-sport-demo-frame" data-mq-motion="${id}"><img src="${b.frames[i]}" alt="${esc(tr(entity('sport',id)[2]))}" style="width:100%;height:100%;left:0;top:0"></div>`;
 return html.replace(/<svg\b[\s\S]*?<\/svg>/,frame);
};
const mqOriginalFrameUpdate=updateSportPlayer;
updateSportPlayer=function(time){
 if(page!=='sport'||!selected||!validSport(selected))return;
 const id=selected,b=mqMotionFrames[id];if(!b)return mqOriginalFrameUpdate(time);
 const player=sportPlayer(id),frame=document.querySelector('#mq-sport-demo-frame');if(!player.open||!frame)return;
 if(player.last!==null&&player.playing)player.time+=Math.max(0,Math.min(100,time-player.last));player.last=time;
 const img=frame.querySelector('img');if(img){const i=mqMotionIndex(id);if(img.dataset.frame!==String(i)){img.src=b.frames[i];img.dataset.frame=String(i);}}
 sportPlayerFrame=requestAnimationFrame(updateSportPlayer);
};
render();
