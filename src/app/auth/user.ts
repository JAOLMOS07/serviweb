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
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: null;
  profile:           number;
  created_at:        Date;
  updated_at:        Date;
}

export interface status {
  status: string;
}
