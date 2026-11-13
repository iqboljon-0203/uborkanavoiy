"use client";

import { useEffect, useRef, useState } from "react";
import { ui, type Locale } from "@/lib/i18n";
import { PREFILL_EVENT, type Prefill } from "./prefill";

type Props = {
  locale: Locale;
  services: { slug: string; title: string }[];
  initialService?: string;
  whatsapp: string;
  telegram: string;
  phoneHref: string;
};

type Status = "idle" | "sending" | "ok" | "fail" | "bad";

export default function OrderForm({ locale, services, initialService, whatsapp, telegram, phoneHref }: Props) {
  const t = ui[locale];
  const [service, setService] = useState(initialService ?? "");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [bad, setBad] = useState<{ name?: boolean; phone?: boolean }>({});
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<Prefill>).detail;
      setService(d.service);
      setNote(d.note);
      setStatus("idle");
      window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const invalid = { name: name.length < 2, phone: phone.replace(/\D/g, "").length < 9 };
    setBad(invalid);
    if (invalid.name || invalid.phone) {
      setStatus("bad");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service: services.find((s) => s.slug === service)?.title || t.form.other,
          note,
          website: String(fd.get("website") || ""),
          locale,
          page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      form.reset();
      setNote("");
    } catch {
      setStatus("fail");
    }
  }

  const waText = [t.form.title, service && services.find((s) => s.slug === service)?.title, note].filter(Boolean).join("\n");

  return (
    <form className="form" onSubmit={submit} noValidate data-r>
      <label className="field">
        <span>{t.form.name}</span>
        <input ref={nameRef} name="name" autoComplete="name" required className={bad.name ? "is-bad" : ""} />
      </label>
      <label className="field">
        <span>{t.form.phone}</span>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+998" required className={bad.phone ? "is-bad" : ""} />
      </label>
      <label className="field">
        <span>{t.form.service}</span>
        <select name="service" value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">{t.form.other}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>{t.form.note}</span>
        <textarea name="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn--red btn--full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.form.sending : t.form.send}
      </button>
      <div role="status" aria-live="polite">
        {status === "ok" && <p className="form__ok">{t.form.ok}</p>}
        {status === "bad" && <p className="form__err">{t.form.bad}</p>}
        {status === "fail" && (
          <div className="form__err">
            <p>{t.form.fail}</p>
            <p style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
              <a className="link" href={phoneHref}>{t.cta.call}</a>
              <a className="link" href={`https://t.me/${telegram}`} target="_blank" rel="noopener">Telegram</a>
              <a className="link" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener">WhatsApp</a>
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
