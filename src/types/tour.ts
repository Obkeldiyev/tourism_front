export interface Photo {
  id: number;
  url: string;
  tur_id: string;
}

export interface AdditionalInfo {
  id: number;
  info_title_uz: string;
  info_description_uz: string;
  info_title_en: string;
  info_description_en: string;
  info_title_ru: string;
  info_description_ru: string;
  info_title_kaa: string;
  info_description_kaa: string;
  tur_id: string;
}

export interface Tour {
  id: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  title_kaa: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  description_kaa: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  wifi: boolean;
  transport: string;
  start_date: string;
  end_date: string;
  cost: number;
  phone_number: string;
  messanger_id: string;
  max_seats: number;
  photos: Photo[];
  additional_info: AdditionalInfo[];
}

export interface Booking {
  id: string;
  tur_id: string;
  full_name: string;
  phone_number: string;
  seats_booked: number;
  status: string;
  booking_date: string;
}

export interface CreateBookingData {
  tur_id: string;
  full_name: string;
  phone_number: string;
  seats_booked: number;
}
