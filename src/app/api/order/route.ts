import { NextResponse } from "next/server";

/** Buyurtmani Telegram botga yuboradi. Kerakli sozlamalar: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID */
export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const field = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Botlar uchun yashirin maydon to'ldirilgan bo'lsa, jim qabul qilamiz
  if (field(body.website, 200)) return NextResponse.json({ ok: true });

  const name = field(body.name, 80);
  const phone = field(body.phone, 30);
  const service = field(body.service, 120);
  const note = field(body.note, 1000);
  const locale = field(body.locale, 2) === "ru" ? "ru" : "uz";
  const page = field(body.page, 200);

  if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Buyurtma kelib tushdi, lekin TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    "🧽 <b>Yangi buyurtma</b> — uborkanavoi.uz",
    "",
    `👤 <b>Ism:</b> ${esc(name)}`,
    `📞 <b>Telefon:</b> ${esc(phone)}`,
    `🧹 <b>Xizmat:</b> ${esc(service || "—")}`,
    note ? `📝 <b>Izoh:</b> ${esc(note)}` : "",
    "",
    `🌐 Til: ${locale.toUpperCase()}${page ? ` · ${esc(page)}` : ""}`,
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Telegram xatosi:", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
    }
  } catch (err) {
    console.error("Telegram'ga ulanib bo'lmadi:", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
