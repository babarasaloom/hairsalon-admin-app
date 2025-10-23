export interface IService {
  id?: string;
  name: string;
  description?: string;
  duration: number; // in minutes
  imageUrl?: string;
  categoryId: string;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
