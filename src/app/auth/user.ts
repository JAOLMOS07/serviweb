export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone: string|null;
  role_id:number
  categories: number[]|null
}
export interface Credentials {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface User {
  id:                number|null;
  name:              string|null;
  email:             string|null;
  phone:             string|null;
  email_verified_at: null;
  profile:           number|null;
  created_at:        Date|null;
  updated_at:        Date|null;
}

export interface status {
  status: string;
}

export interface Applicant {
  id:  number;
  name:  string;
  price: number;
}

