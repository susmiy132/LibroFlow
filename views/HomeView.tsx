
import React from 'react';
import { APP_NAME } from '../constants';

interface HomeViewProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <span className="text-blue-600 text-3xl">📖</span>
            {APP_NAME}
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Features</a>
            <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About</a>
            <button 
              onClick={onLogin}
              className="px-6 py-2.5 text-slate-700 font-bold hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop" 
              alt="Library" 
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
            <div className="max-w-2xl animate-slide-up">
              <span className="inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">
                Next-Gen Library Management
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Unlock a World of <span className="text-blue-400">Knowledge</span> Effortlessly
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Experience the modern way of managing books. Smart recommendations, real-time tracking, and seamless borrowing for students and librarians alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onGetStarted}
                  className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-600/40 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Join Today <span>🚀</span>
                </button>
                <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                  Explore Catalog
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Why Choose {APP_NAME}?</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Our platform combines cutting-edge AI with intuitive design to revolutionize your reading journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">✨</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Recommendations</h3>
                <p className="text-slate-600">Our Gemini-powered librarian suggests books tailored exactly to your reading history and preferences.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📊</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Insights</h3>
                <p className="text-slate-600">Advanced dashboard with visual analytics for librarians to track circulation and inventory health.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">💰</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Fine Management</h3>
                <p className="text-slate-600">Automated calculations and notification system ensuring transparent and fair overdue handling.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Study Vibes Section */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
              alt="Students Studying" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-xl">
              <h2 className="text-4xl font-extrabold text-white mb-6">Built for the Modern Student</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Whether you're researching for a thesis or diving into a new hobby, LibroFlow provides a frictionless environment to access resources.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-slate-200">
                  <span className="text-emerald-500">✔</span> One-click borrowing system
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <span className="text-emerald-500">✔</span> Personal reading history tracking
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <span className="text-emerald-500">✔</span> Digital due date reminders
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all"
              >
                Join our Community
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
              <span className="text-blue-500">📖</span>
              {APP_NAME}
            </div>
            <p className="max-w-xs mb-8">
              A premium, modern solution for digital library management. Empowering readers and librarians across the globe.
            </p>
            <div className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">𝕏</span>
              <span className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">in</span>
              <span className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">f</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Catalog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Search</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For Admins</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>support@libroflow.com</li>
              <li>+1 (555) 000-0000</li>
              <li>123 Library St, Wisdom City</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 text-sm text-center">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeView;
