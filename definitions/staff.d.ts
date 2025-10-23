export interface IWorkingHour {
  day: string; // e.g. "Monday"
  start: string; // e.g. "09:00"
  end: string; // e.g. "17:00"
}

export interface IStaff {
  id?: string;
  name: string;
  email?: string;
  contactNumber?: string;
  role: "stylist" | "receptionist" | "manager";
  avatarUrl?: string;
  services: string[];
  isActive: boolean;
  workingHours?: IWorkingHour[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
