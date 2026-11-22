
/* Hit areas follow the generated muscle fibers. Paths remain invisible. */
const neonMuscleAreas={
 front:{
  shoulder:['M125 93 Q109 92 105 109 L103 132 Q114 122 126 119 L137 104Z'],
  chest:['M132 98 Q149 93 169 103 L169 134 Q146 140 126 119Z'],
  biceps:['M105 128 Q116 125 125 122 L119 149 Q113 167 101 174 L99 154Z'],
  forearms:['M99 169 L111 175 Q101 200 84 219 L72 226 L75 214Z'],
  core:[
   'M172 134 Q163 134 156 140 Q153 145 156 152 Q164 155 172 151Z',
   'M172 155 Q164 157 156 155 Q155 164 159 171 L172 171Z',
   'M172 174 L159 174 Q158 182 161 189 L172 189Z',
   'M172 192 L161 192 Q163 209 172 218Z'
  ],
  quads:[
   'M145 216 Q151 220 156 232 Q159 251 151 277 L145 290 Q140 278 140 260 Q138 238 145 216Z',
   'M140 216 Q131 231 128 251 Q126 273 135 291 L140 297 Q137 276 137 257 Q136 236 140 216Z',
   'M161 244 Q167 263 164 281 L157 300 Q151 300 149 291 Q157 272 161 244Z'
  ],
  adductors:['M160 221 Q165 229 171 232 L168 252 Q165 269 160 282 L157 288 Q160 268 157 249 L153 232Z']
 },
 back:{
  shoulder:['M125 93 Q110 92 105 110 L103 130 Q115 123 126 117 L137 105Z'],
  upperback:['M161 78 L169 88 L169 141 L151 129 L131 107 L138 98 L150 94Z'],
  back:['M128 116 L145 132 L164 145 L155 191 L143 201 L132 165Z'],
  triceps:['M105 128 L121 124 L118 152 L108 174 L99 168 L99 150Z'],
  forearms:['M100 173 L111 176 L94 207 L82 223 L71 228 L78 210Z'],
  lowerback:['M157 172 L169 180 L169 219 L150 219 L146 205Z'],
  abductors:['M140 211 Q128 213 125 232 L130 249 L142 238 L148 220Z'],
  glutes:['M145 218 Q157 211 169 220 L169 245 Q151 259 132 246 L130 233Z'],
  hamstrings:['M133 251 Q150 261 164 250 L159 286 L151 310 L137 311 L130 282Z'],
  calves:['M141 321 Q150 312 158 323 L155 355 L146 392 L137 373 L134 345Z']
 }
};
/* Visual replacement only: region data and selection handlers remain original. */
bodyMapSVG=function(){
 const shapes=mapShapes[mapSide];
 return `<svg class="regional-body neon-anatomy-body" viewBox="0 0 340 500" role="group" aria-label="${tr(T('人体肌肉区域位置示意','인체 근육 영역 위치 도식','Human muscle region location diagram'))}"><defs><clipPath id="neon-body-frame"><rect width="340" height="500" rx="14"/></clipPath></defs><g clip-path="url(#neon-body-frame)"><image href="assets/images/59213b6e67ad4a02.webp" x="${mapSide==='front'?0:-340}" y="0" width="680" height="500" preserveAspectRatio="xMidYMid meet"/></g><g class="neon-muscle-hit-areas">${Object.entries(shapes).map(([id,paths])=>`<g class="region-shape ${selected===id?'region-active':''}" role="button" tabindex="0" aria-label="${tr(nameFor('muscle',id))}" aria-pressed="${selected===id}" onclick="selectMapRegion('${id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectMapRegion('${id}')}"><title>${tr(nameFor('muscle',id))}</title>${(neonMuscleAreas[mapSide][id]||paths).map(d=>`<path d="${d}"/><path d="${d}" transform="translate(${mapSide==='front'&&['core','quads','adductors'].includes(id)?348:340} 0) scale(-1 1)"/>`).join('')}</g>`).join('')}</g></svg>`;
};
render();

