import type { Metadata } from "next";
import { locales, tr, type Locale } from "./i18n";
import { instagramHref, telegramHref } from "./links";
import type { Content, Service } from "./types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://uborkanavoi.uz").replace(/\/$/, "");
export const BRAND = "Uborka Navoiy";

/** path: tilsiz yo'l, masalan "" yoki "/xizmatlar/gilam-yuvish" */
export function alternates(path: string, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/uz${path}`;
  return { canonical: `/${locale}${path}`, languages };
}

export function pageMeta(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const { locale, path, title, description, image } = opts;
  return {
    title: { absolute: title },
    description,
    alternates: alternates(path, locale),
    openGraph: {
      type: "website",
      siteName: BRAND,
      locale: locale === "ru" ? "ru_RU" : "uz_UZ",
      alternateLocale: locale === "ru" ? ["uz_UZ"] : ["ru_RU"],
      url: `/${locale}${path}`,
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1400, height: 781, alt: title }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

export function businessLd(c: Content, locale: Locale) {
  const s = c.settings;
  return {
    "@context": "https://schema.org",
    "@type": "HousekeepingBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BRAND,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo-mark.svg`,
    image: `${SITE_URL}/images/hero.jpg`,
    description: tr(c.texts.seoDescription, locale),
    telephone: s.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: tr(s.address, locale) || undefined,
      addressLocality: locale === "ru" ? "Навои" : "Navoiy",
      postalCode: "210100",
      addressCountry: "UZ",
    },
    areaServed: { "@type": "City", name: locale === "ru" ? "Навои" : "Navoiy" },
    sameAs: [instagramHref(s), telegramHref(s)],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "ru" ? "Услуги клининга" : "Tozalash xizmatlari",
      itemListElement: c.services.map((sv) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: tr(sv.title, locale), url: `${SITE_URL}/${locale}/xizmatlar/${sv.slug}` },
      })),
    },
  };
}

export function serviceLd(c: Content, sv: Service, locale: Locale) {
  const unitText = { m2: "MTK", dona: "C62", obyekt: "C62" }[sv.unit];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: tr(sv.title, locale),
    description: tr(sv.description, locale) || tr(sv.short, locale),
    image: abs(sv.image),
    url: `${SITE_URL}/${locale}/xizmatlar/${sv.slug}`,
    serviceType: tr(sv.title, locale),
    areaServed: { "@type": "City", name: locale === "ru" ? "Навои" : "Navoiy" },
    provider: { "@id": `${SITE_URL}/#business` },
    // Narx faqat admin tasdiqlagandan keyin chiqariladi
    ...(c.settings.pricesReviewed && sv.price > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "UZS",
            priceSpecification: { "@type": "UnitPriceSpecification", price: sv.price, priceCurrency: "UZS", unitCode: unitText },
          },
        }
      : {}),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}

export function faqLd(c: Content, locale: Locale) {
  const items = c.faq.filter((f) => tr(f.q, locale) && tr(f.a, locale));
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: tr(f.q, locale),
      acceptedAnswer: { "@type": "Answer", text: tr(f.a, locale) },
    })),
  };
}
