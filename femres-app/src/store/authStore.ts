import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserInteractions {
  likes: string[];
  bookmarks: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  interactions: UserInteractions;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // API methods
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  fetchInteractions: () => Promise<void>;
  
  // Content interactions
  toggleLike: (contentId: string, contentType: string) => Promise<void>;
  toggleBookmark: (contentId: string, contentType: string) => Promise<void>;
  isLiked: (contentId: string) => boolean;
  isBookmarked: (contentId: string) => boolean;
  
  // Utility
  getAuthHeaders: () => Record<string, string>;
}

// API utility functions
const apiUrl = (endpoint: string) => `/api${endpoint}`;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      interactions: {
        likes: [],
        bookmarks: []
      },
      isAuthenticated: false,
      isLoading: false,

      getAuthHeaders: () => {
        const { token } = get();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
      },
      
      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const url = apiUrl('/auth/register');
          console.log('Registering with URL:', url);
          
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
          });

          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);

          if (!response.ok) {
            let errorMessage = `HTTP ${response.status}`;
            try {
              const text = await response.text();
              console.error('Error response text:', text);
              if (text) {
                try {
                  const data = JSON.parse(text);
                  errorMessage = data.error || errorMessage;
                } catch (e) {
                  errorMessage = text || errorMessage;
                }
              }
            } catch (e) {
              console.error('Failed to read error response:', e);
            }
            set({ isLoading: false });
            return { success: false, error: errorMessage };
          }

          const data = await response.json();
          console.log('Registration successful:', data);

          set({ 
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
          
          // Fetch user interactions
          await get().fetchInteractions();
          
          return { success: true };
        } catch (error) {
          console.error('Registration network error:', error);
          set({ isLoading: false });
          return { success: false, error: `Network error: ${error.message || error}` };
        }
      },
      
      login: async (identifier: string, password: string) => {
        set({ isLoading: true });
        try {
          const url = apiUrl('/auth/login');
          console.log('Logging in with URL:', url);
          
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
          });

          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);

          if (!response.ok) {
            let errorMessage = `HTTP ${response.status}`;
            try {
              const text = await response.text();
              console.error('Error response text:', text);
              if (text) {
                try {
                  const data = JSON.parse(text);
                  errorMessage = data.error || errorMessage;
                } catch (e) {
                  errorMessage = text || errorMessage;
                }
              }
            } catch (e) {
              console.error('Failed to read error response:', e);
            }
            set({ isLoading: false });
            return { success: false, error: errorMessage };
          }

          const data = await response.json();
          console.log('Login successful:', data);

          set({ 
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
          
          // Fetch user interactions
          await get().fetchInteractions();
          
          return { success: true };
        } catch (error) {
          console.error('Login network error:', error);
          set({ isLoading: false });
          return { success: false, error: `Network error: ${error.message || error}` };
        }
      },

      refreshUser: async () => {
        const { token, getAuthHeaders } = get();
        if (!token) return;

        try {
          const response = await fetch(apiUrl('/auth/me'), {
            method: 'GET',
            headers: getAuthHeaders()
          });

          if (response.ok) {
            const data = await response.json();
            set({ user: data.user });
          } else {
            // Token is invalid, logout
            get().logout();
          }
        } catch (error) {
          console.error('Error refreshing user:', error);
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          token: null,
          isAuthenticated: false,
          interactions: { likes: [], bookmarks: [] }
        });
      },
      
      toggleLike: async (contentId: string, contentType: string) => {
        const { getAuthHeaders, interactions } = get();
        
        try {
          const response = await fetch(apiUrl(`/interactions/${contentId}`), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...getAuthHeaders()
            },
            body: JSON.stringify({ 
              content_type: contentType,
              interaction_type: 'like'
            })
          });

          if (response.ok) {
            const data = await response.json();
            const likes = data.active
              ? [...interactions.likes, contentId]
              : interactions.likes.filter(id => id !== contentId);
            set({ interactions: { ...interactions, likes } });
          }
        } catch (error) {
          console.error('Error toggling like:', error);
        }
      },
      
      toggleBookmark: async (contentId: string, contentType: string) => {
        const { getAuthHeaders, interactions } = get();
        
        try {
          const response = await fetch(apiUrl(`/interactions/${contentId}`), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...getAuthHeaders()
            },
            body: JSON.stringify({ 
              content_type: contentType,
              interaction_type: 'bookmark'
            })
          });

          if (response.ok) {
            const data = await response.json();
            const bookmarks = data.active
              ? [...interactions.bookmarks, contentId]
              : interactions.bookmarks.filter(id => id !== contentId);
            set({ interactions: { ...interactions, bookmarks } });
          }
        } catch (error) {
          console.error('Error toggling bookmark:', error);
        }
      },
      
      isLiked: (contentId: string) => {
        return get().interactions.likes.includes(contentId);
      },
      
      isBookmarked: (contentId: string) => {
        return get().interactions.bookmarks.includes(contentId);
      },
      
      fetchInteractions: async () => {
        const { getAuthHeaders } = get();
        
        try {
          const response = await fetch(apiUrl('/users/interactions'), {
            method: 'GET',
            headers: getAuthHeaders()
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ 
              interactions: {
                likes: data.likes || [],
                bookmarks: data.bookmarks || []
              }
            });
          }
        } catch (error) {
          console.error('Error fetching interactions:', error);
        }
      }
    }),
    {
      name: 'femhub-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        interactions: state.interactions,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);