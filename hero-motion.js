/* Pause the hero video when offscreen or hidden; respect reduced motion. */
(()=>{const video=document.querySelector('.hero-art');if(!video)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;let userPaused=false;let internalPause=false;
function update(){if(reduce.matches||document.hidden||!visible){if(!video.paused){internalPause=true;video.pause();}}else if(!userPaused){video.play().catch(()=>{});}}
video.addEventListener('pause',()=>{if(internalPause)internalPause=false;else userPaused=true;});video.addEventListener('play',()=>{userPaused=false;});
new IntersectionObserver(e=>{visible=e[0].isIntersecting;update();}).observe(video);document.addEventListener('visibilitychange',update);reduce.addEventListener('change',update);if(reduce.matches){video.removeAttribute('autoplay');video.pause();}update();})();
