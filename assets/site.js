'use strict';
const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#primary-nav');
if (menu && navigation) {
 const close = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
 menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
 document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
 navigation.addEventListener('click', event => { if (event.target.closest('a')) close(); });
}
const form = document.querySelector('#contact-form');
if (form) {
 const topic = new URLSearchParams(location.search).get('topic');
 if (topic && Array.from(form.elements.topic.options).some(option => option.value === topic)) form.elements.topic.value = topic;
 form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `BridgePoint enquiry: ${data.get('topic')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || 'Not specified'}\nArea: ${data.get('topic')}\n\n${data.get('message')}`;
  document.querySelector('#email-draft').value = `To: bridgepoint@gmail.com\nSubject: ${subject}\n\n${body}`;
  document.querySelector('#email-fallback').hidden = false;
  document.querySelector('#form-status').textContent = 'Your draft is ready. Send it from your email application, or use the draft below.';
  location.href = `mailto:bridgepoint@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 });
}

// Motion stays optional, and never takes control of native scrolling.
const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let userPaused = false;
let motionPaused = reducedMotion.matches;
const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
 root.classList.add('motion-ready');
 const reveals = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveals.unobserve(entry.target); } });
 }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
 revealItems.forEach(item => reveals.observe(item));
}
let scrollFrame = 0;
function updateScroll() {
 scrollFrame = 0;
 const y = window.scrollY;
 const max = Math.max(1, root.scrollHeight - window.innerHeight);
 root.style.setProperty('--scroll', String(Math.min(1, y / max)));
 root.style.setProperty('--hero-shift', `${Math.min(45, y * 0.07)}px`);
 document.querySelector('.header')?.classList.toggle('scrolled', y > 20);
}
window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, { passive: true });
window.addEventListener('resize', updateScroll, { passive: true });
updateScroll();
const canvas = document.querySelector('#connection-globe');
const ctx = canvas?.getContext('2d');
let width = 0, height = 0, animationFrame = 0, lastFrame = 0, phase = 0, globeVisible = true;
function drawGlobe() {
 if (!ctx || !width || !height) return;
 const cx = width * .5, cy = height * .49, radius = Math.min(width, height) * .32;
 ctx.clearRect(0, 0, width, height);
 const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.7);
 halo.addColorStop(0, '#b0925035'); halo.addColorStop(.55, '#9a875615'); halo.addColorStop(1, '#9a875600');
 ctx.fillStyle = halo; ctx.fillRect(0, 0, width, height);
 const rotation = phase * .12;
 const project = (x,y,z) => {
  const rx = x * Math.cos(rotation) + z * Math.sin(rotation);
  const rz = -x * Math.sin(rotation) + z * Math.cos(rotation);
  return [cx + rx * radius, cy + y * radius, rz];
 };
 // Latitude and longitude lines reveal the form without a stock illustration.
 for (let meridian=0; meridian<12; meridian++) {
  const a = meridian * Math.PI / 6;
  for (let step=0; step<64; step++) {
   const t = step / 64 * Math.PI * 2, t2 = (step+1)/64*Math.PI*2;
   const p = project(Math.cos(t)*Math.cos(a),Math.sin(t),Math.cos(t)*Math.sin(a));
   const q = project(Math.cos(t2)*Math.cos(a),Math.sin(t2),Math.cos(t2)*Math.sin(a));
   ctx.strokeStyle = `rgba(211,178,119,${p[2]>0?.23:.045})`;ctx.lineWidth=.7;
   ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();
  }
 }
 for(let lat=-3;lat<=3;lat++) {
  const y=Math.sin(lat*Math.PI/9), ring=Math.cos(lat*Math.PI/9);
  for(let step=0;step<64;step++) {
   const a=step/64*Math.PI*2,b=(step+1)/64*Math.PI*2;
   const p=project(ring*Math.cos(a),y,ring*Math.sin(a)),q=project(ring*Math.cos(b),y,ring*Math.sin(b));
   ctx.strokeStyle=`rgba(183,197,164,${p[2]>0?.16:.035})`;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();
  }
 }
 for(let i=0;i<135;i++) {
  const y=1-2*(i+.5)/135, r=Math.sqrt(1-y*y), a=i*2.39996323;
  const p=project(r*Math.cos(a),y,r*Math.sin(a));
  if(p[2]<-.2) continue;
  ctx.fillStyle=`rgba(233,206,158,${.25+Math.max(0,p[2])*.5})`;ctx.beginPath();ctx.arc(p[0],p[1],i%13===0?2.5:1.1,0,Math.PI*2);ctx.fill();
 }
 // A sweeping bridge is the signature motif of the brand.
 const gold=ctx.createLinearGradient(cx-radius,cy,cx+radius,cy);
 gold.addColorStop(0,'#9d7a3d00');gold.addColorStop(.3,'#e0bc77');gold.addColorStop(.7,'#f3dbac');gold.addColorStop(1,'#a68d5200');
 ctx.strokeStyle=gold;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(cx-radius*1.25,cy+radius*.68);ctx.bezierCurveTo(cx-radius*.5,cy-radius*.95,cx+radius*.4,cy-radius*.95,cx+radius*1.25,cy+radius*.68);ctx.stroke();
 ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(cx-radius*1.25,cy+radius*.68);ctx.lineTo(cx+radius*1.25,cy+radius*.68);ctx.stroke();
}
function animateGlobe(timestamp) {
 animationFrame=0;
 if(motionPaused || !globeVisible || document.hidden) return;
 if(timestamp-lastFrame>32) { phase+=Math.min(64,timestamp-lastFrame)/1000;lastFrame=timestamp;drawGlobe(); }
 animationFrame=requestAnimationFrame(animateGlobe);
}
function syncMotion() {
 motionPaused=userPaused || reducedMotion.matches;
 root.classList.toggle('motion-paused',motionPaused);
 if(motionButton) { motionButton.setAttribute('aria-pressed',String(motionPaused));motionButton.setAttribute('aria-label',motionPaused?'Resume motion effects':'Pause motion effects');motionButton.querySelector('span').textContent=motionPaused?'Resume motion':'Pause motion'; }
 if(animationFrame) cancelAnimationFrame(animationFrame);
 animationFrame=0;lastFrame=performance.now();
 if(ctx && !motionPaused && globeVisible && !document.hidden) animationFrame=requestAnimationFrame(animateGlobe);
 else drawGlobe();
}
function resizeGlobe() {
 if(!ctx) return;
 const bounds=canvas.getBoundingClientRect();width=bounds.width;height=bounds.height;
 const dpr=Math.min(window.devicePixelRatio||1,1.5);
 canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);drawGlobe();
}
if(ctx) {
 resizeGlobe();
 if('ResizeObserver' in window) new ResizeObserver(resizeGlobe).observe(canvas);
 else window.addEventListener('resize',resizeGlobe);
 if('IntersectionObserver' in window) new IntersectionObserver(entries=>{globeVisible=entries[0].isIntersecting;syncMotion();}).observe(canvas);
}
motionButton?.addEventListener('click',()=>{userPaused=!userPaused;syncMotion();});
reducedMotion.addEventListener('change',syncMotion);
document.addEventListener('visibilitychange',syncMotion);
syncMotion();
