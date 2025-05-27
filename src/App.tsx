import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ReservationProvider } from './contexts/ReservationContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReservationPage from './pages/ReservationPage';
import UserReservationsPage from './pages/UserReservationsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import WaiterDashboardPage from './pages/WaiterDashboardPage';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reserve" element={<ReservationPage />} />
            <Route path="/reservations" element={<UserReservationsPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/waiter" element={<WaiterDashboardPage />} />
            <Route path="/menu" element={<MenuPage />} />
            
            {/* Handle redirects for unknown routes */}
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Routes>
        </Router>
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;