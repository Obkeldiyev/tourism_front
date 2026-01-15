import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-gradient">
                O'zbekiston
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('hero_subtitle').slice(0, 100)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('nav_home')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav_tours')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('nav_contact')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <a
                  href="https://www.google.com/maps?ll=41.293818,69.339537&z=15&t=m&hl=uz&gl=US&mapclient=embed&q=41%C2%B017%2745.6%22N+69%C2%B020%2730.3%22E+41.296000,+69.341750@41.296,69.34174999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {t('footer_address')}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +998 97 220 85 13
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +998 90 652 28 81
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                info@uzbektravel.uz
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/modern_avia_trip/"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/MavlyudaEmbergenova"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} O'zbekiston Travel. {t('footer_rights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
