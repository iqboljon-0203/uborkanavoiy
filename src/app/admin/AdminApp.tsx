"use client";

import { useEffect, useState, useTransition } from "react";
import type { L } from "@/lib/i18n";
import type { Content, Faq, Review, Service, Stat, Unit, Video, Work } from "@/lib/types";
import type { StorageMode } from "@/lib/storage";
import { logout, saveContent } from "./actions";

type Tab = "services" | "texts" | "works" | "reviews" | "videos" | "stats" | "faq" | "settings";
const TABS: { id: Tab; label: string }[] = [
  { id: "services", label: "Xizmatlar va narxlar" },
  { id: "texts", label: "Matnlar va rasmlar" },
  { id: "works", label: "Oldin / keyin" },
  { id: "reviews", label: "Mijoz fikrlari" },
  { id: "videos", label: "Videolar" },
  { id: "stats", label: "Raqamlar" },
  { id: "faq", label: "Savollar" },
  { id: "settings", label: "Aloqa sozlamalari" },
];

const uid = (p: string) => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
const emptyL = (): L => ({ uz: "", ru: "" });

/* ---------- Maydonlar ---------- */

function Text(props: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; hint?: string; type?: string; placeholder?: string }) {
  const { label, value, onChange, multiline, hint, type = "text", placeholder } = props;
  return (
    <label className="adm-field">
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} rows={4} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function LText({ label, value, onChange, multiline }: { label: string; value: L; onChange: (v: L) => void; multiline?: boolean }) {
  return (
    <fieldset className="adm-pair">
      <legend>{label}</legend>
      <Text label="O‘zbekcha" value={value.uz} multiline={multiline} onChange={(uz) => onChange({ ...value, uz })} />
      <Text label="Ruscha" value={value.ru} multiline={multiline} onChange={(ru) => onChange({ ...value, ru })} />
    </fieldset>
  );
}

function Num({ label, value, onChange, hint }: { label: string; value: number; onChange: (v: number) => void; hint?: string }) {
  return (
    <label className="adm-field">
      <span>{label}</span>
      <input type="number" min={0} value={value} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

async function compress(file: File): Promise<File> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
  if (!blob) throw new Error("compress");
  return new File([blob], "rasm.jpg", { type: "image/jpeg" });
}

function ImageInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr("");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", await compress(file));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        const reasons: Record<string, string> = {
          storage_readonly: "Saqlash joyi ulanmagan (Vercel Blob).",
          unauthorized: "Sessiya tugagan, qayta kiring.",
          too_large: "Rasm juda katta.",
          bad_type: "Faqat JPG, PNG yoki WEBP.",
        };
        throw new Error(reasons[data.error] ?? "Yuklab bo‘lmadi.");
      }
      onChange(data.url);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Yuklab bo‘lmadi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-field adm-image">
      <span>{label}</span>
      <div className="adm-image__row">
        {value ? <img src={value} alt="" /> : <div className="adm-image__empty">Rasm yo‘q</div>}
        <div className="adm-image__ctrl">
          <label className="adm-btn adm-btn--line">
            {busy ? "Yuklanmoqda…" : "Rasm yuklash"}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pick} disabled={busy} hidden />
          </label>
          <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/... yoki https://..." />
          {err && <small className="adm-error">{err}</small>}
        </div>
      </div>
    </div>
  );
}

function Lines({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <label className="adm-field">
      <span>{label}</span>
      <textarea rows={4} value={value.join("\n")} onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trimStart()))} />
      <small>Har bir qatorga bittadan</small>
    </label>
  );
}

function ListEditor<T>(props: {
  items: T[];
  onChange: (items: T[]) => void;
  make?: () => T;
  addLabel?: string;
  title: (item: T, i: number) => string;
  render: (item: T, set: (next: T) => void, i: number) => React.ReactNode;
  max?: number;
  fixed?: boolean;
}) {
  const { items, onChange, make, addLabel, title, render, max = 100, fixed } = props;
  const set = (i: number, next: T) => onChange(items.map((x, j) => (j === i ? next : x)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };
  return (
    <div className="adm-list">
      {items.map((item, i) => (
        <details className="adm-item" key={i}>
          <summary>
            <span>{title(item, i) || `#${i + 1}`}</span>
            <span className="adm-item__tools" onClick={(e) => e.preventDefault()}>
              <button type="button" onClick={() => move(i, -1)} aria-label="Yuqoriga" disabled={i === 0}>↑</button>
              <button type="button" onClick={() => move(i, 1)} aria-label="Pastga" disabled={i === items.length - 1}>↓</button>
              {!fixed && (
                <button type="button" className="danger" onClick={() => confirm("O‘chirilsinmi?") && onChange(items.filter((_, j) => j !== i))}>
                  O‘chirish
                </button>
              )}
            </span>
          </summary>
          <div className="adm-item__body">{render(item, (next) => set(i, next), i)}</div>
        </details>
      ))}
      {!fixed && make && items.length < max && (
        <button type="button" className="adm-btn adm-btn--line" onClick={() => onChange([...items, make()])}>
          + {addLabel ?? "Qo‘shish"}
        </button>
      )}
    </div>
  );
}

/* ---------- Asosiy ilova ---------- */

const TEXT_LABELS: [keyof Content["texts"], string, boolean?][] = [
  ["seoTitle", "Google sarlavhasi (title)"],
  ["seoDescription", "Google tavsifi (description)", true],
  ["heroEyebrow", "Bosh ekran: ustki yozuv"],
  ["heroTitle1", "Bosh ekran: katta sarlavha, 1-qator"],
  ["heroTitle2", "Bosh ekran: katta sarlavha, 2-qator"],
  ["heroLead", "Bosh ekran: matn", true],
  ["introKicker", "Kirish: kichik yozuv"],
  ["introTitle", "Kirish: sarlavha"],
  ["introLead", "Kirish: matn", true],
  ["proofPill", "Raqamlar: belgi"],
  ["proofTitle", "Raqamlar: sarlavha"],
  ["panelKicker", "Dezinfeksiya bloki: kichik yozuv"],
  ["panelTitle", "Dezinfeksiya bloki: sarlavha"],
  ["panelLead", "Dezinfeksiya bloki: matn", true],
  ["bizTitle", "Korxonalar bloki: sarlavha"],
  ["bizLead", "Korxonalar bloki: matn", true],
  ["howPill", "Qadamlar: belgi"],
  ["howTitle", "Qadamlar: sarlavha"],
  ["howLead", "Qadamlar: matn", true],
  ["faqTitle", "Savollar: sarlavha"],
];

export default function AdminApp({ initial, storage }: { initial: Content; storage: StorageMode }) {
  const [c, setC] = useState<Content>(initial);
  const [tab, setTab] = useState<Tab>("services");
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, startSave] = useTransition();

  const update = (fn: (draft: Content) => void) => {
    setC((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
    setMsg(null);
  };

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = () =>
    startSave(async () => {
      const r = await saveContent(JSON.stringify(c));
      if (r.ok) {
        setDirty(false);
        setMsg({ ok: true, text: "Saqlandi. Saytda bir necha soniyada yangilanadi." });
      } else setMsg({ ok: false, text: r.error ?? "Xato" });
    });

  const serviceOptions = c.services.map((s) => ({ value: s.slug, label: s.title.uz }));

  return (
    <div className="adm">
      <header className="adm-top">
        <div className="adm-top__in">
          <img src="/logo.svg" alt="Uborka Navoiy" width={150} height={42} />
          <div className="adm-top__right">
            <a className="adm-btn adm-btn--line" href="/uz" target="_blank" rel="noopener">Saytni ko‘rish ↗</a>
            <button className="adm-btn adm-btn--red" type="button" onClick={save} disabled={saving || !dirty}>
              {saving ? "Saqlanmoqda…" : dirty ? "Saqlash" : "Saqlangan"}
            </button>
            <form action={logout}>
              <button className="adm-btn adm-btn--ghost" type="submit">Chiqish</button>
            </form>
          </div>
        </div>
        {msg && <p className={msg.ok ? "adm-ok" : "adm-error adm-error--bar"}>{msg.text}</p>}
      </header>

      <div className="adm-body">
        <nav className="adm-tabs" aria-label="Bo‘limlar">
          {TABS.map((t) => (
            <button key={t.id} type="button" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>

        <section className="adm-main">
          {storage !== "blob" && (
            <p className={storage === "readonly" ? "adm-warn adm-warn--red" : "adm-warn"}>
              {storage === "readonly"
                ? "Diqqat: saqlash joyi ulanmagan. Vercel loyihasida Storage → Blob’ni ulang, aks holda o‘zgarishlar saqlanmaydi."
                : "Lokal rejim: o‘zgarishlar kompyuterdagi data/content.json fayliga saqlanadi."}
            </p>
          )}

          {tab === "services" && (
            <>
              <h2>Xizmatlar va narxlar</h2>
              {!c.settings.pricesReviewed && (
                <p className="adm-warn adm-warn--red">
                  Narxlar hozircha namuna. Har bir xizmat narxini tekshiring va pastdagi belgini qo‘ying.
                </p>
              )}
              <label className="adm-check">
                <input
                  type="checkbox"
                  checked={c.settings.pricesReviewed}
                  onChange={(e) => update((d) => void (d.settings.pricesReviewed = e.target.checked))}
                />
                Narxlar tekshirildi va to‘g‘ri (Google uchun narxlar e’lon qilinadi)
              </label>
              <ListEditor<Service>
                items={c.services}
                onChange={(items) => update((d) => void (d.services = items))}
                title={(s) => s.title.uz}
                addLabel="Xizmat qo‘shish"
                make={() => ({
                  slug: uid("xizmat-"),
                  image: "/images/hero.jpg",
                  audience: ["home"],
                  title: { uz: "Yangi xizmat", ru: "Новая услуга" },
                  short: emptyL(),
                  description: emptyL(),
                  includes: { uz: [], ru: [] },
                  unit: "m2",
                  price: 0,
                  minPrice: 0,
                })}
                render={(s, set) => (
                  <>
                    <LText label="Nomi" value={s.title} onChange={(title) => set({ ...s, title })} />
                    <Text
                      label="Manzil (slug)"
                      value={s.slug}
                      onChange={(slug) => set({ ...s, slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
                      hint={`Sahifa manzili: /uz/xizmatlar/${s.slug}. Faqat lotin harflari, raqam va chiziqcha. Joylangandan keyin o‘zgartirmang.`}
                    />
                    <div className="adm-row">
                      <label className="adm-check">
                        <input
                          type="checkbox"
                          checked={s.audience.includes("home")}
                          onChange={(e) => set({ ...s, audience: e.target.checked ? [...new Set([...s.audience, "home" as const])] : s.audience.filter((a) => a !== "home") })}
                        />
                        Uylar uchun
                      </label>
                      <label className="adm-check">
                        <input
                          type="checkbox"
                          checked={s.audience.includes("biz")}
                          onChange={(e) => set({ ...s, audience: e.target.checked ? [...new Set([...s.audience, "biz" as const])] : s.audience.filter((a) => a !== "biz") })}
                        />
                        Korxonalar uchun
                      </label>
                    </div>
                    <div className="adm-row">
                      <label className="adm-field">
                        <span>O‘lchov birligi</span>
                        <select value={s.unit} onChange={(e) => set({ ...s, unit: e.target.value as Unit })}>
                          <option value="m2">m² (kvadrat metr)</option>
                          <option value="dona">dona</option>
                          <option value="obyekt">obyekt</option>
                        </select>
                      </label>
                      <Num label="Bir birlik narxi, so‘m" value={s.price} onChange={(price) => set({ ...s, price })} hint="0 bo‘lsa narx ko‘rsatilmaydi" />
                      <Num label="Minimal buyurtma, so‘m" value={s.minPrice} onChange={(minPrice) => set({ ...s, minPrice })} />
                    </div>
                    <ImageInput label="Rasm" value={s.image} onChange={(image) => set({ ...s, image })} />
                    <LText label="Qisqa tavsif (kartada)" value={s.short} onChange={(short) => set({ ...s, short })} />
                    <LText label="To‘liq tavsif (xizmat sahifasida)" value={s.description} multiline onChange={(description) => set({ ...s, description })} />
                    <div className="adm-row">
                      <Lines label="Nimalar kiradi (o‘zbekcha)" value={s.includes.uz} onChange={(uz) => set({ ...s, includes: { ...s.includes, uz } })} />
                      <Lines label="Nimalar kiradi (ruscha)" value={s.includes.ru} onChange={(ru) => set({ ...s, includes: { ...s.includes, ru } })} />
                    </div>
                    <a className="adm-link" href={`/uz/xizmatlar/${s.slug}`} target="_blank" rel="noopener">Sahifani ochish ↗</a>
                  </>
                )}
              />
            </>
          )}

          {tab === "texts" && (
            <>
              <h2>Matnlar va rasmlar</h2>
              {TEXT_LABELS.map(([key, label, multi]) => (
                <LText key={key} label={label} multiline={multi} value={c.texts[key] as L} onChange={(v) => update((d) => void ((d.texts[key] as L) = v))} />
              ))}
              <ImageInput label="Kirish bloki rasmi" value={c.texts.introImage} onChange={(v) => update((d) => void (d.texts.introImage = v))} />
              <ImageInput label="Dezinfeksiya bloki rasmi" value={c.texts.panelImage} onChange={(v) => update((d) => void (d.texts.panelImage = v))} />
              <ImageInput label="Korxonalar bloki rasmi" value={c.texts.bizImage} onChange={(v) => update((d) => void (d.texts.bizImage = v))} />
              <h3>Afzalliklar qatori</h3>
              <ListEditor<L>
                items={c.texts.strip}
                onChange={(items) => update((d) => void (d.texts.strip = items))}
                title={(s) => s.uz}
                make={emptyL}
                max={4}
                render={(s, set) => <LText label="Matn" value={s} onChange={set} />}
              />
              <h3>Ish qadamlari (3 ta)</h3>
              <ListEditor
                items={c.steps}
                fixed
                onChange={(items) => update((d) => void (d.steps = items))}
                title={(s) => s.title.uz}
                render={(s, set) => (
                  <>
                    <LText label="Sarlavha" value={s.title} onChange={(title) => set({ ...s, title })} />
                    <LText label="Matn" value={s.desc} onChange={(desc) => set({ ...s, desc })} />
                    <ImageInput label="Rasm" value={s.image} onChange={(image) => set({ ...s, image })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "works" && (
            <>
              <h2>Oldin / keyin rasmlari</h2>
              <p className="adm-hint">Bir joyning tozalashdan oldingi va keyingi haqiqiy suratlarini yuklang. Bo‘lim saytda kamida bitta ish qo‘shilgandan keyin ko‘rinadi.</p>
              <ListEditor<Work>
                items={c.works}
                onChange={(items) => update((d) => void (d.works = items))}
                title={(w) => w.title.uz}
                addLabel="Ish qo‘shish"
                make={() => ({ id: uid("w"), service: c.services[0]?.slug ?? "", before: "", after: "", title: emptyL() })}
                render={(w, set) => (
                  <>
                    <LText label="Sarlavha" value={w.title} onChange={(title) => set({ ...w, title })} />
                    <label className="adm-field">
                      <span>Xizmat (xizmat sahifasida ham chiqadi)</span>
                      <select value={w.service} onChange={(e) => set({ ...w, service: e.target.value })}>
                        <option value="">—</option>
                        {serviceOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </label>
                    <div className="adm-row">
                      <ImageInput label="Oldin" value={w.before} onChange={(before) => set({ ...w, before })} />
                      <ImageInput label="Keyin" value={w.after} onChange={(after) => set({ ...w, after })} />
                    </div>
                  </>
                )}
              />
            </>
          )}

          {tab === "reviews" && (
            <>
              <h2>Mijoz fikrlari</h2>
              <p className="adm-hint">Faqat haqiqiy mijozlarning ruxsati bilan qo‘shing. Bo‘lim kamida bitta fikr qo‘shilganda ko‘rinadi.</p>
              <ListEditor<Review>
                items={c.reviews}
                onChange={(items) => update((d) => void (d.reviews = items))}
                title={(r) => r.name}
                addLabel="Fikr qo‘shish"
                make={() => ({ id: uid("r"), name: "", role: "", text: "", rating: 5 })}
                render={(r, set) => (
                  <>
                    <div className="adm-row">
                      <Text label="Ism" value={r.name} onChange={(name) => set({ ...r, name })} />
                      <Text label="Kim (ixtiyoriy)" value={r.role} placeholder="Masalan: xonadon, Navoiy" onChange={(role) => set({ ...r, role })} />
                      <label className="adm-field">
                        <span>Baho</span>
                        <select value={r.rating} onChange={(e) => set({ ...r, rating: Number(e.target.value) })}>
                          {[5, 4, 3, 2, 1].map((n) => (
                            <option key={n} value={n}>{"★".repeat(n)}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <Text label="Fikr matni" multiline value={r.text} onChange={(text) => set({ ...r, text })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "videos" && (
            <>
              <h2>Videolar</h2>
              <p className="adm-hint">Instagram reels yoki YouTube havolasini qo‘ying. Video sahifa tez ochilishi uchun faqat bosilganda yuklanadi.</p>
              <ListEditor<Video>
                items={c.videos}
                onChange={(items) => update((d) => void (d.videos = items))}
                title={(v) => v.title.uz || v.url}
                addLabel="Video qo‘shish"
                make={() => ({ id: uid("v"), url: "", title: emptyL() })}
                render={(v, set) => (
                  <>
                    <Text label="Havola" value={v.url} placeholder="https://www.instagram.com/reel/..." onChange={(url) => set({ ...v, url })} />
                    <LText label="Sarlavha" value={v.title} onChange={(title) => set({ ...v, title })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "stats" && (
            <>
              <h2>Raqamlar bloki (4 tagacha)</h2>
              <ListEditor<Stat>
                items={c.stats}
                max={4}
                onChange={(items) => update((d) => void (d.stats = items))}
                title={(s) => `${s.value}${s.suffix} — ${s.label.uz}`}
                addLabel="Raqam qo‘shish"
                make={() => ({ id: uid("s"), value: 0, suffix: "", label: emptyL(), desc: emptyL() })}
                render={(s, set) => (
                  <>
                    <div className="adm-row">
                      <Num label="Son" value={s.value} onChange={(value) => set({ ...s, value })} />
                      <Text label="Belgi (masalan +)" value={s.suffix} onChange={(suffix) => set({ ...s, suffix: suffix.slice(0, 4) })} />
                    </div>
                    <LText label="Nomi" value={s.label} onChange={(label) => set({ ...s, label })} />
                    <LText label="Izoh" value={s.desc} onChange={(desc) => set({ ...s, desc })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "faq" && (
            <>
              <h2>Ko‘p so‘raladigan savollar</h2>
              <ListEditor<Faq>
                items={c.faq}
                onChange={(items) => update((d) => void (d.faq = items))}
                title={(f) => f.q.uz}
                addLabel="Savol qo‘shish"
                make={() => ({ id: uid("f"), q: emptyL(), a: emptyL() })}
                render={(f, set) => (
                  <>
                    <LText label="Savol" value={f.q} onChange={(q) => set({ ...f, q })} />
                    <LText label="Javob" multiline value={f.a} onChange={(a) => set({ ...f, a })} />
                  </>
                )}
              />
            </>
          )}

          {tab === "settings" && (
            <>
              <h2>Aloqa sozlamalari</h2>
              <div className="adm-row">
                <Text label="Telefon" value={c.settings.phone} hint="Masalan: +998933444242" onChange={(v) => update((d) => void (d.settings.phone = v))} />
                <Text label="WhatsApp raqami" value={c.settings.whatsapp} hint="Faqat raqamlar: 998933444242" onChange={(v) => update((d) => void (d.settings.whatsapp = v))} />
              </div>
              <div className="adm-row">
                <Text label="Telegram foydalanuvchi nomi" value={c.settings.telegram} hint="@ belgisisiz" onChange={(v) => update((d) => void (d.settings.telegram = v.replace("@", "")))} />
                <Text label="Instagram" value={c.settings.instagram} hint="@ belgisisiz" onChange={(v) => update((d) => void (d.settings.instagram = v.replace("@", "")))} />
              </div>
              <LText label="Manzil" value={c.settings.address} onChange={(v) => update((d) => void (d.settings.address = v))} />
              <LText label="Ish vaqti (bo‘sh bo‘lsa ko‘rsatilmaydi)" value={c.settings.hours} onChange={(v) => update((d) => void (d.settings.hours = v))} />
              <Text
                label="Google Maps uchun manzil"
                value={c.settings.mapQuery}
                hint="Xaritada ko‘rinadigan manzil yoki koordinata, masalan: Navoiy, Navoiy ko‘chasi 10 yoki 40.1035,65.3739"
                onChange={(v) => update((d) => void (d.settings.mapQuery = v))}
              />
              <Lines label="Biz ishlagan joylar" value={c.settings.places} onChange={(v) => update((d) => void (d.settings.places = v.filter(Boolean)))} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
