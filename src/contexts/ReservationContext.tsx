import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Reservation } from '../types';
import { mockReservations } from '../data/mockData';
import { useAuth } from './AuthContext';

interface ReservationContextType {
  reservations: Reservation[];
  userReservations: Reservation[];
  createReservation: (newReservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  cancelReservation: (id: string) => void;
  assignTable: (reservationId: string, tableId: string) => void;
  assignServer: (reservationId: string, serverId: string) => void;
  getReservationById: (id: string) => Reservation | undefined;
  isLoading: boolean;
  error: string | null;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([...mockReservations]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Get reservations for the current user
  const userReservations = user 
    ? reservations.filter(res => res.userId === user.id)
    : [];

  // Create a new reservation
  const createReservation = (newReservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const now = new Date().toISOString();
      const reservation: Reservation = {
        ...newReservation,
        id: (reservations.length + 1).toString(),
        createdAt: now,
        updatedAt: now,
      };
      
      setReservations(prev => [...prev, reservation]);
      setIsLoading(false);
    } catch (err) {
      setError('Error creating reservation');
      setIsLoading(false);
    }
  };

  // Update an existing reservation
  const updateReservation = (id: string, updates: Partial<Reservation>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      setReservations(prev => 
        prev.map(res => 
          res.id === id 
            ? { ...res, ...updates, updatedAt: new Date().toISOString() } 
            : res
        )
      );
      
      setIsLoading(false);
    } catch (err) {
      setError('Error updating reservation');
      setIsLoading(false);
    }
  };

  // Cancel a reservation
  const cancelReservation = (id: string) => {
    updateReservation(id, { status: 'cancelled' });
  };

  // Assign a table to a reservation
  const assignTable = (reservationId: string, tableId: string) => {
    updateReservation(reservationId, { tableId });
  };

  // Assign a server to a reservation
  const assignServer = (reservationId: string, serverId: string) => {
    updateReservation(reservationId, { serverId });
  };

  // Get a reservation by ID
  const getReservationById = (id: string) => {
    return reservations.find(res => res.id === id);
  };

  return (
    <ReservationContext.Provider value={{
      reservations,
      userReservations,
      createReservation,
      updateReservation,
      cancelReservation,
      assignTable,
      assignServer,
      getReservationById,
      isLoading,
      error,
    }}>
      {children}
    </ReservationContext.Provider>
  );
};

// Custom hook to use the reservation context
export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};