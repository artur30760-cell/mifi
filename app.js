(function(){
/* Фон: звёзды и светящиеся частицы + туман */
var c=document.createElement('canvas');c.id='stars';document.body.prepend(c);
var f=document.createElement('div');f.className='fog';document.body.prepend(f);
var x=c.getContext('2d'),W,H,P=[];
function size(){W=c.width=innerWidth;H=c.height=innerHeight;P=[];for(var i=0;i<130;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.7+.3,v:Math.random()*.25+.05,p:Math.random()*6.28,g:Math.random()<.25})}
size();addEventListener('resize',size);
(function loop(t){x.clearRect(0,0,W,H);P.forEach(function(p){p.y-=p.v;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}
var a=.4+.6*Math.abs(Math.sin(t/1200+p.p));x.beginPath();x.arc(p.x,p.y,p.r*(p.g?1.8:1),0,6.28);
x.fillStyle=p.g?'rgba(224,184,99,'+a*.8+')':'rgba(200,180,255,'+a+')';x.shadowBlur=p.g?14:6;x.shadowColor=p.g?'#e0b863':'#8b5cf6';x.fill()});requestAnimationFrame(loop)})(0);

/* Картинки карточек: рисуются кодом (SVG). Можно заменить на <img> — см. комментарий в index.html */
function art(el){var h=+el.dataset.hue||270,g=el.dataset.glyph||'✦',s='';
for(var i=0;i<40;i++){s+='<circle cx="'+(i*97%400)+'" cy="'+(i*53%240)+'" r="'+(.5+i%3*.6)+'" fill="#fff" opacity="'+(.3+i%4*.15)+'"/>'}
var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"><defs><radialGradient id="g" cx="50%" cy="55%" r="70%"><stop offset="0" stop-color="hsl('+h+',70%,45%)"/><stop offset="1" stop-color="#0a0616"/></radialGradient></defs><rect width="400" height="240" fill="url(#g)"/>'+s+'<circle cx="200" cy="120" r="62" fill="none" stroke="#e0b863" stroke-opacity=".6" stroke-width="1.5"/><text x="200" y="146" font-size="72" text-anchor="middle" fill="#fff1c1" style="filter:drop-shadow(0 0 10px #e0b863)">'+g+'</text></svg>';
el.style.backgroundImage='url("data:image/svg+xml;utf8,'+encodeURIComponent(svg)+'")'}
document.querySelectorAll('.art[data-glyph]').forEach(art);

/* Прокрутка к мифам */
document.addEventListener('click',function(e){var b=e.target.closest('[data-scroll]');if(b){e.preventDefault();var t=document.getElementById(b.dataset.scroll);if(t)t.scrollIntoView({behavior:'smooth'})}});

/* Модальное окно с мифом */
var m=document.getElementById('modal');
if(m){var box=m.querySelector('.modal-content');
function close(){m.classList.remove('open');document.body.classList.remove('lock')}
document.addEventListener('click',function(e){var r=e.target.closest('.read');if(r){var card=r.closest('.card');
box.innerHTML='<span class="culture">'+card.querySelector('.culture').textContent+'</span><h3>'+card.querySelector('h3').textContent+'</h3>'+card.querySelector('.full').innerHTML+'<p class="author">'+card.querySelector('.author').textContent+'</p>';
m.classList.add('open');document.body.classList.add('lock')}
if(e.target===m||e.target.closest('.close'))close()});
addEventListener('keydown',function(e){if(e.key==='Escape')close()})}

/* Форма контактов (без сервера — только красивый ответ) */
var form=document.getElementById('contact-form');
if(form)form.addEventListener('submit',function(e){e.preventDefault();form.style.display='none';document.querySelector('.thanks').style.display='block'});
})();
