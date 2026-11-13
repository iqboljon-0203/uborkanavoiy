import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { CalcSection, OrderSection, Works } from "@/components/Sections";
import ServicesGrid from "@/components/ServicesGrid";
import { getContent } from "@/lib/content";
import { formatPrice, isLocale, locales, tr, ui, type Locale } from "@/lib/i18n";
import { telHref } from "@/lib/links";
import { BRAND, breadcrumbLd, pageMeta, serviceLd } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const c = await getContent();
  return locales.flatMap((locale) => c.services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const c = await getContent();
  const s = c.services.find((x) => x.slug === slug);
  if (!s) return {};
  const title = tr(s.title, locale);
  const text = `${tr(s.short, locale)} ${tr(s.description, locale)}`.trim();
  return pageMeta({
    locale,
    path: `/xizmatlar/${s.slug}`,
    title: locale === "ru" ? `${title} в Навои | ${BRAND}` : `${title} Navoiyda | ${BRAND}`,
    description: text.length > 158 ? `${text.slice(0, 155).trimEnd()}…` : text,
    image: s.image,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const c = await getContent();
  const s = c.services.find((x) => x.slug === slug);
  if (!s) notFound();
  const t = ui[locale];
  const title = tr(s.title, locale);
  const includes = s.includes[locale].length ? s.includes[locale] : s.includes.uz;
  const others = c.services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <section className="section page-top">
        <div className="wrap">
          <ol className="crumbs">
            <li><Link href={`/${locale}`}>{t.service.home}</Link></li>
            <li><Link href={`/${locale}/xizmatlar`}>{t.service.list}</Link></li>
            <li aria-current="page">{title}</li>
          </ol>
          <div className="svc">
            <div>
              <p className="kicker" data-r>{t.service.inCity}</p>
              <h1 data-r>{title}</h1>
              <p className="svc__lead" data-r>{tr(s.short, locale)}</p>
              {s.price > 0 && (
                <p className="svc__price" data-r>
                  {t.service.priceFrom}: <b>{formatPrice(s.price, locale)}</b> / {t.units[s.unit]}
                </p>
              )}
              <div className="hero__cta" style={{ animation: "none" }}>
                <a className="btn btn--red" href="#buyurtma" data-magnetic>{t.cta.order}</a>
                <a className="btn btn--line" href={telHref(c.settings)}>{t.cta.call}</a>
              </div>
            </div>
            <div className="media svc__img">
              <Image src={s.image} alt={title} fill sizes="(max-width: 1000px) 100vw, 50vw" preload />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap svc__body">
          <div>
            <p data-r>{tr(s.description, locale)}</p>
          </div>
          {includes.length > 0 && (
            <div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", marginBottom: 20 }} data-r>{t.service.includes}</h2>
              <ul className="checks">
                {includes.map((x, i) => (
                  <li key={i} data-r>{x}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <Works c={c} locale={locale} only={s.slug} />
      <CalcSection c={c} locale={locale} initial={s.slug} />

      {others.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="head">
              <h2 data-r>{t.service.other}</h2>
              <Link className="link" href={`/${locale}/xizmatlar`}>{t.cta.allServices} →</Link>
            </div>
            <ServicesGrid
              locale={locale}
              withTabs={false}
              services={others.map((x) => ({
                slug: x.slug,
                image: x.image,
                title: tr(x.title, locale),
                short: tr(x.short, locale),
                audience: x.audience,
                unit: x.unit,
                price: x.price,
              }))}
            />
          </div>
        </section>
      )}

      <OrderSection c={c} locale={locale} initialService={s.slug} />
      <JsonLd data={serviceLd(c, s, locale)} />
      <JsonLd
        data={breadcrumbLd([
          { name: t.service.home, path: `/${locale}` },
          { name: t.service.list, path: `/${locale}/xizmatlar` },
          { name: title, path: `/${locale}/xizmatlar/${s.slug}` },
        ])}
      />
    </>
  );
}
