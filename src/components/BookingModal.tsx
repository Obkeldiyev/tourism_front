import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Tour, CreateBookingData } from '@/types/tour';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BookingModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ tour, isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    seats_booked: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!tour) return null;

  const getTitle = () => {
    const key = `title_${language}` as keyof Tour;
    return (tour[key] as string) || tour.title_en;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const bookingData: CreateBookingData = {
        tur_id: tour.id,
        ...formData,
      };
      await api.createBooking(bookingData);
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ full_name: '', phone_number: '', seats_booked: 1 });
      }, 2000);
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {t('booking_title')}
          </DialogTitle>
        </DialogHeader>

        {status === 'success' ? (
          <div className="py-8 text-center animate-scale-in">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium">{t('booking_success')}</p>
          </div>
        ) : status === 'error' ? (
          <div className="py-8 text-center animate-scale-in">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <p className="text-lg font-medium">{t('booking_error')}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setStatus('idle')}
            >
              Try again
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-muted rounded-lg mb-4">
              <p className="font-medium">{getTitle()}</p>
              <p className="text-sm text-muted-foreground">
                ${tour.cost.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">{t('booking_name')}</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                required
                placeholder="Ism, Имя, Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">{t('booking_phone')}</Label>
              <Input
                id="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                required
                placeholder="+998 90 123 45 67"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats_booked">{t('booking_seats')}</Label>
              <Input
                id="seats_booked"
                type="number"
                min={1}
                max={tour.max_seats}
                value={formData.seats_booked}
                onChange={e => setFormData({ ...formData, seats_booked: parseInt(e.target.value) })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Max: {tour.max_seats} {t('tours_seats')}
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gradient"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t('booking_submit')
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
