
import React, { useState } from 'react';
import { Book, UserRole } from '../types';
import { CATEGORIES } from '../constants';
import { geminiService } from '../services/gemini';

interface CatalogProps {
  books: Book[];
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  onIssue: (bookId: string) => void;
}

const CatalogView: React.FC<CatalogProps> = ({ 
  books, 
  searchTerm, 
  setSearchTerm, 
  categoryFilter, 
  setCategoryFilter,
  onIssue 
}) => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);

  const getSmartRecs = async () => {
    setLoadingRec(true);
    const rec = await geminiService.getRecommendation(books.slice(0, 3));
    setRecommendation(rec || "No recommendations available.");
    setLoadingRec(false);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button 
          onClick={getSmartRecs}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2"
        >
          <span>✨</span> Smart Suggest
        </button>
      </div>

      {/* Recommendations Banner */}
      {recommendation && (
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl relative">
          <button 
            onClick={() => setRecommendation(null)}
            className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-600"
          >
            ✕
          </button>
          <h3 className="font-bold text-indigo-800 flex items-center gap-2 mb-2">
            <span>✨</span> Librarian's Choice (AI Suggested)
          </h3>
          <div className="text-indigo-700 whitespace-pre-line text-sm leading-relaxed">
            {recommendation}
          </div>
        </div>
      )}

      {loadingRec && (
        <div className="animate-pulse flex items-center gap-3 bg-indigo-50 p-4 rounded-xl">
           <div className="w-4 h-4 bg-indigo-300 rounded-full animate-bounce"></div>
           <span className="text-indigo-600 font-medium">Consulting our AI Librarian...</span>
        </div>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-all flex flex-col">
            <div className="h-48 relative overflow-hidden bg-slate-100">
              <img 
                src={book.imageUrl} 
                alt={book.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur text-[10px] font-bold rounded uppercase tracking-wider text-slate-700 shadow-sm">
                {book.category}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-800 truncate mb-1">{book.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{book.author}</p>
              
              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Available</span>
                  <span className={`font-bold ${book.available > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {book.available} / {book.quantity}
                  </span>
                </div>
                
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${book.available > 0 ? 'bg-emerald-500' : 'bg-red-400'}`}
                    style={{ width: `${(book.available / book.quantity) * 100}%` }}
                  ></div>
                </div>

                <button
                  disabled={book.available === 0}
                  onClick={() => onIssue(book.id)}
                  className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm ${
                    book.available > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {book.available > 0 ? 'Borrow Book' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 text-lg">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogView;
