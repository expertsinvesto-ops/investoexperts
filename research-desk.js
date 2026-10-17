/* Progressive enhancement: articles and navigation remain available without JS. */
(function(){
  'use strict';
  var library=document.getElementById('research-library');
  if(library){
    var search=document.getElementById('rd-search'),buttons=Array.from(library.querySelectorAll('[data-rd-filter]')),cards=Array.from(library.querySelectorAll('[data-rd-category]')),active='all';
    var normalise=function(text){return text.toLocaleLowerCase().normalize('NFKC').trim();};
    function update(){
      var terms=normalise(search.value).split(/\s+/).filter(Boolean),count=0;
      cards.forEach(function(card){var text=normalise(card.dataset.rdSearch||'');var match=(active==='all'||card.dataset.rdCategory===active)&&terms.every(function(term){return text.includes(term);});card.hidden=!match;if(match)count++;});
      buttons.forEach(function(button){button.setAttribute('aria-pressed',String(button.dataset.rdFilter===active));});
      document.getElementById('rd-result-count').textContent=count+' '+(count===1?'article':'articles')+' · newest first';
      document.getElementById('rd-empty').hidden=count!==0;
    }
    buttons.forEach(function(button){button.addEventListener('click',function(){active=button.dataset.rdFilter;update();});});
    document.querySelectorAll('[data-rd-topic]').forEach(function(link){link.addEventListener('click',function(){active=link.dataset.rdTopic;search.value='';update();});});
    search.addEventListener('input',update);
    document.getElementById('rd-reset').addEventListener('click',function(){active='all';search.value='';update();search.focus();});
    update();
  }
  document.querySelectorAll('.rd-print').forEach(function(button){button.addEventListener('click',function(){window.print();});});
  document.querySelectorAll('.rd-copy').forEach(function(button){button.addEventListener('click',async function(){var status=button.parentElement.querySelector('.rd-copy-status');try{await navigator.clipboard.writeText(window.location.href.split('#')[0]);status.textContent='Article link copied.';}catch(e){status.textContent='Copy the article link from your browser’s address bar.';}});});
})();
