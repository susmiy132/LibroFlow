
import React from 'react';
import { UserRole, User } from '../types';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, role, currentView, onNavigate, onLogout, user }) => {
  const menuItems = role === UserRole.ADMIN 
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'books', label: 'Manage Books', icon: '📚' },
        { id: 'transactions', label: 'Transactions', icon: '🔄' },
        { id: 'profile', label: 'My Profile', icon: '👤' },
      ]
    : [
        { id: 'catalog', label: 'Browse Books', icon: '🔍' },
        { id: 'my-books', label: 'My Borrowed Books', icon: '📖' },
        { id: 'profile', label: 'My Profile', icon: '👤' },
      ];

  const profileImg = user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 text-2xl font-bold border-b border-slate-800 flex items-center gap-2">
          <span className="text-blue-400">📖</span>
          {APP_NAME}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-slate-800/50">
            <img 
              src={profileImg} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-700"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {menuItems.find(i => i.id === currentView)?.label || 'Welcome'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage your library experience seamlessly</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative p-2 bg-white rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
             </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
