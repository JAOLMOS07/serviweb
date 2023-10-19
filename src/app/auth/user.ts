export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
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
  email_verified_at: null;
  profile:           number|null;
  created_at:        Date|null;
  updated_at:        Date|null;
}

export interface status {
  status: string;
}
