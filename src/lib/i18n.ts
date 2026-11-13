export const locales = ["uz", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Ikki tildagi matn */
export type L = { uz: string; ru: string };

export function tr(value: L | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.uz || "";
}

const nbsp = " ";
export function formatPrice(n: number, locale: Locale): string {
  const num = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, nbsp);
  return `${num}${nbsp}${locale === "ru" ? "сум" : "so‘m"}`;
}

export const ui = {
  uz: {
    nav: { services: "Xizmatlar", calc: "Narx hisoblash", works: "Ishlar", faq: "Savollar", contact: "Aloqa" },
    menu: "Menyu",
    close: "Yopish",
    lang: "Til",
    cta: {
      price: "Narxni bilish",
      call: "Qo‘ng‘iroq qilish",
      book: "Navbatga yozilish",
      more: "Batafsil",
      allServices: "Barcha xizmatlar",
      offer: "Taklif olish",
      order: "Buyurtma berish",
    },
    tabs: { home: "Uyim uchun", biz: "Korxona uchun" },
    units: { m2: "m²", dona: "dona", obyekt: "obyekt" },
    calc: {
      title: "Narxni oldindan hisoblang",
      lead: "Xizmat va hajmni tanlang, taxminiy narxni darhol ko‘rasiz.",
      service: "Xizmat",
      amount: "Hajm",
      result: "Taxminiy narx",
      from: "dan",
      note: "Yakuniy narx obyekt ko‘rilgandan keyin kelishiladi.",
      apply: "Shu hisob bilan buyurtma",
      min: "Minimal buyurtma",
      perUnit: "Narxi",
    },
    form: {
      title: "Buyurtma qoldiring",
      lead: "Formani to‘ldiring, tez orada o‘zimiz bog‘lanamiz. Yoki to‘g‘ridan-to‘g‘ri yozing.",
      name: "Ismingiz",
      phone: "Telefon raqamingiz",
      service: "Xizmat",
      other: "Boshqa / bilmayman",
      note: "Izoh (hajm, manzil, qulay vaqt)",
      send: "Buyurtma yuborish",
      sending: "Yuborilmoqda…",
      ok: "Rahmat! Buyurtmangiz qabul qilindi. Tez orada bog‘lanamiz.",
      fail: "Hozir yuborib bo‘lmadi. Iltimos, telefon, Telegram yoki WhatsApp orqali bog‘laning.",
      bad: "Ism va telefon raqamini to‘g‘ri kiriting.",
      via: "Yoki shu yerdan yozing:",
    },
    sections: {
      services: "Sizga qaysi tozalash kerak?",
      servicesLead: "Har bir xizmat haqida batafsil ma’lumot va taxminiy narxni ko‘ring.",
      works: "Kirdan tozalikkacha",
      worksLead: "Chiziqni suring va farqni ko‘ring.",
      before: "Oldin",
      after: "Keyin",
      reviews: "Mijozlarimiz fikri",
      videos: "Ishlarimiz videoda",
      videosLead: "Jarayonni o‘z ko‘zingiz bilan ko‘ring.",
      watch: "Videoni ko‘rish",
      contact: "Bizni topish oson",
      address: "Manzil",
      hours: "Ish vaqti",
      phone: "Telefon",
      places: "Biz ishlagan joylardan",
    },
    service: {
      includes: "Xizmatga nimalar kiradi",
      priceFrom: "Narxi",
      per: "uchun",
      other: "Boshqa xizmatlar",
      home: "Bosh sahifa",
      list: "Xizmatlar",
      listTitle: "Xizmatlarimiz",
      listLead: "Uy, ofis va yirik binolar uchun professional tozalash xizmatlari.",
      inCity: "Navoiyda",
    },
    notFound: { title: "Sahifa topilmadi", lead: "Bu sahifa mavjud emas yoki ko‘chirilgan.", back: "Bosh sahifaga qaytish" },
    footer: { city: "Navoiy, O‘zbekiston", rights: "Barcha huquqlar himoyalangan." },
    bar: { call: "Qo‘ng‘iroq" },
  },
  ru: {
    nav: { services: "Услуги", calc: "Расчёт цены", works: "Работы", faq: "Вопросы", contact: "Контакты" },
    menu: "Меню",
    close: "Закрыть",
    lang: "Язык",
    cta: {
      price: "Узнать цену",
      call: "Позвонить",
      book: "Записаться",
      more: "Подробнее",
      allServices: "Все услуги",
      offer: "Получить предложение",
      order: "Заказать",
    },
    tabs: { home: "Для дома", biz: "Для компании" },
    units: { m2: "м²", dona: "шт.", obyekt: "объект" },
    calc: {
      title: "Рассчитайте цену заранее",
      lead: "Выберите услугу и объём, и сразу увидите примерную цену.",
      service: "Услуга",
      amount: "Объём",
      result: "Примерная цена",
      from: "от",
      note: "Итоговая цена согласуется после осмотра объекта.",
      apply: "Заказать с этим расчётом",
      min: "Минимальный заказ",
      perUnit: "Цена",
    },
    form: {
      title: "Оставьте заявку",
      lead: "Заполните форму, и мы скоро свяжемся с вами. Или напишите напрямую.",
      name: "Ваше имя",
      phone: "Ваш номер телефона",
      service: "Услуга",
      other: "Другое / не знаю",
      note: "Комментарий (объём, адрес, удобное время)",
      send: "Отправить заявку",
      sending: "Отправляем…",
      ok: "Спасибо! Заявка принята. Мы скоро свяжемся с вами.",
      fail: "Сейчас не удалось отправить. Пожалуйста, свяжитесь по телефону, в Telegram или WhatsApp.",
      bad: "Введите имя и правильный номер телефона.",
      via: "Или напишите здесь:",
    },
    sections: {
      services: "Какая уборка вам нужна?",
      servicesLead: "Подробности о каждой услуге и примерная цена.",
      works: "От грязи к чистоте",
      worksLead: "Потяните линию и сравните.",
      before: "До",
      after: "После",
      reviews: "Отзывы клиентов",
      videos: "Наши работы на видео",
      videosLead: "Посмотрите на процесс своими глазами.",
      watch: "Смотреть видео",
      contact: "Нас легко найти",
      address: "Адрес",
      hours: "Время работы",
      phone: "Телефон",
      places: "Среди наших объектов",
    },
    service: {
      includes: "Что входит в услугу",
      priceFrom: "Цена",
      per: "за",
      other: "Другие услуги",
      home: "Главная",
      list: "Услуги",
      listTitle: "Наши услуги",
      listLead: "Профессиональная уборка для квартир, офисов и больших зданий.",
      inCity: "в Навои",
    },
    notFound: { title: "Страница не найдена", lead: "Такой страницы нет или она была перемещена.", back: "На главную" },
    footer: { city: "Навои, Узбекистан", rights: "Все права защищены." },
    bar: { call: "Позвонить" },
  },
} as const;

export type UI = (typeof ui)["uz"];
