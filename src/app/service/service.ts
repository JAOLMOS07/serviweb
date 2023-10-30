export interface Service {
  id:           number;
  name:         string;
  Description:  string;
  price:        number;
  Date:         Date;
  client_id:    number;
  calification: number;
  active:       number;
  created_at:   Date;
  updated_at:   Date;
}

export interface CreateService {
  name:        string;
  description: string;
  price_min:   number;
  price_max:   number;
  date:        Date;
  category:    number[];
}


