import type { L } from "./i18n";

export type Audience = "home" | "biz";
export type Unit = "m2" | "dona" | "obyekt";

export type Service = {
  slug: string;
  image: string;
  audience: Audience[];
  title: L;
  short: L;
  description: L;
  includes: { uz: string[]; ru: string[] };
  unit: Unit;
  /** Bir birlik narxi, so'm. 0 bo'lsa narx so'rov bo'yicha */
  price: number;
  /** Minimal buyurtma, so'm */
  minPrice: number;
};

export type Work = { id: string; service: string; before: string; after: string; title: L };
export type Review = { id: string; name: string; role: string; text: string; rating: number };
export type Video = { id: string; url: string; title: L };
export type Faq = { id: string; q: L; a: L };
export type Stat = { id: string; value: number; suffix: string; label: L; desc: L };
export type Step = { id: string; image: string; title: L; desc: L };

export type Texts = {
  heroEyebrow: L;
  heroTitle1: L;
  heroTitle2: L;
  heroLead: L;
  introKicker: L;
  introTitle: L;
  introLead: L;
  introImage: string;
  strip: L[];
  proofPill: L;
  proofTitle: L;
  panelKicker: L;
  panelTitle: L;
  panelLead: L;
  panelImage: string;
  bizTitle: L;
  bizLead: L;
  bizImage: string;
  howPill: L;
  howTitle: L;
  howLead: L;
  faqTitle: L;
  seoTitle: L;
  seoDescription: L;
};

export type Settings = {
  phone: string;
  telegram: string;
  whatsapp: string;
  instagram: string;
  address: L;
  hours: L;
  mapQuery: string;
  places: string[];
  /** Narxlar admin tomonidan tekshirilganmi (schema.org'ga narx chiqarish uchun) */
  pricesReviewed: boolean;
};

export type Content = {
  updatedAt: string;
  settings: Settings;
  texts: Texts;
  services: Service[];
  works: Work[];
  reviews: Review[];
  videos: Video[];
  faq: Faq[];
  stats: Stat[];
  steps: Step[];
};
