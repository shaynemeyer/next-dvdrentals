export type CityForm = {
  city_id: number;
  country_id: number;
  city: string;
};

export type CityField = Omit<CityForm, 'country_id'>;
