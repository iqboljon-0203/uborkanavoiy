import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import {
  CalcSection,
  Contact,
  Faq,
  Hero,
  Intro,
  Marquee,
  OrderSection,
  Panels,
  Partners,
  Proof,
  Reviews,
  Steps,
  Videos,
  Works,
} from "@/components/Sections";
import ServicesGrid from "@/components/ServicesGrid";
import { getContent } from "@/lib/content";
import { isLocale, tr, ui, type Locale } from "@/lib/i18n";
import { faqLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = await getContent();
  return pageMeta({
    locale,
    path: "",
    title: tr(c.texts.seoTitle, locale),
    description: tr(c.texts.seoDescription, locale),
  });
}

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = await getContent();
  const t = ui[locale];

  return (
    <>
      <Hero c={c} locale={locale} />
      <Marquee c={c} locale={locale} />
      <Intro c={c} locale={locale} />

      <section className="section" id="xizmatlar">
        <div className="wrap">
          <div className="head">
            <h2 data-r>{t.sections.services}</h2>
            <p data-r>{t.sections.servicesLead}</p>
          </div>
          <ServicesGrid
            locale={locale}
            services={c.services.map((s) => ({
              slug: s.slug,
              image: s.image,
              title: tr(s.title, locale),
              short: tr(s.short, locale),
              audience: s.audience,
              unit: s.unit,
              price: s.price,
            }))}
            bizBanner={{ title: tr(c.texts.bizTitle, locale), lead: tr(c.texts.bizLead, locale) }}
          />
        </div>
      </section>

      <Proof c={c} locale={locale} />
      <Partners c={c} locale={locale} />
      <Works c={c} locale={locale} />
      <Panels c={c} locale={locale} />
      <CalcSection c={c} locale={locale} />
      <Reviews c={c} locale={locale} />
      <Videos c={c} locale={locale} />
      <Steps c={c} locale={locale} />
      <Faq c={c} locale={locale} />
      <Contact c={c} locale={locale} />
      <OrderSection c={c} locale={locale} />
      <JsonLd data={faqLd(c, locale)} />
    </>
  );
}
