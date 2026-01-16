import React from 'react';
import { MapPin, Clock, Camera, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Using existing images as placeholders for Karakalpakstan destinations
import nukusImage from '@/assets/registan.jpg'; // Placeholder for Nukus/Savitsky Museum
import aralSeaImage from '@/assets/khiva.jpg'; // Placeholder for Aral Sea
import mizdakhanImage from '@/assets/bukhara.jpg'; // Placeholder for Mizdakhan

const Destinations: React.FC = () => {
  const { language } = useLanguage();

  const destinations = [
    {
      id: 'nukus',
      image: "https://www.gazeta.uz/media/img/2020/05/UE8whQ15904987938807_l.jpg", // Fixed: was registanImage
      title: {
        en: 'Nukus',
        ru: 'Нукус',
        uz: 'Nukus',
        kaa: 'Nukus',
      },
      subtitle: {
        en: 'Capital of Karakalpakstan',
        ru: 'Столица Каракалпакстана',
        uz: "Qoraqalpog'iston poytaxti",
        kaa: 'Qaraqalpaqstannıń paytaxtı',
      },
      description: {
        en: 'Nukus, the capital of Karakalpakstan, is home to the world-famous Savitsky Museum, one of the largest collections of Russian avant-garde art. The city serves as a gateway to the Aral Sea region and showcases the unique Karakalpak culture and heritage.',
        ru: 'Нукус, столица Каракалпакстана, является домом для всемирно известного музея Савицкого, одной из крупнейших коллекций русского авангардного искусства. Город служит воротами в регион Аральского моря и демонстрирует уникальную каракалпакскую культуру и наследие.',
        uz: 'Nukus, Qoraqalpogiston poytaxti, dunyoga mashhur Savitskiy muzeyining joylashgan o\'rni bo\'lib, rus avangard san\'atining eng katta to\'plamlaridan biridir. Shahar Orol dengizi hududiga kirish eshigi vazifasini o\'taydi va noyob qaraqalpaq madaniyati va merosini namoyish etadi.',
        kaa: 'Nukus, Qaraqalpaqstannıń paytaxtı, dúnyaǵa máshhur Savitskiy muzeyi orınlasqan jer bolıp, rus avangard óneriniń eń úlken jıynaqlarından biri. Qala Aral teńizi aymağına kiriw esigi wazıypasın atqarıp, noyob qaraqalpaq mádeniyet hám murasın kórsetedi.',
      },
      highlights: [
        {
          en: 'Savitsky Museum - World\'s second-largest collection of Russian avant-garde',
          ru: 'Музей Савицкого - Вторая по величине коллекция русского авангарда в мире',
          uz: 'Savitskiy muzeyi - Dunyodagi ikkinchi eng katta rus avangard to\'plami',
          kaa: 'Savitskiy muzeyi - Dúnyada ekinshi eń úlken rus avangard jıynağı',
        },
        {
          en: 'Karakalpak State Museum - Regional history and culture',
          ru: 'Каракалпакский государственный музей - Региональная история и культура',
          uz: 'Qoraqalpoq davlat muzeyi - Mintaqaviy tarix va madaniyat',
          kaa: 'Qaraqalpaq memleket muzeyi - Aymaq tariyxı hám mádeniyet',
        },
        {
          en: 'Aral Sea Ship Graveyard - Haunting remnants of ecological disaster',
          ru: 'Кладбище кораблей Аральского моря - Призрачные остатки экологической катастрофы',
          uz: 'Orol dengizi kema qabristoni - Ekologik falokatning dahshatli qoldiqlari',
          kaa: 'Aral teńizi keme qábiristanı - Ekologiyalıq áperetnıń qorqınısh qaldıqları',
        },
        {
          en: 'Mizdakhan Necropolis - Ancient burial ground with 2000 years of history',
          ru: 'Некрополь Миздахан - Древнее кладбище с 2000-летней историей',
          uz: 'Mizdaxon qabristoni - 2000 yillik tarixga ega qadimiy dafn joyi',
          kaa: 'Mizdaxan qábiristanı - 2000 jıllıq tariyxqa iye qadimgi defin orın',
        },
      ],
      bestTime: {
        en: 'April-May, September-October',
        ru: 'Апрель-май, сентябрь-октябрь',
        uz: 'Aprel-may, sentyabr-oktyabr',
        kaa: 'Aprel-may, sentyabr-oktyabr',
      },
      duration: {
        en: '2-3 days',
        ru: '2-3 дня',
        uz: '2-3 kun',
        kaa: '2-3 kún',
      },
      rating: 4.7,
    },
    {
      id: 'aral-sea',
      image: "https://oyina.uz/storage/articles/October2024/3IUzd31fKe0CKwfARtQ0.jpg", // Fixed: was khivaImage
      title: {
        en: 'Aral Sea',
        ru: 'Аральское море',
        uz: 'Orol dengizi',
        kaa: 'Aral teńizi',
      },
      subtitle: {
        en: 'The Vanishing Sea',
        ru: 'Исчезающее море',
        uz: 'G\'oyib bo\'layotgan dengiz',
        kaa: 'G\'áyıp bolatırǧan teńiz',
      },
      description: {
        en: 'Once the world\'s fourth-largest lake, the Aral Sea has become a symbol of environmental catastrophe. Today, visitors can witness the dramatic landscape of the dried seabed, abandoned ships, and the ongoing efforts to restore parts of the sea. It\'s a powerful reminder of human impact on nature.',
        ru: 'Когда-то четвертое по величине озеро в мире, Аральское море стало символом экологической катастрофы. Сегодня посетители могут увидеть драматический пейзаж высохшего морского дна, заброшенные корабли и продолжающиеся усилия по восстановлению частей моря. Это мощное напоминание о влиянии человека на природу.',
        uz: 'Bir vaqtlar dunyodagi to\'rtinchi eng katta ko\'l bo\'lgan Orol dengizi ekologik falokat ramziga aylandi. Bugun tashrif buyuruvchilar qurib qolgan dengiz tubining dramatik manzarasi, tashlab ketilgan kemalar va dengizning bir qismini tiklash bo\'yicha davom etayotgan sa\'y-harakatlarni ko\'rishlari mumkin. Bu insonning tabiatga ta\'sirining kuchli eslatmasi.',
        kaa: 'Bir waqıtta dúnyada tórtinshi eń úlken kól bolǧan Aral teńizi ekologiyalıq áperetnıń belgisine aylandi. Búgin kelgenshiler qurıp qalǧan teńiz túbiniń dramatikalıq mánzerası, taslab ketilgen kemeler hám teńiznıń bir bólegin tiklew boyınsha dawam etip atırǧan áreketter kóre aladi. Bul insannıń tábiyatqa tásiriniń kúshli esletpesi.',
      },
      highlights: [
        {
          en: 'Ship Graveyard - Abandoned vessels in the former seabed',
          ru: 'Кладбище кораблей - Заброшенные суда на бывшем морском дне',
          uz: 'Kema qabristoni - Sobiq dengiz tubidagi tashlab ketilgan kemalar',
          kaa: 'Keme qábiristanı - Burunǧı teńiz túbindegi taslab ketilgen kemeler',
        },
        {
          en: 'Muynak - Former fishing port, now 150km from water',
          ru: 'Муйнак - Бывший рыболовный порт, теперь в 150 км от воды',
          uz: 'Mo\'ynoq - Sobiq baliqchilik porti, hozir suvdan 150 km uzoqda',
          kaa: 'Moynaq - Burunǧı balıqshılıq portı, házir suwdan 150 km alısta',
        },
        {
          en: 'Sudochye Lake - Restored northern part of the Aral Sea',
          ru: 'Озеро Судочье - Восстановленная северная часть Аральского моря',
          uz: 'Sudochye ko\'li - Orol dengizining tiklangan shimoliy qismi',
          kaa: 'Sudochye kóli - Aral teńiziniń tiklangen soltústik bólegi',
        },
        {
          en: 'Barsa-Kelmes Nature Reserve - Wildlife sanctuary in the region',
          ru: 'Заповедник Барса-Кельмес - Заповедник дикой природы в регионе',
          uz: 'Barsa-Kelmes qo\'riqxonasi - Mintaqadagi yovvoyi tabiat qo\'riqxonasi',
          kaa: 'Barsa-Kelmes qorıqxanası - Aymaqtağı jábayı tábiyat qorıqxanası',
        },
      ],
      bestTime: {
        en: 'April-June, September-October',
        ru: 'Апрель-июнь, сентябрь-октябрь',
        uz: 'Aprel-iyun, sentyabr-oktyabr',
        kaa: 'Aprel-iyun, sentyabr-oktyabr',
      },
      duration: {
        en: '1-2 days',
        ru: '1-2 дня',
        uz: '1-2 kun',
        kaa: '1-2 kún',
      },
      rating: 4.5,
    },
    {
      id: 'mizdakhan',
      image: "https://eurasia.travel/wp-content/uploads/2025/02/1.-Mizdakhan-necropolis-Karakalpakstan.jpg", // Fixed: was bukharaImage
      title: {
        en: 'Mizdakhan',
        ru: 'Миздахан',
        uz: 'Mizdaxon',
        kaa: 'Mizdaxan',
      },
      subtitle: {
        en: 'Ancient Necropolis',
        ru: 'Древний некрополь',
        uz: 'Qadimiy qabristonlar',
        kaa: 'Qadimgi qábiristanlar',
      },
      description: {
        en: 'Mizdakhan is one of the most significant archaeological sites in Karakalpakstan, featuring ancient burial grounds that span over 2,000 years of history. This sacred site includes mausoleums, ancient fortifications, and legends that connect it to biblical and Islamic traditions. It\'s considered one of the most important pilgrimage sites in the region.',
        ru: 'Миздахан - один из самых значительных археологических памятников Каракалпакстана, включающий древние захоронения, охватывающие более 2000 лет истории. Это священное место включает мавзолеи, древние укрепления и легенды, связывающие его с библейскими и исламскими традициями. Считается одним из важнейших мест паломничества в регионе.',
        uz: 'Mizdaxon Qoraqalpoqistonning eng muhim arxeologik yodgorliklaridan biri bo\'lib, 2000 yildan ortiq tarixni qamrab olgan qadimiy dafn joylarini o\'z ichiga oladi. Bu muqaddas joy maqbaralar, qadimiy istehkomlar va uni bibliya va islom an\'analariga bog\'laydigan afsonalarni o\'z ichiga oladi. Mintaqadagi eng muhim ziyorat joylaridan biri hisoblanadi.',
        kaa: 'Mizdaxan Qaraqalpaqstannıń eń muhim arxeologiyalıq eskertkishlerinen biri bolıp, 2000 jıldan artıq tariyxnı qamrap alǧan qadimgi defin jerlerin óz ishine aladı. Bul muqaddas jer maqbaralar, qadimgi qorǧanlar hám onı bibliya hám islam dástúrlerine baylanıstıratırǧan ertekler óz ishine aladı. Aymaqtağı eń muhim zıyarat jerlerinen biri esaplanadı.',
      },
      highlights: [
        {
          en: 'Shamun-Nabi Mausoleum - Legendary burial site of Prophet Samuel',
          ru: 'Мавзолей Шамун-Наби - Легендарное место захоронения пророка Самуила',
          uz: 'Shamun-Nabiy maqbarasi - Payg\'ambar Shomuil dafn etilgan afsonaviy joy',
          kaa: 'Shamun-Nabiy maqbarasıı - Payǧambar Shamuilnıń defin etilgen ertekli jerı',
        },
        {
          en: 'Mazlumkhan-Sulu Mausoleum - 14th-century architectural monument',
          ru: 'Мавзолей Мазлумхан-Сулу - Архитектурный памятник XIV века',
          uz: 'Mazlumxon-Sulu maqbarasi - XIV asr me\'moriy yodgorligi',
          kaa: 'Mazlumxan-Sulu maqbarasıı - XIV ásir arxitektura eskertkishi',
        },
        {
          en: 'Ancient Fortress Ruins - Remnants of medieval fortifications',
          ru: 'Руины древней крепости - Остатки средневековых укреплений',
          uz: 'Qadimiy qal\'a xarobalari - O\'rta asr istehkomlarining qoldiqlari',
          kaa: 'Qadimgi qorǧan xarabaları - Orta ásir qorǧanlarınıń qaldıqları',
        },
        {
          en: 'World Clock Legend - Mythical timekeeper of the world',
          ru: 'Легенда о мировых часах - Мифический хранитель времени мира',
          uz: 'Dunyo soati afsonasi - Dunyoning afsonaviy vaqt saqchisi',
          kaa: 'Dúnya saǧatı ertegi - Dúnyanıń ertekli waqıt saqshısı',
        },
      ],
      bestTime: {
        en: 'March-May, September-November',
        ru: 'Март-май, сентябрь-ноябрь',
        uz: 'Mart-may, sentyabr-noyabr',
        kaa: 'Mart-may, sentyabr-noyabr',
      },
      duration: {
        en: '1 day',
        ru: '1 день',
        uz: '1 kun',
        kaa: '1 kún',
      },
      rating: 4.6,
    },
  ];

  const pageTitle = {
    en: 'Destinations',
    ru: 'Направления',
    uz: 'Yo\'nalishlar',
    kaa: 'Bağdarlar',
  };

  const pageSubtitle = {
    en: 'Explore the ancient cities of the Silk Road and discover their timeless beauty',
    ru: 'Исследуйте древние города Шелкового пути и откройте их вечную красоту',
    uz: 'Buyuk Ipak yo\'lining qadimiy shaharlarini o\'rganing va ularning abadiy go\'zalligini kashf eting',
    kaa: 'Jipek jolının qadimgi qalaların úyreniń hám olardıń mańgilik gózalligin ashıń',
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{pageTitle[language]}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {pageSubtitle[language]}
            </p>
          </div>
        </div>

        {/* Destinations */}
        <div className="container mx-auto px-4 pb-24">
          <div className="space-y-24">
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                    <img
                      src={destination.image}
                      alt={destination.title[language]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {destination.rating}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                        {destination.title[language]}
                      </h2>
                      <p className="text-primary font-medium text-lg">
                        {destination.subtitle[language]}
                      </p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {destination.description[language]}
                    </p>

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{destination.duration[language]}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                        <Camera className="h-4 w-4 text-primary" />
                        <span>{destination.bestTime[language]}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">
                        {language === 'en' ? 'Must-See Attractions' :
                          language === 'ru' ? 'Обязательные к посещению достопримечательности' :
                            language === 'uz' ? 'Ko\'rish shart bo\'lgan joylar' :
                              'Kóriw kerek bolǧan jerler'}
                      </h3>
                      <ul className="space-y-2">
                        {destination.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {highlight[language]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button className="btn-gradient">
                        {language === 'en' ? 'View Tours' :
                          language === 'ru' ? 'Посмотреть туры' :
                            language === 'uz' ? 'Turlarni ko\'rish' :
                              'Turları kóriw'}
                      </Button>
                      <Button variant="outline">
                        {language === 'en' ? 'Learn More' :
                          language === 'ru' ? 'Узнать больше' :
                            language === 'uz' ? 'Batafsil' :
                              'Kóbirek biliw'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? 'Ready to Explore?' :
                language === 'ru' ? 'Готовы исследовать?' :
                  language === 'uz' ? 'Kashf qilishga tayyormisiz?' :
                    'Ashıwg\'a tayarmısız?'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'en' ? 'Join us on an unforgettable journey through the ancient Silk Road cities' :
                language === 'ru' ? 'Присоединяйтесь к нам в незабываемом путешествии по древним городам Шелкового пути' :
                  language === 'uz' ? 'Qadimiy Ipak yo\'li shaharlariga unutilmas sayohatda bizga qo\'shiling' :
                    'Qadimgi Jipek jolı qalalarına unutılmas sayaxatta bizge qosılıń'}
            </p>
            <Button size="lg" className="btn-gradient">
              {language === 'en' ? 'Browse All Tours' :
                language === 'ru' ? 'Просмотреть все туры' :
                  language === 'uz' ? 'Barcha turlarni ko\'rish' :
                    'Barlıq turları kóriw'}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;