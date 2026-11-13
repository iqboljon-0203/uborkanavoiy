import Image from "next/image";
import Link from "next/link";
import { tr, ui, type Locale } from "@/lib/i18n";
import { instagramHref, telDisplay, telegramHref, telHref, whatsappHref } from "@/lib/links";
import type { Content } from "@/lib/types";
import BeforeAfter from "./BeforeAfter";
import Calculator from "./Calculator";
import OrderForm from "./OrderForm";
import { getPartnerLogo } from "./PartnerLogos";
import VideoCard from "./VideoCard";

type P = { c: Content; locale: Locale };

export const Sparkle = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 0c2 13 7 18 20 20-13 2-18 7-20 20-2-13-7-18-20-20 13-2 18-7 20-20Z" />
  </svg>
);

const STRIP_ICONS = [
  "M14 6l4 4M4 20l9-9M12 4l8 8-3 3-8-8Z",
  "M4 11l8-7 8 7M6 10v10h12V10M10 20v-6h4v6",
  "M6 3h9l4 4v14H6ZM14 3v5h5M9 13h7M9 17h7",
  "M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12ZM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
];

export function Hero({ c, locale }: P) {
  const t = ui[locale];
  return (
    <section className="hero" id="hero">
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero-mobile.jpg" />
          <img
            src="/images/hero-desktop.jpg"
            alt={tr(c.texts.heroLead, locale)}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero__shade" aria-hidden="true" />
      </div>
      <div className="wrap hero__in">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-bar" aria-hidden="true" />
            <span>{tr(c.texts.heroEyebrow, locale)}</span>
          </div>
          <h1 className="hero__heading">
            <span className="hero__title-white">{tr(c.texts.heroTitle1, locale)}</span>
            <span className="hero__title-red">
              {tr(c.texts.heroTitle2, locale)}
              <svg className="hero__swoosh" viewBox="0 0 353 34" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 0 28 L 3 23 L 10 18 L 12 18 L 13 17 L 18 17 L 19 16 L 22 16 L 23 15 L 28 15 L 29 14 L 33 14 L 34 13 L 41 13 L 42 12 L 47 12 L 48 11 L 55 11 L 56 10 L 62 10 L 63 9 L 69 9 L 70 8 L 80 8 L 81 7 L 87 7 L 88 6 L 99 6 L 100 5 L 110 5 L 111 4 L 124 4 L 125 3 L 141 3 L 142 2 L 159 2 L 160 1 L 192 1 L 193 0 L 222 0 L 223 1 L 227 1 L 228 0 L 230 0 L 231 1 L 262 1 L 263 2 L 279 2 L 280 3 L 296 3 L 297 4 L 309 4 L 310 5 L 319 5 L 320 6 L 331 6 L 332 7 L 338 7 L 339 8 L 350 8 L 351 9 L 352 9 L 352 9 L 308 9 L 307 8 L 246 8 L 245 9 L 214 9 L 213 10 L 196 10 L 195 11 L 178 11 L 177 12 L 162 12 L 161 13 L 150 13 L 149 14 L 139 14 L 138 15 L 130 15 L 129 16 L 116 16 L 115 17 L 109 17 L 108 18 L 98 18 L 97 19 L 92 19 L 91 20 L 81 20 L 80 21 L 75 21 L 74 22 L 66 22 L 65 23 L 59 23 L 58 24 L 52 24 L 51 25 L 44 25 L 43 26 L 40 26 L 39 27 L 32 27 L 31 28 L 26 28 L 25 29 L 22 29 L 21 30 L 17 30 L 16 31 L 11 31 L 10 32 L 4 32 L 3 33 L 0 33 Z" fill="var(--red)" />
              </svg>
            </span>
          </h1>
          <p className="hero__lead">{tr(c.texts.heroLead, locale)}</p>

          <div className="hero__features">
            <div className="hero__feature">
              <span className="hero__feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <span>{locale === "ru" ? "10 лет опыта" : "10 yillik tajriba"}</span>
            </div>
            <span className="hero__feature-divider" aria-hidden="true" />
            <div className="hero__feature">
              <span className="hero__feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <span>{locale === "ru" ? "100+ сотрудников" : "100 dan ziyod xodim"}</span>
            </div>
            <span className="hero__feature-divider" aria-hidden="true" />
            <div className="hero__feature">
              <span className="hero__feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </span>
              <span>{locale === "ru" ? "1000+ довольных клиентов" : "1000+ mamnun mijoz"}</span>
            </div>
          </div>

          <div className="hero__cta">
            <a className="btn btn--red" href="#kalkulyator" data-magnetic>
              {t.cta.price}
            </a>
            <a className="btn btn--ghost" href={telHref(c.settings)} data-magnetic>
              {t.cta.call}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee({ c, locale }: P) {
  const row = c.services.map((s) => (
    <span key={s.slug} style={{ display: "contents" }}>
      <span>{tr(s.title, locale)}</span>
      <Sparkle />
    </span>
  ));
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq__track">
        {row}
        {row}
      </div>
    </div>
  );
}

export function Intro({ c, locale }: P) {
  const t = ui[locale];
  return (
    <section className="section intro">
      <div className="wrap intro__grid">
        <div className="media intro__img">
          <Image src={c.texts.introImage} alt="" fill sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
        <div>
          <p className="kicker" data-r>{tr(c.texts.introKicker, locale)}</p>
          <h2 data-r>{tr(c.texts.introTitle, locale)}</h2>
          <p className="intro__lead" data-r>{tr(c.texts.introLead, locale)}</p>
          <a className="btn btn--navy" href="#buyurtma" data-r data-magnetic>
            {t.cta.book}
          </a>
        </div>
      </div>
      <ul className="wrap strip">
        {c.texts.strip.map((s, i) => (
          <li key={i} data-r>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={STRIP_ICONS[i % STRIP_ICONS.length]} />
            </svg>
            <span>{tr(s, locale)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Proof({ c, locale }: P) {
  if (!c.stats.length) return null;
  return (
    <section className="section">
      <div className="wrap">
        <div className="proof__head">
          <span className="pill pill--dark" data-r>{tr(c.texts.proofPill, locale)}</span>
          <h2 data-r>{tr(c.texts.proofTitle, locale)}</h2>
        </div>
        <ul className="proof__list">
          {c.stats.map((s) => (
            <li key={s.id} data-r>
              <h3>{tr(s.label, locale)}</h3>
              <p>{tr(s.desc, locale)}</p>
              <b>
                <span data-count={s.value}>{s.value.toLocaleString("ru-RU").replace(/ /g, " ")}</span>
                {s.suffix && <i>{s.suffix}</i>}
              </b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Works({ c, locale, only }: P & { only?: string }) {
  const t = ui[locale];
  const items = only ? c.works.filter((w) => w.service === only) : c.works;
  if (!items.length) return null;
  return (
    <section className="section section--tint" id="natija">
      <div className="wrap">
        <div className="head">
          <h2 data-r>{t.sections.works}</h2>
          <p data-r>{t.sections.worksLead}</p>
        </div>
        <div className={`works${items.length === 1 ? " works--one" : ""}`}>
          {items.map((w) => (
            <BeforeAfter key={w.id} before={w.before} after={w.after} title={tr(w.title, locale)} labels={{ before: t.sections.before, after: t.sections.after }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Panels({ c, locale }: P) {
  const t = ui[locale];
  return (
    <section className="section">
      <div className="wrap">
        <div className="panel">
          <div>
            <p className="kicker kicker--light" data-r>{tr(c.texts.panelKicker, locale)}</p>
            <h2 data-r>{tr(c.texts.panelTitle, locale)}</h2>
            <p data-r>{tr(c.texts.panelLead, locale)}</p>
            <Link
              className="btn btn--red"
              href={c.services.some((x) => x.slug === "dezinfeksiya") ? `/${locale}/xizmatlar/dezinfeksiya` : "#buyurtma"}
              data-r
            >
              {t.cta.more}
            </Link>
          </div>
          <div className="media panel__media">
            <Image src={c.texts.panelImage} alt="" fill sizes="(max-width: 1000px) 100vw, 45vw" />
          </div>
        </div>
        <div className="split">
          <div className="media split__media">
            <Image src={c.texts.bizImage} alt="" fill sizes="(max-width: 1000px) 100vw, 45vw" />
          </div>
          <div className="split__text">
            <h2 data-r>{tr(c.texts.bizTitle, locale)}</h2>
            <p data-r>{tr(c.texts.bizLead, locale)}</p>
            <a className="btn btn--navy" href="#buyurtma" data-r>
              {t.cta.offer}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CalcSection({ c, locale, initial }: P & { initial?: string }) {
  const t = ui[locale];
  const services = c.services.map((s) => ({ slug: s.slug, title: tr(s.title, locale), unit: s.unit, price: s.price, minPrice: s.minPrice }));
  if (!services.some((s) => s.price > 0)) return null;
  return (
    <section className="section section--tint" id="kalkulyator">
      <div className="wrap">
        <div className="head">
          <h2 data-r>{t.calc.title}</h2>
          <p data-r>{t.calc.lead}</p>
        </div>
        <Calculator locale={locale} services={services} initial={initial} />
      </div>
    </section>
  );
}

export function Reviews({ c, locale }: P) {
  if (!c.reviews.length) return null;
  const t = ui[locale];
  return (
    <section className="section" id="fikrlar">
      <div className="wrap">
        <div className="head">
          <h2 data-r>{t.sections.reviews}</h2>
        </div>
        <div className="reviews">
          {c.reviews.map((r) => (
            <figure className="review" key={r.id} data-r>
              <span className="review__stars" aria-label={`${r.rating}/5`}>
                {"★".repeat(r.rating)}
                <span style={{ opacity: 0.25 }}>{"★".repeat(5 - r.rating)}</span>
              </span>
              <blockquote>{r.text}</blockquote>
              <footer>
                <span className="review__avatar" aria-hidden="true">{r.name.charAt(0).toUpperCase()}</span>
                <span>
                  <b>{r.name}</b>
                  {r.role && <small>{r.role}</small>}
                </span>
              </footer>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Videos({ c, locale }: P) {
  if (!c.videos.length) return null;
  const t = ui[locale];
  return (
    <section className="section section--tint" id="videolar">
      <div className="wrap">
        <div className="head">
          <h2 data-r>{t.sections.videos}</h2>
          <p data-r>{t.sections.videosLead}</p>
        </div>
        <div className="videos">
          {c.videos.map((v) => (
            <VideoCard key={v.id} url={v.url} title={tr(v.title, locale)} watch={t.sections.watch} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Steps({ c, locale }: P) {
  const t = ui[locale];
  return (
    <section className="section" id="qanday">
      <div className="wrap">
        <span className="pill pill--dark" data-r>{tr(c.texts.howPill, locale)}</span>
        <div className="how__head">
          <h2 data-r>{tr(c.texts.howTitle, locale)}</h2>
          <p data-r>{tr(c.texts.howLead, locale)}</p>
        </div>
        <ol className="steps">
          {c.steps.map((s, i) => (
            <li key={s.id} data-r>
              <span className="steps__n">{String(i + 1).padStart(2, "0")}</span>
              <div className="steps__media">
                <Image src={s.image} alt="" fill sizes="(max-width: 1000px) 100vw, 33vw" />
              </div>
              <h3>{tr(s.title, locale)}</h3>
              <p>{tr(s.desc, locale)}</p>
            </li>
          ))}
        </ol>
        <div className="center">
          <a className="btn btn--navy" href="#buyurtma" data-magnetic>
            {t.cta.price}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Faq({ c, locale }: P) {
  const items = c.faq.filter((f) => tr(f.q, locale));
  if (!items.length) return null;
  return (
    <section className="section section--tint" id="savollar">
      <div className="wrap faq">
        <h2 data-r>{tr(c.texts.faqTitle, locale)}</h2>
        <div>
          {items.map((f) => (
            <details key={f.id} data-r>
              <summary>{tr(f.q, locale)}</summary>
              <p>{tr(f.a, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Partners({ c, locale }: P) {
  if (!c.settings.places || !c.settings.places.length) return null;
  const isUz = locale === "uz";
  return (
    <section className="section section--tight" id="hamkorlar" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div style={{ padding: "clamp(28px, 4vw, 44px)", borderRadius: 24, background: "var(--tint)", border: "1px solid var(--line)" }} data-r>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 24 }}>
            <div>
              <span className="pill pill--dark" style={{ marginBottom: 12 }}>
                {isUz ? "Bizga ishonch bildirganlar" : "Нам доверяют"}
              </span>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, margin: "8px 0 0" }}>
                {isUz ? "Ochilishiga yaqin binolar va yirik obyektlarni bizga topshirishadi" : "Нам доверяют объекты перед открытием и крупные бренды"}
              </h2>
            </div>
            <p style={{ color: "var(--muted)", margin: 0, fontSize: 15, maxWidth: "32em" }}>
              {isUz
                ? "Navoiy shahridagi eng nufuzli to‘yxonalar, mehmonxonalar, savdo markazlari, marketlar va davlat tashkilotlari tozalikni bizga ishonib topshiradi."
                : "Ведущие рестораны, банкетные залы, отели, торговые центры и государственные учреждения Навои доверяют чистоту нашей команде."}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {c.settings.places.map((place, idx) => {
              const logo = getPartnerLogo(place);
              return (
                <span
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 18px 8px 10px",
                    borderRadius: 99,
                    background: "#fff",
                    color: "var(--ink)",
                    fontWeight: 600,
                    fontSize: 15,
                    boxShadow: "0 2px 8px -2px rgba(14,32,56,0.06)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    {logo || (
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)" }} aria-hidden="true" />
                    )}
                  </span>
                  <span>{place}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactButtons({ c, locale }: P) {
  const t = ui[locale];
  const cls = "btn btn--line btn--sm";
  const s = c.settings;
  const isCoords = /^\s*[\d.-]+\s*,\s*[\d.-]+\s*$/.test(s.mapQuery);
  const mapLink = isCoords
    ? `https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&ll=${encodeURIComponent(s.mapQuery)}&z=16`
    : `https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}`;
  return (
    <div className="contact__btns">
      <a className={cls} href={telHref(s)}>{t.cta.call}</a>
      <a className={cls} href={telegramHref(s)} target="_blank" rel="noopener">Telegram</a>
      <a className={cls} href={whatsappHref(s)} target="_blank" rel="noopener">WhatsApp</a>
      <a className={cls} href={mapLink} target="_blank" rel="noopener">{locale === "ru" ? "Карта ↗" : "Xarita ↗"}</a>
    </div>
  );
}

export function Contact({ c, locale }: P) {
  const t = ui[locale];
  const s = c.settings;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&z=16&hl=${locale}&output=embed`;
  return (
    <section className="section" id="aloqa">
      <div className="wrap">
        <div className="head">
          <h2 data-r>{t.sections.contact}</h2>
        </div>
        <div className="contact">
          <div className="contact__info" data-r>
            <dl>
              <dt>{t.sections.phone}</dt>
              <dd><a href={telHref(s)}>{telDisplay(s)}</a></dd>
            </dl>
            {tr(s.address, locale) && (
              <dl>
                <dt>{t.sections.address}</dt>
                <dd>{tr(s.address, locale)}</dd>
              </dl>
            )}
            {tr(s.hours, locale) && (
              <dl>
                <dt>{t.sections.hours}</dt>
                <dd>{tr(s.hours, locale)}</dd>
              </dl>
            )}
            {s.places.length > 0 && (
              <div className="contact__places" style={{ marginTop: 8 }}>
                <dt style={{ color: "var(--muted)", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{t.sections.places}:</dt>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.places.map((place, idx) => {
                    const logo = getPartnerLogo(place);
                    return (
                      <span
                        key={idx}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "5px 12px 5px 6px",
                          background: "#fff",
                          borderRadius: 99,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--ink)",
                          border: "1px solid var(--line)",
                        }}
                      >
                        {logo && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 20,
                              height: 20,
                              flexShrink: 0,
                              borderRadius: "50%",
                              overflow: "hidden",
                            }}
                          >
                            {logo}
                          </span>
                        )}
                        <span>{place}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            <ContactButtons c={c} locale={locale} />
          </div>
          <div className="map" data-r>
            <iframe src={mapSrc} title={t.sections.contact} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function OrderSection({ c, locale, initialService }: P & { initialService?: string }) {
  const t = ui[locale];
  const s = c.settings;
  return (
    <section className="order" id="buyurtma">
      <div className="wrap order__grid">
        <div>
          <h2 data-r>{t.form.title}</h2>
          <p className="lead" data-r>{t.form.lead}</p>
          <a className="order__tel" href={telHref(s)} data-r>{telDisplay(s)}</a>
          <ContactButtons c={c} locale={locale} />
        </div>
        <OrderForm
          locale={locale}
          services={c.services.map((x) => ({ slug: x.slug, title: tr(x.title, locale) }))}
          initialService={initialService}
          whatsapp={s.whatsapp}
          telegram={s.telegram}
          phoneHref={telHref(s)}
        />
      </div>
    </section>
  );
}

export function Footer({ c, locale }: P) {
  const t = ui[locale];
  const s = c.settings;
  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div>
          <img src="/logo-white.svg" alt="Uborka Navoiy" width={142} height={40} />
          <p>{tr(c.texts.seoDescription, locale)}</p>
        </div>
        <div>
          <h4>{t.nav.services}</h4>
          <ul>
            {c.services.slice(0, 6).map((sv) => (
              <li key={sv.slug}>
                <Link href={`/${locale}/xizmatlar/${sv.slug}`}>{tr(sv.title, locale)}</Link>
              </li>
            ))}
            <li><Link href={`/${locale}/xizmatlar`}>{t.cta.allServices} →</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t.nav.contact}</h4>
          <ul>
            <li><a href={telHref(s)}>{telDisplay(s)}</a></li>
            <li><a href={telegramHref(s)} target="_blank" rel="noopener">Telegram</a></li>
            <li><a href={whatsappHref(s)} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href={instagramHref(s)} target="_blank" rel="noopener">Instagram</a></li>
            <li>{t.footer.city}</li>
          </ul>
        </div>
      </div>
      <div className="wrap foot__bottom">
        <span>© {new Date().getFullYear()} Uborka Navoiy. {t.footer.rights}</span>
        <a href="https://uborkanavoi.uz">uborkanavoi.uz</a>
      </div>
      <div className="foot__word" aria-hidden="true">UBORKA NAVOIY</div>
    </footer>
  );
}

export function MobileBar({ c, locale }: P) {
  const t = ui[locale];
  return (
    <div className="bar">
      <a className="btn btn--line" href={telegramHref(c.settings)} target="_blank" rel="noopener">Telegram</a>
      <a className="btn btn--line" href={whatsappHref(c.settings)} target="_blank" rel="noopener">WhatsApp</a>
      <a className="btn btn--red" href={telHref(c.settings)}>{t.bar.call}</a>
    </div>
  );
}
