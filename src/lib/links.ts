import type { Settings } from "./types";

export function telHref(s: Settings) {
  return `tel:${s.phone}`;
}

export function telDisplay(s: Settings) {
  const d = s.phone.replace(/\D/g, "");
  const m = d.match(/^998(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return m ? `+998 ${m[1]} ${m[2]} ${m[3]} ${m[4]}` : s.phone;
}

export function telegramHref(s: Settings) {
  return `https://t.me/${s.telegram}`;
}

export function whatsappHref(s: Settings, text?: string) {
  const base = `https://wa.me/${s.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function instagramHref(s: Settings) {
  return `https://www.instagram.com/${s.instagram}/`;
}

/** Instagram yoki YouTube havolasidan joylashtirish (embed) manzilini yasaydi */
export function videoEmbed(url: string): { src: string; kind: "instagram" | "youtube" } | null {
  const ig = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([\w-]+)/);
  if (ig) return { src: `https://www.instagram.com/reel/${ig[1]}/embed/`, kind: "instagram" };
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (yt) return { src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`, kind: "youtube" };
  return null;
}
