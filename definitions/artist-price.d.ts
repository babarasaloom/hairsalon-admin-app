export interface IArtistPrice {
  id?: string;
  staffId: string; // the artist offering the service
  serviceId: string; // the service offered
  price: number; // artist’s custom price
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
