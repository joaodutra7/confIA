import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'inspector' | 'viewer';
  company: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// Mock users for development
const mockUsers: Record<string, User> = {
  'admin@ciser.com.br': {
    id: '1',
    name: 'João Silva',
    email: 'admin@ciser.com.br',
    role: 'admin',
    company: 'Ciser - Parafusos e Porcas',
  },
  'inspetor@ciser.com.br': {
    id: '2',
    name: 'Maria Santos',
    email: 'inspetor@ciser.com.br',
    role: 'inspector',
    company: 'Ciser - Parafusos e Porcas',
  },
  'viewer@ciser.com.br': {
    id: '3',
    name: 'Pedro Costa',
    email: 'viewer@ciser.com.br',
    role: 'viewer',
    company: 'Ciser - Parafusos e Porcas',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // Mock authentication - in production, this would call a real API
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
          
          const user = mockUsers[email];
          if (!user || password !== 'demo123') {
            throw new Error('Credenciais inválidas');
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...updates },
          });
        }
      },
    }),
    {
      name: 'ciser-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);