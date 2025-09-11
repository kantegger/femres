import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

interface InteractionButtonsProps {
  contentId: string;
  initialLikes?: number;
  className?: string;
}

export default function InteractionButtons({ contentId, initialLikes = 0, className = '' }: InteractionButtonsProps) {
  const { isAuthenticated, toggleLike, toggleBookmark, isLiked, isBookmarked, interactions } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const isCurrentlyLiked = isLiked(contentId);
      const isCurrentlyBookmarked = isBookmarked(contentId);
      setLiked(isCurrentlyLiked);
      setBookmarked(isCurrentlyBookmarked);
      
      // Calculate actual like count based on current state
      setLikeCount(initialLikes + (isCurrentlyLiked ? 1 : 0));
    } else {
      setLiked(false);
      setBookmarked(false);
      setLikeCount(initialLikes);
    }
  }, [contentId, isAuthenticated, isLiked, isBookmarked, interactions, initialLikes]);

  const handleLike = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    const newLikedState = !liked;
    toggleLike(contentId);
    setLiked(newLikedState);
    
    // Update like count based on new state
    if (newLikedState) {
      setLikeCount(prev => prev + 1);
    } else {
      setLikeCount(prev => Math.max(initialLikes, prev - 1));
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    toggleBookmark(contentId);
    setBookmarked(!bookmarked);
  };

  return (
    <div className={`relative flex items-center space-x-4 ${className}`}>
      <button
        onClick={handleLike}
        className={`group flex items-center space-x-1 transition-all duration-200 ${
          liked 
            ? 'text-red-500' 
            : 'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
        }`}
        title={liked ? '取消点赞' : '点赞'}
      >
        <svg 
          className="w-5 h-5 transition-transform group-hover:scale-110" 
          fill={liked ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={liked ? 0 : 1.5}
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
          />
        </svg>
        <span className="text-sm font-medium">{likeCount}</span>
      </button>

      <button
        onClick={handleBookmark}
        className={`group transition-all duration-200 ${
          bookmarked 
            ? 'text-yellow-500' 
            : 'text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400'
        }`}
        title={bookmarked ? '取消收藏' : '收藏'}
      >
        <svg 
          className="w-5 h-5 transition-transform group-hover:scale-110" 
          fill={bookmarked ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={bookmarked ? 0 : 1.5}
            d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" 
          />
        </svg>
      </button>

      {showLoginPrompt && (
        <div className="absolute -top-12 left-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
          <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
          请先登录后再操作
        </div>
      )}
    </div>
  );
}