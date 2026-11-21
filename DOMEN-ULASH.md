# uborkanavoi.uz domenini ulash

Vercel tomoni tayyor: `uborkanavoi.uz`, `www.uborkanavoi.uz` va `admin.uborkanavoi.uz` **uborkanavoiy** loyihasiga qo‘shilgan, `www` asosiy domenga yo‘naltiriladi, `admin` esa admin panelni ochadi. Sayt kodi (SEO, sitemap, canonical, OG rasm) ham shu domenga sozlangan.

Qolgan ish: domenni sotib olish va DNS yozuvlarini kiritish.

## 1. Domenni sotib olish

`.uz` domenlari akkreditatsiyalangan registratorlar orqali olinadi (masalan, Ahost, Webspace, Uzinfocom, Billur). Avval `uborkanavoi.uz` bo‘shligini tekshiring.

## 2. DNS yozuvlari (A variant, tavsiya etiladi)

Registrator panelidagi DNS bo‘limiga quyidagilarni kiriting:

| Turi | Nomi (Host) | Qiymati |
|---|---|---|
| A | `@` | `216.198.79.1` |
| A | `@` | `64.29.17.1` |
| CNAME | `www` | `f9ec00230e3506e9.vercel-dns-017.com.` |
| CNAME | `admin` | `f9ec00230e3506e9.vercel-dns-017.com.` |

`admin` yozuvi admin panel uchun: `https://admin.uborkanavoi.uz`. Parol loyiha papkasidagi `admin-parol.txt` faylida.

`@` uchun boshqa eski A yoki AAAA yozuvlari bo‘lsa, ularni o‘chiring.

**B variant:** registrator ruxsat bersa, nameserverlarni Vercel’ga o‘tkazing: `ns1.vercel-dns.com` va `ns2.vercel-dns.com`. Bu holda yuqoridagi yozuvlar kerak emas.

## 3. Tekshirish

DNS odatda 15 daqiqadan 24 soatgacha tarqaladi. Keyin quyidagini ishga tushiring:

```bash
npx vercel domains verify uborkanavoi.uz
```

Vercel SSL (https) sertifikatini o‘zi beradi. `https://uborkanavoi.uz` ochilsa, tayyor.

## 4. Domen ishlagandan keyin (SEO)

1. **Google Search Console:** `https://uborkanavoi.uz` ni qo‘shing, `sitemap.xml` ni yuboring.
2. **Yandex Webmaster:** shu ishlarni qiling.
3. Tasdiqlash kodlarini Vercel’ga `NEXT_PUBLIC_GOOGLE_VERIFICATION` va `NEXT_PUBLIC_YANDEX_VERIFICATION` sifatida qo‘shib, qayta deploy qiling.
4. **Google Business Profile:** “Uborka Navoiy” profilini oching va sayt manzilini kiriting. Mahalliy qidiruvda bu eng katta ta’sir beradi.
