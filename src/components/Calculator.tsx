"use client";

import { useMemo, useState } from "react";
import { formatPrice, ui, type Locale } from "@/lib/i18n";
import type { Unit } from "@/lib/types";
import { sendPrefill } from "./prefill";

export type CalcService = { slug: string; title: string; unit: Unit; price: number; minPrice: number };

const RANGE: Record<Unit, { min: number; max: number; step: number; start: number }> = {
  m2: { min: 5, max: 1000, step: 5, start: 60 },
  dona: { min: 1, max: 30, step: 1, start: 3 },
  obyekt: { min: 1, max: 10, step: 1, start: 1 },
};

export default function Calculator({ locale, services, initial }: { locale: Locale; services: CalcService[]; initial?: string }) {
  const t = ui[locale];
  const priced = services.filter((s) => s.price > 0);
  const [slug, setSlug] = useState(initial && priced.some((s) => s.slug === initial) ? initial : priced[0]?.slug ?? "");
  const svc = priced.find((s) => s.slug === slug) ?? priced[0];
  const [amount, setAmount] = useState(svc ? RANGE[svc.unit].start : 0);

  const total = useMemo(() => (svc ? Math.max(svc.minPrice, svc.price * amount) : 0), [svc, amount]);
  if (!svc) return null;
  const range = RANGE[svc.unit];
  const unitLabel = t.units[svc.unit];

  const choose = (next: string) => {
    const s = priced.find((x) => x.slug === next);
    setSlug(next);
    if (s) setAmount(RANGE[s.unit].start);
  };

  const order = () =>
    sendPrefill({
      service: svc.slug,
      note: `${svc.title}: ${amount} ${unitLabel}, ${t.calc.result.toLowerCase()} ≈ ${formatPrice(total, locale)}`,
    });

  return (
    <div className="calc" data-r>
      <div className="calc__form">
        <label className="field">
          <span>{t.calc.service}</span>
          <select value={svc.slug} onChange={(e) => choose(e.target.value)}>
            {priced.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <div className="field">
          <span>
            {t.calc.amount}, {unitLabel}
          </span>
          <div className="amount">
            <input
              type="range"
              min={range.min}
              max={range.max}
              step={range.step}
              value={Math.min(amount, range.max)}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label={t.calc.amount}
            />
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={100000}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Math.min(100000, Number(e.target.value) || 0)))}
              aria-label={`${t.calc.amount}, ${unitLabel}`}
            />
          </div>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>{t.calc.note}</p>
      </div>
      <div className="calc__result" aria-live="polite">
        <div>
          <small>{t.calc.result}</small>
          <div className="calc__sum">
            {locale === "ru" ? `${t.calc.from} ` : ""}
            {formatPrice(total, locale)}
            {locale === "uz" ? ` ${t.calc.from}` : ""}
          </div>
        </div>
        <div className="calc__meta">
          <span>
            {t.calc.perUnit}: {formatPrice(svc.price, locale)} / {unitLabel}
          </span>
          {svc.minPrice > 0 && (
            <span>
              {t.calc.min}: {formatPrice(svc.minPrice, locale)}
            </span>
          )}
        </div>
        <button className="btn btn--red" type="button" onClick={order} data-magnetic>
          {t.calc.apply}
        </button>
      </div>
    </div>
  );
}
