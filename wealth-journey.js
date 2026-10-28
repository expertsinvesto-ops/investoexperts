/* Progressive decoration: no dependencies, no hidden content, one entrance only. */
(() => {
  'use strict';
  const root=document.querySelector('#stories.wealth-journey');
  if(!root)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=navigator.connection;
  function pause(){root.classList.toggle('wj-paused',document.hidden);}
  function disable(){if(reduced.matches||connection?.saveData)root.classList.add('wj-static');}
  disable();pause();
  if(typeof IntersectionObserver==='function'&&!root.classList.contains('wj-static')){
    const observer=new IntersectionObserver(entries=>{
      if(!entries.some(entry=>entry.isIntersecting))return;
      root.classList.add('wj-entered');observer.disconnect();
    },{threshold:.08});
    observer.observe(root);
  }
  if(reduced.addEventListener)reduced.addEventListener('change',disable);
  if(connection?.addEventListener)connection.addEventListener('change',disable);
  document.addEventListener('visibilitychange',pause);
})();
