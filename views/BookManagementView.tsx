
import React, { useState } from 'react';
import { Book } from '../types';
import { CATEGORIES } from '../constants';

interface BookManagementProps {
  books: Book[];
  onSave: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookManagementView: React.FC<BookManagementProps> = ({ books, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book>>({});

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentBook({
      title: '',
      author: '',
      isbn: '',
      category: CATEGORIES[0],
      quantity: 1,
      imageUrl: 'https://picsum.photos/seed/newbook/400/600',
      description: ''
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(currentBook as Book);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Inventory Management</h2>
          <p className="text-sm text-slate-500">Add, update or remove books from the system</p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          <span>➕</span> Add New Book
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Book</th>
              <th className="px-6 py-4 font-semibold">ISBN</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {books.map(book => (
              <tr key={book.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <img src={book.imageUrl} className="w-10 h-14 rounded-md object-cover shadow-sm" />
                  <div>
                    <p className="font-bold text-slate-800">{book.title}</p>
                    <p className="text-xs text-slate-500">{book.author}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-slate-600">{book.isbn}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                    {book.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <span className="font-bold text-slate-800">{book.available}</span>
                    <span className="text-slate-400"> / {book.quantity}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(book)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                  <button onClick={() => onDelete(book.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Book Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {currentBook.id ? 'Edit Book Details' : 'Register New Book'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Book Title</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={currentBook.title}
                  onChange={e => setCurrentBook({...currentBook, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Author</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={currentBook.author}
                  onChange={e => setCurrentBook({...currentBook, author: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">ISBN</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  value={currentBook.isbn}
                  onChange={e => setCurrentBook({...currentBook, isbn: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
                <select
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={currentBook.category}
                  onChange={e => setCurrentBook({...currentBook, category: e.target.value})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Total Quantity</label>
                <input
                  required
                  type="number"
                  min="1"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={currentBook.quantity}
                  onChange={e => setCurrentBook({...currentBook, quantity: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cover Image URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="https://..."
                  value={currentBook.imageUrl}
                  onChange={e => setCurrentBook({...currentBook, imageUrl: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
                  value={currentBook.description}
                  onChange={e => setCurrentBook({...currentBook, description: e.target.value})}
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagementView;
