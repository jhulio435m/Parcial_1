import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import ReservationForm from '../components/reservation/ReservationForm';

const ReservationPage: React.FC = () => {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-semibold text-center mb-8 text-gray-900">
          Reserve a Table
        </h1>
        <ReservationForm />
      </div>
    </PageLayout>
  );
};

export default ReservationPage;