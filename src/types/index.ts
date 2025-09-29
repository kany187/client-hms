// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Patient Types
export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  addressStreet: string;
  addressCity: string;
  occupation?: string;
  marital: 'single' | 'married' | 'divorced' | 'widowed';
  nationality?: string;
  admissionDate?: string;
  doctorAssigned?: string;
  roomNumber?: string;
  condition?: string;
  description?: string;
  guardian?: Guardian;
  createdAt: string;
  updatedAt: string;
}

export interface Guardian {
  name: string;
  phone: string;
  address: string;
  age: number;
  relation: string;
  occupation: string;
  description?: string;
}

// Doctor Types
export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  experience: number;
  qualification: string;
  availability: string[];
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Department Types
export interface Department {
  _id: string;
  deptName: string;
  description: string;
  headDoctor?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Appointment Types
export interface Appointment {
  _id: string;
  patientId: string;
  doctorId: string;
  departmentId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Staff Types
export interface Staff {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'nurse' | 'receptionist' | 'technician' | 'admin';
  department: string;
  shift: 'morning' | 'afternoon' | 'night';
  salary?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Message Types
export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  _id: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface PatientForm {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  addressStreet: string;
  addressCity: string;
  occupation?: string;
  marital: string;
  description?: string;
}

// Component Props Types
export interface BaseComponentProps {
  user?: User;
  isLoading?: boolean;
  error?: string;
}

export interface GridItem {
  area: string;
  children: React.ReactNode;
}

// Statistics Types
export interface StatisticsData {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalDepartments: number;
  todayAppointments: number;
  monthlyRevenue: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

