
import { Book, Transaction, User, TransactionStatus } from '../types';
import { MOCK_BOOKS } from '../constants';

const BOOKS_KEY = 'libroflow_books';
const TRANSACTIONS_KEY = 'libroflow_transactions';
const USERS_KEY = 'libroflow_users';

export const apiService = {
  init() {
    // If books don't exist, or if we want to force a refresh for a demo, we can check.
    // For this specific update, we check if our new mock books are present.
    const existingBooks = localStorage.getItem(BOOKS_KEY);
    if (!existingBooks || JSON.parse(existingBooks).length < MOCK_BOOKS.length) {
      localStorage.setItem(BOOKS_KEY, JSON.stringify(MOCK_BOOKS));
    }
    
    if (!localStorage.getItem(TRANSACTIONS_KEY)) {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
  },

  // Auth
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  },

  register(user: User): { success: boolean; message: string } {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) {
      return { success: false, message: 'Email already registered' };
    }
    users.push({ ...user, id: Math.random().toString(36).substr(2, 9) });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: 'Registration successful' };
  },

  login(email: string, password?: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  },

  updateUser(updatedUser: User): { success: boolean; message: string } {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index > -1) {
      users[index] = { ...users[index], ...updatedUser };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return { success: true, message: 'Profile updated successfully' };
    }
    return { success: false, message: 'User not found' };
  },

  // Books
  getBooks(): Book[] {
    return JSON.parse(localStorage.getItem(BOOKS_KEY) || '[]');
  },

  saveBook(book: Book) {
    const books = this.getBooks();
    const index = books.findIndex(b => b.id === book.id);
    if (index > -1) {
      const diff = book.quantity - books[index].quantity;
      book.available = Math.max(0, books[index].available + diff);
      books[index] = book;
    } else {
      book.id = Math.random().toString(36).substr(2, 9);
      book.available = book.quantity;
      books.push(book);
    }
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },

  deleteBook(id: string) {
    const books = this.getBooks().filter(b => b.id !== id);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    const transactions = this.getTransactions().filter(t => t.bookId !== id);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  },

  // Transactions
  getTransactions(): Transaction[] {
    return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
  },

  issueBook(userId: string, bookId: string): boolean {
    const books = this.getBooks();
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex > -1 && books[bookIndex].available > 0) {
      books[bookIndex].available -= 1;
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));

      const transactions = this.getTransactions();
      const now = new Date();
      const dueDate = new Date();
      dueDate.setDate(now.getDate() + 14);

      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        bookId,
        issueDate: now.toISOString(),
        dueDate: dueDate.toISOString(),
        status: TransactionStatus.ISSUED,
        fine: 0
      };

      transactions.push(newTransaction);
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
      return true;
    }
    return false;
  },

  returnBook(transactionId: string) {
    const transactions = this.getTransactions();
    const transIndex = transactions.findIndex(t => t.id === transactionId);
    
    if (transIndex > -1) {
      const transaction = transactions[transIndex];
      transaction.returnDate = new Date().toISOString();
      transaction.status = TransactionStatus.RETURNED;
      
      const books = this.getBooks();
      const bookIndex = books.findIndex(b => b.id === transaction.bookId);
      if (bookIndex > -1) {
        books[bookIndex].available += 1;
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      }

      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    }
  }
};
