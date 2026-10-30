/* Menu overlay + scroll reveal */
(function(){
  document.documentElement.classList.add('js');
  var b=document.querySelector('.menu-btn'),m=document.querySelector('.menu');
  if(b&&m){var c=m.querySelector('.menu-close');
    function set(o){m.classList.toggle('open',o);m.setAttribute('aria-hidden',!o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
    b.onclick=function(){set(true)};c.onclick=function(){set(false)};
    m.querySelectorAll('a').forEach(function(a){a.onclick=function(){set(false)}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});}
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
/* Lightbox for the project gallery (#gallery figure buttons). */
(function(){
  var g=document.getElementById('gallery');if(!g)return;
  var figs=[].slice.call(g.querySelectorAll('figure'));
  var items=figs.map(function(f){var c=f.querySelector('figcaption');return{src:f.querySelector('img').src,cap:c?c.textContent:''}});
  var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
  lb.innerHTML='<img alt=""><div class="cap"></div><button class="close" aria-label="Close">&times;</button><button class="prev" aria-label="Previous">&#8249;</button><button class="next" aria-label="Next">&#8250;</button><div class="count"></div>';
  document.body.appendChild(lb);
  var im=lb.querySelector('img'),cap=lb.querySelector('.cap'),cnt=lb.querySelector('.count'),i=0,multi=items.length>1;
  lb.querySelector('.prev').style.display=lb.querySelector('.next').style.display=multi?'':'none';
  function show(n){i=(n+items.length)%items.length;im.src=items[i].src;cap.textContent=items[i].cap;cnt.textContent=(i+1)+' / '+items.length}
  function open(n){show(n);lb.classList.add('open');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('open');document.body.style.overflow=''}
  figs.forEach(function(f,n){f.querySelector('button').addEventListener('click',function(){open(n)})});
  lb.querySelector('.close').onclick=close;
  lb.querySelector('.prev').onclick=function(e){e.stopPropagation();show(i-1)};
  lb.querySelector('.next').onclick=function(e){e.stopPropagation();show(i+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
  var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40)show(i+(dx<0?1:-1))});
})();
