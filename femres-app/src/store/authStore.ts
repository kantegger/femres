import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface UserInteractions {
  likes: string[];
  bookmarks: string[];
}

interface AuthState {
  user: User | null;
  interactions: UserInteractions;
  isAuthenticated: boolean;
  login: (username: string, email: string) => void;
  logout: () => void;
  toggleLike: (contentId: string) => void;
  toggleBookmark: (contentId: string) => void;
  isLiked: (contentId: string) => boolean;
  isBookmarked: (contentId: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      interactions: {
        likes: [],
        bookmarks: []
      },
      isAuthenticated: false,
      
      login: (username: string, email: string) => {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          email,
          createdAt: new Date()
        };
        set({ 
          user, 
          isAuthenticated: true,
          interactions: get().interactions || { likes: [], bookmarks: [] }
        });
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          interactions: { likes: [], bookmarks: [] }
        });
      },
      
      toggleLike: (contentId: string) => {
        const { interactions } = get();
        const likes = interactions.likes.includes(contentId)
          ? interactions.likes.filter(id => id !== contentId)
          : [...interactions.likes, contentId];
        set({ interactions: { ...interactions, likes } });
      },
      
      toggleBookmark: (contentId: string) => {
        const { interactions } = get();
        const bookmarks = interactions.bookmarks.includes(contentId)
          ? interactions.bookmarks.filter(id => id !== contentId)
          : [...interactions.bookmarks, contentId];
        set({ interactions: { ...interactions, bookmarks } });
      },
      
      isLiked: (contentId: string) => {
        return get().interactions.likes.includes(contentId);
      },
      
      isBookmarked: (contentId: string) => {
        return get().interactions.bookmarks.includes(contentId);
      }
    }),
    {
      name: 'femhub-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        interactions: state.interactions,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);