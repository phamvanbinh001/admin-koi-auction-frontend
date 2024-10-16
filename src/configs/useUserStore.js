import { create } from 'zustand';

const unAuthenticatedUser = {
  id: null,
  role: '',
  username: '',
  fullname: '',
  isAuthenticated: false,
  token: null,
};

// Tạo store user
const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || unAuthenticatedUser,

  login: (userData) => {
    if (userData.role === 'Admin' || userData.role === 'Staff') {
      localStorage.setItem('user', JSON.stringify(userData));
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
    localStorage.removeItem('user');
    set({
      user: unAuthenticatedUser,
    });
  },
}));

export default useUserStore;
