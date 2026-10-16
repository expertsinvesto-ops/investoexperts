/* Locally rendered motion graphics: no video download, autoplay dependency or market feed. */
(()=>{'use strict';const canvas=document.getElementById('investo-motion');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');const toggle=document.getElementById('hero-motion-toggle');let paused=reduce.matches,visible=true,frame=0,w=0,h=0,t=0,last=0;
function size(){const r=canvas.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw();}
function line(points,color,width=1){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
function draw(){if(!w||!h)return;ctx.clearRect(0,0,w,h);const s=w/650;ctx.save();ctx.scale(s,s);const H=h/s;
 const bg=ctx.createLinearGradient(0,0,650,H);bg.addColorStop(0,'#17222c');bg.addColorStop(.5,'#30291f');bg.addColorStop(1,'#131b22');ctx.fillStyle=bg;ctx.fillRect(0,0,650,H);
 const glow=ctx.createRadialGradient(430,115,5,430,115,280);glow.addColorStop(0,'rgba(200,151,58,.2)');glow.addColorStop(1,'rgba(200,151,58,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,650,H);
 // Perspective trading floor.
 for(let i=0;i<14;i++){const x=i*64-100+(t*8)%64;line([[325+(x-325)*.25,80],[x,H]],'rgba(226,181,96,.07)');}
 for(let j=0;j<8;j++){const y=110+j*j*8;line([[0,y],[650,y]],'rgba(226,181,96,.07)');}
 // Rotating wire globe: abstract global markets, intentionally illustrative.
 const cx=450,cy=145,R=110,angle=t*.12;
 for(let lat=-60;lat<=60;lat+=30){const a=lat*Math.PI/180,rad=R*Math.cos(a),yy=cy+R*Math.sin(a)*.78;const pts=[];for(let j=0;j<=64;j++){const q=j/64*Math.PI*2;pts.push([cx+rad*Math.cos(q),yy+rad*Math.sin(q)*.23]);}line(pts,'rgba(226,181,96,.24)');}
 for(let lon=0;lon<8;lon++){const pts=[];for(let j=0;j<=64;j++){const a=-Math.PI/2+j/64*Math.PI;const q=angle+lon*Math.PI/4;pts.push([cx+R*Math.cos(a)*Math.sin(q),cy+R*Math.sin(a)*.82+R*Math.cos(a)*Math.cos(q)*.18]);}line(pts,'rgba(226,181,96,.26)');}
 ctx.strokeStyle='rgba(226,181,96,.35)';ctx.beginPath();ctx.ellipse(cx,cy,R,R*.84,0,0,Math.PI*2);ctx.stroke();
 // Candlesticks gently evolve in a continuous, non-numeric scene.
 for(let i=0;i<19;i++){const x=36+i*31,base=235-i*5.2;const wave=Math.sin(i*1.7+t*.55)*9;const bullish=i%4!==0;const len=13+(Math.sin(i*4.3)+1)*10;const y=base+wave;const color=bullish?'#d9b36a':'#b75d68';line([[x,y-12],[x,y+len+13]],color,1.2);ctx.fillStyle=color;ctx.globalAlpha=.75;ctx.fillRect(x-4,y,8,len);ctx.globalAlpha=1;}
 const trend=[];for(let x=20;x<=620;x+=4){const y=280-x*.25+Math.sin(x*.022+t*.25)*11;trend.push([x,y]);}line(trend,'rgba(226,181,96,.22)',7);line(trend,'#e2b560',1.8);
 const px=20+((t*30)%600),py=280-px*.25+Math.sin(px*.022+t*.25)*11;const pulse=ctx.createRadialGradient(px,py,0,px,py,13);pulse.addColorStop(0,'#fff6d8');pulse.addColorStop(.25,'rgba(226,181,96,.8)');pulse.addColorStop(1,'rgba(226,181,96,0)');ctx.fillStyle=pulse;ctx.fillRect(px-13,py-13,26,26);
 for(let i=0;i<25;i++){const x=(i*97.3+t*(3+i%3))%650,y=40+(i*67.1)%240;ctx.fillStyle=`rgba(245,225,183,${.15+(Math.sin(t+i)+1)*.13})`;ctx.beginPath();ctx.arc(x,y,i%4===0?1.6:.8,0,Math.PI*2);ctx.fill();}
 ctx.restore();}
function animate(now){frame=0;if(paused||!visible||document.hidden)return;const delta=last?Math.min((now-last)/1000,.05):0;last=now;t+=delta;draw();frame=requestAnimationFrame(animate);}
function start(){last=0;if(!frame&&!paused&&visible&&!document.hidden)frame=requestAnimationFrame(animate);}
function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
function label(){if(!toggle)return;toggle.textContent=paused?'▶':'Ⅱ';toggle.setAttribute('aria-label',paused?'Play finance animation':'Pause finance animation');toggle.setAttribute('aria-pressed',String(paused));}
toggle?.addEventListener('click',()=>{paused=!paused;label();if(paused)stop();else start();});
reduce.addEventListener('change',()=>{paused=reduce.matches;label();if(paused)stop();else start();});
new ResizeObserver(size).observe(canvas);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop();}).observe(canvas);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start();});label();size();start();
})();
