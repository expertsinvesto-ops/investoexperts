/* Presentation only: calculator formulas and tab controls remain in index.html. */
(()=>{'use strict';const section=document.querySelector('.tools-section.ft-premium');if(!section)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)');let inView=false;
function motion(){section.classList.toggle('ft-animation-running',inView&&!document.hidden&&!reduced.matches);}
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;motion();},{rootMargin:'100px 0px'});observer.observe(section);}
document.addEventListener('visibilitychange',motion);if(reduced.addEventListener)reduced.addEventListener('change',motion);
section.querySelectorAll('.score-result').forEach(result=>{new MutationObserver(()=>{if(getComputedStyle(result).display==='none')return;result.classList.remove('ft-result-reveal');requestAnimationFrame(()=>{result.getBoundingClientRect();result.classList.add('ft-result-reveal');});}).observe(result,{attributes:true,attributeFilter:['style']});});
})();
