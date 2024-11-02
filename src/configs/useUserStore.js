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
        if (userData && (userData.role === 'Admin' || userData.role === 'Staff')) {
          set({
            user: {
              ...userData,
              isAuthenticated: true,
            },
          });
        } else {
          set({
            user: unAuthenticatedUser,
          });
        }
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
