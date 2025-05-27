import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservations } from '../../contexts/ReservationContext';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';

const ReservationList: React.FC = () => {
  const { userReservations, cancelReservation } = useReservations();
  const navigate = useNavigate();
  
  // Sort reservations by date, most recent first
  const sortedReservations = [...userReservations].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
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
  
  const handleCancel = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      cancelReservation(id);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-display font-semibold text-gray-800">My Reservations</h2>
        <Button
          variant="primary"
          onClick={() => navigate('/reserve')}
        >
          New Reservation
        </Button>
      </div>
      
      {sortedReservations.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-gray-600 mb-4">You don't have any reservations yet.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/reserve')}
          >
            Make Your First Reservation
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedReservations.map((reservation) => (
            <Card key={reservation.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-3">
                    <Badge status={reservation.status} className="mr-3" />
                    <h3 className="text-xl font-display font-semibold text-gray-800">
                      Reservation #{reservation.id}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{formatDate(reservation.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{formatTime(reservation.time)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{reservation.partySize} {reservation.partySize === 1 ? 'Person' : 'People'}</span>
                    </div>
                    
                    {reservation.specialRequests && (
                      <div className="flex items-start text-gray-600 md:col-span-2 mt-1">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span>{reservation.specialRequests}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2">
                  {reservation.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/edit-reservation/${reservation.id}`)}
                      >
                        Edit
                      </Button>
                      
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;