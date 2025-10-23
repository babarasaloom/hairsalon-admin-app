export interface IClient {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  avatarUrl?: string;
  notes?: string;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
