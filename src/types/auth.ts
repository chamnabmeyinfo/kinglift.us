export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales' | 'customer';
  company?: string;
  phone?: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}
