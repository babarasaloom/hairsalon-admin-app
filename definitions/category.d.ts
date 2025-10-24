export interface ICategory {
  id?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isPublished: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
