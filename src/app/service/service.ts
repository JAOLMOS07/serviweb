export interface Service {
  id:           number;
  name:         string;
  Description:  string;
  price_min:   number;
  price_max:   number;
  Date:         Date;
  client_id:    number;
  calification: number;
  status:       number;
  confirmed:boolean;

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

export interface Postulante {
  price:      number;
}
export interface Voucher {
  id: number;
  transaction_number:string|null;
  price:string;
  confirmed:boolean;
  bank_id:number|null;
  service_id:number;

}

export interface Rate {
  rate_client:number|null,
  rate_worker:number|null,
  comment_client:string|null,
  comment_worker:string|null,
  service_id:number|null,
  worker_id:number|null,
  client_id:number|null,


}


