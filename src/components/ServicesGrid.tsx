"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, ui, type Locale } from "@/lib/i18n";
import type { Audience, Unit } from "@/lib/types";

export type CardService = {
  slug: string;
  image: string;
  title: string;
  short: string;
  audience: Audience[];
  unit: Unit;
  price: number;
};

type Props = { locale: Locale; services: CardService[]; withTabs?: boolean; bizBanner?: { title: string; lead: string } };

export default function ServicesGrid({ locale, services, withTabs = true, bizBanner }: Props) {
  const t = ui[locale];
  const [aud, setAud] = useState<Audience>("home");
  const shown = withTabs ? services.filter((s) => s.audience.includes(aud)) : services;

  return (
    <>
      {withTabs && (
        <div className="tabs" role="group" aria-label={t.nav.services} style={{ marginBottom: 28, width: "fit-content" }}>
          {(["home", "biz"] as const).map((a) => (
            <button key={a} className="tab" type="button" aria-pressed={aud === a} onClick={() => setAud(a)}>
              {t.tabs[a]}
            </button>
          ))}
        </div>
      )}
      <div className="cards">
        {shown.map((s) => (
          <article className="card" key={s.slug} data-r>
            <div className="card__media">
              <Image src={s.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw" />
            </div>
            <div className="card__body">
              <h3>
                <Link className="card__link" href={`/${locale}/xizmatlar/${s.slug}`}>
                  {s.title}
                </Link>
              </h3>
              <p>{s.short}</p>
              {s.price > 0 && (
                <span className="card__price">
                  {formatPrice(s.price, locale)} / {t.units[s.unit]}
                </span>
              )}
            </div>
          </article>
        ))}
        {withTabs && aud === "biz" && bizBanner && (
          <article className="card card--red" data-r>
            <div>
              <h3>{bizBanner.title}</h3>
              <p>{bizBanner.lead}</p>
            </div>
            <a className="btn btn--white" href="#buyurtma">
              {t.cta.offer}
            </a>
          </article>
        )}
      </div>
    </>
  );
}
