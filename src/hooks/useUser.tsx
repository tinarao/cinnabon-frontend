import { User } from '@/validators/user.validator';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserStore {
  user?: User;

  login: (user: User) => void;
  logout: () => void;
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: undefined,

      login: (user) => set({ user: user }),
      logout: () => set({ user: undefined }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
