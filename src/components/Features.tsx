import React from 'react';
import { Users, DollarSign, Headphones, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('feature_guide'),
      description: t('feature_guide_desc'),
    },
    {
      icon: DollarSign,
      title: t('feature_price'),
      description: t('feature_price_desc'),
    },
    {
      icon: Headphones,
      title: t('feature_support'),
      description: t('feature_support_desc'),
    },
    {
      icon: Shield,
      title: t('feature_safe'),
      description: t('feature_safe_desc'),
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('features_title')}</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-xl border border-border shadow-soft card-hover text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
