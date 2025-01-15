export type BuildingItemDetailsType = {
  item_description: string;
  value: number;
  region: string;
  id: string;
  fire_rate: number;
  collapse_rate: number;
  public_liability_rate: number;
  digital_address: string;
  item_location: string;
  [key: string]: string | number;
};

export type PerilsType = {
  peril: string;
  description: string;
  rate: number;
  id: string;
  [key: string]: string | number;
};

export type ExcessType = {
  excess: string;
  description: string;
  rate: number;
  id: string;
  [key: string]: string | number;
};

export type FirePolicy = {
  institution_id: number;
  branch_id: number;
  distribution_channel: string;
  intermediary_id: number;
  intermediary_type_id: number;
  intermediary_branch_id: number;
  customer_id: number;
  inception_date: string;
  expiry_date: string;
  currency: number;
  exchange_rate: string;
  bank_id: number;
  policy_items: BuildingItemDetailsType[];
  policy_perils: PerilsType[];
  policy_excesses: ExcessType[];
};
