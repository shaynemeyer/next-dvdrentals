export type AddressField = {
  address_id: number;
  address: string;
};

export type AddressForm = {
  address_id: number;
  address: string;
  address2: string | null;
  district: string | null;
  city_id: number;
  postal_code: string | null;
  phone: string | null;
};
