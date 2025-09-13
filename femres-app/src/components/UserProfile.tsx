import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import UserAvatar from './UserAvatar';

export default function UserProfile() {
  const { user, isAuthenticated, interactions, logout, updateUsername, isLoading } = useAuthStore();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [error, setError] = useState('');

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
    setNewUsername(user?.username || '');
    setError('');
  };

  const handleUsernameCancel = () => {
    setIsEditingUsername(false);
    setNewUsername(user?.username || '');
    setError('');
  };

  const handleUsernameSave = async () => {
    if (!newUsername.trim()) {
      setError('用户名不能为空');
      return;
    }

    if (newUsername.trim() === user?.username) {
      setIsEditingUsername(false);
      return;
    }

    const result = await updateUsername(newUsername.trim());

    if (result.success) {
      setIsEditingUsername(false);
      setError('');
    } else {
      setError(result.error || '更新失败');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUsernameSave();
    } else if (e.key === 'Escape') {
      handleUsernameCancel();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            请先登录
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            登录后即可查看您的个人资料和内容
          </p>
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
          >
            返回首页
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* User Info Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex-shrink-0">
            <UserAvatar name={user?.username || ''} size="lg" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-2">
              {isEditingUsername ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="text-2xl font-bold bg-transparent border-b-2 border-purple-500 focus:outline-none text-gray-900 dark:text-white min-w-0"
                    style={{ width: `${Math.max(newUsername.length, 8)}ch` }}
                    autoFocus
                  />
                  <button
                    onClick={handleUsernameSave}
                    disabled={isLoading}
                    className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleUsernameCancel}
                    className="p-1 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.username}
                  </h1>
                  <button
                    onClick={handleUsernameEdit}
                    className="p-1 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    title="编辑用户名"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {user?.email}
            </p>
            <div className="flex flex-wrap gap-8 sm:gap-12 justify-center sm:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {interactions.likes.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">点赞</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {interactions.bookmarks.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">收藏</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {new Date(user?.created_at || '').toLocaleDateString('zh-CN')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">加入日期</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={logout}
              className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <a
          href="/profile/likes"
          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                我的点赞
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {interactions.likes.length} 个内容
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        <a
          href="/profile/bookmarks"
          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-full flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                我的收藏
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {interactions.bookmarks.length} 个内容
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          快速操作
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/books"
            className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200"
          >
            <span className="text-2xl mb-2 block">📚</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">浏览书籍</p>
          </a>
          <a
            href="/articles"
            className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200"
          >
            <span className="text-2xl mb-2 block">📰</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">阅读文章</p>
          </a>
          <a
            href="/topics"
            className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200"
          >
            <span className="text-2xl mb-2 block">🏷️</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">探索主题</p>
          </a>
        </div>
      </div>
    </div>
  );
}