export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone: string | null;
  role_id: number;
  categories: number[] | null;
}

export interface UpdateCredentials {
  name: string;
  email: string;
  phone: string | null;
}
export interface Credentials {
  email: string;
  password: string;
}

export interface Token {
  token: string;
  name: string;
  role: number;
  email: string;
  phone: string;
  expires_in: number;
}
export interface UserInfo {
  calificación: number;
  servicios: number;
}
export interface User {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  email_verified_at: null;
  profile: number | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface status {
  status: string;
}

export interface Applicant {
  id: number;
  name: string;
  price: number;
}
