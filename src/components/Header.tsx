"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, ui, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; phoneHref: string; phoneText: string };

export default function Header({ locale, phoneHref, phoneText }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const t = ui[locale];
  const isHome = pathname === `/${locale}`;
  const [solid, setSolid] = useState(!isHome);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setSolid(!isHome || window.scrollY > 24);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `/${locale}/xizmatlar`, label: t.nav.services },
    { href: `/${locale}#kalkulyator`, label: t.nav.calc },
    { href: `/${locale}#natija`, label: t.nav.works },
    { href: `/${locale}#savollar`, label: t.nav.faq },
    { href: `/${locale}#aloqa`, label: t.nav.contact },
  ];

  const swap = (l: Locale) => pathname.replace(/^\/(uz|ru)(?=\/|$)/, `/${l}`);

  const Lang = (
    <div className="lang" role="group" aria-label={t.lang} data-active={locale}>
      <span className="lang__thumb" aria-hidden="true" />
      {locales.map((l) => (
        <Link key={l} href={swap(l)} hrefLang={l} aria-current={l === locale ? "true" : undefined} scroll={false}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className={`nav${solid ? " is-solid" : ""}`}>
        <div className="wrap nav__in">
          <Link href={`/${locale}`} aria-label="Uborka Navoiy">
            <img className="nav__logo" src="/logo-white.svg" alt="Uborka Navoiy" width={153} height={43} />
          </Link>
          <nav className="nav__links" aria-label={t.menu}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__right">
            {Lang}
            <a className="btn btn--red btn--sm" href={phoneHref}>
              <span className="dot" aria-hidden="true" />
              {phoneText}
            </a>
            <button className="burger" type="button" aria-label={t.menu} aria-expanded={open} onClick={() => setOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t.menu} aria-hidden={!open}>
        <div className="drawer__top">
          <img className="nav__logo" src="/logo-white.svg" alt="" width={153} height={43} />
          <button className="burger" type="button" aria-label={t.close} onClick={() => setOpen(false)} style={{ display: "inline-flex" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        {links.map((l) => (
          <Link key={l.href} className="drawer__link" href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {l.label}
          </Link>
        ))}
        <div style={{ marginTop: 16 }}>{Lang}</div>
        <a className="btn btn--red" href={phoneHref} tabIndex={open ? 0 : -1}>
          {phoneText}
        </a>
      </div>
    </>
  );
}
