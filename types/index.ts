import { BookingStatus, Service } from "@prisma/client";

export interface ServiceProps {
    id: string;
    banner: string;
    pricePerHour: number;
    category: string;
    title: string;
    description: string;
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

export interface Booking {
    id: string;
    fullName: string;
    address: string;
    timing: Date;
    phoneNumber: string;
    details: string;
    status: BookingStatus; 
    createdAt: Date;
    customerId: string;
    serviceId: Service;
  }