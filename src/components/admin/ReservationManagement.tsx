import React, { useState } from 'react';
import { useReservations } from '../../contexts/ReservationContext';
import { mockTables, mockServers, getAvailableTables, getAvailableServers } from '../../data/mockData';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Select from '../common/Select';

const ReservationManagement: React.FC = () => {
  const { reservations, assignTable, assignServer, updateReservation } = useReservations();
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [selectedServerId, setSelectedServerId] = useState<string>('');
  
  // Sort reservations by date, most recent first
  const sortedReservations = [...reservations].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  
  // Format date to a more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Format time to 12-hour format
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${period}`;
  };
  
  const handleReservationSelect = (reservationId: string) => {
    const reservation = reservations.find(r => r.id === reservationId);
    
    setSelectedReservationId(reservationId === selectedReservationId ? null : reservationId);
    
    if (reservation) {
      setSelectedTableId(reservation.tableId || '');
      setSelectedServerId(reservation.serverId || '');
    }
  };
  
  const handleConfirmReservation = (reservationId: string) => {
    updateReservation(reservationId, { status: 'confirmed' });
  };
  
  const handleCancelReservation = (reservationId: string) => {
    updateReservation(reservationId, { status: 'cancelled' });
  };
  
  const handleAssignTable = () => {
    if (selectedReservationId && selectedTableId) {
      assignTable(selectedReservationId, selectedTableId);
    }
  };
  
  const handleAssignServer = () => {
    if (selectedReservationId && selectedServerId) {
      assignServer(selectedReservationId, selectedServerId);
    }
  };
  
  const selectedReservation = reservations.find(r => r.id === selectedReservationId);
  
  // Get available tables and servers for the selected reservation
  const availableTables = selectedReservation
    ? getAvailableTables(selectedReservation.date, selectedReservation.time, selectedReservation.partySize)
    : [];
  
  const availableServers = selectedReservation
    ? getAvailableServers(selectedReservation.date, selectedReservation.time)
    : [];
  
  // Create options for select elements
  const tableOptions = availableTables.map(table => ({
    value: table.id,
    label: `${table.name} (${table.capacity} seats)`,
  }));
  
  const serverOptions = availableServers.map(server => ({
    value: server.id,
    label: server.name,
  }));
  
  if (selectedReservation?.tableId) {
    const assignedTable = mockTables.find(t => t.id === selectedReservation.tableId);
    if (assignedTable && !tableOptions.some(opt => opt.value === assignedTable.id)) {
      tableOptions.unshift({
        value: assignedTable.id,
        label: `${assignedTable.name} (${assignedTable.capacity} seats)`,
      });
    }
  }
  
  if (selectedReservation?.serverId) {
    const assignedServer = mockServers.find(s => s.id === selectedReservation.serverId);
    if (assignedServer && !serverOptions.some(opt => opt.value === assignedServer.id)) {
      serverOptions.unshift({
        value: assignedServer.id,
        label: assignedServer.name,
      });
    }
  }
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6">Reservation Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Upcoming Reservations</h3>
            
            {sortedReservations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No reservations found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedReservations.map((reservation) => (
                  <button
                    key={reservation.id}
                    onClick={() => handleReservationSelect(reservation.id)}
                    className={`w-full text-left transition-all duration-200 border rounded-lg overflow-hidden
                      ${selectedReservationId === reservation.id ? 'border-primary-500 shadow-md' : 'border-gray-200'}`}
                  >
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-3 md:mb-0">
                          <div className="flex items-center mb-2">
                            <Badge status={reservation.status} className="mr-3" />
                            <h4 className="font-semibold">
                              Reservation #{reservation.id}
                            </h4>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                              <span>{formatDate(reservation.date)}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="h-4 w-4 mr-2 text-primary-500" />
                              <span>{formatTime(reservation.time)}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 text-sm">
                              <Users className="h-4 w-4 mr-2 text-primary-500" />
                              <span>{reservation.partySize} {reservation.partySize === 1 ? 'Person' : 'People'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
            
            {selectedReservationId && selectedReservation ? (
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Badge status={selectedReservation.status} className="mr-3" />
                    <h4 className="text-xl font-display font-semibold">
                      Reservation #{selectedReservation.id}
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{formatDate(selectedReservation.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{formatTime(selectedReservation.time)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{selectedReservation.partySize} {selectedReservation.partySize === 1 ? 'Person' : 'People'}</span>
                    </div>
                    
                    {selectedReservation.specialRequests && (
                      <div className="flex items-start text-gray-600">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span>{selectedReservation.specialRequests}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-semibold mb-2">Table & Server Assignment</h5>
                    
                    <Select
                      label="Assign Table"
                      id="tableAssignment"
                      value={selectedTableId}
                      onChange={(e) => setSelectedTableId(e.target.value)}
                      options={tableOptions}
                    />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAssignTable}
                      disabled={!selectedTableId}
                      className="mb-3"
                    >
                      {selectedReservation.tableId ? 'Update Table' : 'Assign Table'}
                    </Button>
                    
                    <Select
                      label="Assign Server"
                      id="serverAssignment"
                      value={selectedServerId}
                      onChange={(e) => setSelectedServerId(e.target.value)}
                      options={serverOptions}
                    />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAssignServer}
                      disabled={!selectedServerId}
                    >
                      {selectedReservation.serverId ? 'Update Server' : 'Assign Server'}
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h5 className="font-semibold mb-3">Reservation Status</h5>
                  
                  <div className="flex flex-col space-y-2">
                    {selectedReservation.status === 'pending' && (
                      <Button
                        variant="primary"
                        onClick={() => handleConfirmReservation(selectedReservation.id)}
                        disabled={!selectedReservation.tableId || !selectedReservation.serverId}
                      >
                        Confirm Reservation
                      </Button>
                    )}
                    
                    {selectedReservation.status !== 'cancelled' && (
                      <Button
                        variant="danger"
                        onClick={() => handleCancelReservation(selectedReservation.id)}
                      >
                        Cancel Reservation
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Select a reservation to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReservationManagement;