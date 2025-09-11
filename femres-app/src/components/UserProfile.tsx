import React from 'react';
import { useAuthStore } from '../store/authStore';
import UserAvatar from './UserAvatar';

export default function UserProfile() {
  const { user, isAuthenticated, interactions, logout } = useAuthStore();

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user?.username}
            </h1>
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
                  {new Date(user?.createdAt || '').toLocaleDateString('zh-CN')}
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