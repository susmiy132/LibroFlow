
import React from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ messages, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`px-6 py-3 rounded-xl shadow-2xl text-white font-medium flex items-center justify-between gap-4 animate-slide-in ${
            msg.type === 'success' ? 'bg-emerald-500' :
            msg.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{msg.type === 'success' ? '✅' : msg.type === 'error' ? '❌' : 'ℹ️'}</span>
            <span>{msg.text}</span>
          </div>
          <button onClick={() => onRemove(msg.id)} className="hover:opacity-70">✕</button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
