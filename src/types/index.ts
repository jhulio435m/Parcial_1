export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isWaiter: boolean;
}

export interface Reservation {
  id: string;
  userId: string;
  date: string;
  time: string;
  partySize: number;
  tableId?: string;
  serverId?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  location: 'indoor' | 'outdoor' | 'bar';
}

export interface Server {
  id: string;
  name: string;
  isAvailable: boolean;
  shift: 'morning' | 'evening' | 'both';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'entradas' | 'principales' | 'postres' | 'bebidas';
  imageUrl: string;
}

export interface ReportData {
  totalReservations: number;
  confirmedReservations: number;
  cancelledReservations: number;
  avgPartySize: number;
  popularTimes: { time: string; count: number }[];
  popularDays: { day: string; count: number }[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'waiter' | 'customer') => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}