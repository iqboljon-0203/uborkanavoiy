"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/lib/i18n";

export default function NotFound() {
  const locale = usePathname()?.startsWith("/ru") ? "ru" : "uz";
  const t = ui[locale];
  return (
    <section className="nf">
      <div>
        <h1>404</h1>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>{t.notFound.title}</h2>
        <p>{t.notFound.lead}</p>
        <Link className="btn btn--red" href={`/${locale}`}>{t.notFound.back}</Link>
      </div>
    </section>
  );
}
