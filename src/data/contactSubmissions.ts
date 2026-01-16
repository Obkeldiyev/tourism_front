export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  rating: number;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

// In-memory storage for contact submissions
let contactSubmissions: ContactSubmission[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0123',
    subject: 'Amazing Nukus Tour',
    message: 'I had an incredible experience visiting the Savitsky Museum. The guide was very knowledgeable and the organization was perfect. Thank you for this unforgettable journey!',
    rating: 5,
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'read'
  },
  {
    id: '2',
    name: 'Dmitry Petrov',
    email: 'dmitry.petrov@email.com',
    phone: '+7-999-123-4567',
    subject: 'Aral Sea Experience',
    message: 'The Aral Sea ship graveyard was both haunting and fascinating. Our guide explained the ecological history beautifully. Highly recommend this unique experience.',
    rating: 5,
    submittedAt: '2024-01-14T14:20:00Z',
    status: 'replied'
  },
  {
    id: '3',
    name: 'Emma Schmidt',
    email: 'emma.schmidt@email.com',
    phone: '+49-30-12345678',
    subject: 'Mizdakhan Tour Inquiry',
    message: 'I would like to book a tour to Mizdakhan necropolis. Could you please provide more information about the available dates and pricing?',
    rating: 4,
    submittedAt: '2024-01-13T09:15:00Z',
    status: 'new'
  }
];

export const getContactSubmissions = (): ContactSubmission[] => {
  return [...contactSubmissions];
};

export const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>): ContactSubmission => {
  const newSubmission: ContactSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  contactSubmissions.unshift(newSubmission);
  return newSubmission;
};

export const updateSubmissionStatus = (id: string, status: ContactSubmission['status']): void => {
  const index = contactSubmissions.findIndex(sub => sub.id === id);
  if (index !== -1) {
    contactSubmissions[index].status = status;
  }
};

export const deleteContactSubmission = (id: string): void => {
  contactSubmissions = contactSubmissions.filter(sub => sub.id !== id);
};

export const getSubmissionStats = () => {
  const total = contactSubmissions.length;
  const newCount = contactSubmissions.filter(sub => sub.status === 'new').length;
  const avgRating = contactSubmissions.length > 0 
    ? contactSubmissions.reduce((sum, sub) => sum + sub.rating, 0) / contactSubmissions.length 
    : 0;
  
  return {
    total,
    new: newCount,
    averageRating: Math.round(avgRating * 10) / 10
  };
};