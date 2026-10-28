/* About page progressive motion. No content is hidden by default. */
(() => {
'use strict';
const root=document.querySelector('.ap-about');if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)'),connection=navigator.connection;
const activeCounts=new Map();
function finishCounters(){for(const [element,animation]of activeCounts){cancelAnimationFrame(animation.frame);element.textContent=Number(element.dataset.apCount).toLocaleString('en-IN');}activeCounts.clear();}
function preferences(){if(reduced.matches||connection?.saveData){root.classList.add('ap-static');root.querySelectorAll('.ap-reveal').forEach(e=>e.classList.add('ap-no-motion'));finishCounters();}}
function pause(){root.classList.toggle('ap-paused',document.hidden);if(document.hidden)finishCounters();}
function count(element){if(root.classList.contains('ap-static'))return;const target=Number(element.dataset.apCount);if(!Number.isFinite(target))return;let start;const animation={frame:0};activeCounts.set(element,animation);function tick(now){if(start===undefined)start=now;const progress=Math.min(1,(now-start)/900),value=Math.round(target*(1-(1-progress)**3));element.textContent=value.toLocaleString('en-IN');if(progress<1)animation.frame=requestAnimationFrame(tick);else{element.textContent=target.toLocaleString('en-IN');activeCounts.delete(element);}}animation.frame=requestAnimationFrame(tick);}
preferences();pause();root.classList.add('ap-enhanced');
if(typeof IntersectionObserver==='function'){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;entry.target.classList.add('ap-entered');entry.target.querySelectorAll('[data-ap-count]').forEach(count);observer.unobserve(entry.target);}},{threshold:.1});root.querySelectorAll('.ap-reveal').forEach(e=>observer.observe(e));}
if(reduced.addEventListener)reduced.addEventListener('change',preferences);if(connection?.addEventListener)connection.addEventListener('change',preferences);document.addEventListener('visibilitychange',pause);
let pending,frame=0;root.querySelectorAll('.ap-light').forEach(panel=>{panel.addEventListener('pointermove',event=>{if(!fine.matches||root.classList.contains('ap-static')||event.pointerType==='touch')return;const rect=panel.getBoundingClientRect();pending={panel,x:Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100)),y:Math.max(0,Math.min(100,(event.clientY-rect.top)/rect.height*100))};if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(!pending)return;pending.panel.style.setProperty('--ap-x',pending.x+'%');pending.panel.style.setProperty('--ap-y',pending.y+'%');pending=null;});},{passive:true});panel.addEventListener('pointerleave',()=>{if(pending?.panel===panel)pending=null;panel.style.removeProperty('--ap-x');panel.style.removeProperty('--ap-y');},{passive:true});});
})();
