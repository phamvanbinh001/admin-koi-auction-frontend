import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const unAuthenticatedUser = {
  id: null,
  role: '',
  username: '',
  fullname: '',
  isAuthenticated: false,
  token: null,
};

const useUserStore = create(
  persist(
    (set) => ({
      user: unAuthenticatedUser,

      login: (userData) => {
        set({
          user: {
            ...userData,
            isAuthenticated: true,
          },
        });
      },

      logout: () => {
        set({
          user: unAuthenticatedUser,
        });
      },
    }),
  ),
);

export default useUserStore;
