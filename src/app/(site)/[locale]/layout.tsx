import type { Metadata, Viewport } from "next";
import { Onest, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Motion from "@/components/Motion";
import { Footer, MobileBar } from "@/components/Sections";
import { getContent } from "@/lib/content";
import { isLocale, locales, tr } from "@/lib/i18n";
import { telDisplay, telHref } from "@/lib/links";
import { BRAND, SITE_URL, businessLd } from "@/lib/seo";
import "../../globals.css";

const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-body", display: "swap" });
const oswald = Oswald({ subsets: ["latin", "cyrillic"], weight: ["600", "700"], variable: "--font-display", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#0e2038", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = await getContent();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: tr(c.texts.seoTitle, locale), template: `%s | ${BRAND}` },
    description: tr(c.texts.seoDescription, locale),
    applicationName: BRAND,
    keywords:
      locale === "ru"
        ? ["клининг Навои", "уборка Навои", "уборка после ремонта", "химчистка мебели", "стирка ковров", "дезинфекция", "мойка окон", "Uborka Navoiy"]
        : ["uborka Navoiy", "tozalash xizmati Navoiy", "klining Navoiy", "remontdan keyingi tozalash", "mebel yuvish", "gilam yuvish", "dezinfeksiya", "oyna yuvish"],
    formatDetection: { telephone: true },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
  };
}

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = await getContent();

  return (
    <html lang={locale} className={`${onest.variable} ${oswald.variable}`}>
      <body>
        <a className="sr" href="#main">Skip</a>
        <div className="progress" id="progress" aria-hidden="true" />
        <Header locale={locale} phoneHref={telHref(c.settings)} phoneText={telDisplay(c.settings)} />
        <main id="main">{children}</main>
        <Footer c={c} locale={locale} />
        <MobileBar c={c} locale={locale} />
        <JsonLd data={businessLd(c, locale)} />
        <Motion />
      </body>
    </html>
  );
}
