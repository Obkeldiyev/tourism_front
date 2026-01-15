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
  nav_destinations: { uz: "Yo'nalishlar", ru: "Направления", en: "Destinations", kaa: "Bağdarlar" },
  nav_about: { uz: "Biz haqimizda", ru: "О нас", en: "About", kaa: "Biz haqqımızda" },
  nav_contact: { uz: "Aloqa", ru: "Контакты", en: "Contact", kaa: "Baylanıs" },
  
  // Hero
  hero_title: { uz: "Qaraqalpaqstanga sayohat", ru: "Путешествие в Каракалпакстан", en: "Travel to Karakalpakstan", kaa: "Qaraqalpaqstanǵa sayaxat" },
  hero_subtitle: { uz: "Orol dengizi va Nukus shahri - noyob madaniyat, tabiiy go'zallik va unutilmas tajribalar sizni kutmoqda", ru: "Аральское море и город Нукус - уникальная культура, природная красота и незабываемые впечатления ждут вас", en: "The Aral Sea and Nukus city - unique culture, natural beauty and unforgettable experiences await you", kaa: "Aral teńizi hám Nukus qalası - noyob mádeniyet, tábiyiy gózallik hám umıtılmas tájiriyibeler sizdi kútip tur" },
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
  footer_address: { uz: "Nukus, Qaraqalpaqstan", ru: "Нукус, Каракалпакстан", en: "Nukus, Karakalpakstan", kaa: "Nukus, Qaraqalpaqstan" },
  
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
  
  // Admin translations
  admin_panel: { uz: "Admin panel", ru: "Админ панель", en: "Admin Panel", kaa: "Admin panel" },
  dashboard: { uz: "Boshqaruv paneli", ru: "Панель управления", en: "Dashboard", kaa: "Basqarıw paneli" },
  total_tours: { uz: "Jami turlar", ru: "Всего туров", en: "Total Tours", kaa: "Jámi turlar" },
  active_bookings: { uz: "Faol bandlovlar", ru: "Активные бронирования", en: "Active Bookings", kaa: "Ámeliy bronlar" },
  this_month: { uz: "Bu oy", ru: "В этом месяце", en: "This Month", kaa: "Bul ay" },
  site_visitors: { uz: "Sayt tashrif buyuruvchilari", ru: "Посетители сайта", en: "Site Visitors", kaa: "Sayt kelgenshileri" },
  occupancy_rate: { uz: "Band bo'lish darajasi", ru: "Уровень заполняемости", en: "Occupancy Rate", kaa: "Tolıw dárejesi" },
  of_total_capacity: { uz: "umumiy sig'imdan", ru: "от общей вместимости", en: "of total capacity", kaa: "umumiy sıyımlılıqtan" },
  booking_status: { uz: "Band qilish holati", ru: "Статус бронирования", en: "Booking Status", kaa: "Bron halı" },
  active: { uz: "Faol", ru: "Активные", en: "Active", kaa: "Ámeliy" },
  completed: { uz: "Tugallangan", ru: "Завершенные", en: "Completed", kaa: "Tamamlangan" },
  cancelled: { uz: "Bekor qilingan", ru: "Отмененные", en: "Cancelled", kaa: "Biykar etilgen" },
  quick_actions: { uz: "Tezkor amallar", ru: "Быстрые действия", en: "Quick Actions", kaa: "Tez ámellar" },
  create_new_tour: { uz: "Yangi tur yaratish", ru: "Создать новый тур", en: "Create New Tour", kaa: "Jańa tur jaratıw" },
  view_all_tours: { uz: "Barcha turlarni ko'rish", ru: "Посмотреть все туры", en: "View All Tours", kaa: "Barlıq turları kóriw" },
  manage_bookings: { uz: "Bandlovlarni boshqarish", ru: "Управление бронированиями", en: "Manage Bookings", kaa: "Bronlardı basqarıw" },
  recent_tours: { uz: "So'nggi turlar", ru: "Недавние туры", en: "Recent Tours", kaa: "Sońǵı turlar" },
  recent_bookings: { uz: "So'nggi bandlovlar", ru: "Недавние бронирования", en: "Recent Bookings", kaa: "Sońǵı bronlar" },
  view_all: { uz: "Barchasini ko'rish", ru: "Посмотреть все", en: "View All", kaa: "Barlıǵın kóriw" },
  seats: { uz: "o'rindiq", ru: "мест", en: "seats", kaa: "orın" },
  sign_out: { uz: "Chiqish", ru: "Выйти", en: "Sign Out", kaa: "Shıǵıw" },
  welcome_back: { uz: "Xush kelibsiz", ru: "Добро пожаловать", en: "Welcome back", kaa: "Qosh keldińiz" },
  add_new_tour: { uz: "Yangi tur qo'shish", ru: "Добавить новый тур", en: "Add New Tour", kaa: "Jańa tur qosıw" },
  vs_last_month: { uz: "o'tgan oyga nisbatan", ru: "по сравнению с прошлым месяцем", en: "vs last month", kaa: "ótken ayǵa salıstırǧanda" },
  booked: { uz: "band qilingan", ru: "забронировано", en: "booked", kaa: "bron etilgen" },
  total: { uz: "jami", ru: "всего", en: "total", kaa: "jámi" },
  no_tours_yet: { uz: "Hali turlar yo'q. Birinchi turingizni yarating!", ru: "Туров пока нет. Создайте свой первый тур!", en: "No tours yet. Create your first tour!", kaa: "Házirge turlar joq. Birinshi turıńızdı jaratiń!" },
  create_tour: { uz: "Tur yaratish", ru: "Создать тур", en: "Create Tour", kaa: "Tur jaratıw" },
  no_bookings_yet: { uz: "Hali bandlovlar yo'q.", ru: "Бронирований пока нет.", en: "No bookings yet.", kaa: "Házirge bronlar joq." },

  // About page translations
  about_subtitle: { uz: "Qaraqalpaqstanning boy madaniy merosini va noyob tabiiy go'zalligini kashf eting", ru: "Откройте богатое культурное наследие и уникальную природную красоту Каракалпакстана", en: "Discover the rich cultural heritage and unique natural beauty of Karakalpakstan", kaa: "Qaraqalpaqstannıń bay mádeni murasın hám noyob tábiyiy gózalligin ashıń" },
  stats_travelers: { uz: "Baxtli sayohatchilar", ru: "Довольных путешественников", en: "Happy Travelers", kaa: "Baxtlı sayaxatshılar" },
  stats_destinations: { uz: "Yo'nalishlar", ru: "Направлений", en: "Destinations", kaa: "Bağdarlar" },
  stats_experience: { uz: "Yillik tajriba", ru: "Лет опыта", en: "Years Experience", kaa: "Jıl tájiriyibe" },
  stats_satisfaction: { uz: "Mamnunlik", ru: "Удовлетворенность", en: "Satisfaction", kaa: "Mamnunlıq" },
  about_title: { uz: "O'zbekistonning sehrini kashf eting", ru: "Откройте магию Узбекистана", en: "Discover the Magic of Uzbekistan", kaa: "Ózbekstannıń sehrligin ashıń" },
  about_text1: { uz: "O'zbekiston qadimgi Buyuk Ipak yo'lining chorrahalarida joylashgan bo'lib, bu yerda imperiyalar paydo bo'lgan va yo'q bo'lgan, Xitoy, Hindiston, Fors va Yevropadan kelgan savdogarlar nafaqat tovarlar, balki g'oyalar, san'at va madaniyat bilan ham almashgan.", ru: "Узбекистан находится на перекрестке древнего Шелкового пути, где возникали и исчезали империи, где торговцы из Китая, Индии, Персии и Европы обменивались не только товарами, но и идеями, искусством и культурой.", en: "Uzbekistan stands at the crossroads of the ancient Silk Road, where empires rose and fell, where traders from China, India, Persia, and Europe exchanged not just goods, but ideas, art, and culture.", kaa: "Ózbekstan qadimgi Jipek jolınıń kesiwinde orınlasqan, bul jerde imperiyalar payda bolıp, joq bolǵan, Qıtay, Hindistan, Fars hám Yevropadan kelgen sawdagerler tek towarlar emes, balki g'oyalar, óner hám mádeniyet penen almasqan." },
  about_text2: { uz: "Bizning maqsadimiz vatanimizning go'zalligi va boy merosini butun dunyo sayohatchilariga ulashishdir. Samarqanddagi ulug'vor Registon maydonidan tortib Buxorodagi labirint ko'chalarigacha, har bir burchak o'z hikoyasini aytadi.", ru: "Наша миссия - поделиться красотой и богатым наследием нашей родины с путешественниками со всего мира. От величественной площади Регистан в Самарканде до лабиринтных улиц Бухары, каждый уголок рассказывает свою историю.", en: "Our mission is to share the beauty and rich heritage of our homeland with travelers from around the world. From the majestic Registan Square in Samarkand to the labyrinthine streets of Bukhara, every corner tells a story.", kaa: "Bizin maqsadımız - watanımızdıń gózalligi hám bay murasın dúnya júzindegi sayaxatshılarǵa úlesiw. Samarqanddağı ulıwma Registan maydanınan Buxaradağı labirint kóshelerine shekem, ár bir búrısh óz ertegini aytadı." },
  about_text3: { uz: "15 yildan ortiq tajriba bilan bizning mahalliy mutaxassislar jamoasi har bir sayohatning haqiqiy, xavfsiz va unutilmas bo'lishini ta'minlaydi. Biz mahalliy jamoalarni qo'llab-quvvatlaydigan va madaniy xazinalarimizni kelajak avlodlar uchun saqlaydigan barqaror turizmga ishonamiz.", ru: "Имея более 15 лет опыта, наша команда местных экспертов обеспечивает, чтобы каждое путешествие было аутентичным, безопасным и незабываемым. Мы верим в устойчивый туризм, который приносит пользу местным сообществам и сохраняет наши культурные сокровища для будущих поколений.", en: "With over 15 years of experience, our team of local experts ensures that every journey is authentic, safe, and unforgettable. We believe in sustainable tourism that benefits local communities while preserving our cultural treasures for future generations.", kaa: "15 jıldan artıq tájiriyibe menen bizin jergilikli mutaxassıslar komandası ár bir sayaxattıń shınayı, qáwipsiz hám umıtılmas bolıwın támiynleydi. Biz jergilikli jamalardı qollap-quwatlaytırǣan hám mádeni xazinalarımızdı kelajek áwladlar ushın saqlaytırǧan barqarar turizmge senemin." },

  // Contact page translations
  contact_subtitle: { uz: "Mukammal Qaraqalpaqstan sarguzashtingizni rejalashtirish uchun biz bilan bog'laning", ru: "Свяжитесь с нами, чтобы спланировать ваше идеальное приключение в Каракалпакстане", en: "Get in touch with us to plan your perfect Karakalpakstan adventure", kaa: "Mukemmel Qaraqalpaqstan maceraıńızdı josparlawǵa biz benen baylanısıń" },
  contact_get_in_touch: { uz: "Bog'lanish", ru: "Связаться с нами", en: "Get in Touch", kaa: "Baylanısıw" },
  contact_address: { uz: "Manzil", ru: "Адрес", en: "Address", kaa: "Mánzil" },
  contact_phone: { uz: "Telefon", ru: "Телефон", en: "Phone", kaa: "Telefon" },
  contact_email: { uz: "Elektron pochta", ru: "Электронная почта", en: "Email", kaa: "Elektron pochta" },
  contact_name: { uz: "Ism", ru: "Имя", en: "Name", kaa: "At" },
  contact_name_placeholder: { uz: "Ismingiz", ru: "Ваше имя", en: "Your name", kaa: "Atıńız" },
  contact_email_placeholder: { uz: "sizning@email.com", ru: "ваш@email.com", en: "your@email.com", kaa: "sizin@email.com" },
  contact_phone_placeholder: { uz: "+998 61 223 45 67", ru: "+998 61 223 45 67", en: "+998 61 223 45 67", kaa: "+998 61 223 45 67" },
  contact_subject: { uz: "Mavzu", ru: "Тема", en: "Subject", kaa: "Taqırıp" },
  contact_subject_placeholder: { uz: "Qanday yordam bera olamiz?", ru: "Как мы можем помочь?", en: "How can we help?", kaa: "Qanday járdem bere alamız?" },
  contact_message: { uz: "Xabar", ru: "Сообщение", en: "Message", kaa: "Xabar" },
  contact_message_placeholder: { uz: "Sayohat rejalaringiz haqida bizga ayting...", ru: "Расскажите нам о ваших планах путешествий...", en: "Tell us about your travel plans...", kaa: "Sayaxat josparlarnız haqqında bizge aytiń..." },
  contact_send: { uz: "Xabar yuborish", ru: "Отправить сообщение", en: "Send Message", kaa: "Xabar jiberiw" },
  contact_success_title: { uz: "Xabar yuborildi!", ru: "Сообщение отправлено!", en: "Message Sent!", kaa: "Xabar jiberildi!" },
  contact_success_text: { uz: "Tez orada sizga javob beramiz.", ru: "Мы скоро свяжемся с вами.", en: "We'll get back to you soon.", kaa: "Tez aradan sizge juwap beremiz." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved && ['uz', 'ru', 'en', 'kaa'].includes(saved)) {
        return saved as Language;
      }
    } catch (error) {
      console.warn('Failed to load language from localStorage:', error);
    }
    return 'en'; // Default to English
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
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
