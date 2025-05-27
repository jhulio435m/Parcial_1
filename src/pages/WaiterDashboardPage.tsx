import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useReservations } from '../contexts/ReservationContext';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Clock, Users, Bell } from 'lucide-react';

const WaiterDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { reservations } = useReservations();
  const [notifications, setNotifications] = useState<string[]>([]);

  // Redirect if not logged in or not a waiter
  if (!user || !user.isWaiter) {
    return <Navigate to="/login\" replace />;
  }

  // Filter reservations assigned to this waiter
  const assignedTables = reservations.filter(res => res.serverId === user.id);

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-semibold text-gray-900">
            Panel de Mesero
          </h1>
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mesas Asignadas */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold mb-6">Mesas Asignadas</h2>
              <div className="space-y-4">
                {assignedTables.map(table => (
                  <div
                    key={table.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">Mesa #{table.tableId}</h3>
                        <Badge status={table.status} />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{table.date}</p>
                        <p className="font-medium">{formatTime(table.time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{table.partySize} personas</span>
                    </div>
                  </div>
                ))}
                {assignedTables.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No hay mesas asignadas en este momento
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Notificaciones */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Notificaciones</h2>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <p className="text-gray-800">{notification}</p>
                    <span className="text-xs text-gray-500">Hace 5 minutos</span>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No hay notificaciones nuevas
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default WaiterDashboardPage;