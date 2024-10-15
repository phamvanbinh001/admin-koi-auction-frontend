import { create } from 'zustand';

const unAuthenticatedUser = {
  id: null,
  fullName: '',
  userName: '',
  phoneNumber: '',
  email: '',
  address: null,
  role: '',
  createAt: null,
  updateAt: null,
  status: '',
  isAuthenticated: false,
};

//Tạo store user
const useUserStore = create((set) => ({
  user: unAuthenticatedUser,

  loginUser: (userData) => {
    set({
      user: {
        ...userData,
        isAuthenticated: true,
      },
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({
      user: unAuthenticatedUser,
    });
  },
}));

export default useUserStore;
