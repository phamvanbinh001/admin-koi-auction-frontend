// import { create } from 'zustand';

// const unAuthenticatedUser = {
//   id: null,
//   role: '',
//   username: '',
//   fullname: '',
//   isAuthenticated: false,
//   token: null,
// };

// //Tạo store user
// const useUserStore = create((set) => ({
//   user: unAuthenticatedUser,

//   loginUser: (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     set({
//       user: {
//         ...userData,
//         isAuthenticated: true,
//       },
//     });
//   },

//   logout: () => {
//     localStorage.removeItem('user');
//     set({
//       user: unAuthenticatedUser,
//     });
//   },
// }));

// export default useUserStore;

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
  user: unAuthenticatedUser,

  loginUser: (userData) => {
    const { token, username, fullname, userId, role } = userData;

    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem('user', JSON.stringify({
      id: userId,
      username,
      fullname,
      role,
      token,
      isAuthenticated: true,
    }));

    set({
      user: {
        id: userId,
        username,
        fullname,
        role,
        token,
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

