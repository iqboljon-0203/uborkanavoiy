import Image from "next/image";
import React from "react";

export type Partner = {
  name: string;
  category: { uz: string; ru: string };
  logo: React.ReactNode;
};

export const PARTNERS_LIST: Partner[] = [
  {
    name: "Art House",
    category: { uz: "Interyer va dizayn", ru: "Интерьер и дизайн" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#1e293b" />
        <path d="M16 7 L7 24 H25 Z" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 20 H21" stroke="#f8fafc" strokeWidth="2" />
        <circle cx="16" cy="14" r="2" fill="#38bdf8" />
      </svg>
    ),
  },
  {
    name: "Malik Karvon",
    category: { uz: "Turistik majmua", ru: "Туристический комплекс" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#b45309" />
        <path d="M7 25 V16 A9 9 0 0 1 25 16 V25" fill="none" stroke="#fef3c7" strokeWidth="1.5" />
        <path d="M11 23 C11 21 12 19 14 19 C15 19 15.5 20 16.5 19 C17.5 18 18 19 19 19 C20 19 21 21 21 23" fill="#fde68a" />
        <circle cx="12" cy="17" r="1.5" fill="#fde68a" />
      </svg>
    ),
  },
  {
    name: "Family Park",
    category: { uz: "Ko‘ngilochar bog‘", ru: "Парк отдыха" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#059669" />
        <circle cx="16" cy="15" r="7" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2.5 1.5" />
        <circle cx="16" cy="15" r="2" fill="#fef08a" />
        <path d="M16 17 L12 26 M16 17 L20 26 M11 25 H21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "SO FIN",
    category: { uz: "Tabiiy mahsulotlar", ru: "Натуральные продукты" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#0284c7" />
        <path d="M16 6 C16 6 10 14 10 18 C10 21.3 12.7 24 16 24 C19.3 24 22 21.3 22 18 C22 14 16 6 16 6 Z" fill="#ffffff" />
        <path d="M18 10 C21 9 24 11 24 14 C21 14 19 12 18 10 Z" fill="#22c55e" />
      </svg>
    ),
  },
  {
    name: "XON BALIQ",
    category: { uz: "Restoranlar tarmog‘i", ru: "Сеть ресторанов" },
    logo: (
      <Image
        src="/logos/xonbaliq.jpg"
        alt="XON BALIQ"
        width={28}
        height={28}
        style={{ objectFit: "cover", width: 28, height: 28, borderRadius: "50%" }}
      />
    ),
  },
  {
    name: "Lulu Cake",
    category: { uz: "Qandolat uyi", ru: "Кондитерская" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#e11d48" />
        <path d="M12 18 L13 25 H19 L20 18 Z" fill="#fecdd3" />
        <path d="M10 18 C10 14 13 11 16 11 C19 11 22 14 22 18 Z" fill="#ffffff" />
        <circle cx="16" cy="9.5" r="2" fill="#fb7185" />
      </svg>
    ),
  },
  {
    name: "Tinchlik Plaza",
    category: { uz: "Mehmonxona va majmua", ru: "Отель и комплекс" },
    logo: (
      <Image
        src="/logos/tinchlik-plaza-icon.png"
        alt="Tinchlik Plaza"
        width={28}
        height={28}
        style={{ objectFit: "cover", width: 28, height: 28, borderRadius: "50%" }}
      />
    ),
  },
  {
    name: "Hobiz Hotel",
    category: { uz: "Mehmonxona", ru: "Отель" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#18181b" />
        <path d="M11 10 V22 M21 10 V22 M11 16 H21" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="8" r="1.2" fill="#fbbf24" />
        <circle cx="12" cy="9" r="1" fill="#fbbf24" />
        <circle cx="20" cy="9" r="1" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    name: "Zarafshon Grand",
    category: { uz: "Grand Hotel", ru: "Гранд Отель" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#0f172a" />
        <circle cx="16" cy="16" r="14.5" fill="none" stroke="#eab308" strokeWidth="1" />
        <path d="M11 11 L13 14 L16 10 L19 14 L21 11 L21 16 H11 Z" fill="#eab308" />
        <text x="16" y="24" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold" fontFamily="serif">ZG</text>
      </svg>
    ),
  },
  {
    name: "Farovon to'yxonasi",
    category: { uz: "Tantanalar saroyi", ru: "Банкетный зал" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#881337" />
        <path d="M16 6 C12 11 10 14 10 19 H22 C22 14 20 11 16 6 Z" fill="#fecdd3" />
        <path d="M16 6 V19 M12 19 V25 M20 19 V25 M9 25 H23" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="16" cy="5" r="1.2" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    name: "Azamat to'yxonasi",
    category: { uz: "Tantanalar saroyi", ru: "Банкетный зал" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#78350f" />
        <path d="M8 22 L10 12 L14 17 L16 10 L18 17 L22 12 L24 22 Z" fill="#fbbf24" stroke="#fef3c7" strokeWidth="0.8" />
        <circle cx="8" cy="22" r="1" fill="#ffffff" />
        <circle cx="24" cy="22" r="1" fill="#ffffff" />
        <circle cx="16" cy="9" r="1.5" fill="#fef08a" />
      </svg>
    ),
  },
  {
    name: "Baraka Non",
    category: { uz: "Nonvoyxona markazi", ru: "Пекарня" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#d97706" />
        <circle cx="16" cy="16" r="8" fill="#fde68a" stroke="#b45309" strokeWidth="1" />
        <circle cx="16" cy="16" r="3" fill="#d97706" />
        <path d="M16 9 V11 M16 21 V23 M9 16 H11 M21 16 H23" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Kif tog'ora markazi",
    category: { uz: "Milliy qandolat", ru: "Кондитерский дом" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#c2410c" />
        <ellipse cx="16" cy="17" rx="9" ry="5" fill="#fef3c7" stroke="#f97316" strokeWidth="1" />
        <path d="M9 17 C9 22 23 22 23 17" fill="#ea580c" />
        <circle cx="16" cy="13" r="2" fill="#fef08a" />
        <circle cx="13" cy="15" r="1.5" fill="#ffffff" />
        <circle cx="19" cy="15" r="1.5" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: "Uzum Market filiallari",
    category: { uz: "Marketpleys", ru: "Маркетплейс" },
    logo: (
      <Image
        src="/logos/uzum-market.png"
        alt="Uzum Market"
        width={28}
        height={28}
        style={{ objectFit: "contain", width: 28, height: 28, borderRadius: 6 }}
      />
    ),
  },
  {
    name: "Davlat tashkilotlari va yirik obyektlar",
    category: { uz: "Ma’muriy binolar", ru: "Госучреждения" },
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#1e3a8a" />
        <path d="M6 12 L16 7 L26 12 H6 Z" fill="#93c5fd" />
        <path d="M8 12 V23 M12 12 V23 M16 12 V23 M20 12 V23 M24 12 V23 M6 23 H26" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="16" cy="10" r="1.5" fill="#fbbf24" />
      </svg>
    ),
  },
];

export function getPartnerLogo(name: string): React.ReactNode | null {
  const clean = name.toLowerCase().replace(/['`’]/g, "");
  const p = PARTNERS_LIST.find((item) => {
    const itemClean = item.name.toLowerCase().replace(/['`’]/g, "");
    return itemClean.includes(clean) || clean.includes(itemClean);
  });
  return p ? p.logo : null;
}

