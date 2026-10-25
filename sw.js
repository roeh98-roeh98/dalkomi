// 달콤이 영어단어 - 오프라인 저장 (앱을 고치면 VER 숫자를 올리세요)
const VER='dalkomi-v11',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
const AUDIO=Array.from({length:30},(_,i)=>'audio/d'+String(i+1).padStart(2,'0')+'.mp3');
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil((async()=>{const c=await caches.open(VER);await c.addAll(SHELL);for(const u of AUDIO){try{await c.add(u)}catch(_){}}})())});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==VER)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith((async()=>{const c=await caches.open(VER),hit=await c.match(r,{ignoreSearch:true});
const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>null);
return hit||(await net)||new Response('offline',{status:503})})())});
