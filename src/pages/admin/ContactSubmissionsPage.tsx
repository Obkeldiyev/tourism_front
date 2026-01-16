import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  LogOut,
  Globe,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ContactSubmissions from '@/components/admin/ContactSubmissions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'kaa', name: 'Qaraqalpaqsha', flag: '🇺🇿' },
];

const ContactSubmissionsPage: React.FC = () => {
  const { admin, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold">{t('admin_panel')}</h1>
            <p className="text-xs text-muted-foreground">{admin?.username}</p>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <LayoutDashboard className="h-5 w-5" />
            {t('dashboard')}
          </Link>
          <Link
            to="/admin/tours"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Map className="h-5 w-5" />
            {t('nav_tours')}
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Users className="h-5 w-5" />
            {t('tours_book')}
          </Link>
          <Link
            to="/admin/contact-submissions"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
          >
            <MessageSquare className="h-5 w-5" />
            Contact Messages
          </Link>
        </nav>

        {/* Language Selector */}
        <div className="absolute bottom-20 left-6 right-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <Globe className="h-4 w-4" />
                <span>{currentLang?.flag} {currentLang?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {languages.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? 'bg-primary/10' : ''}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            {t('sign_out')}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold">Contact Messages</h1>
            <p className="text-muted-foreground">Manage customer inquiries and feedback</p>
          </div>
        </div>

        <ContactSubmissions />
      </main>
    </div>
  );
};

export default ContactSubmissionsPage;