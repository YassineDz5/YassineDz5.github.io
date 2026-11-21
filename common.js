// ===== إعدادات Firebase: بدّلها بقيم مشروعك =====
export const firebaseConfig = {
  apiKey: "AIzaSyDnkKaqeHA7QiayqDcfM-e1AMQBMLCiWsw",
  authDomain: "foxdz-d8f5f.firebaseapp.com",
  projectId: "foxdz-d8f5f",
  storageBucket: "foxdz-d8f5f.firebasestorage.app",
  messagingSenderId: "767695548672",
  appId: "1:767695548672:web:94795ceed11846c84e43e5"
};

// إيميل الأدمن (نفس الإيميل لازم يكون في firestore.rules)
export const ADMIN_EMAIL = "yassine99belalia@gmail.com";

export const DEFAULTS = {
  rate: 250,          // دينار لكل 1 دولار
  commissionPct: 10,  // نسبة العمولة %
  minCommission: 300, // أقل عمولة بالدينار
  shippingUsd: 3,     // الشحن لكل طلب بالدولار
  payInfo: "ادفع عبر BaridiMob / CCP على الحساب: ...",
  banner: "",         // إعلان يظهر فوق الموقع (اختياري)
  contact: ""         // رابط تواصل (تيليغرام/واتساب) يظهر كزر عائم
};

export function calc(priceUsd, qty, s) {
  const itemsDzd = priceUsd * qty * s.rate;
  const shipDzd = s.shippingUsd * s.rate;
  const commission = Math.max(s.minCommission, itemsDzd * s.commissionPct / 100);
  const total = Math.round((itemsDzd + shipDzd + commission) / 10) * 10;
  return { itemsDzd: Math.round(itemsDzd), shipDzd: Math.round(shipDzd), commission: Math.round(commission), total };
}

export const STATUS = {
  new: "في انتظار الدفع",
  paid: "تم تأكيد الدفع",
  purchased: "تم الشراء",
  shipped: "في الطريق",
  arrived: "وصل للجزائر",
  delivered: "تم التسليم",
  delayed: "متأخر",
  held: "محجوز في الجمارك",
  refunded: "تم إرجاع المال",
  cancelled: "ملغى"
};

export const WILAYAS = ["أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان","تيميمون","برج باجي مختار","أولاد جلال","بني عباس","عين صالح","عين قزام","تقرت","جانت","المغير","المنيعة"];

export function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
export function safeUrl(u) { return /^https?:\/\//i.test(u) ? u : "#"; }
export function httpsOnly(u) { return /^https:\/\//i.test(u || "") ? u : ""; }
export function timeFmt(ts) {
  return ts?.seconds ? new Date(ts.seconds * 1000).toLocaleString("ar-DZ", { dateStyle: "short", timeStyle: "short" }) : "";
}

// شعار FoxDz (ثعلب)
export const LOGO = (size = 40) => `<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="FoxDz">
<polygon points="8,4 27,19 37,19 56,4 61,33 32,61 3,33" fill="#ff7a1a"/>
<polygon points="12,11 22,19 13,24" fill="#c2410c"/><polygon points="52,11 42,19 51,24" fill="#c2410c"/>
<polygon points="3,33 21,38 32,61" fill="#fff4e6"/><polygon points="61,33 43,38 32,61" fill="#fff4e6"/>
<ellipse cx="23" cy="31" rx="3" ry="4" fill="#1a0e00"/><ellipse cx="41" cy="31" rx="3" ry="4" fill="#1a0e00"/>
<circle cx="32" cy="57" r="3.2" fill="#1a0e00"/></svg>`;




export const STORES = [
  { name: "AliExpress", re: /aliexpress/i, url: "https://www.aliexpress.com" },
  { name: "Temu", re: /temu/i, url: "https://www.temu.com" },
  { name: "Shein", re: /shein/i, url: "https://www.shein.com" },
  { name: "Amazon", re: /amazon|amzn/i, url: "https://www.amazon.com" },
  { name: "eBay", re: /ebay/i, url: "https://www.ebay.com" },
  { name: "Banggood", re: /banggood/i, url: "https://www.banggood.com" },
  { name: "Alibaba", re: /alibaba/i, url: "https://www.alibaba.com" }
];
export function storeOf(link) {
  try { const h = new URL(link).hostname; const s = STORES.find(x => x.re.test(h)); return s ? s.name : "متجر آخر"; }
  catch (e) { return ""; }
}

// مواعيد التخفيضات العالمية (تقريبية، تتحسب تلقائياً للسنة الحالية والجاية)
export function nextSales(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const list = [];
  for (const y of [today.getFullYear(), today.getFullYear() + 1]) {
    const first = 1 + (4 - new Date(y, 10, 1).getDay() + 7) % 7; // أول خميس في نوفمبر
    list.push(
      ["3.28 — ذكرى AliExpress", new Date(y, 2, 28)],
      ["6.18 — تخفيضات منتصف العام", new Date(y, 5, 18)],
      ["9.9 — تخفيضات 9.9", new Date(y, 8, 9)],
      ["11.11 — يوم العزاب (الأكبر عالمياً)", new Date(y, 10, 11)],
      ["الجمعة السوداء Black Friday", new Date(y, 10, first + 22)],
      ["Cyber Monday", new Date(y, 10, first + 25)],
      ["12.12 — تخفيضات 12.12", new Date(y, 11, 12)]
    );
  }
  return list.filter(([, d]) => d >= today).sort((a, b) => a[1] - b[1]).slice(0, 6)
    .map(([name, date]) => ({ name, date, days: Math.round((date - today) / 86400000) }));
}
