
import React from 'react';
import { DashboardStats, UserRole, Transaction } from '../types';
import DashboardCharts from '../components/DashboardCharts';

interface DashboardProps {
  role: UserRole;
  stats: DashboardStats;
  recentTransactions: Transaction[];
  onReturn?: (id: string) => void;
  calculateFine: (t: Transaction) => number;
  books: any[];
}

const DashboardView: React.FC<DashboardProps> = ({ role, stats, recentTransactions, onReturn, calculateFine, books }) => {
  const getBookTitle = (id: string) => books.find(b => b.id === id)?.title || 'Unknown Book';

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Books', value: stats.totalBooks, color: 'blue', icon: '📚' },
          { label: 'Issued Now', value: stats.issuedBooks, color: 'emerald', icon: '📖' },
          { label: 'Overdue', value: stats.overdueBooks, color: 'red', icon: '⚠️' },
          { label: 'Fines Due', value: `$${stats.totalFines}`, color: 'amber', icon: '💰' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between group hover:border-blue-300 transition-colors">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{item.label}</p>
              <p className={`text-2xl font-bold text-slate-800`}>{item.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg bg-${item.color}-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Admin Visuals */}
      {role === UserRole.ADMIN && <DashboardCharts stats={stats} />}

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">
            {role === UserRole.ADMIN ? 'Recent Transactions' : 'Your Borrowed Books'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Book Title</th>
                <th className="px-6 py-4 font-semibold">Issue Date</th>
                <th className="px-6 py-4 font-semibold">Due Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Fine</th>
                {role === UserRole.STUDENT && <th className="px-6 py-4 font-semibold text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map(trans => {
                const fine = calculateFine(trans);
                const isOverdue = new Date(trans.dueDate) < new Date() && trans.status !== 'RETURNED';
                
                return (
                  <tr key={trans.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-700">{getBookTitle(trans.bookId)}</p>
                      <p className="text-xs text-slate-400">ID: {trans.id}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(trans.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(trans.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        trans.status === 'RETURNED' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : isOverdue ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {isOverdue ? 'OVERDUE' : trans.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      {fine > 0 ? `$${fine}` : '-'}
                    </td>
                    {role === UserRole.STUDENT && (
                      <td className="px-6 py-4 text-right">
                        {trans.status === 'ISSUED' && (
                          <button
                            onClick={() => onReturn && onReturn(trans.id)}
                            className="px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900 transition-all"
                          >
                            Return
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
              {recentTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
