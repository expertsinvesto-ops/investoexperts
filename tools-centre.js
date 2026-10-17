(function(){'use strict';const root=document.querySelector('.tools-centre');if(!root)return;const frame=document.getElementById('tc-portfolio-frame'),notes=root.querySelector('.tc-calculator-notes');
const names={portfolio:'portfolio',score:'score',health:'score',sip:'sip',swp:'sip',goal:'goal',retirement:'retirement'};
function update(){const selected=root.querySelector('[role=tab][aria-selected=true]');if(!selected)return;const id=selected.id.replace('tool-tab-','');notes.hidden=id==='portfolio';}
root.querySelectorAll('[role=tab]').forEach(tab=>tab.addEventListener('click',()=>{const name=tab.id.replace('tool-tab-','');history.replaceState(null,'','#'+name);update();}));
root.querySelector('.tc-index').addEventListener('keydown',()=>requestAnimationFrame(update));
function fromHash(){const key=location.hash.slice(1),id=names[key];if(id){document.getElementById('tool-tab-'+id).click();if(key==='swp')root.querySelector('[data-wealth-mode=swp]').click();}update();}
window.addEventListener('hashchange',fromHash);fromHash();
window.addEventListener('message',event=>{if(event.source!==frame.contentWindow||event.origin!==location.origin)return;const data=event.data;if(data&&data.type==='investo-portfolio-height'&&Number.isFinite(data.height)){frame.style.height=Math.max(420,Math.min(100000,data.height))+'px';}});
})();
