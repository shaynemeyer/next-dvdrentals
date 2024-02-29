export type StaffList = {
  id: number;
  name: string;
  address?: string;
  'zip code'?: string;
  phone?: string;
  city?: string;
  country?: string;
};

export type StaffField = {
  staff_id: number;
  first_name: string;
  last_name: string;
};
