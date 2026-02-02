
import React, { useState } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface ProfileViewProps {
  user: User;
  onUpdate: (user: User) => void;
  showToast: (text: string, type: 'success' | 'error') => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate, showToast }) => {
  const [profileData, setProfileData] = useState({
    name: user.name,
    profileImage: user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profileData };
    const result = apiService.updateUser(updatedUser);
    if (result.success) {
      onUpdate(updatedUser);
      showToast('Profile information updated!', 'success');
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.current !== user.password) {
      showToast('Current password is incorrect.', 'error');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (passwordData.new.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    const updatedUser = { ...user, password: passwordData.new };
    const result = apiService.updateUser(updatedUser);
    if (result.success) {
      onUpdate(updatedUser);
      showToast('Password changed successfully!', 'success');
      setPasswordData({ current: '', new: '', confirm: '' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      {/* Profile Overview Card */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="relative inline-block mb-6">
            <img 
              src={profileData.profileImage} 
              alt={user.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 shadow-inner"
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center text-xs">
              ⚡
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
          <p className="text-slate-500 font-medium mb-4">{user.email}</p>
          <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest">
            {user.role}
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-600/20 text-white">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <span>🛡️</span> Security Status
          </h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            Your account is protected with local storage encryption. Remember to log out when using public devices.
          </p>
        </div>
      </div>

      {/* Edit Details Forms */}
      <div className="lg:col-span-2 space-y-8">
        {/* Basic Info Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Edit Profile</h3>
          </div>
          <form onSubmit={handleProfileUpdate} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Display Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={profileData.name}
                  onChange={e => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Profile Image URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="https://example.com/photo.jpg"
                  value={profileData.profileImage}
                  onChange={e => setProfileData({...profileData, profileImage: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
          </div>
          <form onSubmit={handlePasswordUpdate} className="p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Current Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={passwordData.current}
                onChange={e => setPasswordData({...passwordData, current: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={passwordData.new}
                  onChange={e => setPasswordData({...passwordData, new: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Confirm New Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={passwordData.confirm}
                  onChange={e => setPasswordData({...passwordData, confirm: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:bg-slate-900 transition-all active:scale-95"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
