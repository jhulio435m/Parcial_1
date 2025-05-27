import React, { useState, useEffect } from 'react';
import { useReservations } from '../../contexts/ReservationContext';
import Card from '../common/Card';
import { ChevronUp, ChevronDown, Calendar, Users, CheckCircle, XCircle } from 'lucide-react';

const ReportingDashboard: React.FC = () => {
  const { reservations } = useReservations();
  const [reportData, setReportData] = useState({
    totalReservations: 0,
    confirmedReservations: 0,
    cancelledReservations: 0,
    pendingReservations: 0,
    avgPartySize: 0,
    popularTimes: [] as { time: string; count: number }[],
    popularDays: [] as { day: string; count: number }[],
  });
  
  useEffect(() => {
    // Calculate total reservations by status
    const confirmedCount = reservations.filter(r => r.status === 'confirmed').length;
    const cancelledCount = reservations.filter(r => r.status === 'cancelled').length;
    const pendingCount = reservations.filter(r => r.status === 'pending').length;
    
    // Calculate average party size
    const totalPartySize = reservations.reduce((sum, r) => sum + r.partySize, 0);
    const avgPartySize = reservations.length > 0 ? totalPartySize / reservations.length : 0;
    
    // Calculate popular times
    const timeCount = new Map<string, number>();
    reservations.forEach(r => {
      const time = r.time;
      timeCount.set(time, (timeCount.get(time) || 0) + 1);
    });
    
    const popularTimes = Array.from(timeCount.entries())
      .map(([time, count]) => ({ time, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Calculate popular days
    const dayCount = new Map<string, number>();
    reservations.forEach(r => {
      const date = new Date(r.date);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      dayCount.set(day, (dayCount.get(day) || 0) + 1);
    });
    
    const popularDays = Array.from(dayCount.entries())
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => b.count - a.count);
    
    setReportData({
      totalReservations: reservations.length,
      confirmedReservations: confirmedCount,
      cancelledReservations: cancelledCount,
      pendingReservations: pendingCount,
      avgPartySize,
      popularTimes,
      popularDays,
    });
  }, [reservations]);
  
  // Format time to 12-hour format
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${period}`;
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6">Reporting Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm font-medium mb-1">Total Reservations</p>
              <h3 className="text-3xl font-display font-bold">{reportData.totalReservations}</h3>
            </div>
            <Calendar className="h-8 w-8 text-white text-opacity-80" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-success-500 to-green-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm font-medium mb-1">Confirmed</p>
              <h3 className="text-3xl font-display font-bold">{reportData.confirmedReservations}</h3>
            </div>
            <CheckCircle className="h-8 w-8 text-white text-opacity-80" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-warning-500 to-yellow-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm font-medium mb-1">Pending</p>
              <h3 className="text-3xl font-display font-bold">{reportData.pendingReservations}</h3>
            </div>
            <Clock className="h-8 w-8 text-white text-opacity-80" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-error-500 to-red-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm font-medium mb-1">Cancelled</p>
              <h3 className="text-3xl font-display font-bold">{reportData.cancelledReservations}</h3>
            </div>
            <XCircle className="h-8 w-8 text-white text-opacity-80" />
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Average Party Size</h3>
          <div className="flex items-end">
            <div className="mr-4">
              <h4 className="text-4xl font-display font-bold text-gray-800">
                {reportData.avgPartySize.toFixed(1)}
              </h4>
              <p className="text-gray-500 mt-1">people per reservation</p>
            </div>
            <div className="flex-grow flex items-end justify-center h-32">
              <div 
                className="w-24 bg-primary-500 rounded-t-md flex items-center justify-center"
                style={{ height: `${Math.min(100, reportData.avgPartySize * 10)}%` }}
              >
                <Users className="text-white h-6 w-6" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold mb-4">Most Popular Times</h3>
          <div className="space-y-3">
            {reportData.popularTimes.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-gray-600">{formatTime(item.time)}</div>
                <div className="flex-grow h-8 bg-gray-100 rounded-md overflow-hidden">
                  <div 
                    className="h-full bg-secondary-500 flex items-center justify-end px-2"
                    style={{ width: `${(item.count / reportData.totalReservations) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-gray-800">{item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Reservations by Day of Week</h3>
          <div className="grid grid-cols-7 gap-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
              const dayData = reportData.popularDays.find(d => d.day === day);
              const count = dayData?.count || 0;
              const percentage = reportData.totalReservations > 0 
                ? (count / reportData.totalReservations) * 100 
                : 0;
              
              return (
                <div key={day} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-2">{day.substring(0, 3)}</div>
                  <div className="w-full h-40 bg-gray-100 rounded-md relative flex flex-col items-center justify-end">
                    <div 
                      className="w-full bg-accent-500 rounded-md absolute bottom-0"
                      style={{ height: `${percentage}%` }}
                    ></div>
                    <div className="text-xs font-medium text-gray-800 mb-1 z-10">{count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportingDashboard;