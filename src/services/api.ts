import { Tour, CreateBookingData, Booking } from '@/types/tour';

const API_BASE_URL = 'http://localhost:9000';

// API Response wrapper interface
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const api = {
  // Tours
  getAllTours: async (): Promise<Tour[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/turs`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result: ApiResponse<Tour[]> = await response.json();
      return result.data || [];
    } catch (error: any) {
      console.error('Failed to fetch tours:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  getTourById: async (id: string): Promise<Tour> => {
    try {
      const response = await fetch(`${API_BASE_URL}/turs/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result: ApiResponse<Tour> = await response.json();
      return result.data;
    } catch (error: any) {
      console.error('Failed to fetch tour:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  createTour: async (formData: FormData, token: string): Promise<Tour> => {
    try {
      const response = await fetch(`${API_BASE_URL}/turs`, {
        method: 'POST',
        headers: {
          token: token,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result: ApiResponse<Tour> = await response.json();
      return result.data;
    } catch (error: any) {
      console.error('Failed to create tour:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  updateTour: async (id: string, formData: FormData, token: string): Promise<Tour> => {
    try {
      const response = await fetch(`${API_BASE_URL}/turs/${id}`, {
        method: 'PATCH',
        headers: {
          token: token,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result: ApiResponse<Tour> = await response.json();
      return result.data;
    } catch (error: any) {
      console.error('Failed to update tour:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  deleteTour: async (id: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/turs/${id}`, {
        method: 'DELETE',
        headers: {
          token: token,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error('Failed to delete tour:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  // Bookings
  createBooking: async (data: CreateBookingData): Promise<Booking> => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result: ApiResponse<Booking> = await response.json();
      return result.data;
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  getAllBookings: async (token: string): Promise<Booking[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        headers: {
          token: token,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result: ApiResponse<Booking[]> = await response.json();
      return result.data || [];
    } catch (error: any) {
      console.error('Failed to fetch bookings:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  getBookingById: async (id: string, token: string): Promise<Booking> => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        headers: {
          token: token,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result: ApiResponse<Booking> = await response.json();
      return result.data;
    } catch (error: any) {
      console.error('Failed to fetch booking:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  deleteBooking: async (id: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          token: token,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error('Failed to delete booking:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },

  getBookingHistory: async (token: string): Promise<Booking[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/history`, {
        headers: {
          token: token,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result: ApiResponse<Booking[]> = await response.json();
      return result.data || [];
    } catch (error: any) {
      console.error('Failed to fetch booking history:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please start the tourism backend on port 9000.');
      }
      throw error;
    }
  },
};
