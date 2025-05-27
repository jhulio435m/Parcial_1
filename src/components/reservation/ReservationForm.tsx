import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useReservations } from '../../contexts/ReservationContext';
import { getAvailableTables } from '../../data/mockData';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Card from '../common/Card';

const ReservationForm: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formErrors, setFormErrors] = useState<{
    date?: string;
    time?: string;
    partySize?: string;
  }>({});
  
  const { user } = useAuth();
  const { createReservation, isLoading, error } = useReservations();
  const navigate = useNavigate();
  
  // Generate time options (restaurant opens from 5 PM to 10 PM)
  const timeOptions = Array.from({ length: 11 }, (_, i) => {
    const hour = 17 + Math.floor(i / 2); // Starting at 5 PM (17:00)
    const minute = i % 2 === 0 ? '00' : '30';
    const time = `${hour}:${minute}`;
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? 'PM' : 'AM';
    return {
      value: time,
      label: `${formattedHour}:${minute} ${period}`,
    };
  });
  
  // Generate party size options (1-12 people)
  const partySizeOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));
  
  const validateForm = () => {
    const errors: {
      date?: string;
      time?: string;
      partySize?: string;
    } = {};
    let isValid = true;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (!date) {
      errors.date = 'Date is required';
      isValid = false;
    } else if (selectedDate < today) {
      errors.date = 'Date cannot be in the past';
      isValid = false;
    }
    
    if (!time) {
      errors.time = 'Time is required';
      isValid = false;
    }
    
    if (!partySize) {
      errors.partySize = 'Party size is required';
      isValid = false;
    }
    
    // Check if tables are available
    const availableTables = getAvailableTables(date, time, parseInt(partySize, 10));
    if (availableTables.length === 0) {
      errors.partySize = 'No tables available for this party size at the selected time';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (validateForm()) {
      createReservation({
        userId: user.id,
        date,
        time,
        partySize: parseInt(partySize, 10),
        status: 'pending',
        specialRequests: specialRequests || undefined,
      });
      
      navigate('/reservations');
    }
  };
  
  // Calculate min date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  // Calculate max date (6 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  return (
    <Card className="max-w-lg mx-auto animate-slide-up">
      <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 text-center">Make a Reservation</h2>
      
      {error && (
        <div className="bg-error-500 bg-opacity-10 border border-error-500 text-error-500 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:space-x-4">
          <Input
            label="Date"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            error={formErrors.date}
            className="md:w-1/2"
            placeholder=""
            min={minDate}
            max={maxDateStr}
          />
          
          <Select
            label="Time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            options={timeOptions}
            required
            error={formErrors.time}
            className="md:w-1/2"
          />
        </div>
        
        <Select
          label="Party Size"
          id="partySize"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          options={partySizeOptions}
          required
          error={formErrors.partySize}
        />
        
        <Textarea
          label="Special Requests"
          id="specialRequests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Allergies, special occasions, seating preferences, etc."
        />
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
            className="order-2 sm:order-1"
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="order-1 sm:order-2"
          >
            {isLoading ? 'Submitting...' : 'Make Reservation'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;