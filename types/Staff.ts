export type StaffForm = {
  staff_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  address_id?: number;
  store_id?: number;
  active?: boolean;
  username?: string;
  address: {
    address: string | null;
  } | null;
};

export type StaffField = {
  staff_id: number;
  first_name: string;
  last_name: string;
};
