
import { useState, useEffect, useCallback } from 'react';
import { Book, Transaction, DashboardStats, TransactionStatus, UserRole, ToastMessage } from '../types';
import { apiService } from '../services/api';
import { FINE_PER_DAY } from '../constants';

export const useLibraryViewModel = (userId: string, role: UserRole) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshData = useCallback(() => {
    apiService.init();
    const allBooks = apiService.getBooks();
    const allTrans = apiService.getTransactions();
    
    setBooks(allBooks);
    setTransactions(allTrans);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = categoryFilter === 'All' || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getDashboardStats = (): DashboardStats => {
    const activeTrans = transactions.filter(t => t.status !== TransactionStatus.RETURNED);
    const now = new Date();
    const overdueCount = activeTrans.filter(t => new Date(t.dueDate) < now).length;

    return {
      totalBooks: books.reduce((acc, b) => acc + b.quantity, 0),
      issuedBooks: transactions.filter(t => t.status === TransactionStatus.ISSUED).length,
      overdueBooks: overdueCount,
      activeUsers: apiService.getUsers().length,
      totalFines: transactions.reduce((acc, t) => acc + calculateFine(t), 0)
    };
  };

  const calculateFine = (t: Transaction): number => {
    if (t.status === TransactionStatus.RETURNED && t.returnDate) {
      const due = new Date(t.dueDate);
      const ret = new Date(t.returnDate);
      if (ret > due) {
        const diff = Math.floor((ret.getTime() - due.getTime()) / (1000 * 3600 * 24));
        return diff * FINE_PER_DAY;
      }
    } else if (t.status === TransactionStatus.ISSUED) {
      const now = new Date();
      const due = new Date(t.dueDate);
      if (now > due) {
        const diff = Math.floor((now.getTime() - due.getTime()) / (1000 * 3600 * 24));
        return diff * FINE_PER_DAY;
      }
    }
    return 0;
  };

  const handleIssue = (bookId: string) => {
    const success = apiService.issueBook(userId, bookId);
    if (success) {
      showToast('Book borrowed successfully!', 'success');
      refreshData();
    } else {
      showToast('Book is currently out of stock.', 'error');
    }
    return success;
  };

  const handleReturn = (transId: string) => {
    apiService.returnBook(transId);
    showToast('Book returned successfully!', 'success');
    refreshData();
  };

  const handleSaveBook = (book: Book) => {
    apiService.saveBook(book);
    showToast(book.id ? 'Book updated!' : 'New book added!', 'success');
    refreshData();
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to delete this book? This will also remove associated transactions.')) {
      apiService.deleteBook(id);
      showToast('Book deleted permanently.', 'info');
      refreshData();
    }
  };

  return {
    books,
    transactions: role === UserRole.ADMIN ? transactions : transactions.filter(t => t.userId === userId),
    filteredBooks,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    loading,
    toasts,
    removeToast,
    showToast,
    getDashboardStats,
    handleIssue,
    handleReturn,
    handleSaveBook,
    handleDeleteBook,
    calculateFine
  };
};
