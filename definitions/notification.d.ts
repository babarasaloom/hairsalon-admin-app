export interface INotification {
    id?: string;
    userId?: string;
    title: string;
    message: string;
    type: "booking" | "reminder" | "system";
    isRead: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }
  