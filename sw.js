// FoxDz service worker: الشبكة أولاً، والكاش كاحتياط (باش التحديثات توصل مباشرة)
const V = "foxdz-v2";
const SHELL = ["./", "index.html", "chat.html", "admin.html", "style.css", "common.js", "privacy.html", "logo.svg", "icon-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return; // Firebase وغيره ما نمسوهمش
  e.respondWith(
    fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match("index.html")))
  );
});
