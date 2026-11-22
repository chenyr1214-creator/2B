
/* Every incoming muscle link synchronizes diagram side, filter and selected region. */
const muscleLinkedPreviousGo=go;
go=function(p,id=null){if(p==='muscle'&&id&&entity('muscle',id)){mapSide=mapSides[id]||'front';lastMapSelection=id;muscleGroup=String(muscleDetails[id].group)}return muscleLinkedPreviousGo(p,id)};
const muscleLinkedPreviousSVG=bodyMapSVG;
bodyMapSVG=function(){let html=muscleLinkedPreviousSVG();const paths=neonMuscleAreas[mapSide]?.[selected];if(!paths)return html;const shape=paths.map(d=>`<path d="${d}"/><path d="${d}" transform="translate(${mapSide==='front'&&['core','quads','adductors'].includes(selected)?348:340} 0) scale(-1 1)"/>`).join('');const glow=`<defs><filter id="muscle-focus-halo" x="-75%" y="-75%" width="250%" height="250%"><feGaussianBlur stdDeviation="${selected==='core'?1.2:selected==='quads'?2:5}"/></filter><filter id="muscle-focus-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${selected==='core'?.35:1.1}"/></filter><linearGradient id="muscle-focus-color" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe8a0"/><stop offset=".5" stop-color="#ff9b7d"/><stop offset="1" stop-color="#ff55a5"/></linearGradient></defs><g class="linked-muscle-light" aria-hidden="true" pointer-events="none"><g class="linked-muscle-halo" filter="url(#muscle-focus-halo)">${shape}</g><g class="linked-muscle-core" filter="url(#muscle-focus-soft)">${shape}</g></g>`;return html.replace('</svg>',glow+'</svg>')};
render();

