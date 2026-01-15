import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Plus, 
  LogOut,
  TrendingUp,
  Calendar,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

const AdminDashboard: React.FC = () => {
  const { admin, logout, token } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const currentLang = languages.find(l => l.code === language);

  // Increment visitor counter on page load
  useEffect(() => {
    const incrementVisitorCount = () => {
      const currentCount = parseInt(localStorage.getItem('visitorCount') || '0');
      localStorage.setItem('visitorCount', (currentCount + 1).toString());
    };
    
    incrementVisitorCount();
  }, []);

  const { data: tours = [] } = useQuery({
    queryKey: ['admin-tours'],
    queryFn: api.getAllTours,
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const response = await fetch('http://localhost:9000/bookings', {
        headers: {
          token: token || '',
        },
      });
      if (!response.ok) return [];
      const result = await response.json();
      return result.data || [];
    },
    enabled: !!token,
  });

  // Calculate statistics
  const thisMonthBookings = bookings.filter((b: any) => {
    const date = new Date(b.booking_date);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });

  const activeBookings = bookings.filter((b: any) => b.status === 'booked');
  const completedBookings = bookings.filter((b: any) => b.status === 'completed');
  const cancelledBookings = bookings.filter((b: any) => b.status === 'cancelled');

  const totalSeatsBooked = bookings.reduce((sum: number, booking: any) => sum + booking.seats_booked, 0);
  const totalSeatsAvailable = tours.reduce((sum, tour) => sum + tour.max_seats, 0);
  const occupancyRate = totalSeatsAvailable > 0 ? (totalSeatsBooked / totalSeatsAvailable) * 100 : 0;

  // Get visitor count from localStorage
  const visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');

  const stats = [
    {
      title: t('total_tours'),
      value: tours.length,
      icon: Map,
      color: 'text-primary',
      bg: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive' as const,
      link: '/admin/tours',
    },
    {
      title: t('active_bookings'),
      value: activeBookings.length,
      icon: Users,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      change: '+8%',
      changeType: 'positive' as const,
      link: '/admin/bookings',
    },
    {
      title: t('this_month'),
      value: thisMonthBookings.length,
      icon: Calendar,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      change: '+23%',
      changeType: 'positive' as const,
      link: '/admin/bookings',
    },
    {
      title: t('site_visitors'),
      value: visitorCount.toLocaleString(),
      icon: Eye,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      change: '+15%',
      changeType: 'positive' as const,
      link: '/admin/dashboard',
    },
  ];

  const recentBookings = bookings
    .sort((a: any, b: any) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'booked':
        return <CheckCircle className="h-3 w-3" />;
      case 'cancelled':
        return <XCircle className="h-3 w-3" />;
      case 'completed':
        return <Clock className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

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
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">{t('dashboard')}</h1>
            <p className="text-muted-foreground">{t('welcome_back')}, {admin?.username}</p>
          </div>
          <Link to="/admin/tours/new">
            <Button className="btn-gradient gap-2">
              <Plus className="h-4 w-4" />
              {t('add_new_tour')}
            </Button>
          </Link>
        </div>

        {/* Stats Grid - Now Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link key={index} to={stat.link}>
              <Card className="border-border/50 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-500">{stat.change}</span>
                        <span className="text-xs text-muted-foreground">{t('vs_last_month')}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Occupancy Rate */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t('occupancy_rate')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{occupancyRate.toFixed(1)}%</div>
                  <p className="text-sm text-muted-foreground">{t('of_total_capacity')}</p>
                </div>
                <Progress value={occupancyRate} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{totalSeatsBooked} {t('booked')}</span>
                  <span>{totalSeatsAvailable} {t('total')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Status Distribution */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t('booking_status')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link to="/admin/bookings" className="flex items-center justify-between hover:bg-muted/50 p-2 rounded transition-colors">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('active')}</span>
                  </div>
                  <span className="font-semibold">{activeBookings.length}</span>
                </Link>
                <Link to="/admin/bookings" className="flex items-center justify-between hover:bg-muted/50 p-2 rounded transition-colors">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{t('completed')}</span>
                  </div>
                  <span className="font-semibold">{completedBookings.length}</span>
                </Link>
                <Link to="/admin/bookings" className="flex items-center justify-between hover:bg-muted/50 p-2 rounded transition-colors">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">{t('cancelled')}</span>
                  </div>
                  <span className="font-semibold">{cancelledBookings.length}</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t('quick_actions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/admin/tours/new">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Plus className="h-4 w-4" />
                    {t('create_new_tour')}
                  </Button>
                </Link>
                <Link to="/admin/tours">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Eye className="h-4 w-4" />
                    {t('view_all_tours')}
                  </Button>
                </Link>
                <Link to="/admin/bookings">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    {t('manage_bookings')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tours */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('recent_tours')}</CardTitle>
              <Link to="/admin/tours">
                <Button variant="ghost" size="sm">{t('view_all')}</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tours.slice(0, 5).map((tour) => (
                  <Link
                    key={tour.id}
                    to={`/admin/tours/${tour.id}/edit`}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                        {tour.photos && tour.photos[0] ? (
                          <img
                            src={`http://localhost:9000${tour.photos[0].url}`}
                            alt={tour.title_en}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to icon if image fails to load
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const icon = parent.querySelector('.fallback-icon');
                                if (icon) icon.classList.remove('hidden');
                              }
                            }}
                          />
                        ) : null}
                        <Map className={`h-6 w-6 text-primary fallback-icon ${tour.photos && tour.photos[0] ? 'hidden' : ''}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{tour.title_en}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tour.start_date).toLocaleDateString()} - {new Date(tour.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">${tour.cost}</p>
                      <p className="text-sm text-muted-foreground">{tour.max_seats} {t('seats')}</p>
                    </div>
                  </Link>
                ))}
                {tours.length === 0 && (
                  <div className="text-center py-8">
                    <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">{t('no_tours_yet')}</p>
                    <Link to="/admin/tours/new">
                      <Button className="mt-4 btn-gradient">{t('create_tour')}</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('recent_bookings')}</CardTitle>
              <Link to="/admin/bookings">
                <Button variant="ghost" size="sm">{t('view_all')}</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{booking.full_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.seats_booked} seat(s) • {new Date(booking.booking_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </Badge>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">{t('no_bookings_yet')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;