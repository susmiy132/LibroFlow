
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { DashboardStats } from '../types';

interface ChartsProps {
  stats: DashboardStats;
}

const DashboardCharts: React.FC<ChartsProps> = ({ stats }) => {
  const barData = [
    { name: 'Total', value: stats.totalBooks, color: '#3b82f6' },
    { name: 'Issued', value: stats.issuedBooks, color: '#10b981' },
    { name: 'Overdue', value: stats.overdueBooks, color: '#ef4444' }
  ];

  const pieData = [
    { name: 'Available', value: stats.totalBooks - stats.issuedBooks },
    { name: 'Issued', value: stats.issuedBooks }
  ];

  const COLORS = ['#10b981', '#3b82f6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-700">Inventory Status</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold mb-4 text-slate-700">Stock Availability</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-600">Issued</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
