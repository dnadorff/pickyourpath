// Pick Your Path offline cache. Build 675e0068
const CACHE='pickyourpath-675e0068';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-512-maskable.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;})
 .catch(()=>r.mode==='navigate'?caches.match('./index.html'):new Response('',{status:504}))));});
