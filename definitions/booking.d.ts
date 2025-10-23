export interface IBooking {
  id?: string;
  clientId: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  date: string | Date;
  notes?: string;
  bookingItems: string[]; // references BookingItem IDs
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IBookingItem {
  id?: string;
  bookingId: string;
  serviceId: string;
  staffId: string;
  artistPriceId?: string;
  serviceName: string;
  serviceDuration: number;
  price: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
