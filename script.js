
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const menu = $('.menu');
const navlinks = $('.navlinks');
if(menu) menu.addEventListener('click',()=>navlinks.classList.toggle('open'));

$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = $(a.getAttribute('href'));
    if(target){e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); navlinks?.classList.remove('open');}
  });
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

const hotspots = $$('.hotspot');
const featureTitle = $('#feature-title');
const featureText = $('#feature-text');
const featureData = {
  track:{title:'BLE Track Card Module',text:'The concept uses Bluetooth Low Energy to help a connected smartphone identify the wallet’s last known location.'},
  buzzer:{title:'Mini Buzzer',text:'A small buzzer can produce a sound alert to help the user locate the wallet when it is nearby.'},
  battery:{title:'Rechargeable Battery',text:'The presentation proposes a compact rechargeable Li-Po battery for the tracking module.'},
  shell:{title:'Slim Outer Shell',text:'The wallet keeps a familiar everyday form while housing the tracking components inside.'}
};
hotspots.forEach(h=>h.addEventListener('click',()=>{
  hotspots.forEach(x=>x.classList.remove('active'));h.classList.add('active');
  const d=featureData[h.dataset.feature]; if(featureTitle)featureTitle.textContent=d.title;if(featureText)featureText.textContent=d.text;
}));

const people = $('#people');
const total = $('#total');
const calc = ()=>{
  const n=Number(people?.value||1), price=Number(total?.dataset.price||96);
  if(total){ total.textContent = 'RM ' + (n*price).toLocaleString('en-MY',{minimumFractionDigits:2});}
};
people?.addEventListener('input',calc); calc();

const demoBtn=$('#demoBtn'), modal=$('#demoModal'), close=$('#closeModal');
demoBtn?.addEventListener('click',()=>modal.classList.add('open'));
close?.addEventListener('click',()=>modal.classList.remove('open'));
modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});

const locateBtn=$('#locateBtn'), toast=$('.toast');
locateBtn?.addEventListener('click',()=>{
  locateBtn.textContent='SCANNING…';
  setTimeout(()=>{
    locateBtn.textContent='FOUND WALLET';
    if(toast){toast.textContent='TrackCard found nearby • Buzzer activated';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3200);}
  },1200);
});

const year=$('#year'); if(year) year.textContent=new Date().getFullYear();
