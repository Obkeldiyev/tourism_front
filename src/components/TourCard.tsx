import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Utensils, Wifi, Bus } from 'lucide-react';
import { Tour } from '@/types/tour';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TourCardProps {
  tour: Tour;
  onBook: (tour: Tour) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onBook }) => {
  const { language, t } = useLanguage();

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
      month: 'short',
    });
  };

  const getDuration = () => {
    const start = new Date(tour.start_date);
    const end = new Date(tour.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  const imageUrl = tour.photos?.[0]?.url || 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800';

  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={getTitle()}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <Badge className="bg-primary text-primary-foreground">
            {getDuration()} {t('tours_days')}
          </Badge>
          <span className="text-white font-bold text-lg">
            ${tour.cost.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold mb-2 line-clamp-1">
          {getTitle()}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {getDescription()}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4 text-primary" />
          <span>
            {formatDate(tour.start_date)} — {formatDate(tour.end_date)}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex gap-3 mb-4">
          {tour.breakfast && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Utensils className="h-3 w-3" />
            </div>
          )}
          {tour.wifi && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Wifi className="h-3 w-3" />
            </div>
          )}
          {tour.transport && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bus className="h-3 w-3" />
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Users className="h-3 w-3" />
            <span>{tour.max_seats} {t('tours_seats')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onBook(tour)}
            className="flex-1 btn-gradient"
          >
            {t('tours_book')}
          </Button>
          <Link to={`/tours/${tour.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              {t('tours_details')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
