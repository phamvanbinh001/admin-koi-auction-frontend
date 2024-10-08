import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './auth/AuthProvider'; // Đảm bảo rằng bạn đã import AuthProvider

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2dcbb75 (fixing loi khong co defaultlayout)
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
<<<<<<< HEAD
=======
return (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);
>>>>>>> d77dfd8 (Resolve conflicts and move login from dashboard branch to authen branch)
=======
>>>>>>> 2dcbb75 (fixing loi khong co defaultlayout)

export default App;
