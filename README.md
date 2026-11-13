# Uborka Navoiy — sayt (Next.js)

Navoiydagi tozalash kompaniyasi uchun ikki tilli (o‘zbek/rus) sayt va admin panel.

- Sayt: `/uz`, `/ru`; xizmatlar: `/uz/xizmatlar`, har bir xizmat uchun alohida sahifa
- Admin panel: `/admin`
- Domen: `uborkanavoi.uz` (sozlamasi `NEXT_PUBLIC_SITE_URL`)

## Kompyuterda ishga tushirish

```bash
npm install
cp .env.example .env.local   # va qiymatlarni to‘ldiring
npm run dev                  # http://localhost:3000
```

Kompyuterda admin paneldagi o‘zgarishlar `data/content.json` faylga, rasmlar `public/uploads` papkaga yoziladi.

## Vercel sozlamalari (Environment Variables)

| Nomi | Nima uchun |
|---|---|
| `ADMIN_PASSWORD` | Admin panel paroli (kamida 8 belgi, kuchli bo‘lsin) |
| `ADMIN_SECRET` | Sessiya imzosi uchun uzun tasodifiy satr |
| `BLOB_READ_WRITE_TOKEN` | Vercel Storage → Blob ulanganda avtomatik qo‘shiladi. Admin o‘zgarishlari va rasmlar shu yerda saqlanadi |
| `TELEGRAM_BOT_TOKEN` | Buyurtmalar Telegram’ga kelishi uchun bot tokeni |
| `TELEGRAM_CHAT_ID` | Buyurtma keladigan chat yoki guruh ID’si |
| `NEXT_PUBLIC_SITE_URL` | Ixtiyoriy, standart qiymati `https://uborkanavoi.uz` |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Ixtiyoriy, Google Search Console kodi |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Ixtiyoriy, Yandex Webmaster kodi |

O‘zgaruvchi qo‘shilgandan keyin saytni qayta deploy qiling.

### Telegram botni ulash

1. Telegram’da @BotFather → `/newbot` → token oling (`TELEGRAM_BOT_TOKEN`).
2. Botni buyurtma keladigan guruhga qo‘shing va guruhga bitta xabar yozing.
3. `https://api.telegram.org/bot<TOKEN>/getUpdates` manzilini oching, `chat.id` qiymatini oling (`TELEGRAM_CHAT_ID`, guruhda minus bilan boshlanadi).
4. Ikkalasini Vercel’ga qo‘shib, qayta deploy qiling.

Bot ulanmaguncha forma mijozga telefon, Telegram va WhatsApp havolalarini ko‘rsatadi.

### Domenni ulash

Vercel → loyiha → Settings → Domains → `uborkanavoi.uz` qo‘shing va domen sotuvchisida Vercel ko‘rsatgan DNS yozuvlarini kiriting.

## SEO

- Har bir sahifada title, description, canonical, `hreflang` (uz/ru), Open Graph va Twitter kartalari
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, ikonlar va OG rasm
- schema.org: `HousekeepingBusiness`, `Service`, `BreadcrumbList`, `FAQPage`
- Narxlar Google’ga faqat admin panelda “Narxlar tekshirildi” belgisi qo‘yilgandan keyin chiqariladi

Domen ulangach: Google Search Console va Yandex Webmaster’ga saytni qo‘shing va `https://uborkanavoi.uz/sitemap.xml` ni yuboring.

## Ishga tushirishdan oldin

- Admin → **Xizmatlar va narxlar**: haqiqiy narxlarni kiriting (hozirgilari namuna) va “Narxlar tekshirildi” belgisini qo‘ying
- Admin → **Oldin / keyin** va **Mijoz fikrlari**: haqiqiy rasmlar va fikrlarni qo‘shing (bo‘sh bo‘lsa, bu bo‘limlar saytda ko‘rinmaydi)
- Admin → **Aloqa sozlamalari**: manzil, ish vaqti, WhatsApp raqami va xarita manzilini tekshiring
