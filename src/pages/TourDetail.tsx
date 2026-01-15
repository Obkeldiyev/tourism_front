import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Users, MapPin, Phone, 
  Utensils, Wifi, Bus, Check, X, Loader2, Camera 
} from 'lucide-react';
import { Tour } from '@/types/tour';
import { api } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import PhotoSlider from '@/components/PhotoSlider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPhotoSliderOpen, setIsPhotoSliderOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      if (!id) return;
      try {
        const data = await api.getTourById(id);
        setTour(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour not found</h1>
          <Link to="/tours">
            <Button>{t('nav_tours')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getTitle = () => {
    const key = `title_${language}` as keyof Tour;
    return (tour[key] as string) || tour.title_en;
  };

  const getDescription = () => {
    const key = `description_${language}` as keyof Tour;
    return (tour[key] as string) || tour.description_en;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDuration = () => {
    const start = new Date(tour.start_date);
    const end = new Date(tour.end_date);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const amenities = [
    { label: t('breakfast'), included: tour.breakfast, icon: Utensils },
    { label: t('lunch'), included: tour.lunch, icon: Utensils },
    { label: t('dinner'), included: tour.dinner, icon: Utensils },
    { label: t('wifi'), included: tour.wifi, icon: Wifi },
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=1920';
  };

  const openPhotoSlider = (index: number = 0) => {
    setSelectedPhotoIndex(index);
    setIsPhotoSliderOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[50vh] overflow-hidden group cursor-pointer" onClick={() => openPhotoSlider(0)}>
          <img
            src={tour.photos?.[0]?.url ? `/api${tour.photos[0].url}` : 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=1920'}
            alt={getTitle()}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Photo Count Badge */}
          {tour.photos && tour.photos.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Camera className="h-3 w-3" />
              {tour.photos.length} photos
            </div>
          )}
          
          {/* Back Button */}
          <Link
            to="/tours"
            className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('nav_tours')}
          </Link>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card">
                <Badge className="mb-4">{getDuration()} {t('tours_days')}</Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {getTitle()}
                </h1>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {getDescription()}
                </p>

                {/* Dates */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">{formatDate(tour.start_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">{formatDate(tour.end_date)}</span>
                  </div>
                </div>

                {/* Amenities */}
                <h3 className="font-semibold text-lg mb-4">{t('included')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-3 rounded-lg ${
                        amenity.included ? 'bg-green-500/10' : 'bg-muted'
                      }`}
                    >
                      {amenity.included ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${!amenity.included && 'text-muted-foreground'}`}>
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Transport */}
                {tour.transport && (
                  <div className="flex items-center gap-2 mb-8">
                    <Bus className="h-5 w-5 text-primary" />
                    <span className="font-medium">{t('transport')}:</span>
                    <span className="text-muted-foreground">{tour.transport}</span>
                  </div>
                )}

                {/* Additional Info */}
                {tour.additional_info && tour.additional_info.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Additional Information</h3>
                    <div className="space-y-4">
                      {tour.additional_info.map((info) => {
                        const titleKey = `info_title_${language}` as keyof typeof info;
                        const descKey = `info_description_${language}` as keyof typeof info;
                        const title = (info[titleKey] as string) || info.info_title_en;
                        const description = (info[descKey] as string) || info.info_description_en;
                        
                        return (
                          <div key={info.id} className="p-4 bg-muted rounded-lg">
                            <h4 className="font-medium mb-1">{title}</h4>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="text-3xl font-bold text-primary mb-4">
                  ${tour.cost.toLocaleString()}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{tour.max_seats} {t('tours_seats')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{tour.phone_number}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full btn-gradient text-lg py-6"
                >
                  {t('tours_book')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        {tour.photos && tour.photos.length > 1 && (
          <div className="container mx-auto px-4 py-16">
            <h3 className="font-display text-2xl font-bold mb-8 text-center">Photo Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tour.photos.slice(1).map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openPhotoSlider(index + 1)}
                >
                  <img
                    src={`/api${photo.url}`}
                    alt={`Photo ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />

      <BookingModal
        tour={tour}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <PhotoSlider
        photos={tour.photos || []}
        isOpen={isPhotoSliderOpen}
        onClose={() => setIsPhotoSliderOpen(false)}
        initialIndex={selectedPhotoIndex}
      />
    </div>
  );
};

export default TourDetail;
