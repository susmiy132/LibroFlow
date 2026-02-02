
export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  profileImage?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  available: number;
  imageUrl: string;
  description?: string;
}

export enum TransactionStatus {
  ISSUED = 'ISSUED',
  RETURNED = 'RETURNED',
  OVERDUE = 'OVERDUE'
}

export interface Transaction {
  id: string;
  bookId: string;
  userId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: TransactionStatus;
  fine: number;
}

export interface DashboardStats {
  totalBooks: number;
  issuedBooks: number;
  overdueBooks: number;
  activeUsers: number;
  totalFines: number;
}

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info';
}
