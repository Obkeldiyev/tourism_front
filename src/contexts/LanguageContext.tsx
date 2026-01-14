import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'uz' | 'ru' | 'en' | 'kaa';

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
    en: string;
    kaa: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_home: { uz: "Bosh sahifa", ru: "Главная", en: "Home", kaa: "Bas bet" },
  nav_tours: { uz: "Sayohatlar", ru: "Туры", en: "Tours", kaa: "Turlar" },
  nav_about: { uz: "Biz haqimizda", ru: "О нас", en: "About", kaa: "Biz haqqımızda" },
  nav_contact: { uz: "Aloqa", ru: "Контакты", en: "Contact", kaa: "Baylanıs" },
  
  // Hero
  hero_title: { uz: "O'zbekistonga sayohat", ru: "Путешествие в Узбекистан", en: "Travel to Uzbekistan", kaa: "O'zbekstanǵa sayaxat" },
  hero_subtitle: { uz: "Ipak yo'lining markazida - qadimiy shaharlar, mehmonnavoz odamlar va unutilmas tajribalar sizni kutmoqda", ru: "В сердце Шёлкового пути - древние города, гостеприимные люди и незабываемые впечатления ждут вас", en: "At the heart of the Silk Road - ancient cities, hospitable people and unforgettable experiences await you", kaa: "Jipek jolınıń oraylıǵında - qádiyimgi qalalar, meymandos adamlar hám umıtılmas tájiriyibelr sizdi kútip tur" },
  hero_cta: { uz: "Sayohatlarni ko'rish", ru: "Смотреть туры", en: "View Tours", kaa: "Turları kóriw" },
  
  // Tours section
  tours_title: { uz: "Mashhur sayohatlar", ru: "Популярные туры", en: "Popular Tours", kaa: "Belgili turlar" },
  tours_empty: { uz: "Hozircha sayohatlar mavjud emas", ru: "Туров пока нет", en: "No tours available yet", kaa: "Házirge turlar joq" },
  tours_from: { uz: "dan", ru: "от", en: "from", kaa: "dan" },
  tours_book: { uz: "Band qilish", ru: "Забронировать", en: "Book Now", kaa: "Bron qılıw" },
  tours_details: { uz: "Batafsil", ru: "Подробнее", en: "Details", kaa: "Tolıq" },
  tours_seats: { uz: "o'rinlar mavjud", ru: "мест доступно", en: "seats available", kaa: "orın bar" },
  tours_days: { uz: "kun", ru: "дней", en: "days", kaa: "kún" },
  
  // Features
  features_title: { uz: "Nega biz?", ru: "Почему мы?", en: "Why Choose Us?", kaa: "Nege biz?" },
  feature_guide: { uz: "Tajribali gidlar", ru: "Опытные гиды", en: "Expert Guides", kaa: "Tájiriybeli gidler" },
  feature_guide_desc: { uz: "Mahalliy mutaxassislar sizga eng yaxshi joylarni ko'rsatadi", ru: "Местные эксперты покажут вам лучшие места", en: "Local experts will show you the best places", kaa: "Jergilikli mutaxassıslar sizge eń jaqsı jerlendi kórsetedi" },
  feature_price: { uz: "Arzon narxlar", ru: "Доступные цены", en: "Affordable Prices", kaa: "Arzan baalar" },
  feature_price_desc: { uz: "Eng yaxshi narx va sifat nisbati", ru: "Лучшее соотношение цены и качества", en: "Best value for your money", kaa: "Eń jaqsı baha hám sapat nisbeti" },
  feature_support: { uz: "24/7 yordam", ru: "Поддержка 24/7", en: "24/7 Support", kaa: "24/7 járdem" },
  feature_support_desc: { uz: "Istalgan vaqtda sizga yordam berishga tayyormiz", ru: "Готовы помочь вам в любое время", en: "Ready to help you anytime", kaa: "Qaysı waqıtta járdem beremiz" },
  feature_safe: { uz: "Xavfsiz sayohat", ru: "Безопасные путешествия", en: "Safe Travel", kaa: "Qáwipsiz sayaxat" },
  feature_safe_desc: { uz: "Sizning xavfsizligingiz bizning ustuvorligimiz", ru: "Ваша безопасность - наш приоритет", en: "Your safety is our priority", kaa: "Sizin qáwipsizligińiz bizin baslı máselemiz" },
  
  // Booking modal
  booking_title: { uz: "Sayohatni band qilish", ru: "Забронировать тур", en: "Book Tour", kaa: "Turdi bron qılıw" },
  booking_name: { uz: "To'liq ismingiz", ru: "Полное имя", en: "Full Name", kaa: "Tolıq atıńız" },
  booking_phone: { uz: "Telefon raqam", ru: "Номер телефона", en: "Phone Number", kaa: "Telefon nomer" },
  booking_seats: { uz: "O'rinlar soni", ru: "Количество мест", en: "Number of Seats", kaa: "Orın sanı" },
  booking_submit: { uz: "Yuborish", ru: "Отправить", en: "Submit", kaa: "Jiberiw" },
  booking_success: { uz: "Buyurtma qabul qilindi!", ru: "Заявка принята!", en: "Booking submitted!", kaa: "Buyırtpa qabıl etildi!" },
  booking_error: { uz: "Xatolik yuz berdi", ru: "Произошла ошибка", en: "An error occurred", kaa: "Qátelik júz berdi" },
  
  // Footer
  footer_rights: { uz: "Barcha huquqlar himoyalangan", ru: "Все права защищены", en: "All rights reserved", kaa: "Barsha huqıqlar qorǵalǵan" },
  footer_address: { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан", en: "Tashkent, Uzbekistan", kaa: "Tashkent, O'zbekstan" },
  
  // Common
  loading: { uz: "Yuklanmoqda...", ru: "Загрузка...", en: "Loading...", kaa: "Júklenip atır..." },
  close: { uz: "Yopish", ru: "Закрыть", en: "Close", kaa: "Jabıw" },
  
  // Tour details
  breakfast: { uz: "Nonushta", ru: "Завтрак", en: "Breakfast", kaa: "Erteńgi as" },
  lunch: { uz: "Tushlik", ru: "Обед", en: "Lunch", kaa: "Túski as" },
  dinner: { uz: "Kechki ovqat", ru: "Ужин", en: "Dinner", kaa: "Keshki as" },
  wifi: { uz: "Wi-Fi", ru: "Wi-Fi", en: "Wi-Fi", kaa: "Wi-Fi" },
  transport: { uz: "Transport", ru: "Транспорт", en: "Transport", kaa: "Transport" },
  included: { uz: "Kiritilgan", ru: "Включено", en: "Included", kaa: "Kiredi" },
  not_included: { uz: "Kiritilmagan", ru: "Не включено", en: "Not included", kaa: "Kirmeydi" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
