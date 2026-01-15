import React from 'react';
import { MapPin, Award, Users, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: '5,000+', label: t('stats_travelers') },
    { icon: MapPin, value: '25+', label: t('stats_destinations') },
    { icon: Award, value: '10+', label: t('stats_experience') },
    { icon: Heart, value: '98%', label: t('stats_satisfaction') },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{t('nav_about')}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about_subtitle')}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  {t('about_title')}
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {t('about_text1')}
                  </p>
                  <p>
                    {t('about_text2')}
                  </p>
                  <p>
                    {t('about_text3')}
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800"
                    alt="Uzbekistan Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 rounded-2xl -z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default About;
