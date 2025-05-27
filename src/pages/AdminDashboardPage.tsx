import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import ReservationManagement from '../components/admin/ReservationManagement';
import TableManagement from '../components/admin/TableManagement';
import ServerManagement from '../components/admin/ServerManagement';
import ReportingDashboard from '../components/admin/ReportingDashboard';
import Card from '../components/common/Card';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'reservations' | 'tables' | 'servers' | 'reports'>('reservations');

  // Redirect if not logged in or not an admin
  if (!user) {
    return <Navigate to="/login\" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-semibold mb-8 text-gray-900">
          Admin Dashboard
        </h1>

        <div className="mb-8">
          <Card>
            <div className="flex flex-wrap border-b border-gray-200">
              <button
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'reservations'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reservations')}
              >
                Reservations
              </button>
              
              <button
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'tables'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('tables')}
              >
                Tables
              </button>
              
              <button
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'servers'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('servers')}
              >
                Servers
              </button>
              
              <button
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reports')}
              >
                Reports
              </button>
            </div>
          </Card>
        </div>

        <div>
          {activeTab === 'reservations' && <ReservationManagement />}
          {activeTab === 'tables' && <TableManagement />}
          {activeTab === 'servers' && <ServerManagement />}
          {activeTab === 'reports' && <ReportingDashboard />}
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboardPage;