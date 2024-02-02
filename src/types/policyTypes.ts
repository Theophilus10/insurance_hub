export type BuildingItemDetailsType = {
  itemDescription: string;
  value: number;
  region: string;
  id: string;
  fireRate: number;
  collapseRate: number;
  publicLiabilityRate: number;
  digitalAddress: string;
  itemLocation: string;
  [key: string]: string | number;
};

export type PerilsType = {
  additionalPeril: string;
  perilRate: number;
  id: string;
  [key: string]: string | number;
};

export type ExcessType = {
  policyExcesses: string;
  excessRate: number;
  id: string;
  [key: string]: string | number;
};
