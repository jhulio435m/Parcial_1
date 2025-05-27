import { User, Reservation, Table, Server, MenuItem } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'cliente@ejemplo.com',
    isAdmin: false,
    isWaiter: false,
  },
  {
    id: '2',
    name: 'Admin',
    email: 'admin@ejemplo.com',
    isAdmin: true,
    isWaiter: false,
  },
  {
    id: '3',
    name: 'Carlos Mesero',
    email: 'mesero@ejemplo.com',
    isAdmin: false,
    isWaiter: true,
  },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Carpaccio de Res',
    description: 'Finas láminas de res con aceite de oliva, limón y parmesano',
    price: 18.99,
    category: 'entradas',
    imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
  },
  {
    id: '2',
    name: 'Risotto de Hongos',
    description: 'Arroz arborio con variedad de hongos y trufa negra',
    price: 24.99,
    category: 'principales',
    imageUrl: 'https://images.pexels.com/photos/6287527/pexels-photo-6287527.jpeg'
  },
  {
    id: '3',
    name: 'Tiramisú',
    description: 'Clásico postre italiano con café y mascarpone',
    price: 12.99,
    category: 'postres',
    imageUrl: 'https://images.pexels.com/photos/6341882/pexels-photo-6341882.jpeg'
  },
  {
    id: '4',
    name: 'Vino Tinto Reserva',
    description: 'Selección especial de la casa',
    price: 45.00,
    category: 'bebidas',
    imageUrl: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg'
  },
];

export const mockTables: Table[] = [
  {
    id: '1',
    name: 'Table 1',
    capacity: 2,
    isAvailable: true,
    location: 'indoor',
  },
  {
    id: '2',
    name: 'Table 2',
    capacity: 4,
    isAvailable: true,
    location: 'indoor',
  },
  {
    id: '3',
    name: 'Table 3',
    capacity: 6,
    isAvailable: true,
    location: 'indoor',
  },
  {
    id: '4',
    name: 'Table 4',
    capacity: 8,
    isAvailable: true,
    location: 'indoor',
  },
  {
    id: '5',
    name: 'Outdoor 1',
    capacity: 4,
    isAvailable: true,
    location: 'outdoor',
  },
  {
    id: '6',
    name: 'Outdoor 2',
    capacity: 6,
    isAvailable: true,
    location: 'outdoor',
  },
  {
    id: '7',
    name: 'Bar 1',
    capacity: 2,
    isAvailable: true,
    location: 'bar',
  },
  {
    id: '8',
    name: 'Bar 2',
    capacity: 2,
    isAvailable: true,
    location: 'bar',
  },
];

export const mockServers: Server[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    isAvailable: true,
    shift: 'morning',
  },
  {
    id: '2',
    name: 'Bob Smith',
    isAvailable: true,
    shift: 'evening',
  },
  {
    id: '3',
    name: 'Carol Davis',
    isAvailable: true,
    shift: 'both',
  },
  {
    id: '4',
    name: 'Dave Wilson',
    isAvailable: true,
    shift: 'evening',
  },
];

export const mockReservations: Reservation[] = [
  {
    id: '1',
    userId: '1',
    date: '2025-01-15',
    time: '19:00',
    partySize: 4,
    tableId: '2',
    serverId: '2',
    status: 'confirmed',
    specialRequests: 'Window seat preferred',
    createdAt: '2025-01-10T10:30:00Z',
    updatedAt: '2025-01-10T10:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    date: '2025-01-20',
    time: '20:00',
    partySize: 2,
    tableId: '1',
    serverId: '3',
    status: 'pending',
    createdAt: '2025-01-12T14:45:00Z',
    updatedAt: '2025-01-12T14:45:00Z',
  },
  {
    id: '3',
    userId: '1',
    date: '2025-01-05',
    time: '18:30',
    partySize: 6,
    tableId: '3',
    serverId: '2',
    status: 'cancelled',
    specialRequests: 'Celebrating anniversary',
    createdAt: '2025-01-01T09:15:00Z',
    updatedAt: '2025-01-03T16:20:00Z',
  },
];

// Helper functions for working with mock data
export const getAvailableTables = (date: string, time: string, partySize: number): Table[] => {
  // In a real app, this would check against reservations
  return mockTables.filter(table => table.isAvailable && table.capacity >= partySize);
};

export const getAvailableServers = (date: string, time: string): Server[] => {
  // Check if time is morning (before 3pm) or evening
  const isEvening = parseInt(time.split(':')[0]) >= 15;
  const shift = isEvening ? 'evening' : 'morning';
  
  return mockServers.filter(server => 
    server.isAvailable && (server.shift === shift || server.shift === 'both')
  );
};