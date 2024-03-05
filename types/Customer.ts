export type CustomerForm = {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  address_id?: number;
  store_id?: number;
  active: number | null;
  address: {
    address: string | null;
  } | null;
};

export type CustomerField = {
  customer_id: number;
  first_name: string;
  last_name: string;
};
