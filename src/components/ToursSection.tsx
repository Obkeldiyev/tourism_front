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

// Sample tours for when backend is not available
const sampleTours: Tour[] = [
  {
    id: 'sample-1',
    title_en: 'Discover Nukus & Savitsky Museum',
    title_ru: 'Откройте Нукус и музей Савицкого',
    title_uz: 'Nukus va Savitskiy muzeyini kashf eting',
    title_kaa: 'Nukus hám Savitskiy muzeyın ashıń',
    description_en: 'Explore the capital of Karakalpakstan and visit the world-famous Savitsky Museum with its incredible collection of Russian avant-garde art.',
    description_ru: 'Исследуйте столицу Каракалпакстана и посетите всемирно известный музей Савицкого с его невероятной коллекцией русского авангардного искусства.',
    description_uz: 'Qoraqalogiston poytaxtini o\'rganing va rus avangard san\'atining ajoyib to\'plami bilan mashhur Savitskiy muzeyiga tashrif buyuring.',
    description_kaa: 'Qaraqalpaqstannıń paytaxtın úyreniń hám rus avangard óneriniń keremetli jıynağı menen máshhur Savitskiy muzeyına barıń.',
    breakfast: true,
    lunch: true,
    dinner: false,
    wifi: true,
    transport: 'Bus',
    start_date: '2024-06-15',
    end_date: '2024-06-17',
    cost: 299,
    phone_number: '+998 61 223 45 67',
    messanger_id: '@bluehorizon_tours',
    max_seats: 15,
    photos: [],
    additional_info: []
  },
  {
    id: 'sample-2',
    title_en: 'Aral Sea Expedition',
    title_ru: 'Экспедиция к Аральскому морю',
    title_uz: 'Orol dengizi ekspeditsiyasi',
    title_kaa: 'Aral teńizi ekspeditsiyası',
    description_en: 'Journey to the haunting remains of the Aral Sea and witness the ship graveyard in this unique ecological adventure.',
    description_ru: 'Отправьтесь к призрачным остаткам Аральского моря и станьте свидетелем кладбища кораблей в этом уникальном экологическом приключении.',
    description_uz: 'Orol dengizining dahshatli qoldiqlariga sayohat qiling va bu noyob ekologik sarguzashtda kema qabristoniga guvoh bo\'ling.',
    description_kaa: 'Aral teńiziniń qorqınısh qaldıqlarına sayaxat etiń hám bul noyob ekologiyalıq macerada keme qábiristanına guwahshı bolıń.',
    breakfast: true,
    lunch: true,
    dinner: true,
    wifi: false,
    transport: '4WD Vehicle',
    start_date: '2024-07-01',
    end_date: '2024-07-03',
    cost: 450,
    phone_number: '+998 61 223 45 67',
    messanger_id: '@bluehorizon_tours',
    max_seats: 8,
    photos: [],
    additional_info: []
  },
  {
    id: 'sample-3',
    title_en: 'Mizdakhan Sacred Journey',
    title_ru: 'Священное путешествие в Миздахан',
    title_uz: 'Mizdaxon muqaddas sayohati',
    title_kaa: 'Mizdaxan muqaddas sayaxatı',
    description_en: 'Visit the ancient necropolis of Mizdakhan, one of the most sacred pilgrimage sites in Central Asia with 2000 years of history.',
    description_ru: 'Посетите древний некрополь Миздахан, одно из самых священных мест паломничества в Центральной Азии с 2000-летней историей.',
    description_uz: 'Markaziy Osiyodagi eng muqaddas ziyorat joylaridan biri bo\'lgan 2000 yillik tarixga ega qadimiy Mizdaxon qabristoniga tashrif buyuring.',
    description_kaa: 'Orta Aziyada eń muqaddas zıyarat jerlerinen biri bolǧan 2000 jıllıq tariyxqa iye qadimgi Mizdaxan qábiristanına barıń.',
    breakfast: true,
    lunch: false,
    dinner: false,
    wifi: true,
    transport: 'Minibus',
    start_date: '2024-08-10',
    end_date: '2024-08-10',
    cost: 150,
    phone_number: '+998 61 223 45 67',
    messanger_id: '@bluehorizon_tours',
    max_seats: 20,
    photos: [],
    additional_info: []
  }
];

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
        setError(null);
        const data = await api.getAllTours();
        // Ensure data is an array before calling slice
        const toursArray = Array.isArray(data) ? data : [];
        setTours(limit ? toursArray.slice(0, limit) : toursArray);
      } catch (err: any) {
        console.error('Failed to fetch tours:', err);
        
        // If backend is not available, use sample tours
        if (err.message.includes('Backend server is not running')) {
          console.log('Using sample tours as fallback');
          const fallbackTours = limit ? sampleTours.slice(0, limit) : sampleTours;
          setTours(fallbackTours);
          setError(null); // Don't show error when using fallback
        } else {
          setError(err.message || 'Failed to load tours');
          setTours([]); // Set empty array on other errors
        }
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
        {error ? (
          <div className="text-center py-12">
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg inline-block mb-4">
              <p className="font-medium">Unable to load tours from backend</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => window.location.reload()} 
                className="text-primary hover:underline text-sm block mx-auto"
              >
                Try again
              </button>
              <p className="text-xs text-muted-foreground">
                The app will show sample tours if the backend is unavailable
              </p>
            </div>
          </div>
        ) : tours.length > 0 ? (
          <>
            {/* Show notification if using sample data */}
            {tours[0]?.id?.startsWith('sample-') && (
              <div className="mb-8 text-center">
                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg inline-block">
                  <p className="text-sm">
                    <span className="font-medium">Demo Mode:</span> Showing sample tours. 
                    Start the backend server to see real tours.
                  </p>
                </div>
              </div>
            )}
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
          </>
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
