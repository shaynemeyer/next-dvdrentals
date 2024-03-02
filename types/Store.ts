export type StoreForm = {
  store_id: number;
  manager_staff_id: number;
  address_id: number;
};

export type StoreField = {
  store_id: number;
  address: {
    address: string;
  };
};
