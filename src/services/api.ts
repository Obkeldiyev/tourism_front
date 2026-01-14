import { Tour, CreateBookingData, Booking } from '@/types/tour';

const API_BASE_URL = 'http://localhost:9000';

export const api = {
  // Tours
  getAllTours: async (): Promise<Tour[]> => {
    const response = await fetch(`${API_BASE_URL}/turs`);
    if (!response.ok) throw new Error('Failed to fetch tours');
    return response.json();
  },

  getTourById: async (id: string): Promise<Tour> => {
    const response = await fetch(`${API_BASE_URL}/turs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch tour');
    return response.json();
  },

  // Bookings
  createBooking: async (data: CreateBookingData): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },
};
