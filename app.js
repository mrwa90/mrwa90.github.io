'use strict';
(function () {
const $app = document.getElementById('app');
const BILDER = window.BILDER || {};

/* ================= Reisen: Grunddaten ================= */
const BUILTIN_ID = 'wab2026';
const KAT_GRUPPE = { 'Sehenswürdigkeit': 'Sehenswürdigkeiten', Essen: 'Essen und Trinken', Reserve: 'Reserve – wenn noch Zeit bleibt', Ausflug: 'Ausflug', Anreise: 'Ankunft und Unterkunft' };
const PLACE_CATS = Object.keys(KAT_GRUPPE);
const PLACE_CAT_ICON = { 'Sehenswürdigkeit': '🏛️', Essen: '🍽️', Reserve: '⭐', Ausflug: '🚆', Anreise: '🧳' };
const placeCatOf = g => g.startsWith('Sehensw') ? 'Sehenswürdigkeit' : g.startsWith('Essen') ? 'Essen' : g.startsWith('Reserve') ? 'Reserve' : g.startsWith('Ausflug') ? 'Ausflug' : 'Anreise';
const placeCat = p => p.kategorie || placeCatOf(p.gruppe || '');
const PALETTE = [['#0b7f86', '#13b5a8'], ['#0a79a0', '#18aecb'], ['#0f9a7a', '#3fcf9f'], ['#087f9b', '#2fc5d9'], ['#0d8c6b', '#5ad1a6'], ['#136f8a', '#33a9c9'], ['#0e7490', '#22b8cf']];
const KATS = ['Essen', 'Eintritt', 'Transport', 'Shopping', 'Sonstiges'];
const KAT_ICON = { Essen: '🍽️', Eintritt: '🎟️', Transport: '🚇', Shopping: '🛍️', Sonstiges: '✨' };
const PACK_DEFAULT = {
  'Dokumente & Geld': ['Personalausweis / Reisepass', 'Tickets (Zug / Flug)', 'Buchungsbestätigungen', 'Krankenversicherungskarte', 'Kreditkarte / EC-Karte', 'Etwas Bargeld'],
  'Technik': ['Handy', 'Ladekabel', 'Powerbank', 'Kopfhörer'],
  'Kleidung': ['Jacke', 'Regenjacke / Schirm', 'Bequeme Schuhe', 'Pullover', 'Schlafsachen'],
  'Pflege & Gesundheit': ['Zahnbürste & Zahnpasta', 'Duschzeug (Reisegröße)', 'Medikamente', 'Pflaster', 'Sonnenbrille']
};
const WAB_PACK = {
  'Dokumente & Geld': ['Personalausweis / Reisepass', 'Zugtickets Nachtzug', 'Flugtickets / Bordkarten', 'Buchungsbestätigungen', 'Krankenversicherungskarte', 'Kreditkarte / EC-Karte', 'Etwas Bargeld (Euro)'],
  'Technik': ['Handy', 'Ladekabel', 'Powerbank', 'Kopfhörer'],
  'Kleidung (November!)': ['Warme Jacke', 'Regenjacke / Schirm', 'Bequeme Schuhe', 'Pullover', 'Schal / Mütze', 'Schlafsachen'],
  'Pflege & Gesundheit': ['Zahnbürste & Zahnpasta', 'Duschzeug (Reisegröße)', 'Medikamente', 'Pflaster', 'Sonnenbrille'],
  'Nachtzug': ['Ohrstöpsel', 'Schlafmaske', 'Snacks & Wasser', 'Hausschuhe / Socken']
};
function builtinTrip(ov) {
  ov = ov || {};
  const CITY = {
    Wien: { von: '2026-11-13', bis: '2026-11-16', hero: 4, center: [48.2082, 16.3738], unterkunftId: 2 },
    Athen: { von: '2026-11-17', bis: '2026-11-20', hero: 37, center: [37.9755, 23.7348], unterkunftId: 36 },
    Barcelona: { von: '2026-11-21', bis: '2026-11-28', hero: 61, center: [41.3874, 2.1686], unterkunftId: 60 }
  };
  return {
    id: BUILTIN_ID, builtin: true, name: 'Wien · Athen · Barcelona', start: '2026-11-13', end: '2026-11-28',
    cities: (window.STAEDTE || []).map(c => Object.assign({}, c, CITY[c.id])),
    orte: (window.ORTE || []).map(p => Object.assign({}, p, { kategorie: placeCatOf(p.gruppe) })).concat(ov.extraOrte || []),
    infos: window.INFOS || {},
    sprachfuehrer: (window.SPRACHFUEHRER || {})[BUILTIN_ID] || null,
    plan: [
      { id: 'zug', icon: '🚆', titel: 'Nachtzug Berlin → Wien', datum: 'Fr, 13.11.2026 (Ankunft Sa, 14.11., Wien Hbf)', ort: 'Wien Hauptbahnhof, Am Hauptbahnhof 1, 1100 Wien' },
      { id: 'hotelwien', icon: '🏨', titel: 'Hotel Wien – B&B Hotel Wien St. Marx', datum: '14.–17.11.2026', ort: 'Litfaßstraße 2, 1030 Wien' },
      { id: 'flug1', icon: '✈️', titel: 'Flug Wien → Athen', datum: 'Di, 17.11.2026', ort: 'Flughafen Wien-Schwechat' },
      { id: 'airbnb', icon: '🏠', titel: 'Airbnb Athen', datum: '17.–21.11.2026', ort: 'Kekropos 14, Athen' },
      { id: 'flug2', icon: '✈️', titel: 'Flug Athen → Barcelona', datum: 'Sa, 21.11.2026', ort: 'Flughafen Athen Eleftherios Venizelos' },
      { id: 'bcn', icon: '🏠', titel: 'Unterkunft Barcelona', datum: '21.–28.11.2026', ort: "Carrer d'Aragó 399, Barcelona" },
      { id: 'flug3', icon: '✈️', titel: 'Rückflug Barcelona → Berlin (BER)', datum: 'Sa, 28.11.2026', ort: 'Flughafen Barcelona-El Prat', hinweis: 'Terminal T1 oder T2 vorher in Buchung/Airline-App prüfen – die Terminals liegen ca. 4 km auseinander (Aerobús A1 = T1, A2 = T2).' },
      { id: 'heim', icon: '🏡', titel: 'Flughafen BER → Zuhause', datum: 'Sa, 28.11.2026', ort: 'Flughafen BER Terminal 1-2', hinweis: 'Bahnhof unter dem Terminal: FEX, RE/RB oder S9/S45 – Ticket Berlin ABC (Deutschlandticket gilt).' }
    ].concat(ov.extraPlan || []),
    anreise: (window.ANREISE || {})[BUILTIN_ID] || null,
    tage: { '2026-11-13': 'Anreise · Nachtzug nach Wien', '2026-11-17': 'Wien → Athen', '2026-11-21': 'Athen → Barcelona', '2026-11-28': 'Abreise' },
    packDefault: WAB_PACK
  };
}

/* ================= aktuelle Reise ================= */
let T = null, CITIES = [], PLACES = [], cityById = {}, placeById = {}, DAYS = [], INFOS = {};
let trips = [];          // alle Reisen (zusammengeführt)
const imgCache = {};     // placeId -> objectURL (importierte Titelbilder)
function daysBetween(a, b) { const out = []; if (!a || !b) return out; const d = new Date(a + 'T12:00:00'), e = new Date(b + 'T12:00:00'); let n = 0; while (d <= e && n++ < 400) { out.push(localDay(d)); d.setDate(d.getDate() + 1); } return out; }
function setTrip(t) {
  T = t; CITIES = t.cities || []; PLACES = t.orte || []; INFOS = t.infos || {};
  cityById = Object.fromEntries(CITIES.map(c => [c.id, c])); placeById = Object.fromEntries(PLACES.map(p => [String(p.id), p]));
  DAYS = daysBetween(t.start, t.end);
}
const P = id => placeById[String(id)];
const pid = s => /^\d+$/.test(String(s)) ? +s : String(s);
const cityForDay = d => { const s = CITIES.filter(c => c.von).sort((a, b) => a.von.localeCompare(b.von)); let r = s[0] || CITIES[0]; s.forEach(c => { if (c.von <= d) r = c; }); return r ? r.id : null; };
const dayTitle = d => (T.tage && T.tage[d]) || (cityById[cityForDay(d)] || {}).name || '';
const diaryKey = d => T.builtin ? d : T.id + ':' + d;
const dayPhotoKey = d => T.builtin ? 'tag:' + d : 'tag:' + T.id + ':' + d;
const kvKey = k => T.builtin ? k : k + ':' + T.id;
const tripExpenses = () => expenses.filter(e => (e.reise || BUILTIN_ID) === T.id);
const cityHero = c => c.hero != null ? c.hero : (PLACES.find(p => p.stadt === c.id && imgSrc(p.id)) || {}).id;
// Unterkunft der Stadt (eingebaute Reise: feste Orte, eigene Reisen: automatisch angelegter Unterkunfts-Ort)
const homeOf = cid => {
  const c = cityById[cid]; if (!c) return null;
  if (c.unterkunftId != null && P(c.unterkunftId)) return P(c.unterkunftId);
  return PLACES.find(p => p.stadt === cid && String(p.id).endsWith('-u-' + cid)) || null;
};
const anreiseOf = cid => T.anreise && T.anreise[cid] ? T.anreise[cid] : null;
const todayStr = () => localDay(Date.now());
const todayCity = () => { const t = todayStr(); return cityForDay(t < T.start ? T.start : t > T.end ? T.end : t); };
const tripStatus = t => { const d = todayStr(); return d < t.start ? 'bald' : d > t.end ? 'vorbei' : 'jetzt'; };

/* ================= IndexedDB ================= */
let db = null;
function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('reisebuechlein', 3);
    r.onupgradeneeded = () => {
      const d = r.result;
      if (!d.objectStoreNames.contains('state')) d.createObjectStore('state', { keyPath: 'id' });
      if (!d.objectStoreNames.contains('photos')) d.createObjectStore('photos', { keyPath: 'pid', autoIncrement: true }).createIndex('byPlace', 'id');
      if (!d.objectStoreNames.contains('kv')) d.createObjectStore('kv', { keyPath: 'k' });
      if (!d.objectStoreNames.contains('expenses')) d.createObjectStore('expenses', { keyPath: 'eid', autoIncrement: true });
      if (!d.objectStoreNames.contains('diary')) d.createObjectStore('diary', { keyPath: 'date' });
      if (!d.objectStoreNames.contains('trips')) d.createObjectStore('trips', { keyPath: 'id' });
    };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
const store = (n, m = 'readonly') => db.transaction(n, m).objectStore(n);
const rq = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
const state = {}, photoCount = {}, kv = {}, diary = {}; let expenses = [], tripRecords = [];
const isOwnPhotoKey = k => !(typeof k === 'string' && (k.startsWith('img:') || k.startsWith('cover:')));
async function loadAll() {
  (await rq(store('state').getAll())).forEach(s => state[s.id] = s);
  (await rq(store('photos').getAll())).forEach(p => photoCount[p.id] = (photoCount[p.id] || 0) + 1);
  (await rq(store('kv').getAll())).forEach(x => kv[x.k] = x.v);
  expenses = await rq(store('expenses').getAll());
  (await rq(store('diary').getAll())).forEach(x => diary[x.date] = x);
  tripRecords = await rq(store('trips').getAll());
  buildTrips();
}
function buildTrips() {
  const ov = tripRecords.find(r => r.id === BUILTIN_ID);
  trips = [builtinTrip(ov)].concat(tripRecords.filter(r => r.id !== BUILTIN_ID));
}
async function saveTripRecord(rec) {
  await rq(store('trips', 'readwrite').put(rec));
  tripRecords = tripRecords.filter(r => r.id !== rec.id).concat([rec]);
  const cur = T && T.id; buildTrips();
  if (cur) setTrip(trips.find(t => t.id === cur) || trips[0]);
}
const overlay = () => Object.assign({ id: BUILTIN_ID, extraOrte: [], extraPlan: [] }, tripRecords.find(r => r.id === BUILTIN_ID));
async function saveState(id, patch) {
  const s = Object.assign({ id, done: false, doneAt: null, note: '', fav: false }, state[id], patch);
  state[id] = s; await rq(store('state', 'readwrite').put(s)); return s;
}
async function kvSet(k, v) { kv[k] = v; await rq(store('kv', 'readwrite').put({ k, v })); }
const getPhotos = id => rq(store('photos').index('byPlace').getAll(id));
async function addPhoto(id, blob, ts) { await rq(store('photos', 'readwrite').add({ id, blob, ts: ts || Date.now() })); photoCount[id] = (photoCount[id] || 0) + 1; }
async function delPhoto(pidv, id) { await rq(store('photos', 'readwrite').delete(pidv)); photoCount[id] = Math.max(0, (photoCount[id] || 1) - 1); }
async function saveDiary(key, text) { const e = { date: key, text, updated: new Date().toISOString() }; diary[key] = e; await rq(store('diary', 'readwrite').put(e)); }
async function addExpense(e) { e.eid = await rq(store('expenses', 'readwrite').add(e)); expenses.push(e); }
async function delExpense(eid) { await rq(store('expenses', 'readwrite').delete(eid)); expenses = expenses.filter(x => x.eid !== eid); }
async function loadTripImages(t) {
  for (const p of t.orte || []) {
    if (typeof p.id === 'number' || imgCache[p.id] !== undefined) continue;
    const l = await getPhotos('img:' + p.id);
    imgCache[p.id] = l.length ? URL.createObjectURL(l[l.length - 1].blob) : null;
  }
  if (imgCache['cover:' + t.id] === undefined) { const l = await getPhotos('cover:' + t.id); imgCache['cover:' + t.id] = l.length ? URL.createObjectURL(l[l.length - 1].blob) : null; }
}

/* ================= Helfer ================= */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
const isDone = id => !!(state[id] && state[id].done);
const isFav = id => !!(state[id] && state[id].fav);
const cityPlaces = c => PLACES.filter(p => p.stadt === c);
const progressOf = list => { const d = list.filter(p => isDone(p.id)).length; return { d, n: list.length, pct: list.length ? Math.round(100 * d / list.length) : 0 }; };
const progress = c => progressOf(cityPlaces(c));
const fmtDate = iso => iso ? new Date(iso).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' }) + ' Uhr' : '';
const fmtDay = d => new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
const fmtDayLong = d => new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtShort = d => d ? new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric', year: 'numeric' }) : '';
const fmtRange = (a, b) => a && b ? `${fmtShort(a).replace(/\d{4}$/, a.slice(0, 4) === b.slice(0, 4) ? '' : a.slice(0, 4))}–${fmtShort(b)}` : '';
const localDay = dt => { const x = new Date(dt); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const euro = n => (Math.round(n * 100) / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
const mapsUrl = p => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.name + ', ' + p.adresse + (cityById[p.stadt] && !p.adresse.includes(cityById[p.stadt].name) ? ', ' + cityById[p.stadt].name : ''));
const navUrl = p => p.lat ? `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}&travelmode=walking` : mapsUrl(p);
const imgSrc = id => (typeof id === 'number' && BILDER[id]) ? 'images/' + id + '.jpg' : (imgCache[id] || null);
const colorVars = c => c ? `--c:${c.farbe};--c2:${c.farbe2}` : '';
function toast(m, ms) { const t = document.getElementById('toast'); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, ms || 2600); }
const $ = (s, r = $app) => r.querySelector(s);
const slug = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';
const ICON_BACK = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
const ICON_MIC = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
const ICON_HEART = '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.3-9.3C1.5 8 3.6 4.5 7.1 4.5c2 0 3.6 1.1 4.9 2.8 1.3-1.7 2.9-2.8 4.9-2.8 3.5 0 5.6 3.5 4.4 6.7-1.8 4.7-9.3 9.3-9.3 9.3z"/></svg>';
const back = (to, label) => `<button class="backbtn" data-go="${to}">${ICON_BACK}${esc(label)}</button>`;
function setTab(t) { document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.tab === t)); }
function setAccent(c) { const r = document.documentElement.style; r.setProperty('--c', c ? c.farbe : '#0a8f93'); r.setProperty('--c2', c ? c.farbe2 : '#19c4b3'); }
function bannerBg(id) { const s = id != null ? imgSrc(id) : null; return s ? `style="background-image:linear-gradient(180deg,rgba(0,40,45,.15),rgba(0,40,45,.8)),url('${s}');background-size:cover;background-position:center"` : ''; }
function field(id, value, ph, opts = {}) {
  const tag = opts.area ? `<textarea id="${id}" placeholder="${esc(ph)}">${esc(value)}</textarea>`
    : `<input id="${id}" type="${opts.type || 'text'}" ${opts.inputmode ? `inputmode="${opts.inputmode}"` : ''} value="${esc(value)}" placeholder="${esc(ph)}" autocomplete="off">`;
  return `<div class="field ${opts.area ? 'area' : ''}">${tag}${opts.nomic ? '' : `<button class="mic" type="button" data-mic="${id}" data-mode="${opts.mode || ''}" aria-label="Spracheingabe">${ICON_MIC}</button>`}</div>`;
}
function autosave(el, fn, msgEl) {
  let t; const go = async () => { await fn(el.value); if (msgEl) msgEl.textContent = 'Gespeichert ✓'; };
  el.addEventListener('input', () => { if (msgEl) msgEl.textContent = '…'; clearTimeout(t); t = setTimeout(go, 500); });
  el.addEventListener('blur', () => { clearTimeout(t); go(); });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
// Koordinaten über OpenStreetMap (Nominatim) – braucht Internet
async function geocode(q) {
  const r = await fetch('https://nominatim.openstreetmap.org/search?' + new URLSearchParams({ q, format: 'jsonv2', limit: '1', 'accept-language': 'de' }), { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error('Dienst nicht erreichbar');
  const j = await r.json(); return j.length ? [+(+j[0].lat).toFixed(6), +(+j[0].lon).toFixed(6)] : null;
}

/* ================= Meine Reisen ================= */
function tripCover(t) {
  if (imgCache['cover:' + t.id]) return imgCache['cover:' + t.id];
  if (t.builtin) return 'images/37.jpg';
  const p = (t.orte || []).find(x => imgCache[x.id]); return p ? imgCache[p.id] : null;
}
async function viewTrips() {
  setAccent(null); setTab('reisen');
  for (const t of trips) await loadTripImages(t);
  const ord = { jetzt: 0, bald: 1, vorbei: 2 };
  const sorted = trips.slice().sort((a, b) => ord[tripStatus(a)] - ord[tripStatus(b)] || (tripStatus(a) === 'vorbei' ? b.start.localeCompare(a.start) : a.start.localeCompare(b.start)));
  const card = t => {
    const pr = progressOf(t.orte || []), s = tripCover(t), st = tripStatus(t);
    const bg = s ? `background-image:linear-gradient(135deg,#0a8f93cc,#19c4b366),url('${s}');background-size:cover;background-position:center;` : '';
    return `<div class="tripcard ${st}"><a class="citycard" href="#/oeffnen/${esc(t.id)}" style="--c:#0a8f93;--c2:#19c4b3;${bg}">
      <span class="tstatus">${st === 'jetzt' ? '● Gerade unterwegs' : st === 'bald' ? 'Geplant' : 'Archiv'}</span>
      <h3>${esc(t.name)}</h3><div class="dates">${fmtRange(t.start, t.end)} · ${(t.cities || []).length} ${(t.cities || []).length === 1 ? 'Stadt' : 'Städte'}</div>
      <div class="count"><span>${pr.d} von ${pr.n} Orten</span><span>${pr.pct} %</span></div><div class="pbar"><span style="width:${pr.pct}%"></span></div></a>
      ${st === 'vorbei' ? `<a class="btn ghost small" href="#/oeffnen/${esc(t.id)}/rueckblick">✨ Rückblick ansehen</a>` : ''}</div>`;
  };
  const act = sorted.filter(t => tripStatus(t) !== 'vorbei'), old = sorted.filter(t => tripStatus(t) === 'vorbei');
  $app.innerHTML = `<div class="view"><header class="banner big"><div class="eyebrow">Reisebüchlein</div><h1>Meine Reisen</h1><div class="sub">${trips.length} ${trips.length === 1 ? 'Reise' : 'Reisen'} · alles offline auf dem Handy</div></header>
    <div class="cities stagger">${act.map(card).join('') || '<p class="empty">Keine geplante Reise. Legt unten eine neue an.</p>'}</div>
    <div class="content">
      <div class="row2" style="margin-top:6px"><a class="btn" href="#/neu">➕ Neue Reise</a><button class="btn ghost" id="tripimp">📥 Reise importieren</button></div>
      <input type="file" id="ftripimp" accept=".json,application/json" hidden>
      <p class="small">Import: eine Reise-Datei nach der Vorlage <b>reise-vorlage.json</b> (z. B. von Claude erstellt).</p>
      ${old.length ? `<h3 class="group">Archiv</h3><div class="cities" style="padding:0">${old.map(card).join('')}</div>` : ''}
    </div></div>`;
  $('#tripimp').onclick = () => $('#ftripimp').click();
  $('#ftripimp').onchange = async e => { const f = e.target.files[0]; e.target.value = ''; if (f) importTripFile(f); };
}
async function openTrip(id, sub) {
  const t = trips.find(x => x.id === id); if (!t) { location.hash = '#/'; return; }
  setTrip(t); await kvSet('currentTrip', id); await loadTripImages(t);
  location.replace('#/' + (sub || 'reise'));
}

/* ================= Reise-Übersicht ================= */
function viewTrip() {
  setAccent(null); setTab('reise');
  const pr = progressOf(PLACES), total = tripExpenses().reduce((a, e) => a + e.betrag, 0);
  const pack = packList(), packDone = pack.filter(x => x.done).length;
  const diaryN = DAYS.filter(d => diary[diaryKey(d)] && diary[diaryKey(d)].text).length;
  const nFav = PLACES.filter(p => isFav(p.id)).length;
  const cards = CITIES.map(c => {
    const cp = progress(c.id), s = imgSrc(cityHero(c));
    const bg = s ? `background-image:linear-gradient(135deg,${c.farbe}cc,${c.farbe2}66),url('${s}');background-size:cover;background-position:center;` : '';
    return `<a class="citycard" href="#/stadt/${esc(c.id)}" style="${colorVars(c)};${bg}"><h3>${esc(c.name)}</h3><div class="dates">${esc(c.datum || fmtRange(c.von, c.bis))}</div>
      <div class="count"><span>${cp.d} von ${cp.n} Orten</span><span>${cp.pct} %</span></div><div class="pbar"><span style="width:${cp.pct}%"></span></div></a>`;
  }).join('');
  const hasLang = T.sprachfuehrer || Object.values(INFOS).some(i => i.sprachen && i.sprachen.length);
  $app.innerHTML = `<div class="view"><header class="banner big">
    <div class="bannerrow">${back('#/reisen', 'Meine Reisen')}${T.builtin ? '' : `<a class="pillbtn" href="#/bearbeiten">✏️ Bearbeiten</a>`}</div>
    <div class="eyebrow" style="margin-top:14px">${fmtRange(T.start, T.end)} · ${DAYS.length} Tage</div><h1>${esc(T.name)}</h1>
    <div class="ring"><div class="num">${pr.d}</div><div class="lbl">von ${pr.n} Orten besucht<div class="pbar" style="width:200px"><span style="width:${pr.pct}%"></span></div></div></div></header>
    <div class="quick stagger">
      <a href="#/naehe"><span>📍</span>In der Nähe</a>
      <a href="#/favoriten"><span>♥</span>Favoriten${nFav ? ` (${nFav})` : ''}</a>
      <a href="#/besucht"><span>✓</span>Besucht</a>
      <a href="#/sprache"><span>🗣️</span>Sprache</a>
    </div>
    <div class="cities stagger">${cards || '<p class="empty">Noch keine Städte – über „Bearbeiten“ hinzufügen.</p>'}</div>
    <div class="content"><a class="btn ghost" href="#/ort-neu">➕ Eigenen Ort hinzufügen</a></div>
    <div class="tiles stagger" style="padding-top:4px">
      <a class="tile" href="#/plan"><span class="ti">🗓️</span><b>Reiseplan</b><small>Fahrten, Flüge, Unterkünfte</small></a>
      <a class="tile" href="#/packliste"><span class="ti">🧳</span><b>Packliste</b><small>${packDone} von ${pack.length} gepackt</small></a>
      <a class="tile" href="#/ausgaben"><span class="ti">💶</span><b>Ausgaben</b><small>${euro(total)} bisher</small></a>
      <a class="tile" href="#/tagebuch"><span class="ti">📖</span><b>Tagebuch</b><small>${diaryN} von ${DAYS.length} Tagen</small></a>
      <a class="tile wide" href="#/rueckblick"><span class="ti">✨</span><b>Rückblick</b><small>Die ganze Reise auf einen Blick</small></a>
    </div>
    <div class="content"><h3 class="group">Infos pro Stadt</h3><div class="list">${CITIES.map(c => `<a class="item linkitem" style="${colorVars(c)}" href="#/info/${esc(c.id)}"><span class="thumb ph"></span><span class="tx"><span class="nm">${esc(c.name)}</span><span class="ad">Notruf, Tickets, Trinkgeld${hasLang ? ', Sprache' : ''}</span></span><span class="chev">›</span></a>`).join('')}</div></div></div>`;
}

/* ================= Stadt ================= */
const cityFilter = {};
function viewCity(id) {
  const c = cityById[id]; if (!c) return viewTrip();
  setAccent(c); setTab('reise');
  const pr = progress(id), groups = [];
  cityPlaces(id).forEach(p => { const gn = p.gruppe || KAT_GRUPPE[placeCat(p)]; let g = groups.find(x => x.n === gn); if (!g) groups.push(g = { n: gn, l: [] }); g.l.push(p); });
  const f = cityFilter[T.id + id] || '';
  const favs = cityPlaces(id).filter(p => isFav(p.id));
  const chips = `<button class="chip ${f === '' ? 'on' : ''}" data-chip="">Alle</button><button class="chip ${f === 'fav' ? 'on' : ''}" data-chip="fav">♥ Favoriten</button>` +
    groups.map((g, i) => `<button class="chip ${f === String(i) ? 'on' : ''}" data-chip="${i}">${esc(g.n.replace('Sehenswürdigkeiten – ', ''))}</button>`).join('');
  let body;
  if (f === 'fav') body = favs.length ? `<div class="list">${favs.map(p => itemHtml(p)).join('')}</div>` : '<p class="empty">Noch keine Favoriten. Tippt bei einem Ort auf das Herz.</p>';
  else {
    const shown = groups.map((g, i) => ({ g, i })).filter(x => f === '' || String(x.i) === f);
    const anr = anreiseOf(id);
    body = (f === '' && favs.length ? `<h3 class="group">♥ Eure Favoriten</h3><div class="list">${favs.map(p => itemHtml(p)).join('')}</div>` : '') +
      shown.map(x => `<h3 class="group">${esc(x.g.n)}</h3>${anr && x.g.l.some(p => placeCat(p) === 'Anreise') ? `<a class="item linkitem anreiselink" href="#/anreise/${encodeURIComponent(id)}" style="margin-bottom:10px"><span class="thumb ph">🧭</span><span class="tx"><span class="nm">Anreise & Abreise Schritt für Schritt</span><span class="ad">Flughäfen, Bahnhöfe, Wege zur Unterkunft, Tickets, Empfehlung</span></span><span class="chev">›</span></a>` : ''}<div class="list">${x.g.l.map(p => itemHtml(p)).join('')}</div>`).join('') ||
      '<p class="empty">Hier gibt es noch keine Orte.</p>';
  }
  $app.innerHTML = `<div class="view"><header class="banner" ${bannerBg(cityHero(c))}>
    <div class="bannerrow">${back('#/reise', T.name.length > 18 ? 'Reise' : T.name)}<a class="pillbtn" href="#/info/${esc(id)}">ℹ️ Infos</a></div>
    <h1>${esc(c.name)}</h1><div class="sub">${esc(c.datum || fmtRange(c.von, c.bis))}</div>
    <div class="pbar"><span style="width:${pr.pct}%"></span></div><div class="sub" id="citycount" style="margin-top:6px">${pr.d} von ${pr.n} Orten besucht</div></header>
    <div class="quick quick2 stagger">
      ${homeOf(id) ? `<a href="#/karte/${encodeURIComponent(id)}/home"><span>🏠</span>Zur Unterkunft</a>` : ''}
      ${anreiseOf(id) ? `<a href="#/anreise/${encodeURIComponent(id)}"><span>🧭</span>Anreise & Abreise</a>` : ''}
      <a href="#/karte/${encodeURIComponent(id)}"><span>🗺️</span>Karte</a>
      <a href="#/info/${encodeURIComponent(id)}"><span>🗣️</span>Infos & Sprache</a>
    </div>
    ${c.intro ? `<div class="content"><div class="cardbox"><p class="desc" style="font-size:.97rem">${esc(c.intro)}</p></div></div>` : ''}
    <div class="chips">${chips}</div>
    <div class="content">${body}<a class="btn ghost" href="#/ort-neu/${esc(id)}" style="margin-top:18px">➕ Ort in ${esc(c.name)} hinzufügen</a></div>
    ${creditLine(cityHero(c))}</div>`;
}
function thumb(p) { const s = imgSrc(p.id); return s ? `<img class="thumb" src="${s}" alt="" loading="lazy">` : `<span class="thumb ph">${PLACE_CAT_ICON[placeCat(p)] || ''}</span>`; }
function itemHtml(p, opts = {}) {
  const c = cityById[p.stadt];
  const b = (photoCount[p.id] ? ` 📷${photoCount[p.id]}` : '') + (state[p.id] && state[p.id].note ? ' 📝' : '');
  const sub = opts.sub || (isDone(p.id) && state[p.id].doneAt ? '✓ ' + fmtDate(state[p.id].doneAt) : p.adresse);
  return `<div class="item ${isDone(p.id) ? 'done' : ''}" style="${colorVars(c)}">
    <a href="#/ort/${esc(p.id)}">${thumb(p)}<span class="tx"><span class="nm">${opts.tag && c ? `<span class="tag">${esc(c.name)}</span>` : ''}${esc(p.name)}<span class="badges">${b}</span></span><span class="ad">${esc(sub)}</span></span></a>
    <button class="heart ${isFav(p.id) ? 'on' : ''}" data-fav="${esc(p.id)}" aria-label="Favorit" aria-pressed="${isFav(p.id)}">${ICON_HEART}</button>
    <button class="check ${isDone(p.id) ? 'on' : ''}" data-check="${esc(p.id)}" aria-label="Waren wir da" aria-pressed="${isDone(p.id)}">${isDone(p.id) ? '✓' : ''}</button></div>`;
}
function creditLine(id) {
  if (id == null) return '';
  const b = typeof id === 'number' ? BILDER[id] : null, p = P(id);
  if (b) {
    const lic = b.lizenzurl ? `<a href="${esc(b.lizenzurl)}" target="_blank" rel="noopener">${esc(b.lizenz)}</a>` : esc(b.lizenz);
    return `<p class="credit">Titelbild: ${esc(b.urheber)} · ${lic} · <a href="${esc(b.quelle)}" target="_blank" rel="noopener">Wikimedia Commons</a></p>`;
  }
  if (p && imgCache[p.id] && (p.bild_urheber || p.bild_lizenz)) return `<p class="credit">Titelbild: ${esc(p.bild_urheber || 'unbekannt')}${p.bild_lizenz ? ' · ' + esc(p.bild_lizenz) : ''}${p.bild_quelle ? ` · <a href="${esc(p.bild_quelle)}" target="_blank" rel="noopener">Quelle</a>` : ''}</p>`;
  return '';
}

/* ================= Ort ================= */
const isCustomPlace = p => typeof p.id === 'string';
function viewPlace(id) {
  const p = P(id); if (!p) return viewTrip();
  const c = cityById[p.stadt]; setAccent(c); setTab('reise');
  const same = cityPlaces(p.stadt), i = same.indexOf(p), prev = same[i - 1], next = same[i + 1];
  const s = state[p.id] || {};
  $app.innerHTML = `<div class="view"><article class="detail" id="detail">
    <header class="banner big" ${bannerBg(p.id)}>
      <div class="bannerrow">${back('#/stadt/' + encodeURIComponent(p.stadt), c ? c.name : 'Zurück')}<button class="heart big ${s.fav ? 'on' : ''}" data-fav="${esc(p.id)}" aria-label="Favorit">${ICON_HEART}</button></div>
      <div class="eyebrow" style="margin-top:40px">${esc(p.gruppe || KAT_GRUPPE[placeCat(p)])}</div>
      <h1>${esc(p.name)}</h1>
      ${p.adresse ? `<div class="addr">📍 ${esc(p.adresse)}</div>` : ''}
    </header>
    ${creditLine(p.id)}
    <div class="content stagger">
      ${p.beschreibung ? `<div class="cardbox"><p class="desc">${esc(p.beschreibung)}</p></div>` : ''}
      ${p.tipp ? `<div class="tip"><b>💡 Tipp</b>${esc(p.tipp)}</div>` : ''}
      <a class="btn" target="_blank" rel="noopener" href="${mapsUrl(p)}">🗺️ In Google Maps öffnen</a>
      ${p.lat ? `<a class="btn ghost" href="#/karte/${encodeURIComponent(p.stadt)}/${encodeURIComponent(p.id)}">📌 Auf der Karte zeigen</a>` : ''}
      <button class="btn ghost ${s.done ? 'on' : ''}" id="donebtn">${s.done ? '✓ Waren wir da' : 'Waren wir da?'}</button>
      <div class="saved" id="doneinfo" style="text-align:center;margin:-4px 0 12px">${s.done && s.doneAt ? 'Besucht am ' + fmtDate(s.doneAt) : ''}</div>
      <div class="cardbox"><h3>📝 Notiz</h3>${field('note', s.note || '', 'Eure Notiz zu diesem Ort …', { area: true })}<div class="saved" id="saved"></div></div>
      <div class="cardbox"><h3>📷 Eure Fotos</h3>${photoButtons()}<div class="photos" id="photos"></div></div>
      ${isCustomPlace(p) ? `<a class="btn ghost" href="#/ort-edit/${encodeURIComponent(p.id)}">✏️ Ort bearbeiten</a>` : ''}
      <div class="navrow">${prev ? `<a href="#/ort/${esc(prev.id)}"><small>‹ Zurück</small>${esc(prev.name)}</a>` : '<span></span>'}${next ? `<a href="#/ort/${esc(next.id)}"><small>Weiter ›</small>${esc(next.name)}</a>` : '<span></span>'}</div>
      <p class="swipehint">Tipp: Nach links/rechts wischen für den nächsten/vorigen Ort</p>
    </div></article></div>`;
  $('#donebtn').onclick = async () => {
    const v = !isDone(p.id); await saveState(p.id, { done: v, doneAt: v ? new Date().toISOString() : null });
    const b = $('#donebtn'); b.classList.toggle('on', v); b.textContent = v ? '✓ Waren wir da' : 'Waren wir da?';
    $('#doneinfo').textContent = v ? 'Besucht am ' + fmtDate(state[p.id].doneAt) : '';
    if (v && navigator.vibrate) navigator.vibrate(20);
  };
  autosave($('#note'), v => saveState(p.id, { note: v }), $('#saved'));
  wirePhotos(p.id);
  let sx = 0, sy = 0, st = 0; const el = $('#detail');
  el.addEventListener('touchstart', e => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); }, { passive: true });
  el.addEventListener('touchend', e => {
    if (e.target.closest('textarea,input')) return;
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 80 && Math.abs(dy) < 50 && Date.now() - st < 600) { const to = dx < 0 ? next : prev; if (to) location.hash = '#/ort/' + encodeURIComponent(to.id); }
  }, { passive: true });
}

/* ================= Ort anlegen / bearbeiten ================= */
function viewPlaceForm(cityPre, editId) {
  setAccent(null); setTab('reise');
  const ed = editId ? P(editId) : null;
  if (editId && (!ed || !isCustomPlace(ed))) return viewTrip();
  if (!CITIES.length) { $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>Ort hinzufügen</h1></header><div class="content"><p class="empty">Diese Reise hat noch keine Städte. Bitte zuerst über „Bearbeiten“ eine Stadt anlegen.</p></div></div>`; return; }
  const v = ed || { stadt: cityPre && cityById[cityPre] ? cityPre : todayCity() || CITIES[0].id, kategorie: 'Sehenswürdigkeit', name: '', adresse: '', beschreibung: '', tipp: '' };
  let coords = ed && ed.lat ? [ed.lat, ed.lon] : null;
  $app.innerHTML = `<div class="view"><header class="banner">${back(ed ? '#/ort/' + encodeURIComponent(ed.id) : '#/reise', ed ? ed.name : 'Reise')}<h1>${ed ? '✏️ Ort bearbeiten' : '➕ Eigener Ort'}</h1><div class="sub">Alle Felder auch per Mikrofon</div></header>
    <div class="content"><div class="cardbox">
      <label>Stadt</label><div class="seg wrap" id="fstadt">${CITIES.map(c => `<button type="button" data-v="${esc(c.id)}" class="${c.id === v.stadt ? 'on' : ''}">${esc(c.name)}</button>`).join('')}</div>
      <label>Kategorie</label><div class="katsel" id="fkat">${PLACE_CATS.map(k => `<button type="button" data-v="${k}" class="${k === placeCat(v) ? 'on' : ''}">${PLACE_CAT_ICON[k]} ${k === 'Anreise' ? 'Unterkunft' : k}</button>`).join('')}</div>
      <label>Name</label>${field('fname', v.name, 'z. B. Café am Platz')}
      <label>Adresse</label>${field('fadr', v.adresse, 'Straße Nr., PLZ Stadt')}
      <div class="row2" style="margin-top:10px"><button class="btn ghost small" id="geo1" type="button" style="margin:0">📍 Aus Adresse</button><button class="btn ghost small" id="geo2" type="button" style="margin:0">◎ Mein Standort</button></div>
      <div class="saved" id="coordinfo">${coords ? `Koordinaten: ${coords[0]}, ${coords[1]}` : 'Noch keine Koordinaten (für Karte und „In der Nähe“).'}</div>
      <label>Beschreibung</label>${field('fdesc', v.beschreibung, 'Was ist das Besondere?', { area: true })}
      <label>Tipp</label>${field('ftipp', v.tipp, 'Euer Insider-Tipp', { area: true })}
      <button class="btn" id="fsave" style="margin-top:16px">Speichern</button>
      ${ed ? '<button class="btn ghost" id="fdel">🗑️ Ort löschen</button>' : ''}
    </div></div></div>`;
  ['#fstadt', '#fkat'].forEach(s => $(s).onclick = e => { const b = e.target.closest('[data-v]'); if (b) $(s).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); });
  const info = $('#coordinfo');
  const fromAddr = async () => {
    const a = $('#fadr').value.trim(), cn = (cityById[$('#fstadt .on').dataset.v] || {}).name || '';
    if (!a && !$('#fname').value.trim()) { toast('Bitte zuerst eine Adresse eintragen'); return false; }
    info.textContent = 'Suche Koordinaten …';
    try {
      coords = await geocode(a ? a + (a.toLowerCase().includes(cn.toLowerCase()) ? '' : ', ' + cn) : $('#fname').value + ', ' + cn) || (a ? await geocode($('#fname').value + ', ' + cn) : null);
      info.textContent = coords ? `Gefunden: ${coords[0]}, ${coords[1]} ✓` : 'Adresse nicht gefunden – Ort wird ohne Karte gespeichert.';
      return !!coords;
    } catch (e) { info.textContent = 'Kein Internet – Koordinaten später über „Bearbeiten“ ermitteln oder „Mein Standort“ nutzen.'; return false; }
  };
  $('#geo1').onclick = fromAddr;
  $('#geo2').onclick = async () => { info.textContent = 'Standort wird gesucht …'; try { coords = (await locate()).map(x => +x.toFixed(6)); info.textContent = `Standort übernommen: ${coords[0]}, ${coords[1]} ✓`; } catch (e) { info.textContent = e.message; } };
  $('#fsave').onclick = async () => {
    const name = $('#fname').value.trim(); if (!name) { toast('Bitte einen Namen eingeben'); return; }
    if (!coords && $('#fadr').value.trim() && navigator.onLine) await fromAddr();
    const kat = $('#fkat .on').dataset.v;
    const place = { id: ed ? ed.id : T.id + '-' + Date.now().toString(36), stadt: $('#fstadt .on').dataset.v, kategorie: kat,
      gruppe: T.builtin ? 'Eigene Orte' : KAT_GRUPPE[kat], name, adresse: $('#fadr').value.trim(), beschreibung: $('#fdesc').value.trim(), tipp: $('#ftipp').value.trim(), eigen: true };
    if (coords) { place.lat = coords[0]; place.lon = coords[1]; }
    if (ed) ['bild_urheber', 'bild_lizenz', 'bild_quelle'].forEach(k => { if (ed[k]) place[k] = ed[k]; });
    await upsertPlace(place);
    toast('Ort gespeichert ✓'); location.hash = '#/ort/' + encodeURIComponent(place.id);
  };
  if (ed) $('#fdel').onclick = async () => { if (!confirm(`„${ed.name}“ wirklich löschen? Eure Fotos und Notizen dazu bleiben in der Sicherung erhalten.`)) return; await removePlace(ed.id); toast('Ort gelöscht'); location.hash = '#/stadt/' + encodeURIComponent(ed.stadt); };
}
async function upsertPlace(place) {
  if (T.builtin) { const o = overlay(); o.extraOrte = o.extraOrte.filter(x => x.id !== place.id).concat([place]); await saveTripRecord(o); }
  else { const r = Object.assign({}, tripRecords.find(x => x.id === T.id)); r.orte = (r.orte || []).filter(x => x.id !== place.id).concat([place]); await saveTripRecord(r); }
}
async function removePlace(id) {
  if (T.builtin) { const o = overlay(); o.extraOrte = o.extraOrte.filter(x => x.id !== id); await saveTripRecord(o); }
  else { const r = Object.assign({}, tripRecords.find(x => x.id === T.id)); r.orte = (r.orte || []).filter(x => x.id !== id); await saveTripRecord(r); }
}

/* ================= Neue Reise / bearbeiten ================= */
function viewTripForm(editing) {
  setAccent(null); setTab('reisen');
  const rec = editing ? tripRecords.find(r => r.id === T.id) : null;
  if (editing && !rec) return viewTrip();
  const cities = rec ? rec.cities.map(c => ({ id: c.id, name: c.name, von: c.von, bis: c.bis, uName: (c.unterkunft || {}).name || '', uAdr: (c.unterkunft || {}).adresse || '' })) : [{ name: '', von: '', bis: '', uName: '', uAdr: '' }];
  const row = (c, i) => `<div class="cardbox cityrow" data-i="${i}" ${c.id ? `data-id="${esc(c.id)}"` : ''}>
    <h3>Stadt ${i + 1}</h3>${field('cn' + i, c.name, 'Stadt, z. B. Lissabon')}
    <div class="row2"><div><label>von</label><input class="date" type="date" id="cv${i}" value="${esc(c.von || '')}"></div><div><label>bis</label><input class="date" type="date" id="cb${i}" value="${esc(c.bis || '')}"></div></div>
    <label>Unterkunft</label>${field('un' + i, c.uName, 'Name, z. B. Hotel Sol')}<div style="height:8px"></div>${field('ua' + i, c.uAdr, 'Adresse der Unterkunft')}
    ${i > 0 || cities.length > 1 ? `<button class="btn ghost small" data-rmcity="${i}" type="button">Stadt entfernen</button>` : ''}</div>`;
  const draw = () => {
    $app.innerHTML = `<div class="view"><header class="banner">${back(editing ? '#/reise' : '#/reisen', editing ? T.name : 'Meine Reisen')}<h1>${editing ? '✏️ Reise bearbeiten' : '➕ Neue Reise'}</h1><div class="sub">Name, Zeitraum, Städte und Unterkünfte</div></header>
      <div class="content">
        <div class="cardbox"><label>Name der Reise</label>${field('tname', rec ? rec.name : (draw.name || ''), 'z. B. Portugal-Rundreise')}
          <div class="row2"><div><label>Start</label><input class="date" type="date" id="tvon" value="${esc(rec ? rec.start : draw.von || '')}"></div><div><label>Ende</label><input class="date" type="date" id="tbis" value="${esc(rec ? rec.end : draw.bis || '')}"></div></div>
          <label>Titelbild (optional)</label><button class="btn ghost small" type="button" id="tcover">🖼️ Foto auswählen</button><input type="file" id="fcover" accept="image/*" hidden><div class="saved" id="coverinfo"></div></div>
        <h3 class="group">Städte</h3>${cities.map(row).join('')}
        <button class="btn ghost" id="addcity" type="button">➕ Weitere Stadt</button>
        <button class="btn" id="tsave">${editing ? 'Änderungen speichern' : 'Reise anlegen'}</button>
        ${editing ? '<button class="btn ghost" id="tdel" style="margin-top:20px">🗑️ Reise löschen</button>' : ''}
        <p class="small">Orte könnt ihr danach in jeder Stadt hinzufügen oder eine ganze Reise als Datei importieren.</p>
      </div></div>`;
    wire();
  };
  let coverBlob = null;
  const collect = () => cities.forEach((c, i) => { c.name = $('#cn' + i).value.trim(); c.von = $('#cv' + i).value; c.bis = $('#cb' + i).value; c.uName = $('#un' + i).value.trim(); c.uAdr = $('#ua' + i).value.trim(); });
  const wire = () => {
    $('#addcity').onclick = () => { collect(); draw.name = $('#tname').value; draw.von = $('#tvon').value; draw.bis = $('#tbis').value; const last = cities[cities.length - 1]; cities.push({ name: '', von: last && last.bis || '', bis: '', uName: '', uAdr: '' }); draw(); };
    $app.querySelectorAll('[data-rmcity]').forEach(b => b.onclick = () => { collect(); cities.splice(+b.dataset.rmcity, 1); draw(); });
    $('#tcover').onclick = () => $('#fcover').click();
    $('#fcover').onchange = async e => { const f = e.target.files[0]; if (f) { coverBlob = await shrink(f); $('#coverinfo').textContent = 'Titelbild gewählt ✓'; } };
    $('#tsave').onclick = save;
    if (editing) $('#tdel').onclick = async () => {
      if (!confirm(`Reise „${rec.name}“ mit allen Orten, Haken, Notizen, Fotos, Ausgaben und Tagebuch wirklich löschen?\n\nTipp: Vorher unter „Daten“ exportieren.`)) return;
      await deleteTrip(rec.id); toast('Reise gelöscht'); location.hash = '#/reisen';
    };
  };
  const save = async () => {
    collect();
    const name = $('#tname').value.trim(), von = $('#tvon').value, bis = $('#tbis').value;
    if (!name) return toast('Bitte einen Namen eingeben');
    if (!von || !bis || bis < von) return toast('Bitte Start und Ende prüfen');
    const cs = cities.filter(c => c.name);
    if (!cs.length) return toast('Bitte mindestens eine Stadt eintragen');
    const id = rec ? rec.id : 'r' + Date.now().toString(36);
    const used = new Set();
    const newCities = cs.map((c, i) => {
      const old = rec && rec.cities.find(x => x.id === c.id) || (rec && rec.cities.find(x => x.name === c.name));
      let cid = old ? old.id : slug(c.name); while (used.has(cid)) cid += '2'; used.add(cid);
      const pal = PALETTE[i % PALETTE.length];
      return Object.assign({}, old || {}, { id: cid, name: c.name, von: c.von || von, bis: c.bis || bis, datum: fmtRange(c.von || von, c.bis || bis), farbe: (old && old.farbe) || pal[0], farbe2: (old && old.farbe2) || pal[1],
        unterkunft: c.uName || c.uAdr ? { name: c.uName, adresse: c.uAdr } : null });
    });
    let orte = rec ? (rec.orte || []).filter(p => newCities.some(c => c.id === p.stadt)) : [];
    // Unterkünfte als Orte (Kategorie Unterkunft) anlegen/aktualisieren
    newCities.forEach(c => {
      const uid = id + '-u-' + c.id; orte = orte.filter(p => p.id !== uid);
      if (c.unterkunft) orte.unshift({ id: uid, stadt: c.id, kategorie: 'Anreise', gruppe: KAT_GRUPPE.Anreise, name: c.unterkunft.name || 'Unterkunft', adresse: c.unterkunft.adresse || '', beschreibung: `Eure Unterkunft in ${c.name}, ${c.datum}.`, tipp: '', eigen: true });
    });
    const plan = newCities.filter(c => c.unterkunft).map(c => ({ id: 'u-' + c.id, icon: '🏠', titel: `Unterkunft ${c.name}${c.unterkunft.name ? ' – ' + c.unterkunft.name : ''}`, datum: c.datum, ort: c.unterkunft.adresse || c.name }));
    const r = Object.assign({}, rec || {}, { id, name, start: von, end: bis, cities: newCities, orte, plan: plan.concat(((rec && rec.plan) || []).filter(x => !String(x.id).startsWith('u-'))), infos: (rec && rec.infos) || {}, sprachfuehrer: (rec && rec.sprachfuehrer) || null, created: (rec && rec.created) || new Date().toISOString() });
    await saveTripRecord(r);
    if (coverBlob) { const old = await getPhotos('cover:' + id); for (const o of old) await delPhoto(o.pid, 'cover:' + id); await addPhoto('cover:' + id, coverBlob); imgCache['cover:' + id] = URL.createObjectURL(coverBlob); }
    if (!rec && !kv['pack:' + id]) await kvSet('pack:' + id, templatePack());
    toast(rec ? 'Reise gespeichert ✓' : 'Reise angelegt ✓');
    geocodeMissing(id, true);
    openTrip(id, 'reise');
  };
  draw();
}
async function deleteTrip(id) {
  const t = trips.find(x => x.id === id); if (!t || t.builtin) return;
  const ids = new Set((t.orte || []).map(p => p.id));
  for (const k of Object.keys(state)) if (ids.has(pid(k))) { await rq(store('state', 'readwrite').delete(pid(k))); delete state[k]; }
  const ph = await rq(store('photos').getAll());
  for (const p of ph) if (ids.has(p.id) || String(p.id).startsWith('tag:' + id + ':') || p.id === 'cover:' + id || (String(p.id).startsWith('img:') && ids.has(String(p.id).slice(4)))) await delPhoto(p.pid, p.id);
  for (const e of expenses.filter(e => e.reise === id)) await delExpense(e.eid);
  for (const k of Object.keys(diary)) if (k.startsWith(id + ':')) { await rq(store('diary', 'readwrite').delete(k)); delete diary[k]; }
  for (const k of ['plan:' + id, 'pack:' + id]) if (kv[k]) { await rq(store('kv', 'readwrite').delete(k)); delete kv[k]; }
  await rq(store('trips', 'readwrite').delete(id)); tripRecords = tripRecords.filter(r => r.id !== id); buildTrips();
  if (kv.currentTrip === id) { await kvSet('currentTrip', BUILTIN_ID); setTrip(trips[0]); }
}
// Fehlende Koordinaten (Orte und Stadtzentren) im Hintergrund nachtragen – 1 Anfrage pro Sekunde
let geoRunning = false;
async function geocodeMissing(tripId, quiet) {
  if (geoRunning || !navigator.onLine) return; geoRunning = true;
  try {
    let rec = tripRecords.find(r => r.id === tripId); if (!rec) return;
    rec = JSON.parse(JSON.stringify(rec)); let n = 0, changed = false;
    for (const c of rec.cities) if (!c.center) { try { const r = await geocode(c.name); if (r) { c.center = r; changed = true; } } catch (e) { break; } await sleep(1100); }
    const todo = (rec.orte || []).filter(p => !p.lat && (p.adresse || p.name));
    if (todo.length && !quiet) toast(`Suche Koordinaten für ${todo.length} Orte …`, 3000);
    for (const p of todo) {
      const cn = (rec.cities.find(c => c.id === p.stadt) || {}).name || '';
      try {
        let r = p.adresse ? await geocode(p.adresse + (p.adresse.toLowerCase().includes(cn.toLowerCase()) ? '' : ', ' + cn)) : null;
        if (!r) { await sleep(1100); r = await geocode(p.name + ', ' + cn); }
        if (r) { p.lat = r[0]; p.lon = r[1]; n++; changed = true; }
      } catch (e) { break; }
      await sleep(1100);
    }
    if (changed) { await saveTripRecord(rec); if (todo.length) toast(`Koordinaten für ${n} von ${todo.length} Orten gefunden ✓`, 3500); }
  } finally { geoRunning = false; }
}

/* ================= Reise-Import (Vorlage) ================= */
async function importTripFile(file) {
  try {
    const j = JSON.parse(await file.text());
    if (j.app === 'reisebuechlein') return toast('Das ist eine Sicherung – bitte unter „Daten → Importieren“ einlesen.', 4500);
    if (j.format !== 'reisebuechlein-reise') throw new Error('Unbekanntes Format (Feld "format" fehlt)');
    if (!j.name || !j.von || !j.bis || !Array.isArray(j.staedte) || !j.staedte.length) throw new Error('name, von, bis und staedte sind Pflicht');
    const rec = tripFromTemplate(j);
    const exists = tripRecords.find(r => r.name === rec.name && r.start === rec.start);
    if (!confirm(`Reise „${rec.name}“ (${fmtRange(rec.start, rec.end)}) importieren?\n${rec.cities.length} Städte, ${rec.orte.length} Orte${rec.sprachfuehrer ? ', mit Sprachführer' : ''}.${exists ? '\n\nAchtung: Eine Reise mit gleichem Namen gibt es schon – sie wird ersetzt (eure Haken und Fotos bleiben, wenn die Orte gleich heißen).' : ''}`)) return;
    if (exists) { rec.id = exists.id; rec.orte.forEach(p => p.id = p.id.replace(/^[^-]+-/, rec.id + '-')); rec.cities.forEach(c => { if (c.unterkunft) { /* ok */ } }); }
    await saveTripRecord(rec);
    if (!kv['pack:' + rec.id]) await kvSet('pack:' + rec.id, j.packliste ? packFromTemplate(j.packliste) : templatePack());
    toast('Reise importiert ✓ – Bilder und Koordinaten werden ergänzt …', 3500);
    await fetchTripImages(rec);
    geocodeMissing(rec.id);
    openTrip(rec.id, 'reise');
  } catch (e) { toast('Import fehlgeschlagen: ' + e.message, 5000); }
}
function tripFromTemplate(j) {
  const id = 'r' + Date.now().toString(36);
  const used = new Set();
  const cities = j.staedte.map((s, i) => {
    let cid = slug(s.name); while (used.has(cid)) cid += '2'; used.add(cid);
    const pal = PALETTE[i % PALETTE.length];
    const von = s.von || j.von, bis = s.bis || j.bis;
    return { id: cid, name: s.name, von, bis, datum: fmtRange(von, bis), intro: s.intro || '', farbe: pal[0], farbe2: pal[1], center: Array.isArray(s.zentrum) ? s.zentrum : null,
      unterkunft: s.unterkunft && (s.unterkunft.name || s.unterkunft.adresse) ? { name: s.unterkunft.name || '', adresse: s.unterkunft.adresse || '' } : null };
  });
  const cityId = name => { const c = cities.find(c => norm(c.name) === norm(String(name || ''))); return c ? c.id : cities[0].id; };
  const orte = [];
  cities.forEach(c => { if (c.unterkunft) orte.push({ id: id + '-u-' + c.id, stadt: c.id, kategorie: 'Anreise', gruppe: KAT_GRUPPE.Anreise, name: c.unterkunft.name || 'Unterkunft', adresse: c.unterkunft.adresse, beschreibung: `Eure Unterkunft in ${c.name}, ${c.datum}.`, tipp: '' }); });
  (j.orte || []).forEach((o, i) => {
    const kat = PLACE_CATS.includes(o.kategorie) ? o.kategorie : o.kategorie === 'Unterkunft' ? 'Anreise' : 'Sehenswürdigkeit';
    const p = { id: id + '-' + (i + 1), stadt: cityId(o.stadt), kategorie: kat, gruppe: o.gruppe || KAT_GRUPPE[kat], name: o.name || 'Ort ' + (i + 1), adresse: o.adresse || '', beschreibung: o.beschreibung || '', tipp: o.tipp || '' };
    if (typeof o.lat === 'number' && typeof o.lon === 'number') { p.lat = o.lat; p.lon = o.lon; }
    ['bild_url', 'bild_urheber', 'bild_lizenz', 'bild_quelle'].forEach(k => { if (o[k]) p[k] = o[k]; });
    orte.push(p);
  });
  const infos = {};
  Object.entries(j.infos || {}).forEach(([name, inf]) => { infos[cityId(name)] = { notruf: inf.notruf || [], tickets: inf.tickets || [], ticketTipp: inf.ticketTipp || '', trinkgeld: inf.trinkgeld || '', sprachen: [] }; });
  const sprachfuehrer = Array.isArray(j.sprachfuehrer) && j.sprachfuehrer.length ? j.sprachfuehrer.map(s => ({ sprache: s.sprache || 'Sprache', code: s.code || '', umschrift: !!s.umschrift, staedte: (s.staedte || []).map(cityId), hinweis: s.hinweis || '', abschnitte: (s.abschnitte || []).map(a => ({ titel: a.titel || '', saetze: (a.saetze || []).filter(x => x && (x.de || x.l)).map(x => ({ de: x.de || '', l: x.l || '', u: x.u || '', a: x.a || '', info: x.info || '' })) })) })) : null;
  let anreise = null;
  if (j.anreise && typeof j.anreise === 'object') {
    anreise = { stand: j.anreise.stand || '' };
    Object.entries(j.anreise).forEach(([name, a]) => { if (name !== 'stand' && a && typeof a === 'object') anreise[cityId(name)] = { knoten: a.knoten || [], strecken: (a.strecken || []).map(s => Object.assign({ optionen: [], empfehlung: '' }, s)), tipps: a.tipps || [] }; });
  }
  const plan = (j.reiseplan || []).map((x, i) => ({ id: 'p' + i, icon: x.icon || '📌', titel: x.titel || '', datum: x.datum || '', ort: x.ort || '' }))
    .concat(cities.filter(c => c.unterkunft).map(c => ({ id: 'u-' + c.id, icon: '🏠', titel: `Unterkunft ${c.name}${c.unterkunft.name ? ' – ' + c.unterkunft.name : ''}`, datum: c.datum, ort: c.unterkunft.adresse || c.name })));
  return { id, name: j.name, start: j.von, end: j.bis, cities, orte, infos, sprachfuehrer, anreise, plan, tage: j.tage || {}, created: new Date().toISOString(), importiert: true };
}
async function fetchTripImages(rec) {
  if (!navigator.onLine) return;
  for (const p of rec.orte) {
    if (!p.bild_url || imgCache[p.id]) continue;
    try {
      const r = await fetch(p.bild_url, { mode: 'cors' }); if (!r.ok) continue;
      const b = await r.blob(); if (!b.type.startsWith('image/')) continue;
      const small = await shrink(new File([b], 'bild.jpg', { type: b.type }), 1200);
      await addPhoto('img:' + p.id, small); imgCache[p.id] = URL.createObjectURL(small);
    } catch (e) { /* Bild nicht ladbar – Ort bleibt ohne Bild */ }
  }
}

/* ================= Fotos ================= */
function photoButtons() {
  return `<div class="row2"><button class="btn ghost" id="cam" style="margin:0">📷 Kamera</button><button class="btn ghost" id="gal" style="margin:0">🖼️ Galerie</button></div>
    <input type="file" id="fcam" accept="image/*" capture="environment" hidden><input type="file" id="fgal" accept="image/*" multiple hidden>`;
}
function wirePhotos(key) {
  $('#cam').onclick = () => $('#fcam').click(); $('#gal').onclick = () => $('#fgal').click();
  const onFiles = async e => {
    const files = [...e.target.files]; e.target.value = '';
    if (files.length > 1) toast(`${files.length} Fotos werden verkleinert …`);
    for (const f of files) {
      try { const ts = (await exifDate(f)) || f.lastModified || Date.now(); await addPhoto(key, await shrink(f), ts); }
      catch (err) { toast('Foto konnte nicht gespeichert werden'); }
    }
    if (files.length) toast(files.length > 1 ? 'Fotos gespeichert' : 'Foto gespeichert');
    renderPhotos(key);
  };
  $('#fcam').onchange = onFiles; $('#fgal').onchange = onFiles;
  renderPhotos(key);
}
let urls = [];
function freeUrls() { urls.forEach(URL.revokeObjectURL); urls = []; }
async function renderPhotos(key) {
  const list = await getPhotos(key), box = $('#photos'); if (!box) return;
  box.innerHTML = list.length ? '' : '<p class="small" style="grid-column:1/-1;margin:4px 0">Noch keine eigenen Fotos.</p>';
  list.forEach(ph => {
    const u = URL.createObjectURL(ph.blob); urls.push(u);
    const im = new Image(); im.src = u; im.alt = 'Eigenes Foto'; im.onclick = () => openViewer(ph, u, key); box.appendChild(im);
  });
}
function openViewer(ph, u, key) {
  const v = document.getElementById('viewer'); document.getElementById('vimg').src = u; v.hidden = false;
  document.getElementById('vclose').onclick = () => v.hidden = true;
  const del = document.getElementById('vdel'); del.hidden = !key;
  del.onclick = async () => { if (confirm('Dieses Foto wirklich löschen?')) { await delPhoto(ph.pid, key); v.hidden = true; renderPhotos(key); } };
}
// Kopie verkleinern (max. 2000 px, JPEG 80 %) – das Original im Handy bleibt unverändert
function shrink(file, max) {
  max = max || 2000;
  return new Promise(res => {
    const im = new Image(), u = URL.createObjectURL(file);
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
      const cv = document.createElement('canvas'); cv.width = Math.round(im.naturalWidth * k); cv.height = Math.round(im.naturalHeight * k);
      cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); URL.revokeObjectURL(u);
      cv.toBlob(b => res(b || file), 'image/jpeg', 0.8);
    };
    im.onerror = () => { URL.revokeObjectURL(u); res(file); }; im.src = u;
  });
}
// Aufnahmedatum (EXIF DateTimeOriginal) aus einem JPEG lesen; null wenn nicht vorhanden
async function exifDate(file) {
  try {
    const dv = new DataView(await file.slice(0, 256 * 1024).arrayBuffer());
    if (dv.getUint16(0) !== 0xFFD8) return null;
    let o = 2;
    while (o + 4 < dv.byteLength) {
      const mk = dv.getUint16(o), len = dv.getUint16(o + 2);
      if (mk === 0xFFE1 && dv.getUint32(o + 4) === 0x45786966) {
        const t = o + 10, le = dv.getUint16(t) === 0x4949;
        const u16 = p => dv.getUint16(t + p, le), u32 = p => dv.getUint32(t + p, le);
        const readTag = (ifd, tag) => { const n = u16(ifd); for (let i = 0; i < n; i++) { const e = ifd + 2 + i * 12; if (u16(e) === tag) return u32(e + 8); } return null; };
        const str = p => { let s = ''; for (let i = 0; i < 19; i++) s += String.fromCharCode(dv.getUint8(t + p + i)); return s; };
        const ifd0 = u32(4), exif = readTag(ifd0, 0x8769);
        let p = exif != null ? readTag(exif, 0x9003) : null; if (p == null) p = readTag(ifd0, 0x0132);
        if (p == null) return null;
        const m = str(p).match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
        if (!m) return null;
        const d = new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]).getTime();
        return isNaN(d) ? null : d;
      }
      if ((mk & 0xFF00) !== 0xFF00 || mk === 0xFFDA) break;
      o += 2 + len;
    }
  } catch (e) {}
  return null;
}

/* ================= Suche, Besucht, Favoriten ================= */
function viewSearch() {
  setAccent(null); setTab('suche');
  $app.innerHTML = `<div class="view"><header class="banner"><div class="eyebrow">Suche · ${esc(T.name)}</div><h1>Alle ${PLACES.length} Orte</h1>
    <div style="margin-top:14px">${field('q', '', 'Name, Adresse, Tipp, Notiz …', { type: 'search' })}</div></header>
    <div class="content"><div id="res"></div></div></div>`;
  const inp = $('#q');
  const run = () => {
    const t = norm(inp.value.trim()), box = $('#res');
    if (!t) { box.innerHTML = '<p class="empty">Sucht nach Name, Adresse, Beschreibung, Tipp, Stadt, Gruppe oder euren Notizen – gern auch per Mikrofon.</p>'; return; }
    const words = t.split(/\s+/);
    const hits = PLACES.filter(p => { const h = norm([p.name, p.adresse, p.beschreibung, p.tipp, (cityById[p.stadt] || {}).name, p.gruppe, placeCat(p), (state[p.id] && state[p.id].note) || ''].join(' ')); return words.every(w => h.includes(w)); });
    box.innerHTML = hits.length ? `<p class="small">${hits.length} Treffer</p><div class="list">${hits.map(p => itemHtml(p, { tag: true })).join('')}</div>` : '<p class="empty">Nichts gefunden.</p>';
  };
  inp.oninput = run; run();
}
function viewVisited() {
  setAccent(null); setTab('reise');
  const done = PLACES.filter(p => isDone(p.id)).sort((a, b) => (state[b.id].doneAt || '').localeCompare(state[a.id].doneAt || ''));
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>Besucht</h1><div class="sub">${done.length} von ${PLACES.length} Orten</div>
    <div class="pbar"><span style="width:${PLACES.length ? Math.round(100 * done.length / PLACES.length) : 0}%"></span></div></header>
    <div class="content">${done.length ? `<div class="list stagger">${done.map(p => itemHtml(p, { tag: true })).join('')}</div>` : '<p class="empty">Noch nichts abgehakt. Tippt bei einem Ort auf den Kreis, sobald ihr dort wart.</p>'}</div></div>`;
}
function viewFavs() {
  setAccent(null); setTab('reise');
  const favs = PLACES.filter(p => isFav(p.id));
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>♥ Favoriten</h1><div class="sub">${favs.length} Orte gemerkt</div></header>
    <div class="content">${favs.length ? CITIES.map(c => { const l = favs.filter(p => p.stadt === c.id); return l.length ? `<h3 class="group" style="${colorVars(c)}">${esc(c.name)}</h3><div class="list">${l.map(p => itemHtml(p)).join('')}</div>` : ''; }).join('')
      : '<p class="empty">Noch keine Favoriten. Tippt bei einem Ort auf das Herz ♥.</p>'}</div></div>`;
}

/* ================= In der Nähe ================= */
function distKm(a, b) {
  const R = 6371, r = Math.PI / 180, dLa = (b[0] - a[0]) * r, dLo = (b[1] - a[1]) * r;
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function distText(km) {
  const d = km < 1 ? Math.round(km * 1000 / 10) * 10 + ' m' : km.toLocaleString('de-DE', { maximumFractionDigits: 1 }) + ' km';
  const min = Math.round(km * 1.3 / 4.8 * 60);
  const walk = min > 90 ? 'zu weit zum Laufen – besser Öffis' : min < 1 ? 'direkt hier' : `ca. ${min} Min. zu Fuß`;
  return d + ' · ' + walk;
}
let lastPos = null;
function locate() {
  return new Promise((res, rej) => {
    if (!('geolocation' in navigator)) return rej(new Error('Standort wird von diesem Gerät nicht unterstützt.'));
    navigator.geolocation.getCurrentPosition(p => { lastPos = [p.coords.latitude, p.coords.longitude]; res(lastPos); },
      e => rej(new Error(e.code === 1 ? 'Standort nicht erlaubt. Ihr könnt das in den Chrome-Einstellungen der Seite ändern.' : 'Standort konnte nicht ermittelt werden. Seid ihr draußen bzw. ist GPS an?')),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  });
}
function viewNear() {
  setAccent(null); setTab('reise');
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>📍 In der Nähe</h1><div class="sub">Die nächsten Orte, sortiert nach Entfernung</div></header>
    <div class="content"><button class="btn" id="locbtn">📍 Meinen Standort verwenden</button>
    <p class="small" style="text-align:center;margin-top:-4px">Der Standort wird nur auf dem Handy benutzt und nirgends gespeichert.</p><div id="near"></div></div></div>`;
  const run = async () => {
    const box = $('#near'); box.innerHTML = '<p class="empty">Standort wird gesucht …</p>';
    try {
      const me = await locate();
      const list = PLACES.filter(p => p.lat).map(p => ({ p, km: distKm(me, [p.lat, p.lon]) })).sort((a, b) => a.km - b.km);
      if (!list.length) { box.innerHTML = '<p class="empty">Noch keine Orte mit Koordinaten.</p>'; return; }
      box.innerHTML = (list[0].km > 100 ? '<p class="small">Ihr seid gerade weit weg von allen Orten – hier trotzdem die nächsten:</p>' : '') +
        `<div class="list stagger">${list.slice(0, 15).map(x => itemHtml(x.p, { tag: true, sub: distText(x.km) })).join('')}</div>`;
    } catch (e) { box.innerHTML = `<p class="empty">${esc(e.message)}</p>`; }
  };
  $('#locbtn').onclick = run;
  if (lastPos) run();
}

/* ================= Karte ================= */
let map = null, watchId = null, meMarker = null, meCircle = null;
const mapState = { city: null, cat: '' };
function cleanupMap() {
  if (watchId != null) { navigator.geolocation.clearWatch(watchId); watchId = null; }
  if (map) { map.remove(); map = null; meMarker = meCircle = null; }
}
const pinClass = p => isFav(p.id) ? 'fav' : isDone(p.id) ? 'done' : 'open';
function cityCenter(c) {
  if (c.center) return c.center;
  const l = cityPlaces(c.id).filter(p => p.lat); if (!l.length) return null;
  return [l.reduce((a, p) => a + p.lat, 0) / l.length, l.reduce((a, p) => a + p.lon, 0) / l.length];
}
function viewMap(cityId, focusId) {
  setAccent(null); setTab('karte');
  if (!CITIES.length) { $app.innerHTML = '<div class="view"><header class="banner"><h1>Karte</h1></header><p class="empty">Diese Reise hat noch keine Städte.</p></div>'; return; }
  const city = cityById[cityId] ? cityId : (cityById[mapState.city] ? mapState.city : todayCity() || CITIES[0].id);
  mapState.city = city;
  const cats = [['', 'Alle'], ['Sehenswürdigkeit', '🏛️ Sehenswürdigkeit'], ['Essen', '🍽️ Essen'], ['Reserve', '⭐ Reserve'], ['Ausflug', '🚆 Ausflug'], ['Anreise', '🧳 Unterkunft'], ['fav', '♥ Favoriten']];
  $app.innerHTML = `<div class="mapwrap"><div id="map"></div>
    <div class="mapbar">
      <div class="seg cityseg" style="grid-template-columns:repeat(${Math.min(CITIES.length, 4)},1fr)">${CITIES.map(c => `<button data-mcity="${esc(c.id)}" class="${c.id === city ? 'on' : ''}">${esc(c.name)}</button>`).join('')}</div>
      <div class="chips mapchips">${cats.map(([k, l]) => `<button class="chip ${mapState.cat === k ? 'on' : ''}" data-mcat="${k}">${l}</button>`).join('')}</div>
    </div>
    <div class="legend"><span><i class="lg open"></i>offen</span><span><i class="lg done"></i>besucht</span><span><i class="lg fav"></i>Favorit</span><span>🏠</span><span><i class="lg me"></i>ich</span></div>
    <div class="fabs"><a class="fab" href="#/naehe" aria-label="In der Nähe">📍</a>${homeOf(city) ? '<button class="fab homefab" id="tohome">🏠 Unterkunft</button>' : ''}<button class="fab main" id="tome">◎ Zu mir</button></div>
  </div>`;
  if (!window.L) { $('#map').innerHTML = '<p class="empty">Karte konnte nicht geladen werden.</p>'; return; }
  const cc = cityCenter(cityById[city]);
  map = L.map('map', { zoomControl: false }).setView(cc || [48, 10], cc ? 14 : 4);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>' }).addTo(map);
  const layer = L.layerGroup().addTo(map); const markers = {};
  const home = homeOf(city);
  let homeMarker = null;
  if (home && home.lat) {
    homeMarker = L.marker([home.lat, home.lon], { zIndexOffset: 1000, icon: L.divIcon({ className: 'pinwrap', html: '<div class="homepin">🏠</div>', iconSize: [48, 48], iconAnchor: [24, 44], popupAnchor: [0, -40] }) }).addTo(map);
    homeMarker.bindPopup(() => homePopupHtml(home), { maxWidth: 270, minWidth: 230, className: 'pop', autoPanPaddingTopLeft: [16, 130], autoPanPaddingBottomRight: [16, 110] });
  }
  const draw = () => {
    layer.clearLayers();
    const list = cityPlaces(city).filter(p => p.lat && p !== home && (mapState.cat === '' || (mapState.cat === 'fav' ? isFav(p.id) : placeCat(p) === mapState.cat)));
    list.forEach(p => {
      const cls = pinClass(p), glyph = cls === 'fav' ? '♥' : cls === 'done' ? '✓' : '';
      const m = L.marker([p.lat, p.lon], { icon: L.divIcon({ className: 'pinwrap', html: `<div class="pin ${cls}"><span>${glyph}</span></div>`, iconSize: [34, 44], iconAnchor: [17, 42], popupAnchor: [0, -38] }) });
      m.bindPopup(() => popupHtml(p), { maxWidth: 260, minWidth: 220, className: 'pop', autoPanPaddingTopLeft: [16, 130], autoPanPaddingBottomRight: [16, 110] });
      m.addTo(layer); markers[p.id] = m;
    });
    return list;
  };
  const list = draw();
  const fid = focusId != null ? pid(focusId) : null;
  const showHome = async () => {
    if (!homeMarker) return toast('Für diese Stadt ist keine Unterkunft mit Koordinaten hinterlegt');
    map.setView(homeMarker.getLatLng(), 16); homeMarker.openPopup();
    if (!lastPos) { try { await locate(); if (map && homeMarker.isPopupOpen()) homeMarker.setPopupContent(homePopupHtml(home)); } catch (e) { /* ohne Standort: keine Entfernung */ } }
  };
  if (fid === 'home' || (home && fid === home.id)) showHome();
  else if (fid != null && markers[fid]) { map.setView(markers[fid].getLatLng(), 16); markers[fid].openPopup(); }
  else {
    const core = list.filter(p => placeCat(p) !== 'Ausflug' && !/Flughafen|Airport/i.test(p.name));
    if (core.length > 1) map.fitBounds(L.latLngBounds(core.map(p => [p.lat, p.lon])), { padding: [30, 30], maxZoom: 15 });
    else if (core.length === 1) map.setView([core[0].lat, core[0].lon], 15);
  }
  $app.querySelector('.mapbar').onclick = e => {
    const c = e.target.closest('[data-mcity]'), k = e.target.closest('[data-mcat]');
    if (c) location.hash = '#/karte/' + encodeURIComponent(c.dataset.mcity);
    if (k) { mapState.cat = k.dataset.mcat; document.querySelectorAll('[data-mcat]').forEach(b => b.classList.toggle('on', b === k)); draw(); }
  };
  if ($('#tohome')) $('#tohome').onclick = showHome;
  $('#tome').onclick = () => {
    if (!('geolocation' in navigator)) return toast('Standort wird nicht unterstützt');
    let first = true;
    if (watchId != null) navigator.geolocation.clearWatch(watchId);
    watchId = navigator.geolocation.watchPosition(pos => {
      const ll = [pos.coords.latitude, pos.coords.longitude]; lastPos = ll; if (!map) return;
      if (!meMarker) {
        meCircle = L.circle(ll, { radius: pos.coords.accuracy, color: '#1a73e8', weight: 1, fillOpacity: .12 }).addTo(map);
        meMarker = L.circleMarker(ll, { radius: 8, color: '#fff', weight: 3, fillColor: '#1a73e8', fillOpacity: 1 }).addTo(map);
      } else { meMarker.setLatLng(ll); meCircle.setLatLng(ll).setRadius(pos.coords.accuracy); }
      if (first) { map.setView(ll, 16); first = false; }
    }, e => toast(e.code === 1 ? 'Standort nicht erlaubt' : 'Standort nicht gefunden', 3500), { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 });
  };
  const wrap = $app.querySelector('.mapwrap');
  map.on('popupclose', () => wrap.classList.remove('popopen'));
  map.on('popupopen', e => {
    wrap.classList.add('popopen');
    const el = e.popup.getElement(); const b = el && el.querySelector('[data-popfav]');
    if (b) b.onclick = async () => { const id = pid(b.dataset.popfav); await saveState(id, { fav: !isFav(id) }); map.closePopup(); draw(); };
  });
}
function homePopupHtml(h) {
  const s = imgSrc(h.id);
  const d = lastPos ? `<div class="popdist">🚶 ${distText(distKm(lastPos, [h.lat, h.lon]))}</div>` : '<div class="popsub">Standort erlauben, um Entfernung und Gehzeit zu sehen.</div>';
  return `<div class="popin">${s ? `<img src="${s}" alt="">` : ''}<b>🏠 ${esc(h.name)}</b><div class="popsub">${esc(h.adresse)}</div>${d}
    <div class="popbtns"><a class="pbtn" href="https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}&travelmode=walking" target="_blank" rel="noopener">🚶 Nach Hause navigieren</a>
    <a class="pbtn ghost" href="#/ort/${encodeURIComponent(h.id)}">Details zur Unterkunft</a></div></div>`;
}
function popupHtml(p) {
  const s = imgSrc(p.id), d = lastPos ? `<div class="popdist">${distText(distKm(lastPos, [p.lat, p.lon]))}</div>` : '';
  return `<div class="popin">${s ? `<img src="${s}" alt="">` : ''}<b>${esc(p.name)}</b><div class="popsub">${esc(p.gruppe || KAT_GRUPPE[placeCat(p)])}${isDone(p.id) ? ' · ✓ besucht' : ''}</div>${d}
    <div class="popbtns"><a class="pbtn" href="#/ort/${encodeURIComponent(p.id)}">Details</a><a class="pbtn ghost" href="${navUrl(p)}" target="_blank" rel="noopener">In Google Maps navigieren</a>
    <button class="pbtn ghost" data-popfav="${esc(p.id)}">${isFav(p.id) ? '♥ Favorit entfernen' : '♡ Als Favorit merken'}</button></div></div>`;
}

/* ================= Stadt-Infos & Sprachführer ================= */
// Einträge vereinheitlichen: Arrays [de, l, (u), a, info] oder Objekte {de, l, u, a, info}
function normLang(s) {
  if (s._norm) return s;
  const out = { sprache: s.sprache, code: s.code || '', staedte: s.staedte || [], hinweis: s.hinweis || '', umschrift: !!s.umschrift, _norm: true };
  out.abschnitte = (s.abschnitte || []).map(a => ({ titel: a.titel, saetze: (a.saetze || a.s || []).map(e => Array.isArray(e)
    ? (s.umschrift ? { de: e[0], l: e[1], u: e[2], a: e[3], info: e[4] } : { de: e[0], l: e[1], a: e[2], info: e[3] }) : e) }));
  return out;
}
const LANG_CODE = { griechisch: 'el-GR', spanisch: 'es-ES', katalanisch: 'ca-ES', wienerisch: 'de-AT', deutsch: 'de-DE', englisch: 'en-GB', italienisch: 'it-IT', französisch: 'fr-FR', portugiesisch: 'pt-PT', niederländisch: 'nl-NL', türkisch: 'tr-TR', kroatisch: 'hr-HR', polnisch: 'pl-PL', tschechisch: 'cs-CZ' };
const langCode = l => l.code || LANG_CODE[(l.sprache || '').toLowerCase()] || '';
function langsForCity(id) {
  const out = [];
  if (T.sprachfuehrer) T.sprachfuehrer.forEach(s => { if (!s.staedte || !s.staedte.length || s.staedte.includes(id)) out.push(normLang(s)); });
  const inf = INFOS[id];
  if (!out.length && inf && inf.sprachen) inf.sprachen.forEach(s => out.push(normLang({ sprache: s.name, abschnitte: [{ titel: 'Die wichtigsten Sätze', saetze: s.saetze }] })));
  return out;
}
const phraseKey = (l, s) => l.sprache + '|' + s.de + '|' + s.l;
const isPFav = k => (kv.phraseFavs || []).includes(k);
function phraseHtml(s, l) {
  const k = l ? phraseKey(l, s) : '', code = l ? langCode(l) : '';
  return `<div class="phrase"><div class="ptext"><small>${esc(s.de)}</small><b>${esc(s.l)}</b>${s.u ? `<span class="pu">${esc(s.u)}</span>` : ''}${s.a && s.a !== '–' ? `<span>🗣️ ${esc(s.a)}</span>` : ''}${s.info ? `<em>${esc(s.info)}</em>` : ''}</div>
    ${l ? `<div class="pbtns"><button class="pb" data-say="${esc(s.l)}" data-lang="${code}" aria-label="Vorlesen">🔊</button><button class="pb" data-say="${esc(s.l)}" data-lang="${code}" data-slow="1" aria-label="Noch langsamer vorlesen">🐢</button><button class="pb star ${isPFav(k) ? 'on' : ''}" data-pfav="${esc(k)}" aria-label="Favorit">${isPFav(k) ? '★' : '☆'}</button></div>` : ''}</div>`;
}

/* ---------- Vorlesen (speechSynthesis) ---------- */
const TTS_CHECK = [{ code: 'el-GR', name: 'Griechisch' }, { code: 'es-ES', name: 'Spanisch' }, { code: 'ca-ES', name: 'Katalanisch' }, { code: 'de-AT', name: 'Deutsch (Österreich)', fallback: 'de' }];
function ttsVoices() {
  if (!('speechSynthesis' in window)) return Promise.resolve([]);
  const v = speechSynthesis.getVoices(); if (v.length) return Promise.resolve(v);
  return new Promise(res => { let done = false; const fin = () => { if (!done) { done = true; res(speechSynthesis.getVoices()); } }; speechSynthesis.onvoiceschanged = fin; setTimeout(fin, 1500); });
}
function findVoice(voices, code, fallback) {
  const c = code.toLowerCase(), base = c.slice(0, 2), norm = v => v.lang.replace('_', '-').toLowerCase();
  return voices.find(v => norm(v) === c && v.localService) || voices.find(v => norm(v) === c) || voices.find(v => norm(v).startsWith(base)) || (fallback ? voices.find(v => norm(v).startsWith(fallback)) : null);
}
async function speak(text, code, slow) {
  if (!('speechSynthesis' in window)) return toast('Vorlesen wird von diesem Browser nicht unterstützt.', 4000);
  const voices = await ttsVoices(); const t = TTS_CHECK.find(x => x.code === code) || {};
  const v = findVoice(voices, code || 'de-DE', t.fallback);
  if (!v && voices.length) { showVoiceHelp(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/…/g, '').replace(/\s*\/\s*/g, ', '));
  u.lang = v ? v.lang : code; if (v) u.voice = v;
  u.rate = slow ? 0.5 : 0.8;
  speechSynthesis.speak(u);
}
async function checkVoices() {
  const voices = await ttsVoices();
  return TTS_CHECK.map(t => { const v = findVoice(voices, t.code, t.fallback); return Object.assign({}, t, { ok: !!v, voice: v ? v.name + ' (' + v.lang + ')' : '' }); });
}
async function showVoiceHelp() {
  const res = await checkVoices(), missing = res.filter(r => !r.ok);
  let sh = document.getElementById('sheet');
  if (!sh) { sh = document.createElement('div'); sh.id = 'sheet'; document.body.appendChild(sh); }
  const supported = 'speechSynthesis' in window;
  sh.innerHTML = `<div class="sheetbg" data-close></div><div class="sheetbox"><div class="grab"></div>
    <h3>🔊 Vorlese-Stimmen</h3>
    ${!supported ? '<p class="small">Dieser Browser kann nicht vorlesen. Nutzt Chrome auf dem Handy.</p>' : `<div class="vlist">${res.map(r => `<div class="vrow ${r.ok ? 'ok' : 'miss'}"><span>${r.ok ? '✅' : '⚠️'}</span><div><b>${esc(r.name)}</b><small>${r.ok ? esc(r.voice) : 'Keine Stimme gefunden'}</small></div></div>`).join('')}</div>`}
    ${missing.length || !supported ? `<p>${missing.length ? 'Für ' + missing.map(m => m.name).join(', ') + ' fehlt eine Stimme. So ladet ihr sie kostenlos nach:' : ''}</p>
    <div class="cardbox" style="margin:10px 0"><h3>🤖 Android / Google Pixel</h3><ol class="steps"><li>Einstellungen öffnen</li><li>System › Sprachen</li><li>Sprachausgabe (Text-in-Sprache-Ausgabe)</li><li>Beim „Google-Sprachausgabe“ auf das Zahnrad ⚙️</li><li>„Sprachdaten installieren“ › Sprache wählen (z. B. Griechisch, Spanisch, Katalanisch, Deutsch) › Download-Symbol</li><li>Am besten im WLAN – danach funktioniert das Vorlesen auch offline</li></ol></div>
    <div class="cardbox" style="margin:10px 0"><h3>🍏 iPhone / iPad</h3><ol class="steps"><li>Einstellungen öffnen</li><li>Bedienungshilfen › Gesprochene Inhalte</li><li>Stimmen › Sprache wählen</li><li>Eine Stimme antippen und laden</li></ol></div>
    <p class="small">Danach den Browser bzw. die App einmal ganz schließen und neu öffnen.</p>` : '<p class="small">Alle Stimmen sind da – Vorlesen funktioniert auch offline. 🎉</p>'}
    <div class="row2"><button class="btn" id="vrecheck" style="margin:0">Erneut prüfen</button><button class="btn ghost" data-close style="margin:0">Schließen</button></div></div>`;
  sh.hidden = false;
  sh.querySelectorAll('[data-close]').forEach(b => b.onclick = () => { sh.hidden = true; });
  sh.querySelector('#vrecheck').onclick = () => { toast('Prüfe Stimmen …', 1200); showVoiceHelp(); };
  await kvSet('voiceChecked', true);
}
function viewInfo(id) {
  const c = cityById[id]; if (!c) return viewTrip();
  const inf = INFOS[id] || {};
  setAccent(c); setTab('reise');
  const langs = langsForCity(id);
  const empty = !inf.notruf && !inf.tickets && !inf.trinkgeld && !langs.length;
  $app.innerHTML = `<div class="view"><header class="banner" ${bannerBg(cityHero(c))}>${back('#/stadt/' + encodeURIComponent(id), c.name)}<div class="eyebrow" style="margin-top:14px">Praktisches</div><h1>${esc(c.name)}</h1><div class="sub">Notruf · Tickets · Trinkgeld · Sprache</div></header>
    <div class="content stagger">
      ${inf.notruf && inf.notruf.length ? `<div class="cardbox"><h3>🚨 Notruf</h3>${inf.notruf.map(n => `<a class="telrow" href="tel:${esc(n.nr)}"><b>${esc(n.nr)}</b><span>${esc(n.was)}</span><span class="chev">📞</span></a>`).join('')}</div>` : `<div class="cardbox"><h3>🚨 Notruf</h3><a class="telrow" href="tel:112"><b>112</b><span>Euro-Notruf (in ganz Europa)</span><span class="chev">📞</span></a></div>`}
      ${inf.tickets && inf.tickets.length ? `<div class="cardbox"><h3>🚇 Öffi-Tickets (ungefähre Preise)</h3>${inf.tickets.map(t => `<div class="stat"><span>${esc(t.name)}</span><b>${esc(t.preis)}</b></div>`).join('')}${inf.ticketTipp ? `<p class="small">${esc(inf.ticketTipp)}</p>` : ''}<p class="small">Preise ändern sich – bitte vor Ort kurz prüfen.</p></div>` : ''}
      ${inf.trinkgeld ? `<div class="cardbox"><h3>💶 Trinkgeld</h3><p class="desc" style="font-size:.97rem">${esc(inf.trinkgeld)}</p></div>` : ''}
      ${anreiseOf(id) ? `<a class="btn ghost" href="#/anreise/${encodeURIComponent(id)}">🧭 Anreise & Abreise Schritt für Schritt</a>` : ''}
      ${langs.map(l => `<div class="cardbox"><h3>🗣️ ${esc(l.sprache)}</h3><div class="phrases">${(l.abschnitte[0] || { saetze: [] }).saetze.slice(0, 6).map(s => phraseHtml(s, l)).join('')}</div>
        <a class="btn ghost small" href="#/sprache/${encodeURIComponent(l.sprache)}">Ganzer Sprachführer ${esc(l.sprache)} (${l.abschnitte.reduce((a, x) => a + x.saetze.length, 0)} Einträge) ›</a></div>`).join('')}
      ${empty ? '<p class="small">Für diese Stadt sind noch keine Infos hinterlegt. Sie kommen über eine importierte Reise-Datei (Vorlage) dazu.</p>' : ''}
    </div></div>`;
}
function allLangs() {
  const m = new Map();
  CITIES.forEach(c => langsForCity(c.id).forEach(l => { if (!m.has(l.sprache)) m.set(l.sprache, l); }));
  return [...m.values()];
}
function viewLang(name) {
  setAccent(null); setTab('reise');
  const langs = allLangs();
  if (!langs.length) { $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>🗣️ Sprachführer</h1></header><div class="content"><p class="empty">Für diese Reise gibt es noch keinen Sprachführer.</p></div></div>`; return; }
  const l = langs.find(x => x.sprache === name) || langs[0];
  const total = l.abschnitte.reduce((a, x) => a + x.saetze.length, 0);
  const nF = l.abschnitte.reduce((a, x) => a + x.saetze.filter(s => isPFav(phraseKey(l, s))).length, 0);
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>🗣️ ${esc(l.sprache)}</h1><div class="sub">${total} Wörter und Sätze · 🔊 vorlesen · 🐢 noch langsamer · ☆ merken</div>
    <div style="margin-top:14px">${field('lq', '', 'Suchen – auf Deutsch oder ' + l.sprache + ' …', { type: 'search' })}</div></header>
    ${langs.length > 1 ? `<div class="chips">${langs.map(x => `<a class="chip ${x === l ? 'on' : ''}" href="#/sprache/${encodeURIComponent(x.sprache)}" style="display:inline-flex;align-items:center;text-decoration:none">${esc(x.sprache)}</a>`).join('')}</div>` : ''}
    <div class="chips" id="secchips"><button class="chip" data-sec="fav">★ Favoriten${nF ? ' (' + nF + ')' : ''}</button>${l.abschnitte.map((a, i) => `<button class="chip" data-sec="${i}">${esc(a.titel)}</button>`).join('')}</div>
    <div class="content">${l.hinweis ? `<p class="small" style="margin-top:0">${esc(l.hinweis)}</p>` : ''}<button class="btn ghost small" id="vcheck" style="margin:0 0 10px">🔊 Vorlese-Stimmen prüfen</button>
    <div id="phr">${l.abschnitte.map((a, i) => `<section id="sec${i}"><h3 class="group">${esc(a.titel)}</h3><div class="phrases">${a.saetze.map(s => phraseHtml(s, l)).join('')}</div></section>`).join('')}</div>
    <p class="empty" id="lqnone" hidden>Nichts gefunden.</p></div></div>`;
  let favOnly = false;
  const filter = () => {
    const q = norm($('#lq').value.trim()).replace(/ς/g, 'σ');
    let n = 0;
    $app.querySelectorAll('#phr .phrase').forEach(el => {
      const st = el.querySelector('[data-pfav]');
      const hit = (!q || norm(el.querySelector('.ptext').textContent).replace(/ς/g, 'σ').includes(q)) && (!favOnly || (st && st.classList.contains('on')));
      el.hidden = !hit; if (hit) n++;
    });
    $app.querySelectorAll('#phr section').forEach(s => s.hidden = !s.querySelector('.phrase:not([hidden])'));
    $('#lqnone').hidden = n > 0;
  };
  $('#secchips').onclick = e => {
    const b = e.target.closest('[data-sec]'); if (!b) return;
    if (b.dataset.sec === 'fav') { favOnly = !favOnly; b.classList.toggle('on', favOnly); filter(); return; }
    if (favOnly) { favOnly = false; $('[data-sec="fav"]').classList.remove('on'); filter(); }
    const s = $('#sec' + b.dataset.sec); window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 12, behavior: 'smooth' });
  };
  $('#lq').oninput = filter;
  $('#vcheck').onclick = showVoiceHelp;
  // Beim ersten Öffnen: Stimmen prüfen, nur bei fehlender Stimme Hinweis zeigen
  if (!kv.voiceChecked) checkVoices().then(r => { if (r.some(x => !x.ok)) showVoiceHelp(); else kvSet('voiceChecked', true); });
}

/* ================= Anreise & Abreise ================= */
const transitUrl = (a, b) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(a)}&destination=${encodeURIComponent(b)}&travelmode=transit`;
function viewArrival(id) {
  const c = cityById[id], a = anreiseOf(id); if (!c || !a) return viewCity(id);
  setAccent(c); setTab('reise');
  const home = homeOf(id);
  $app.innerHTML = `<div class="view"><header class="banner" ${bannerBg(cityHero(c))}>${back('#/stadt/' + encodeURIComponent(id), c.name)}<div class="eyebrow" style="margin-top:14px">Ankunft, Unterkunft und Abreise</div><h1>${esc(c.name)}</h1>
    <div class="sub">Stand: ${esc(T.anreise.stand || '')} · Preise vor Ort prüfen</div></header>
    <div class="content stagger">
      ${home ? `<a class="btn" href="#/karte/${encodeURIComponent(id)}/home">🏠 Unterkunft auf der Karte</a>` : ''}
      <div class="cardbox"><h3>📍 Wichtige Flughäfen & Bahnhöfe</h3>${a.knoten.map(k => `<div class="knoten"><span>${k.icon}</span><div><b>${esc(k.name)}</b><p class="small" style="margin:2px 0 0">${esc(k.info)}</p></div></div>`).join('')}</div>
      ${a.strecken.map((s, si) => `<div class="cardbox route">
        <div class="eyebrow" style="color:var(--c)">${esc(s.datum)}</div><h3 style="font-size:1.15rem;margin:4px 0 10px">${esc(s.titel)}</h3>
        <div class="empf"><b>✅ Am sinnvollsten für uns</b>${esc(s.empfehlung)}</div>
        ${s.optionen.map((o, oi) => `<details class="opt" ${o.empfohlen ? 'open' : ''}><summary><span class="oi">${o.icon}</span><span class="ot"><b>${esc(o.name)}</b>${o.empfohlen ? '<em class="badge">Empfehlung</em>' : ''}<small>${esc(o.dauer)} · ${esc(o.preis)}</small></span></summary>
          <ol>${o.schritte.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
          <div class="stat"><span>Fahrzeit</span><b>${esc(o.dauer)}</b></div><div class="stat"><span>Preis (ca.)</span><b class="wrap">${esc(o.preis)}</b></div><div class="stat"><span>Ticket</span><b class="wrap">${esc(o.ticket)}</b></div></details>`).join('')}
        <a class="btn ghost small" target="_blank" rel="noopener" href="${transitUrl(s.von, s.nach)}">🚇 Route in Google Maps öffnen (Öffis)</a>
      </div>`).join('')}
      <div class="cardbox"><h3>💡 Tipps</h3><ul class="tipps">${a.tipps.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <p class="small" style="text-align:center">Stand ${esc(T.anreise.stand || '')}. ${esc(T.anreise.quellen || 'Recherchiert auf Seiten der Verkehrsbetriebe, Flughäfen und Tourismusämter.')} Preise und Fahrpläne vor Ort prüfen.</p>
    </div></div>`;
}

/* ================= Reiseplan ================= */
function viewPlan() {
  setAccent(null); setTab('reise');
  const pl = kv[kvKey('plan')] || {};
  const PLAN = T.plan || [];
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>🗓️ Reiseplan</h1><div class="sub">Uhrzeiten und Buchungsnummern selbst eintragen</div></header>
    <div class="content stagger">${PLAN.map(x => { const v = pl[x.id] || {}; return `<div class="cardbox plan">
      <div class="planhead"><span class="pi">${x.icon || '📌'}</span><div><b>${esc(x.titel)}</b><div class="small">${esc(x.datum)}</div>${x.ort ? `<div class="small">📍 ${esc(x.ort)}</div>` : ''}</div></div>
      ${x.hinweis ? `<div class="tip" style="margin:8px 0 4px"><b>⚠️ Hinweis</b>${esc(x.hinweis)}</div>` : ''}
      <label>Uhrzeit(en)</label>${field('pz_' + x.id, v.zeit || '', 'z. B. Abfahrt 19:30, Ankunft 9:05')}
      <label>Buchungsnummer</label>${field('pb_' + x.id, v.buchung || '', 'z. B. ABC123')}
      <label>Notiz</label>${field('pn_' + x.id, v.notiz || '', 'Wagen, Sitzplatz, Schlüssel, Check-in …', { area: true })}
      ${x.ort ? `<a class="btn ghost small" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.ort)}">🗺️ In Google Maps öffnen</a>` : ''}
      ${x.eigen ? `<button class="btn ghost small" data-pldel="${esc(x.id)}">Eintrag entfernen</button>` : ''}
      </div>`; }).join('')}
      <div class="cardbox"><h3>➕ Eintrag hinzufügen</h3><label>Was</label>${field('npt', '', 'z. B. Flug Lissabon → Porto')}<label>Wann</label>${field('npd', '', 'z. B. Mo, 12.5.')}<label>Wo</label>${field('npo', '', 'Bahnhof, Flughafen, Adresse')}<button class="btn" id="npadd" style="margin-top:12px">Hinzufügen</button></div>
      <div class="saved" id="plansaved" style="text-align:center"></div></div></div>`;
  PLAN.forEach(x => [['pz_', 'zeit'], ['pb_', 'buchung'], ['pn_', 'notiz']].forEach(([pre, key]) => {
    autosave($('#' + pre + x.id), async v => { const pl2 = Object.assign({}, kv[kvKey('plan')]); pl2[x.id] = Object.assign({}, pl2[x.id], { [key]: v }); await kvSet(kvKey('plan'), pl2); }, $('#plansaved'));
  }));
  const savePlan = async list => {
    if (T.builtin) { const o = overlay(); o.extraPlan = list.filter(x => x.eigen); await saveTripRecord(o); }
    else { const r = Object.assign({}, tripRecords.find(x => x.id === T.id)); r.plan = list; await saveTripRecord(r); }
    viewPlan();
  };
  $('#npadd').onclick = () => {
    const t = $('#npt').value.trim(); if (!t) return toast('Bitte eintragen, was es ist');
    const icon = /flug|flughafen|airport/i.test(t) ? '✈️' : /zug|bahn/i.test(t) ? '🚆' : /bus/i.test(t) ? '🚌' : /fähre|schiff/i.test(t) ? '⛴️' : /hotel|unterkunft|airbnb/i.test(t) ? '🏨' : '📌';
    savePlan(PLAN.concat([{ id: 'e' + Date.now().toString(36), icon, titel: t, datum: $('#npd').value.trim(), ort: $('#npo').value.trim(), eigen: true }]));
  };
  $app.querySelectorAll('[data-pldel]').forEach(b => b.onclick = () => { if (confirm('Eintrag entfernen?')) savePlan(PLAN.filter(x => x.id !== b.dataset.pldel)); });
}

/* ================= Packliste ================= */
function packFromTemplate(src) {
  const l = []; let n = 1;
  if (Array.isArray(src)) src.forEach(x => l.push({ id: n++, gruppe: x.gruppe || 'Allgemein', text: x.text, done: false }));
  else Object.entries(src).forEach(([g, items]) => items.forEach(t => l.push({ id: n++, gruppe: g, text: t, done: false })));
  return l;
}
const templatePack = () => packFromTemplate(kv.packTemplate || PACK_DEFAULT);
function packList() {
  if (kv[kvKey('pack')]) return kv[kvKey('pack')];
  return T.builtin ? packFromTemplate(T.packDefault) : templatePack();
}
function viewPack() {
  setAccent(null); setTab('reise');
  const l = packList(), done = l.filter(x => x.done).length, groups = [...new Set(l.map(x => x.gruppe))];
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>🧳 Packliste</h1><div class="sub">${done} von ${l.length} gepackt</div><div class="pbar"><span style="width:${l.length ? Math.round(100 * done / l.length) : 0}%"></span></div></header>
    <div class="content">
      <div class="cardbox"><h3>➕ Etwas hinzufügen</h3>${field('packnew', '', 'z. B. Reiseführer, Sonnencreme …')}<button class="btn" id="packadd" style="margin-top:10px">Hinzufügen</button></div>
      ${groups.map(g => `<h3 class="group">${esc(g)}</h3><div class="list">${l.filter(x => x.gruppe === g).map(x => `<div class="item packitem ${x.done ? 'done' : ''}"><button class="check ${x.done ? 'on' : ''}" data-pack="${x.id}" aria-label="Gepackt">${x.done ? '✓' : ''}</button><span class="tx"><span class="nm">${esc(x.text)}</span></span><button class="xbtn" data-packdel="${x.id}" aria-label="Entfernen">✕</button></div>`).join('')}</div>`).join('')}
      <div class="cardbox" style="margin-top:20px"><h3>📋 Vorlage für neue Reisen</h3><p class="small">Speichert diese Liste (ohne Haken) als Vorlage. Jede neue Reise startet dann mit genau diesen Sachen.</p>
        <button class="btn ghost" id="packtpl">Als Vorlage speichern</button>${kv.packTemplate ? `<button class="btn ghost" id="packload">Vorlage in diese Reise laden</button>` : ''}</div>
      <button class="btn ghost" id="packreset">Alle Haken entfernen</button>
    </div></div>`;
  const save = async nl => { await kvSet(kvKey('pack'), nl); const y = window.scrollY; viewPack(); window.scrollTo(0, y); };
  $('#packadd').onclick = () => { const t = $('#packnew').value.trim(); if (!t) return; const nl = packList().slice(); nl.push({ id: Math.max(0, ...nl.map(x => x.id)) + 1, gruppe: 'Eigene Sachen', text: t, done: false }); save(nl); };
  $('#packnew').onkeydown = e => { if (e.key === 'Enter') $('#packadd').click(); };
  $('#packreset').onclick = () => { if (confirm('Alle Haken in der Packliste entfernen?')) save(packList().map(x => Object.assign({}, x, { done: false }))); };
  $('#packtpl').onclick = async () => { await kvSet('packTemplate', packList().map(x => ({ gruppe: x.gruppe, text: x.text }))); toast('Als Vorlage gespeichert ✓'); viewPack(); };
  if ($('#packload')) $('#packload').onclick = () => { if (confirm('Die Packliste dieser Reise durch die Vorlage ersetzen? Haken gehen dabei verloren.')) save(templatePack()); };
  $app.querySelector('.content').addEventListener('click', e => {
    const c = e.target.closest('[data-pack]'), d = e.target.closest('[data-packdel]');
    if (c) save(packList().map(x => x.id === +c.dataset.pack ? Object.assign({}, x, { done: !x.done }) : x));
    if (d) { const it = packList().find(x => x.id === +d.dataset.packdel); if (it && confirm(`„${it.text}“ von der Liste entfernen?`)) save(packList().filter(x => x.id !== it.id)); }
  });
}

/* ================= Ausgaben ================= */
// Stichwörter pro Kategorie – es zählen auch Wortteile („Busfahren“ enthält „bus“, „Museumseintritt“ enthält „museum“)
const EX_KEYS = {
  Transport: ['transport', 'bus', 'bahn', 'ubahn', 'u-bahn', 'sbahn', 's-bahn', 'metro', 'tram', 'strassenbahn', 'straßenbahn', ' bim ', 'taxi', 'uber', 'bolt', 'cabify', 'freenow', 'zug', 'fahrt', 'fahren', 'fahrkarte', 'fahrschein', 'fahrticket', 'flughafen', 'airport', 'aerobus', 'flug', 'faehre', 'fähre', 'schiff', 'boot', 'seilbahn', 'telefe', 'standseilbahn', 'zahnrad', 'oeffi', 'öffi', 'rodalies', 'tankstelle', 'benzin', 'parken', 'parkhaus', 'mietwagen', 'roller', 'scooter', 'fahrrad', 'radl', 'leihrad', 'railjet', 'city airport', 'x95', 't-casual', 'tcasual', 'hola barcelona', '7-tage', 'tageskarte', 'wochenkarte', 'gepäck', 'gepaeck', 'koffer'],
  Essen: ['essen', 'restaurant', 'cafe', 'café', 'kaffee', 'cappuccino', 'espresso', 'melange', 'kuchen', 'torte', 'strudel', 'schnitzel', 'wurst', 'würstel', 'wuerstel', 'kaesekrainer', 'käsekrainer', 'pizza', 'pasta', 'burger', 'gyros', 'souvlaki', 'pita', 'tzatziki', 'moussaka', 'tapas', 'paella', 'churros', 'pintxo', 'bocadillo', 'croissant', 'frühstück', 'fruehstueck', 'mittag', 'abendessen', 'dinner', 'lunch', 'brunch', 'snack', 'imbiss', ' eis ', 'eisdiele', 'eiscafé', 'gelato', 'bier', 'wein', 'vermut', 'cava', 'ouzo', 'sangria', 'cocktail', 'drink', 'getränk', 'getraenk', 'trinken', 'wasser', 'saft', 'cola', 'limo', 'supermarkt', 'billa', 'spar', 'hofer', 'lidl', 'mercadona', 'carrefour', 'lebensmittel', 'einkauf lebensmittel', 'bäcker', 'baecker', 'bäckerei', 'semmel', 'brot', 'obst', 'markt', 'mercat', 'boqueria', 'taverne', 'taverna', 'heuriger', 'beisl', 'bar ', 'trinkgeld essen', 'sacher', 'demel', 'figlmüller', 'loukoumades', 'lukumades', 'baklava', 'oliven', 'käse', 'schinken', 'jamón', 'jamon'],
  Eintritt: ['eintritt', 'museum', 'museo', 'museu', 'führung', 'fuehrung', 'tour', 'audioguide', 'ausstellung', 'galerie', ' oper', 'konzert', 'theater', 'show', 'flamenco', 'besichtigung', 'akropolis', 'parthenon', 'agora', 'sagrada', 'güell', 'guell', 'batlló', 'batllo', 'pedrera', 'casa mil', 'schönbrunn', 'schoenbrunn', 'belvedere', 'hofburg', 'sisi', 'schatzkammer', 'riesenrad', 'prater', 'hofreitschule', 'stephansdom', 'turm', 'kathedrale', 'kirche', 'kloster', 'montserrat', 'stadion', 'camp nou', ' zoo', 'aquarium', 'haus des meeres', 'donauturm', 'sounion', 'tempel', 'picasso', 'kombiticket', 'stehplatz', ' spa ', 'therme'],
  Shopping: ['shopping', 'shop', 'laden', 'geschäft', 'geschaeft', 'souvenir', 'andenken', 'geschenk', 'mitbringsel', 'kleidung', 'jacke', 'pullover', 'shirt', 'hose', 'kleid', 'schuhe', 'schuh', 'tasche', 'rucksack', 'schmuck', 'halskette', 'ohrring', ' uhr ', 'buch', 'postkarte', 'magnet', 'kosmetik', 'parfum', 'drogerie', ' dm ', 'bipa', 'zara', 'mango', 'primark', 'einkauf', ' kauf', 'mode ', 'sonnenbrille', 'schirm', 'keramik', 'olivenöl', 'olivenoel', 'honig glas'],
  Sonstiges: ['sonstig', 'apotheke', 'medikament', 'arzt', 'toilette', 'wc', 'klo', 'trinkgeld', 'gebühr', 'gebuehr', 'bankomat', 'geldautomat', 'wäsche', 'waesche', 'friseur', 'simkarte', 'sim-karte', 'roaming', 'handy', 'ladekabel', 'spende', 'schließfach', 'schliessfach', 'strafe', 'kurtaxe', 'touristensteuer']
};
function parseExpense(text) {
  const t = ' ' + text.toLowerCase().replace(/€/g, ' euro ') + ' ';
  let betrag = null, m;
  if ((m = t.match(/(\d+)\s*euro\s*(?:und\s*)?(\d{1,2})\b/))) betrag = +m[1] + (+m[2]) / 100;
  else if ((m = t.match(/(\d+(?:[.,]\d{1,2})?)/))) betrag = parseFloat(m[1].replace(',', '.'));
  // Ausdrücklich genannte Kategorie hat Vorrang (z. B. „… Essen“ am Ende)
  const explicit = t.match(/\b(essen|eintritt|transport|shopping|sonstiges?)\b/g);
  const scores = {}; KATS.forEach(k => scores[k] = 0);
  KATS.forEach(k => EX_KEYS[k].forEach(w => { if (t.includes(w)) scores[k] += w.length >= 4 ? 2 : 1; }));
  // „Ticket“ allein passt zu Transport und Eintritt – zählt für beide wenig
  if (/ticket|karte/.test(t)) { scores.Transport += 1; scores.Eintritt += 1; }
  let kat = null, sicher = false, kandidaten = [];
  if (explicit) { const w = explicit[explicit.length - 1]; kat = w.startsWith('sonst') ? 'Sonstiges' : w[0].toUpperCase() + w.slice(1); sicher = true; }
  else {
    const ranked = KATS.map(k => [k, scores[k]]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]);
    if (ranked.length) {
      kat = ranked[0][0];
      kandidaten = ranked.filter(x => x[1] >= ranked[0][1] - 1).map(x => x[0]);
      sicher = kandidaten.length === 1;
    } else { kat = 'Sonstiges'; kandidaten = KATS.slice(); sicher = false; }
  }
  let notiz = text.replace(/€/g, ' ').replace(/(\d+)\s*euro\s*(?:und\s*)?(\d{1,2})\b/i, ' ').replace(/\d+(?:[.,]\d{1,2})?/, ' ').replace(/\b(euro|eur|cent)\b/gi, ' ')
    .replace(/\b(essen|eintritt|transport|shopping|sonstiges?)\s*$/i, ' ').replace(/\s+/g, ' ').trim();
  if (notiz) notiz = notiz[0].toUpperCase() + notiz.slice(1);
  return { betrag, kat, sicher, kandidaten, notiz };
}
function viewExpenses() {
  setAccent(null); setTab('reise');
  const ex = tripExpenses(), total = ex.reduce((a, e) => a + e.betrag, 0);
  const byCity = CITIES.map(c => ({ c, s: ex.filter(e => e.stadt === c.id).reduce((a, e) => a + e.betrag, 0) }));
  const byKat = KATS.map(k => ({ k, s: ex.filter(e => e.kategorie === k).reduce((a, e) => a + e.betrag, 0) }));
  const maxK = Math.max(1, ...byKat.map(x => x.s));
  const sorted = ex.slice().sort((a, b) => b.zeit.localeCompare(a.zeit));
  const cur = todayCity();
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>💶 Ausgaben</h1><div class="bigsum">${euro(total)}</div><div class="sub">gesamt · ${ex.length} Einträge</div></header>
    <div class="content">
      <div class="cardbox"><h3>➕ Neue Ausgabe</h3>
        <button class="btn voicebtn" type="button" data-mic="exnote" data-mode="expense">${ICON_MIC} Ausgabe ansagen</button>
        <p class="small" style="margin-top:-4px">Zum Beispiel: „12 Euro Schnitzel Essen“ – Betrag und Kategorie werden erkannt.</p>
        <label>Betrag in €</label>${field('exbetrag', '', 'z. B. 12,50', { inputmode: 'decimal', mode: 'replace' })}
        <label>Kategorie</label><div id="katask"></div><div class="katsel" id="katsel">${KATS.map(k => `<button type="button" data-kat="${k}">${KAT_ICON[k]} ${k}</button>`).join('')}</div>
        <label>Stadt</label><div class="seg wrap" id="excity">${CITIES.map(c => `<button type="button" data-city="${esc(c.id)}" class="${c.id === cur ? 'on' : ''}">${esc(c.name)}</button>`).join('')}</div>
        <label>Notiz</label>${field('exnote', '', 'z. B. Schnitzel bei Figlmüller', { mode: 'replace' })}
        <button class="btn" id="exadd" style="margin-top:14px">Speichern</button></div>
      <div class="sumgrid">${byCity.map(x => `<div class="sumcard" style="${colorVars(x.c)}"><small>${esc(x.c.name)}</small><b>${euro(x.s)}</b></div>`).join('')}</div>
      <div class="cardbox"><h3>Nach Kategorie</h3>${byKat.map(x => `<div class="katbar"><span>${KAT_ICON[x.k]} ${x.k}</span><div class="bar"><i style="width:${Math.round(100 * x.s / maxK)}%"></i></div><b>${euro(x.s)}</b></div>`).join('')}</div>
      <h3 class="group">Alle Ausgaben</h3>
      ${sorted.length ? `<div class="list">${sorted.map(e => `<div class="item exitem" style="${colorVars(cityById[e.stadt] || CITIES[0])}"><span class="exi">${KAT_ICON[e.kategorie] || '✨'}</span><span class="tx"><span class="nm">${euro(e.betrag)} <span class="badges">${esc(e.kategorie)}</span></span><span class="ad">${esc((cityById[e.stadt] || {}).name || e.stadt)} · ${new Date(e.zeit).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' })}${e.notiz ? ' · ' + esc(e.notiz) : ''}</span></span><button class="xbtn" data-exdel="${e.eid}" aria-label="Löschen">✕</button></div>`).join('')}</div>` : '<p class="empty">Noch keine Ausgaben eingetragen.</p>'}
    </div></div>`;
  const sel = (box, attr) => $(box).onclick = e => { const b = e.target.closest(`[${attr}]`); if (!b) return; $(box).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); };
  sel('#excity', 'data-city');
  $('#katsel').onclick = e => { const b = e.target.closest('[data-kat]'); if (b) setKat(b.dataset.kat, true); };
  // Kategorie automatisch aus der Notiz vorschlagen, solange nicht von Hand gewählt
  let manualKat = false;
  $('#exnote').addEventListener('input', () => { if (!manualKat && $('#exnote').value.trim()) { const r = parseExpense($('#exnote').value); showKat(r); } });
  $('#exadd').onclick = async () => {
    const b = parseFloat($('#exbetrag').value.replace(/[^\d,.-]/g, '').replace(',', '.'));
    if (!(b > 0)) { toast('Bitte einen Betrag eingeben'); $('#exbetrag').focus(); return; }
    const k = $('#katsel .on');
    if (!k) { toast('Bitte eine Kategorie antippen'); $('#katsel').classList.add('ask'); return; }
    const cityBtn = $('#excity .on') || $('#excity button');
    await addExpense({ reise: T.id, betrag: Math.round(b * 100) / 100, kategorie: k.dataset.kat, stadt: cityBtn ? cityBtn.dataset.city : '', notiz: $('#exnote').value.trim(), zeit: new Date().toISOString() });
    toast('Ausgabe gespeichert ✓');
    viewExpenses(); // Formular ist danach komplett leer
  };
  function setKat(k, manual) { if (manual) manualKat = true; $('#katsel').classList.remove('ask'); $('#katsel').querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.kat === k)); if (manual) $('#katask').innerHTML = ''; }
  function showKat(r) {
    setKat(r.kat, false);
    const ask = $('#katask');
    if (r.sicher) { ask.innerHTML = ''; return; }
    const opts = r.kandidaten.length > 1 && r.kandidaten.length < KATS.length ? r.kandidaten : KATS;
    ask.innerHTML = `<div class="katq">🤔 <b>Welche Kategorie?</b> Vorschlag: ${KAT_ICON[r.kat]} ${r.kat}<div class="katqb">${opts.map(k => `<button type="button" data-qk="${k}" class="${k === r.kat ? 'on' : ''}">${KAT_ICON[k]} ${k}</button>`).join('')}</div></div>`;
    ask.querySelectorAll('[data-qk]').forEach(b => b.onclick = () => { setKat(b.dataset.qk, true); toast('Kategorie: ' + b.dataset.qk, 1500); });
  }
  viewExpenses.showKat = showKat;
  $app.querySelector('.content').addEventListener('click', async e => {
    const d = e.target.closest('[data-exdel]'); if (!d) return;
    if (confirm('Diese Ausgabe löschen?')) { await delExpense(+d.dataset.exdel); const y = window.scrollY; viewExpenses(); window.scrollTo(0, y); }
  });
}
// Ganze Ansage: ersetzt alle Felder (nichts wird angehängt)
function applyExpenseVoice(text) {
  const r = parseExpense(text);
  $('#exbetrag').value = r.betrag != null ? String(r.betrag).replace('.', ',') : '';
  $('#exnote').value = r.notiz || '';
  if (viewExpenses.showKat) viewExpenses.showKat(r);
  toast(r.betrag == null ? 'Betrag nicht erkannt – bitte eintippen' : r.sicher ? `Erkannt: ${euro(r.betrag)} · ${r.kat} – prüfen und speichern` : `Erkannt: ${euro(r.betrag)} – bitte Kategorie bestätigen`, 3500);
}

/* ================= Tagebuch & Rückblick ================= */
function viewDiary() {
  setAccent(null); setTab('reise');
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/reise', 'Reise')}<h1>📖 Reisetagebuch</h1><div class="sub">Ein Eintrag pro Tag – mit Text und Fotos</div></header>
    <div class="content"><div class="list stagger">${DAYS.map(d => { const c = cityById[cityForDay(d)], e = diary[diaryKey(d)], n = photoCount[dayPhotoKey(d)] || 0;
      return `<a class="item dayitem" style="${colorVars(c)}" href="#/tag/${d}"><span class="daybadge"><b>${d.slice(8)}</b><small>${new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { month: 'short' }).replace('.', '')}</small></span><span class="tx"><span class="nm">${fmtDay(d)} · ${esc(dayTitle(d))}</span><span class="ad">${e && e.text ? esc(e.text.slice(0, 80)) : 'Noch kein Eintrag'}${n ? ' · 📷' + n : ''}</span></span><span class="chev">›</span></a>`; }).join('')}</div>
      <a class="btn" href="#/rueckblick" style="margin-top:18px">✨ Rückblick ansehen</a></div></div>`;
}
function viewDay(d) {
  if (!DAYS.includes(d)) return viewDiary();
  const c = cityById[cityForDay(d)]; setAccent(c); setTab('reise');
  const i = DAYS.indexOf(d), prev = DAYS[i - 1], next = DAYS[i + 1];
  const visited = PLACES.filter(p => isDone(p.id) && state[p.id].doneAt && localDay(state[p.id].doneAt) === d);
  $app.innerHTML = `<div class="view"><header class="banner">${back('#/tagebuch', 'Tagebuch')}<div class="eyebrow" style="margin-top:14px">${esc(dayTitle(d))}</div><h1>${fmtDayLong(d)}</h1></header>
    <div class="content stagger">
      <div class="cardbox"><h3>✍️ Unser Tag</h3>${field('daytext', (diary[diaryKey(d)] && diary[diaryKey(d)].text) || '', 'Was habt ihr heute erlebt? Was war das Highlight?', { area: true })}<div class="saved" id="daysaved"></div></div>
      <div class="cardbox"><h3>📷 Fotos des Tages</h3>${photoButtons()}<div class="photos" id="photos"></div></div>
      ${visited.length ? `<h3 class="group">An diesem Tag besucht</h3><div class="list">${visited.map(p => itemHtml(p)).join('')}</div>` : ''}
      <div class="navrow">${prev ? `<a href="#/tag/${prev}"><small>‹ Vortag</small>${fmtDay(prev)}</a>` : '<span></span>'}${next ? `<a href="#/tag/${next}"><small>Nächster Tag ›</small>${fmtDay(next)}</a>` : '<span></span>'}</div>
    </div></div>`;
  const ta = $('#daytext'); ta.classList.add('tall');
  autosave(ta, v => saveDiary(diaryKey(d), v), $('#daysaved'));
  wirePhotos(dayPhotoKey(d));
}
async function viewReview() {
  setAccent(null); setTab('reise');
  const done = PLACES.filter(p => isDone(p.id)), favs = PLACES.filter(p => isFav(p.id));
  const ex = tripExpenses(), total = ex.reduce((a, e) => a + e.betrag, 0);
  const ids = new Set(PLACES.map(p => p.id)), dayKeys = new Set(DAYS.map(dayPhotoKey));
  const allPhotos = (await rq(store('photos').getAll())).filter(p => ids.has(p.id) || dayKeys.has(p.id));
  $app.innerHTML = `<div class="view"><header class="banner big review" ${T.builtin ? bannerBg(37) : (tripCover(T) ? `style="background-image:linear-gradient(180deg,rgba(0,40,45,.2),rgba(0,40,45,.8)),url('${tripCover(T)}');background-size:cover;background-position:center"` : '')}>
    ${back('#/reise', 'Reise')}<div class="eyebrow" style="margin-top:14px">Rückblick</div><h1>${esc(T.name)}</h1><div class="sub">${fmtRange(T.start, T.end)}</div></header>
    <div class="statgrid stagger">
      <div><b>${DAYS.length}</b><small>Tage</small></div><div><b>${done.length}</b><small>Orte besucht</small></div>
      <div><b>${allPhotos.length}</b><small>eigene Fotos</small></div><div><b>${euro(total).replace(/,00\s?€/, ' €')}</b><small>ausgegeben</small></div>
    </div>
    <div class="content">
      ${CITIES.map(c => { const pr = progress(c.id), s = ex.filter(e => e.stadt === c.id).reduce((a, e) => a + e.betrag, 0); return `<div class="citysum" style="${colorVars(c)}"><b>${esc(c.name)}</b><span>${pr.d}/${pr.n} Orte · ${euro(s)}</span><div class="bar"><i style="width:${pr.pct}%"></i></div></div>`; }).join('')}
      ${favs.length ? `<h3 class="group">♥ Lieblingsorte</h3><div class="favchips">${favs.map(p => `<a href="#/ort/${encodeURIComponent(p.id)}" style="${colorVars(cityById[p.stadt])}">${esc(p.name)}</a>`).join('')}</div>` : ''}
      <h3 class="group">Tag für Tag</h3>
      <div class="timeline" id="tl"></div>
    </div></div>`;
  freeUrls();
  const tl = $('#tl');
  for (const d of DAYS) {
    const e = diary[diaryKey(d)], ph = allPhotos.filter(p => p.id === dayPhotoKey(d) || (ids.has(p.id) && localDay(p.ts) === d)).slice(0, 6);
    const vis = PLACES.filter(p => isDone(p.id) && state[p.id].doneAt && localDay(state[p.id].doneAt) === d);
    if (!(e && e.text) && !ph.length && !vis.length) continue;
    const c = cityById[cityForDay(d)];
    const div = document.createElement('div'); div.className = 'tlday'; div.style.cssText = colorVars(c);
    div.innerHTML = `<div class="tldot"></div><a href="#/tag/${d}" class="tlhead"><b>${fmtDayLong(d)}</b><small>${esc(dayTitle(d))}</small></a>
      ${e && e.text ? `<p class="desc">${esc(e.text)}</p>` : ''}
      ${vis.length ? `<div class="favchips small">${vis.map(p => `<a href="#/ort/${encodeURIComponent(p.id)}">✓ ${esc(p.name)}</a>`).join('')}</div>` : ''}<div class="tlphotos"></div>`;
    const box = div.querySelector('.tlphotos');
    ph.forEach(p => { const u = URL.createObjectURL(p.blob); urls.push(u); const im = new Image(); im.src = u; im.alt = ''; im.onclick = () => openViewer(p, u, null); box.appendChild(im); });
    tl.appendChild(div);
  }
  if (!tl.children.length) tl.innerHTML = '<p class="empty">Hier entsteht eure Reise-Geschichte: Schreibt Tagebuch, hakt Orte ab und macht Fotos.</p>';
}

/* ================= Daten / Sicherung ================= */
let lastExport = null;
async function viewData() {
  setAccent(null); setTab('daten');
  const cur = (() => { try { return localStorage.getItem('theme') || 'auto'; } catch (e) { return 'auto'; } })();
  const nPh = Object.entries(photoCount).filter(([k]) => isOwnPhotoKey(k)).reduce((a, [, b]) => a + b, 0);
  const nDone = Object.values(state).filter(s => s.done).length, nNote = Object.values(state).filter(s => s.note).length;
  let persisted = '–'; try { if (navigator.storage && navigator.storage.persisted) persisted = (await navigator.storage.persisted()) ? 'Ja, geschützt ✓' : 'Normal'; } catch (e) {}
  let usage = ''; try { if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); usage = (e.usage / 1048576).toFixed(0) + ' MB'; } } catch (e) {}
  $app.innerHTML = `<div class="view"><header class="banner"><div class="eyebrow">Einstellungen</div><h1>Daten</h1><div class="sub">Sichern, übertragen, Aussehen</div></header>
    <div class="content stagger">
      <div class="cardbox"><h3>💾 Sicherung (alle Reisen)</h3>
        <div class="lastbak ${lastBackupOld() ? 'warn' : ''}">${kv.lastBackup ? 'Zuletzt gesichert: ' + fmtDate(kv.lastBackup) : 'Noch nie gesichert'}</div>
        <p class="small">Alles in einer Datei: alle ${trips.length} Reisen mit eigenen Orten, Haken (mit Datum und Uhrzeit), Favoriten, Notizen, Reiseplänen, Packlisten, Ausgaben, Tagebüchern und allen Fotos. Über das Teilen-Menü z. B. in Google Drive speichern oder an die Claude-App schicken.</p>
        <button class="btn" id="exp">⬆️ Exportieren</button>
        <div id="expmore"></div>
        <button class="btn ghost" id="imp">⬇️ Importieren</button>
        <input type="file" id="fimp" accept=".zip,.json,application/zip,application/json" hidden>
        <div class="saved" id="datamsg"></div></div>
      <div class="cardbox"><h3>📊 Aktueller Stand (alle Reisen)</h3>
        <div class="stat"><span>Reisen</span><b>${trips.length}</b></div>
        <div class="stat"><span>Besuchte Orte</span><b>${nDone}</b></div>
        <div class="stat"><span>Favoriten</span><b>${Object.values(state).filter(s => s.fav).length}</b></div>
        <div class="stat"><span>Notizen</span><b>${nNote}</b></div>
        <div class="stat"><span>Eigene Fotos</span><b>${nPh}</b></div>
        <div class="stat"><span>Ausgaben</span><b>${expenses.length}</b></div>
        <div class="stat"><span>Tagebuch-Einträge</span><b>${Object.values(diary).filter(x => x.text).length}</b></div>
        <div class="stat"><span>Dauerhafter Speicher</span><b>${persisted}</b></div>
        ${usage ? `<div class="stat"><span>Belegter Speicher</span><b>${usage}</b></div>` : ''}</div>
      <div class="cardbox"><h3>🔊 Vorlese-Stimmen</h3><p class="small" style="margin-top:0">Prüft, ob Griechisch, Spanisch, Katalanisch und Deutsch (Österreich) zum Vorlesen auf dem Handy vorhanden sind – mit Anleitung zum Nachladen.</p><button class="btn ghost" id="vcheck2">Stimmen prüfen</button></div>
      <div class="cardbox"><h3>🎨 Darstellung</h3>
        <div class="seg" id="seg"><button data-th="auto" class="${cur === 'auto' ? 'on' : ''}">Auto</button><button data-th="light" class="${cur === 'light' ? 'on' : ''}">Hell</button><button data-th="dark" class="${cur === 'dark' ? 'on' : ''}">Dunkel</button></div></div>
      <p class="credit">Titelbilder: Wikimedia Commons (Urheber und Lizenz unter jedem Bild). Karte: © OpenStreetMap-Mitwirkende, Leaflet (BSD-2). Koordinaten: Nominatim / OpenStreetMap.</p>
    </div></div>`;
  $('#seg').onclick = e => { const b = e.target.closest('[data-th]'); if (!b) return; applyTheme(b.dataset.th); document.querySelectorAll('#seg button').forEach(x => x.classList.toggle('on', x === b)); };
  $('#vcheck2').onclick = showVoiceHelp;
  $('#exp').onclick = () => doExport($('#datamsg'), $('#expmore'));
  $('#imp').onclick = () => $('#fimp').click();
  $('#fimp').onchange = async e => { const f = e.target.files[0]; e.target.value = ''; if (f) doImport(f); };
}
const lastBackupOld = () => !kv.lastBackup || Date.now() - Date.parse(kv.lastBackup) > 36 * 3600 * 1000;
function applyTheme(t) {
  try { if (t === 'auto') localStorage.removeItem('theme'); else localStorage.setItem('theme', t); } catch (e) {}
  if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t;
  syncThemeColor();
}
function syncThemeColor() { const m = document.getElementById('themecolor'); if (m) m.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0a6b70'; }

/* ZIP (ohne Bibliothek) */
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(u8) { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC[(c ^ u8[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeZip(files) {
  const enc = new TextEncoder(), parts = [], cd = []; let off = 0;
  const d = new Date(), dt = ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xFFFF, dd = (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xFFFF;
  for (const f of files) {
    const name = enc.encode(f.name), crc = crc32(f.data), h = new DataView(new ArrayBuffer(30));
    h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true); h.setUint16(10, dt, true); h.setUint16(12, dd, true);
    h.setUint32(14, crc, true); h.setUint32(18, f.data.length, true); h.setUint32(22, f.data.length, true); h.setUint16(26, name.length, true); h.setUint16(28, 0, true);
    parts.push(h.buffer, name, f.data);
    const c = new DataView(new ArrayBuffer(46));
    c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true); c.setUint16(12, dt, true); c.setUint16(14, dd, true);
    c.setUint32(16, crc, true); c.setUint32(20, f.data.length, true); c.setUint32(24, f.data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
    cd.push(c.buffer, name);
    off += 30 + name.length + f.data.length;
  }
  const cdSize = cd.reduce((a, b) => a + (b.byteLength || b.length), 0), e = new DataView(new ArrayBuffer(22));
  e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cdSize, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...cd, e.buffer], { type: 'application/zip' });
}
async function readZip(buf) {
  const dv = new DataView(buf), u8 = new Uint8Array(buf), dec = new TextDecoder(), out = new Map();
  let e = -1; for (let i = buf.byteLength - 22; i >= Math.max(0, buf.byteLength - 70000); i--) if (dv.getUint32(i, true) === 0x06054b50) { e = i; break; }
  if (e < 0) throw new Error('Keine gültige ZIP-Datei');
  const n = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true);
  for (let i = 0; i < n; i++) {
    if (dv.getUint32(p, true) !== 0x02014b50) throw new Error('ZIP beschädigt');
    const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
    const name = dec.decode(u8.subarray(p + 46, p + 46 + nl));
    const ds = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true), raw = u8.subarray(ds, ds + csize);
    if (method === 0) out.set(name, raw);
    else if (method === 8 && 'DecompressionStream' in window) out.set(name, new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer()));
    else throw new Error('Nicht unterstützte ZIP-Kompression');
    p += 46 + nl + el + cl;
  }
  return out;
}

/* Export / Import – Format v3 (alle Reisen) */
function allPlacesIndex() { const m = {}; trips.forEach(t => (t.orte || []).forEach(p => m[String(p.id)] = { name: p.name, reise: t.name })); return m; }
async function buildExport() {
  const idx = allPlacesIndex();
  const status = Object.values(state).filter(s => s.done || s.note || s.fav).map(s => Object.assign({ ort: (idx[String(s.id)] || {}).name || '', reise: (idx[String(s.id)] || {}).reise || '' }, { id: s.id, besucht: !!s.done, besucht_am: s.doneAt || null, favorit: !!s.fav, notiz: s.note || '' }));
  const photos = await rq(store('photos').getAll()), files = [], fotoMeta = [];
  for (const ph of photos) {
    const fn = `fotos/${String(ph.id).replace(/[^a-zA-Z0-9-]/g, '-')}_${ph.pid}.jpg`;
    files.push({ name: fn, data: new Uint8Array(await ph.blob.arrayBuffer()) });
    fotoMeta.push({ schluessel: ph.id, ort: (idx[String(ph.id)] || {}).name || undefined, datei: fn, aufgenommen: new Date(ph.ts).toISOString() });
  }
  const kvOut = {}; Object.entries(kv).forEach(([k, v]) => { if (/^(plan|pack)(:|$)|^packTemplate$|^currentTrip$|^phraseFavs$/.test(k)) kvOut[k] = v; });
  const json = {
    app: 'reisebuechlein', version: 3, exportiert_am: new Date().toISOString(),
    reisen: tripRecords, reisen_uebersicht: trips.map(t => ({ id: t.id, name: t.name, von: t.start, bis: t.end, orte: (t.orte || []).length })),
    status, fotos: fotoMeta, einstellungen: kvOut,
    ausgaben: expenses.map(e => ({ reise: e.reise || BUILTIN_ID, betrag: e.betrag, kategorie: e.kategorie, stadt: e.stadt, notiz: e.notiz, zeit: e.zeit })),
    tagebuch: Object.values(diary).filter(d => d.text).map(d => ({ schluessel: d.date, text: d.text }))
  };
  files.unshift({ name: 'daten.json', data: new TextEncoder().encode(JSON.stringify(json, null, 2)) });
  const blob = makeZip(files), stamp = localDay(Date.now()) + '-' + new Date().toTimeString().slice(0, 5).replace(':', '');
  return { file: new File([blob], `reisebuechlein-sicherung-${stamp}.zip`, { type: 'application/zip' }), orte: status.length, fotos: photos.length };
}
async function markBackedUp() { await kvSet('lastBackup', new Date().toISOString()); updateReminder(); const l = document.querySelector('.lastbak'); if (l) { l.textContent = 'Zuletzt gesichert: ' + fmtDate(kv.lastBackup); l.classList.remove('warn'); } }
async function doExport(msg, more) {
  msg.textContent = 'Sicherung wird erstellt …';
  try {
    const r = await buildExport(); lastExport = r.file;
    msg.textContent = `Fertig: ${trips.length} ${trips.length === 1 ? 'Reise' : 'Reisen'}, ${r.fotos} ${r.fotos === 1 ? 'Foto' : 'Fotos'}, ${(r.file.size / 1048576).toFixed(1)} MB.`;
    offerShare(more, true);
  } catch (e) { msg.textContent = 'Export fehlgeschlagen: ' + e.message; }
}
function saveFile(f) { const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 60000); }
async function shareFile(f) {
  if (navigator.canShare && navigator.canShare({ files: [f] })) {
    try { await navigator.share({ files: [f], title: 'Reisebüchlein Sicherung' }); await markBackedUp(); toast('Gesichert ✓'); return true; }
    catch (e) { if (e.name !== 'AbortError') toast('Teilen nicht möglich – bitte „Speichern“ nutzen'); return false; }
  }
  toast('Teilen wird hier nicht unterstützt – bitte „Speichern“ nutzen'); return false;
}
function offerShare(more, auto) {
  const f = lastExport; if (!f || !more) return;
  more.innerHTML = `<button class="btn ghost" data-share>📤 Teilen (z. B. Google Drive)</button><button class="btn ghost" data-save>💾 Auf dem Handy speichern</button>`;
  more.querySelector('[data-save]').onclick = async () => { saveFile(f); await markBackedUp(); toast('Datei wird gespeichert'); };
  more.querySelector('[data-share]').onclick = () => shareFile(f);
  if (auto && navigator.canShare && navigator.canShare({ files: [f] })) shareFile(f);
}
async function doImport(file) {
  const msg = $('#datamsg');
  try {
    let json, zip = null;
    if (/\.json$/i.test(file.name)) json = JSON.parse(await file.text());
    else { zip = await readZip(await file.arrayBuffer()); const d = zip.get('daten.json'); if (!d) throw new Error('daten.json fehlt'); json = JSON.parse(new TextDecoder().decode(d)); }
    if (json.format === 'reisebuechlein-reise') return importTripFile(file);
    if (json.app !== 'reisebuechlein') throw new Error('Das ist keine Reisebüchlein-Sicherung');
    const fotos = json.fotos || [], v = json.version || 1;
    const nTrips = v >= 3 ? (json.reisen || []).filter(r => r.id !== BUILTIN_ID).length + 1 : 1;
    if (!confirm(`Sicherung vom ${fmtDate(json.exportiert_am)} einlesen?\n${nTrips} ${nTrips === 1 ? 'Reise' : 'Reisen'}, ${fotos.length} Fotos, ${(json.ausgaben || []).length} Ausgaben, ${(json.tagebuch || []).length} Tagebuch-Einträge.\nGleiche Einträge werden überschrieben, nichts wird gelöscht.`)) return;
    let added = 0, exAdded = 0;
    // Doppelte erkennen über Ort + Zeitpunkt + Dateigröße (zwei verschiedene Fotos mit gleicher Zeit bleiben beide erhalten)
    const have = new Set((await rq(store('photos').getAll())).map(p => p.id + '|' + p.ts + '|' + (p.blob ? p.blob.size : 0)));
    const addPh = async (key, m) => {
      const data = zip && zip.get(m.datei), ts = Date.parse(m.aufgenommen) || Date.now(); if (!data) return;
      const sig = key + '|' + ts + '|' + data.length; if (have.has(sig)) return;
      await addPhoto(key, new Blob([data], { type: 'image/jpeg' }), ts); added++;
    };
    const exHave = new Set(expenses.map(e => (e.reise || BUILTIN_ID) + '|' + e.zeit + '|' + e.betrag));
    const addEx = async e => { const r = e.reise || BUILTIN_ID; if (exHave.has(r + '|' + e.zeit + '|' + e.betrag)) return; await addExpense({ reise: r, betrag: +e.betrag, kategorie: e.kategorie, stadt: e.stadt, notiz: e.notiz || '', zeit: e.zeit }); exAdded++; };
    if (v >= 3) {
      for (const r of json.reisen || []) await rq(store('trips', 'readwrite').put(r));
      tripRecords = await rq(store('trips').getAll()); buildTrips();
      for (const s of json.status || []) await saveState(s.id, { done: !!s.besucht, doneAt: s.besucht_am || null, note: s.notiz || '', fav: !!s.favorit });
      for (const m of fotos) await addPh(m.schluessel, m);
      for (const [k, val] of Object.entries(json.einstellungen || {})) await kvSet(k, val);
      for (const e of json.ausgaben || []) await addEx(e);
      for (const d of json.tagebuch || []) if (d.text) await saveDiary(d.schluessel, d.text);
    } else {
      for (const o of json.orte || []) await saveState(o.id, { done: !!o.besucht, doneAt: o.besucht_am || null, note: o.notiz || '', fav: !!o.favorit });
      for (const m of fotos) await addPh(m.tag ? 'tag:' + m.tag : m.ort_id, m);
      if (json.reiseplan) { const pl = {}; json.reiseplan.forEach(x => pl[x.id] = { zeit: x.zeit || '', buchung: x.buchung || '', notiz: x.notiz || '' }); await kvSet('plan', pl); }
      if (Array.isArray(json.packliste) && json.packliste.length) await kvSet('pack', json.packliste);
      for (const e of json.ausgaben || []) await addEx(e);
      for (const t of json.tagebuch || []) if (t.text) await saveDiary(t.datum, t.text);
    }
    Object.keys(imgCache).forEach(k => delete imgCache[k]);
    setTrip(trips.find(t => t.id === (T && T.id)) || trips[0]);
    toast('Import fertig'); await viewData();
    $('#datamsg').textContent = `Importiert: ${nTrips} ${nTrips === 1 ? 'Reise' : 'Reisen'}, ${added} neue Fotos, ${exAdded} neue Ausgaben, Tagebuch: ${(json.tagebuch || []).length} Einträge.`;
  } catch (e) { if (msg) msg.textContent = 'Import fehlgeschlagen: ' + e.message; else toast('Import fehlgeschlagen: ' + e.message, 5000); }
}

/* Abend-Erinnerung (ab 20 Uhr) */
function reminderDue() {
  const now = new Date(), today = localDay(now);
  if (now.getHours() < 20) return false;
  if (kv.lastBackup && localDay(kv.lastBackup) === today) return false;
  if (kv.reminderSnoozed === today) return false;
  return true;
}
function updateReminder() {
  const r = document.getElementById('reminder'); if (!r) return;
  if (!db || !reminderDue() || location.hash.startsWith('#/karte')) { r.hidden = true; return; }
  if (!r.hidden) return;
  r.innerHTML = `<div class="remtext"><b>🌙 Heute schon gesichert?</b><small>${kv.lastBackup ? 'Zuletzt: ' + fmtDate(kv.lastBackup) : 'Noch nie gesichert'}</small></div>
    <div class="remmore"></div><div class="rembtns"><button class="btn" data-remgo style="margin:0">Jetzt sichern</button><button class="btn ghost" data-remlater style="margin:0">Später</button></div>`;
  r.hidden = false;
  r.querySelector('[data-remlater]').onclick = async () => { await kvSet('reminderSnoozed', localDay(Date.now())); r.hidden = true; };
  r.querySelector('[data-remgo]').onclick = async e => {
    const b = e.currentTarget; b.textContent = 'Wird erstellt …';
    try {
      const x = await buildExport(); lastExport = x.file;
      const ok = await shareFile(x.file);
      if (ok) { r.hidden = true; return; }
      b.textContent = 'Jetzt sichern'; offerShare(r.querySelector('.remmore'), false);
    } catch (err) { b.textContent = 'Jetzt sichern'; toast('Sicherung fehlgeschlagen: ' + err.message, 4000); }
  };
}

/* ================= Spracheingabe ================= */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
function voiceHint(extra) { toast((extra ? extra + ' ' : '') + 'Tipp: Nutzt einfach das Mikrofon-Symbol auf eurer Handy-Tastatur – das funktioniert immer.', 5000); }
function startVoice(btn) {
  const target = document.getElementById(btn.dataset.mic), mode = btn.dataset.mode;
  if (!SR) return voiceHint('Spracheingabe ist in diesem Browser nicht verfügbar.');
  if (rec) { rec.abort(); rec = null; document.querySelectorAll('.rec').forEach(b => b.classList.remove('rec')); return; }
  rec = new SR(); rec.lang = 'de-DE'; rec.interimResults = false; rec.maxAlternatives = 1;
  btn.classList.add('rec'); if (navigator.vibrate) navigator.vibrate(15);
  rec.onresult = e => {
    const text = e.results[0][0].transcript.trim(); if (!text || !target) return;
    if (mode === 'expense') return applyExpenseVoice(text);
    const cap = text[0].toUpperCase() + text.slice(1);
    // Ausgaben & Suche: neue Ansage ersetzt das Feld; Notizen/Tagebuch: wird angehängt
    target.value = mode === 'replace' || target.type === 'search' || !target.value ? cap : target.value.replace(/\s*$/, ' ') + text;
    target.dispatchEvent(new Event('input', { bubbles: true }));
  };
  rec.onerror = e => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') voiceHint('Mikrofon ist nicht erlaubt.');
    else if (e.error === 'network') voiceHint('Spracheingabe braucht hier Internet.');
    else if (e.error === 'no-speech') toast('Nichts gehört – bitte nochmal versuchen');
    else if (e.error !== 'aborted') voiceHint('Spracheingabe hat nicht geklappt.');
  };
  rec.onend = () => { btn.classList.remove('rec'); rec = null; };
  try { rec.start(); } catch (err) { btn.classList.remove('rec'); rec = null; voiceHint(); }
}

/* ================= Routing ================= */
function route() {
  if (rec) { rec.abort(); rec = null; }
  cleanupMap(); freeUrls();
  document.getElementById('viewer').hidden = true;
  const m = (location.hash || '#/').split('/').map(x => { try { return decodeURIComponent(x); } catch (e) { return x; } });
  if (m[1] === 'oeffnen') return openTrip(m[2], m.slice(3).map(encodeURIComponent).join('/'));
  const views = {
    reisen: viewTrips, neu: () => viewTripForm(false), bearbeiten: () => viewTripForm(true),
    reise: viewTrip, stadt: () => viewCity(m[2]), ort: () => viewPlace(m[2]), 'ort-neu': () => viewPlaceForm(m[2]), 'ort-edit': () => viewPlaceForm(null, m[2]),
    suche: viewSearch, besucht: viewVisited, favoriten: viewFavs, naehe: viewNear, karte: () => viewMap(m[2], m[3]),
    info: () => viewInfo(m[2]), sprache: () => viewLang(m[2]), anreise: () => viewArrival(m[2]), plan: viewPlan, packliste: viewPack, ausgaben: viewExpenses,
    tagebuch: viewDiary, tag: () => viewDay(m[2]), rueckblick: viewReview, daten: viewData
  };
  (views[m[1]] || viewTrips)();
  document.body.classList.toggle('mapmode', m[1] === 'karte');
  window.scrollTo(0, 0);
  updateReminder();
}
window.addEventListener('hashchange', route);
document.addEventListener('click', async e => {
  const go = e.target.closest('[data-go]'); if (go) { location.hash = go.dataset.go; return; }
  const say = e.target.closest('[data-say]'); if (say) { e.preventDefault(); speak(say.dataset.say, say.dataset.lang, !!say.dataset.slow); return; }
  const pf = e.target.closest('[data-pfav]');
  if (pf) {
    const k = pf.dataset.pfav, l = (kv.phraseFavs || []).slice(), i = l.indexOf(k);
    if (i >= 0) l.splice(i, 1); else l.push(k);
    await kvSet('phraseFavs', l); const on = i < 0;
    document.querySelectorAll('[data-pfav]').forEach(b => { if (b.dataset.pfav === k) { b.classList.toggle('on', on); b.textContent = on ? '★' : '☆'; } });
    toast(on ? '★ Gemerkt' : 'Aus Favoriten entfernt', 1500); return;
  }
  const mic = e.target.closest('[data-mic]'); if (mic) { e.preventDefault(); startVoice(mic); return; }
  const ch = e.target.closest('[data-chip]');
  if (ch) { const id = decodeURIComponent(location.hash.split('/')[2]); cityFilter[T.id + id] = ch.dataset.chip; const y = window.scrollY; viewCity(id); window.scrollTo(0, y); return; }
  const fv = e.target.closest('[data-fav]');
  if (fv) {
    e.preventDefault(); const id = pid(fv.dataset.fav), v = !isFav(id); await saveState(id, { fav: v });
    document.querySelectorAll('[data-fav]').forEach(b => { if (b.dataset.fav === fv.dataset.fav) { b.classList.toggle('on', v); b.setAttribute('aria-pressed', v); } });
    toast(v ? '♥ Als Favorit gemerkt' : 'Favorit entfernt'); if (v && navigator.vibrate) navigator.vibrate(15);
    return;
  }
  const b = e.target.closest('[data-check]'); if (!b) return;
  e.preventDefault(); const id = pid(b.dataset.check), v = !isDone(id);
  await saveState(id, { done: v, doneAt: v ? new Date().toISOString() : null });
  document.querySelectorAll('[data-check]').forEach(x => {
    if (x.dataset.check !== b.dataset.check) return;
    x.classList.toggle('on', v); x.textContent = v ? '✓' : ''; x.setAttribute('aria-pressed', v);
    const item = x.closest('.item'); item.classList.toggle('done', v);
    const ad = item.querySelector('.ad'); if (ad && !location.hash.startsWith('#/naehe')) ad.textContent = v ? '✓ ' + fmtDate(state[id].doneAt) : (P(id) || {}).adresse || '';
  });
  if (v && navigator.vibrate) navigator.vibrate(20);
  const h = location.hash.split('/');
  if (h[1] === 'stadt') { const pr = progress(decodeURIComponent(h[2])); const pb = document.querySelector('.banner .pbar span'); if (pb) pb.style.width = pr.pct + '%'; const s = $('#citycount'); if (s) s.textContent = `${pr.d} von ${pr.n} Orten besucht`; }
});

(async function init() {
  syncThemeColor();
  try { db = await openDB(); await loadAll(); }
  catch (err) { $app.innerHTML = '<p class="empty">Speicher (IndexedDB) ist nicht verfügbar. Bitte nicht im privaten Modus öffnen.</p>'; return; }
  try { if (navigator.storage && navigator.storage.persist && !(await navigator.storage.persisted())) { const ok = await navigator.storage.persist(); if (!kv.persistAsked) { await kvSet('persistAsked', true); if (ok) toast('Speicher dauerhaft geschützt ✓'); } } } catch (e) {}
  setTrip(trips.find(t => t.id === kv.currentTrip) || trips[0]);
  await loadTripImages(T);
  // Beim Start: läuft gerade eine Reise, direkt dorthin – sonst „Meine Reisen“
  if (!location.hash || location.hash === '#/' || location.hash === '#') {
    const running = trips.find(t => tripStatus(t) === 'jetzt');
    if (running) { setTrip(running); await loadTripImages(running); location.replace('#/reise'); }
    else location.replace('#/reisen');
  }
  route();
  setInterval(updateReminder, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateReminder(); });
  if ('serviceWorker' in navigator) {
    // Neue Version übernimmt die Kontrolle → einmal automatisch neu laden, damit sie sofort sichtbar ist
    const hadController = !!navigator.serviceWorker.controller; let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !reloaded) { reloaded = true; location.reload(); } });
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(r => r.update()).catch(() => {});
  }
})();
})();
