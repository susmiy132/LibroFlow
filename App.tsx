
import React, { useState, useEffect } from 'react';
import { UserRole, User } from './types';
import Layout from './components/Layout';
import Toast from './components/Toast';
import DashboardView from './views/DashboardView';
import CatalogView from './views/CatalogView';
import AuthView from './views/AuthView';
import HomeView from './views/HomeView';
import BookManagementView from './views/BookManagementView';
import ProfileView from './views/ProfileView';
import { useLibraryViewModel } from './viewmodels/useLibraryViewModel';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthMode, setIsAuthMode] = useState<boolean>(false);
  const [view, setView] = useState<string>('dashboard');

  useEffect(() => {
    const saved = localStorage.getItem('libro_user');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  const viewModel = useLibraryViewModel(
    currentUser?.id || '', 
    currentUser?.role || UserRole.STUDENT
  );

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthMode(false);
    localStorage.setItem('libro_user', JSON.stringify(user));
    setView(user.role === UserRole.ADMIN ? 'dashboard' : 'catalog');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthMode(false);
    setView('dashboard');
    localStorage.removeItem('libro_user');
    viewModel.showToast('You have been logged out.', 'info');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('libro_user', JSON.stringify(updatedUser));
  };

  // If not logged in
  if (!currentUser) {
    return (
      <div className="relative">
        <HomeView 
          onGetStarted={() => setIsAuthMode(true)} 
          onLogin={() => setIsAuthMode(true)} 
        />
        
        {isAuthMode && (
          <AuthView 
            onLoginSuccess={handleLoginSuccess} 
            showToast={viewModel.showToast} 
            onClose={() => setIsAuthMode(false)}
          />
        )}
        
        <Toast messages={viewModel.toasts} onRemove={viewModel.removeToast} />
      </div>
    );
  }

  // If logged in
  return (
    <>
      <Layout 
        role={currentUser.role} 
        currentView={view} 
        onNavigate={setView} 
        onLogout={handleLogout}
        user={currentUser}
      >
        {view === 'dashboard' && (
          <DashboardView 
            role={currentUser.role} 
            stats={viewModel.getDashboardStats()}
            recentTransactions={viewModel.transactions.slice(0, 5)}
            calculateFine={viewModel.calculateFine}
            books={viewModel.books}
          />
        )}

        {view === 'catalog' && (
          <CatalogView 
            books={viewModel.filteredBooks}
            searchTerm={viewModel.searchTerm}
            setSearchTerm={viewModel.setSearchTerm}
            categoryFilter={viewModel.categoryFilter}
            setCategoryFilter={viewModel.setCategoryFilter}
            onIssue={viewModel.handleIssue}
          />
        )}

        {view === 'books' && currentUser.role === UserRole.ADMIN && (
          <BookManagementView 
            books={viewModel.books}
            onSave={viewModel.handleSaveBook}
            onDelete={viewModel.handleDeleteBook}
          />
        )}

        {view === 'my-books' && (
          <DashboardView 
            role={UserRole.STUDENT} 
            stats={viewModel.getDashboardStats()}
            recentTransactions={viewModel.transactions}
            onReturn={viewModel.handleReturn}
            calculateFine={viewModel.calculateFine}
            books={viewModel.books}
          />
        )}

        {view === 'transactions' && (
          <DashboardView 
            role={UserRole.ADMIN} 
            stats={viewModel.getDashboardStats()}
            recentTransactions={viewModel.transactions}
            calculateFine={viewModel.calculateFine}
            books={viewModel.books}
          />
        )}

        {view === 'profile' && (
          <ProfileView 
            user={currentUser} 
            onUpdate={handleUserUpdate} 
            showToast={viewModel.showToast}
          />
        )}
      </Layout>
      <Toast messages={viewModel.toasts} onRemove={viewModel.removeToast} />
    </>
  );
};

export default App;
