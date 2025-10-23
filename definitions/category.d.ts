export interface ICategory {
  id?: string;
  name: string;
  description?: string;
  isPublished: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
