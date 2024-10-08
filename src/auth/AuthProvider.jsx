import React, { createContext, useState, useContext } from 'react';

// Tạo Context cho xác thực
const AuthContext = createContext();

// Tạo Provider để bao bọc ứng dụng
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Hàm giả lập đăng nhập, bạn có thể thay thế bằng API thực
    const login = (token) => {
        localStorage.setItem('authToken', token); // Lưu token vào localStorage
        setIsAuthenticated(true); // Đặt trạng thái xác thực thành true
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    // Kiểm tra token trong localStorage khi khởi động ứng dụng
    React.useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Tạo hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
