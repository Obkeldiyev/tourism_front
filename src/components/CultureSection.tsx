import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import uzbekCuisineImage from '@/assets/uzbek-cuisine.jpg';
import { Utensils, Music, Palette, Heart } from 'lucide-react';

const CultureSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    title: {
      en: 'Experience Uzbek Culture',
      ru: 'Познакомьтесь с узбекской культурой',
      uz: 'O\'zbek madaniyatini his eting',
      kaa: 'O\'zbek mádenyetin sezinin',
    },
    subtitle: {
      en: 'Immerse yourself in centuries-old traditions, flavors, and hospitality',
      ru: 'Погрузитесь в многовековые традиции, вкусы и гостеприимство',
      uz: 'Asrlar davomida shakllangan an\'analar, ta\'mlar va mehmondo\'stlikka cho\'ming',
      kaa: 'Ásirler dawamında payda bolğan dástúrler, tá\'mler hám miymandoslıqtı sezinin',
    },
    cuisine: {
      title: {
        en: 'Authentic Cuisine',
        ru: 'Аутентичная кухня',
        uz: 'An\'anaviy taomlar',
        kaa: 'Dástúriy tağamlar',
      },
      description: {
        en: 'Taste the legendary plov, samsa, lagman, and other traditional dishes prepared with love and centuries-old recipes.',
        ru: 'Попробуйте легендарный плов, самсу, лагман и другие традиционные блюда, приготовленные с любовью по вековым рецептам.',
        uz: 'Afsonaviy palov, somsa, lag\'mon va boshqa an\'anaviy taomlarni tatib ko\'ring.',
        kaa: 'Dástanlı palaw, somsa, lağman hám basqa dástúriy tağamlardan tatıń.',
      },
    },
    highlights: [
      {
        icon: Utensils,
        title: {
          en: 'Traditional Cuisine',
          ru: 'Традиционная кухня',
          uz: 'An\'anaviy oshxona',
          kaa: 'Dástúriy asxana',
        },
      },
      {
        icon: Music,
        title: {
          en: 'Folk Music & Dance',
          ru: 'Народная музыка и танцы',
          uz: 'Xalq musiqasi va raqslari',
          kaa: 'Xalıq muzıkası hám biylewleri',
        },
      },
      {
        icon: Palette,
        title: {
          en: 'Artisan Crafts',
          ru: 'Ремесленные изделия',
          uz: 'Hunarmandchilik',
          kaa: 'Qol ónermentshilik',
        },
      },
      {
        icon: Heart,
        title: {
          en: 'Warm Hospitality',
          ru: 'Теплое гостеприимство',
          uz: 'Samimiy mehmondo\'stlik',
          kaa: 'Jıllı miymandoslıq',
        },
      },
    ],
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={uzbekCuisineImage}
                alt="Uzbek Cuisine"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs">
              <h4 className="font-display font-bold text-lg mb-2">
                {content.cuisine.title[language]}
              </h4>
              <p className="text-sm text-muted-foreground">
                {content.cuisine.description[language]}
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{content.title[language]}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {content.subtitle[language]}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {content.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border card-hover"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <highlight.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">
                    {highlight.title[language]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
