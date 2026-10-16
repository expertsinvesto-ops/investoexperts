(()=>{'use strict';
const floating=document.querySelector('.portfolio-droplet'),portal=document.querySelector('#portfolio-portal');if(!floating||!portal)return;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let opening=false,timer=0,scrollFrame=0;
function visibility(){scrollFrame=0;const show=window.scrollY>Math.min(260,window.innerHeight*.35);floating.classList.toggle('is-visible',show);floating.setAttribute('aria-hidden',String(!show));floating.tabIndex=show?0:-1;}
window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(visibility);},{passive:true});window.addEventListener('resize',visibility);visibility();
function reset(){clearTimeout(timer);opening=false;portal.classList.remove('is-opening');portal.hidden=true;portal.setAttribute('aria-hidden','true');visibility();}
window.addEventListener('pageshow',reset);
document.querySelectorAll('a[href="portfolio-xray.html"]').forEach(link=>link.addEventListener('click',event=>{
if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||link.target==='_blank'||reduced.matches)return;
event.preventDefault();if(opening)return;opening=true;
const rect=link.getBoundingClientRect(),x=event.detail?event.clientX:rect.left+rect.width/2,y=event.detail?event.clientY:rect.top+rect.height/2;
portal.style.setProperty('--portal-x',x+'px');portal.style.setProperty('--portal-y',y+'px');portal.style.setProperty('--portal-reach',Math.ceil(Math.hypot(innerWidth,innerHeight))+'px');portal.hidden=false;portal.setAttribute('aria-hidden','false');
// A layout read commits the initial tiny circle before the reveal starts.
portal.getBoundingClientRect();requestAnimationFrame(()=>portal.classList.add('is-opening'));
timer=setTimeout(()=>window.location.assign(link.href),820);
}));
})();
