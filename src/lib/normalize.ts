import { defaultContent } from "@/content/default";
import type { L } from "./i18n";
import type { Audience, Content, Service, Unit } from "./types";

/**
 * Saqlangan yoki admin yuborgan ma'lumotni xavfsiz, to'liq Content shakliga keltiradi.
 * Yetishmagan maydonlar boshlang'ich kontentdan olinadi, noto'g'ri turlar tashlab yuboriladi.
 */
type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

function str(v: unknown, fallback = "", max = 4000): string {
  return typeof v === "string" ? v.slice(0, max) : fallback;
}
function num(v: unknown, fallback = 0, min = 0, max = 1e12): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}
function lang(v: unknown, fallback: L = { uz: "", ru: "" }, max = 4000): L {
  if (!isObj(v)) return { ...fallback };
  return { uz: str(v.uz, fallback.uz, max), ru: str(v.ru, fallback.ru, max) };
}
function list<T>(v: unknown, fallback: T[], map: (item: Obj, i: number) => T | null, max = 200): T[] {
  if (!Array.isArray(v)) return fallback;
  return v.slice(0, max).filter(isObj).map(map).filter((x): x is T => x !== null);
}
function id(v: unknown, i: number, prefix: string): string {
  const s = str(v, "", 60).replace(/[^\w-]/g, "");
  return s || `${prefix}${i + 1}`;
}
/** Rasm manzili: faqat sayt ichidagi yo'l yoki https manzil */
function image(v: unknown, fallback = ""): string {
  const s = str(v, "", 1000).trim();
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^https:\/\/[^\s"'<>]+$/.test(s)) return s;
  return fallback;
}
export function slugify(v: string): string {
  return v
    .toLowerCase()
    .replace(/[‘’'`ʻʼ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const UNITS: Unit[] = ["m2", "dona", "obyekt"];

function service(s: Obj, i: number): Service | null {
  const base = defaultContent.services[i] ?? defaultContent.services[0];
  const title = lang(s.title, { uz: "", ru: "" }, 160);
  const slug = slugify(str(s.slug, "", 80)) || slugify(title.uz);
  if (!slug || !title.uz) return null;
  const audience = Array.isArray(s.audience)
    ? (s.audience.filter((a) => a === "home" || a === "biz") as Audience[])
    : base.audience;
  const inc = isObj(s.includes) ? s.includes : {};
  const incList = (v: unknown) => (Array.isArray(v) ? v.slice(0, 20).map((x) => str(x, "", 200)).filter(Boolean) : []);
  return {
    slug,
    image: image(s.image, base.image),
    audience: audience.length ? audience : ["home"],
    title,
    short: lang(s.short, { uz: "", ru: "" }, 300),
    description: lang(s.description, { uz: "", ru: "" }, 3000),
    includes: { uz: incList(inc.uz), ru: incList(inc.ru) },
    unit: UNITS.includes(s.unit as Unit) ? (s.unit as Unit) : "m2",
    price: num(s.price, 0),
    minPrice: num(s.minPrice, 0),
  };
}

export function normalizeContent(input: unknown): Content {
  const d = defaultContent;
  const c = isObj(input) ? input : {};
  const st = isObj(c.settings) ? c.settings : {};
  const tx = isObj(c.texts) ? c.texts : {};

  const texts = { ...d.texts } as Content["texts"];
  for (const key of Object.keys(d.texts) as (keyof Content["texts"])[]) {
    const def = d.texts[key];
    if (typeof def === "string") (texts as Obj)[key] = image(tx[key], def);
    else if (Array.isArray(def)) (texts as Obj)[key] = list(tx[key], def, (x) => lang(x, undefined, 200), 8);
    else (texts as Obj)[key] = lang(tx[key], def);
  }

  const seen = new Set<string>();
  const services = list(c.services, d.services, service, 60).filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });

  return {
    updatedAt: str(c.updatedAt, d.updatedAt, 40),
    settings: {
      phone: str(st.phone, d.settings.phone, 30).replace(/[^\d+]/g, "") || d.settings.phone,
      telegram: str(st.telegram, d.settings.telegram, 60).replace(/[^\w]/g, ""),
      whatsapp: str(st.whatsapp, d.settings.whatsapp, 30).replace(/\D/g, ""),
      instagram: str(st.instagram, d.settings.instagram, 60).replace(/[^\w.]/g, ""),
      address: lang(st.address, d.settings.address, 300),
      hours: lang(st.hours, d.settings.hours, 200),
      mapQuery: str(st.mapQuery, d.settings.mapQuery, 300),
      places: Array.isArray(st.places) ? st.places.slice(0, 30).map((p) => str(p, "", 120)).filter(Boolean) : d.settings.places,
      pricesReviewed: typeof st.pricesReviewed === "boolean" ? st.pricesReviewed : d.settings.pricesReviewed,
    },
    texts,
    services: services.length ? services : d.services,
    works: list(c.works, d.works, (w, i) => {
      const before = image(w.before);
      const after = image(w.after);
      if (!before || !after) return null;
      return { id: id(w.id, i, "w"), service: slugify(str(w.service, "", 80)), before, after, title: lang(w.title, undefined, 200) };
    }),
    reviews: list(c.reviews, d.reviews, (r, i) => {
      const text = str(r.text, "", 1500).trim();
      const name = str(r.name, "", 80).trim();
      if (!text || !name) return null;
      return { id: id(r.id, i, "r"), name, role: str(r.role, "", 120), text, rating: Math.round(num(r.rating, 5, 1, 5)) };
    }),
    videos: list(c.videos, d.videos, (v, i) => {
      const url = str(v.url, "", 500).trim();
      if (!/^https:\/\//.test(url)) return null;
      return { id: id(v.id, i, "v"), url, title: lang(v.title, undefined, 200) };
    }, 30),
    faq: list(c.faq, d.faq, (f, i) => {
      const q = lang(f.q, undefined, 300);
      if (!q.uz && !q.ru) return null;
      return { id: id(f.id, i, "f"), q, a: lang(f.a, undefined, 2000) };
    }, 40),
    stats: list(c.stats, d.stats, (s, i) => ({
      id: id(s.id, i, "s"),
      value: Math.round(num(s.value, 0)),
      suffix: str(s.suffix, "", 4),
      label: lang(s.label, undefined, 120),
      desc: lang(s.desc, undefined, 300),
    }), 4),
    steps: list(c.steps, d.steps, (s, i) => ({
      id: id(s.id, i, "st"),
      image: image(s.image, d.steps[i]?.image ?? "/images/hero.jpg"),
      title: lang(s.title, undefined, 160),
      desc: lang(s.desc, undefined, 400),
    }), 3),
  };
}
