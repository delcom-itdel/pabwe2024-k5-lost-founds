import React, { createContext, useState, useEffect, useContext } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? children : null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
