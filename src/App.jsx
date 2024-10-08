import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './auth/AuthProvider'; // Đảm bảo rằng bạn đã import AuthProvider

<<<<<<< HEAD
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
=======
return (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);
>>>>>>> d77dfd8 (Resolve conflicts and move login from dashboard branch to authen branch)

export default App;
