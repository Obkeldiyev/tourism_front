import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Tour } from '@/types/tour';
import { api } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import TourCard from './TourCard';
import BookingModal from './BookingModal';

interface ToursSectionProps {
  limit?: number;
}

const ToursSection: React.FC<ToursSectionProps> = ({ limit }) => {
  const { t } = useLanguage();
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await api.getAllTours();
        setTours(limit ? data.slice(0, limit) : data);
      } catch (err) {
        setError('Failed to load tours');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, [limit]);

  const handleBook = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  if (isLoading) {
    return (
      <section id="tours-section" className="py-24">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">{t('loading')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tours-section" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('tours_title')}</span>
          </h2>
        </div>

        {/* Tours Grid */}
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <div
                key={tour.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TourCard tour={tour} onBook={handleBook} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('tours_empty')}</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        tour={selectedTour}
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedTour(null);
        }}
      />
    </section>
  );
};

export default ToursSection;
