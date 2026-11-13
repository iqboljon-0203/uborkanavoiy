import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { CalcSection, OrderSection } from "@/components/Sections";
import ServicesGrid from "@/components/ServicesGrid";
import { getContent } from "@/lib/content";
import { isLocale, tr, ui, type Locale } from "@/lib/i18n";
import { BRAND, breadcrumbLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = ui[locale];
  return pageMeta({
    locale,
    path: "/xizmatlar",
    title: `${t.service.listTitle} ${t.service.inCity} | ${BRAND}`,
    description: t.service.listLead,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = await getContent();
  const t = ui[locale];

  return (
    <>
      <section className="section page-top">
        <div className="wrap">
          <ol className="crumbs">
            <li><Link href={`/${locale}`}>{t.service.home}</Link></li>
            <li aria-current="page">{t.service.list}</li>
          </ol>
          <div className="head">
            <h1 className="page-title">{t.service.listTitle}</h1>
            <p>{t.service.listLead}</p>
          </div>
          <ServicesGrid
            locale={locale}
            withTabs={false}
            services={c.services.map((s) => ({
              slug: s.slug,
              image: s.image,
              title: tr(s.title, locale),
              short: tr(s.short, locale),
              audience: s.audience,
              unit: s.unit,
              price: s.price,
            }))}
          />
        </div>
      </section>
      <CalcSection c={c} locale={locale} />
      <OrderSection c={c} locale={locale} />
      <JsonLd
        data={breadcrumbLd([
          { name: t.service.home, path: `/${locale}` },
          { name: t.service.list, path: `/${locale}/xizmatlar` },
        ])}
      />
    </>
  );
}
