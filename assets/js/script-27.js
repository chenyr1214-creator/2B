
const mqQuestArtwork={"q1":"assets/images/996a50bbf5af57b0.webp","q2":"assets/images/941cd85d41eb76f8.webp","q3":"assets/images/bf725f3ac621a82c.webp","q4":"assets/images/f95581f909e42472.webp","q5":"assets/images/bf725f3ac621a82c.webp","q6":"assets/images/bf725f3ac621a82c.webp","q7":"assets/images/2df0bcc757695184.webp","q8":"assets/images/783eb960a3450b50.webp","q9":"assets/images/2ec4381fb64faf31.webp","q10":"assets/images/10cd8330087d996f.webp"};
const mqQuestBeforeScenic=questPage;
questPage=function(){
 const items=questV2.filter(q=>(!questSelection||questSelection.includes(q.id))&&(questFilter==='all'||questFilter==='active'&&state.quests[q.id]==='active'||questFilter==='done'&&state.quests[q.id]==='done'||questFilter==='off'&&q.off||questFilter==='on'&&!q.off));
 let index=0;
 const html=mqQuestBeforeScenic().replace(/<article class="detail">([\s\S]*?)<\/article>/g,(whole,body)=>{const q=items[index++];if(!q)return whole;return `<article class="detail mq-quest-card" data-quest-card="${q.id}"><div class="mq-quest-copy">${body}</div><figure class="mq-quest-art" aria-hidden="true"><img src="${mqQuestArtwork[q.id]}" alt="" loading="lazy" decoding="async"></figure></article>`;});
 return `<section class="mq-quest-scenic">${html}</section>`;
};
render();
