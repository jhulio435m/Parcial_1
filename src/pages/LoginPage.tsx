import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-semibold text-center mb-8 text-gray-900">
          Login to Your Account
        </h1>
        <LoginForm />
      </div>
    </PageLayout>
  );
};

export default LoginPage;