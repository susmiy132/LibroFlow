
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { apiService } from '../services/api';

interface AuthViewProps {
  onLoginSuccess: (user: User) => void;
  showToast: (text: string, type: 'success' | 'error') => void;
  onClose: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess, showToast, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const user = apiService.login(formData.email, formData.password);
      if (user) {
        showToast(`Welcome back, ${user.name}!`, 'success');
        onLoginSuccess(user);
      } else {
        showToast('Invalid credentials. Please try again.', 'error');
      }
    } else {
      const result = apiService.register({
        ...formData,
        id: '',
        role
      });
      if (result.success) {
        showToast('Account created! You can now login.', 'success');
        setIsLogin(true);
      } else {
        showToast(result.message, 'error');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Auth Card */}
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all z-10"
        >
          ✕
        </button>

        <div className="bg-slate-900 p-8 text-center text-white">
          <div className="text-5xl mb-4">📖</div>
          <h1 className="text-3xl font-extrabold tracking-tight">LibroFlow</h1>
          <p className="text-slate-400 mt-2">
            {isLogin ? 'Login to your account' : 'Join our modern library system'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRole(UserRole.STUDENT)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${role === UserRole.STUDENT ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              STUDENT
            </button>
            <button
              type="button"
              onClick={() => setRole(UserRole.ADMIN)}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${role === UserRole.ADMIN ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              ADMIN
            </button>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Full Name</label>
              <input
                required
                type="text"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Email Address</label>
            <input
              required
              type="email"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Password</label>
            <input
              required
              type="password"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 text-white rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-[0.98] ${
              role === UserRole.ADMIN ? 'bg-slate-800 hover:bg-slate-900 shadow-slate-900/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthView;
