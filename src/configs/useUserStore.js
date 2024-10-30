// import { create } from 'zustand';

// const unAuthenticatedUser = {
//   id: null,
//   role: '',
//   username: '',
//   fullname: '',
//   isAuthenticated: false,
//   token: null,
// };

// // Tạo store user
// const useUserStore = create((set) => ({
//   user: JSON.parse(localStorage.getItem('user')) || unAuthenticatedUser,

//   login: (userData) => {
//     if (userData.role === 'Admin' || userData.role === 'Staff') {
//       localStorage.setItem('user', JSON.stringify(userData));
//       set({
//         user: {
//           ...userData,
//           isAuthenticated: true,
//         },
//       });
//     } else {
//       set({
//         user: unAuthenticatedUser,
//       });
//     }
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
    {
      name: 'user', // Key trong localStorage
      getStorage: () => localStorage, // hoặc sessionStorage nếu chỉ muốn lưu tạm thời
      partialize: (state) => ({ user: state.user }), // Giới hạn lưu trữ chỉ user
    },
  ),
);

export default useUserStore;

// partialize: Chỉ lưu trữ phần user trong state để tránh lưu thừa.
// Xóa localStorage thao tác trực tiếp: Tránh thao tác localStorage trực tiếp để giảm thiểu lỗi và duy trì mã ngắn gọn, dễ bảo trì.
