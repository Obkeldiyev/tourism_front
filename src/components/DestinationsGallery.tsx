import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import registanImage from '@/assets/registan.jpg';
import khivaImage from '@/assets/khiva.jpg';
import bukharaImage from '@/assets/bukhara.jpg';

const DestinationsGallery: React.FC = () => {
  const { language } = useLanguage();

  const destinations = [
    {
      image: registanImage,
      title: {
        en: 'Nukus',
        ru: 'Нукус',
        uz: 'Nukus',
        kaa: 'Nukus',
      },
      description: {
        en: 'Capital of Karakalpakstan, home to the world-famous Savitsky Museum',
        ru: 'Столица Каракалпакстана, дом всемирно известного музея Савицкого',
        uz: 'Qaraqalpaqstan poytaxti, dunyoga mashhur Savitskiy muzeyining joyi',
        kaa: 'Qaraqalpaqstannıń paytaxtı, dúnyaǵa máshhur Savitskiy muzeyiniń orını',
      },
    },
    {
      image: khivaImage,
      title: {
        en: 'Aral Sea',
        ru: 'Аральское море',
        uz: 'Orol dengizi',
        kaa: 'Aral teńizi',
      },
      description: {
        en: 'The vanishing sea with its haunting ship graveyard and ecological story',
        ru: 'Исчезающее море с призрачным кладбищем кораблей и экологической историей',
        uz: 'G\'oyib bo\'layotgan dengiz va uning dahshatli kema qabristoni',
        kaa: 'G\'áyıp bolatırǧan teńiz hám onıń qorqınısh keme qábiristanı',
      },
    },
    {
      image: bukharaImage,
      title: {
        en: 'Mizdakhan',
        ru: 'Миздахан',
        uz: 'Mizdaxon',
        kaa: 'Mizdaxan',
      },
      description: {
        en: 'Ancient necropolis with 2000 years of history and sacred legends',
        ru: 'Древний некрополь с 2000-летней историей и священными легендами',
        uz: '2000 yillik tarix va muqaddas afsonalarga ega qadimiy qabristonlar',
        kaa: '2000 jıllıq tariyxı hám muqaddas ertekleri bar qadimgi qábiristanlar',
      },
    },
  ];

  const sectionTitle = {
    en: 'Popular Destinations',
    ru: 'Популярные направления',
    uz: 'Mashhur yo\'nalishlar',
    kaa: 'Máshur bağdarlar',
  };

  const sectionSubtitle = {
    en: 'Discover the unique landscapes and culture of Karakalpakstan',
    ru: 'Откройте для себя уникальные пейзажи и культуру Каракалпакстана',
    uz: 'Qaraqalpaqstanning noyob manzaralari va madaniyatini kashf eting',
    kaa: 'Qaraqalpaqstannıń noyob mánzeraları hám mádeniyet ashıń',
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{sectionTitle[language]}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {sectionSubtitle[language]}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              to="/destinations"
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer block"
            >
              <img
                src={destination.image}
                alt={destination.title[language]}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-2xl font-bold">
                    {destination.title[language]}
                  </h3>
                </div>
                <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {destination.description[language]}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors font-medium"
          >
            {language === 'en' ? 'View All Destinations' : 
             language === 'ru' ? 'Все направления' :
             language === 'uz' ? 'Barcha yo\'nalishlar' :
             'Barlıq bağdarlar'}
            <MapPin className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsGallery;
