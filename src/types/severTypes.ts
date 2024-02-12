import {
  BuildingItemDetailsType,
  ExcessType,
  PerilsType,
} from '@app/types/policyTypes';

export interface InstitutionType {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Institution {
  id: number;
  code: string;
  name: string;
  contact_person: string;
  position_of_person: string;
  contact_phone: string;
  business_address: string;
  email: string;
  office_location: string;
  website: string;
  created_at: string;
  updated_at: string;
  institution_type: InstitutionType;
  is_insurance_company: boolean;
  parent_institution: string;
}

export interface Branch {
  id: number;
  code: string;
  name: string;
  contact_person: string;
  region: string;
  position_of_person: string;
  contact_phone: string;
  business_address: string;
  email: string;
  office_location: string;
  created_at: string;
  updated_at: string;
  institution: Institution;
}

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  branch_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_phone: string;
  created_at: string;
  last_logged_in: string;
  last_login_attempt: string;
  branch: Branch;
  role: Role;
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface Interest {
  cover_type_id: number;
  interest_id: number;
  rate: number;
  package_type: string;
  freight: number;
  cost: number;
  markup: number;
  duty_rate: number;
  item_description: string;
}

export interface Transhipment {
  origin_country_id: number;
  destination_country_id: number;
  rate: number;
  description: string;
}

export interface Transit {
  transit_from: string;
  transit_to: string;
  rate: number;
}

export interface PolicyExtension {
  extension_id: number;
  rate: number;
  description: string;
}

export interface PolicyGlobal {
  exchange_rate: number;
  customer_id: number;
  insurer_id: number;
  distribution_channel: string;
  intermediary_id: number;
  currency_id: number;
  letter_of_credit_id: number;
}

export interface Policy {
  vessel_flag: string;
  flight_vessel_number: string;
  flight_vessel_name: string;
  bill_of_laden_number: string;
  commercial_invoice_number: string;
  no_known_loss: string;
  exchange_rate: number;
  customer_id: number;
  insurer_id: number;
  distribution_channel: string;
  issue_date: string;
  policy_excess: string;
  currency_id: number;
  shipping_type_id: number;
  carrier_id: number;
  country_of_origin_id: number;
  country_of_destination_id: number;
  port_of_loading_id: number;
  port_of_destination_id: number;
  sailing_date: string;
  estimated_arrival_date: string;
  interests: Interest[];
  transhipments: Transhipment[];
  transits: Transit[];
  policy_extensions: PolicyExtension[];
  intermediary_id: number;
  letter_of_credit_id: number;
  open_cover_policy_id: number;
}

export interface FirePolicy {
  policy: PolicyGlobal;
  inception_date: string;
  expiry_date: string;
  risk_class_id: number;
  policy_items: PerilsType[] | [];
  policy_perils: PerilsType[] | [];
  policy_excesses: ExcessType[] | [];
}
