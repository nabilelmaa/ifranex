export interface ServiceProps {
    id: string;
    banner: string;
    pricePerHour: number;
    category: string;
    title: string;
    description: string;
  }

  export interface Service {
    id: string;
    banner: string;
    pricePerHour: number;
    category: string;
    title_en: string;
    description_en: string;
    title_fr: string;
    description_fr: string;
  }
  

export interface BookingProps {
  bookingDate: string | number | Date;
  description: string;
  title: string;
  id: string;
  fullName: string;
  address: string;
  timing: string; 
  phoneNumber: string;
  details: string;
  status: string; 
  createdAt: string; 
  service: Partial<ServiceProps>; 
}

export interface BookingDetails {
    serviceTitle: string; 
    id: string;
    fullName: string;
    address: string;
    timing: string;
    phoneNumber: string;
    details: string;
    createdAt: string;
    customerId: string;
}

export interface Review {
  user: any;
  id: string
  userId: string
  rating: number
  comment: string
  timestamp: string | number | Date;
}