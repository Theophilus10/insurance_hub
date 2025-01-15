// Document interface
export interface Document {
  url: string;
  filename: string;
  content_type: string;
  byte_size: number;
  created_at: string;
}

// Intermediary export interface
export interface Intermediary {
  id: number;
  name: string;
}

// Transit export interface
export interface Transit {
  rate: number;
  transit_to: string;
  transit_from: string;
  transit_description: string;
}

// Transhipment export interface
export interface Transhipment {
  rate: number;
  description: string;
  origin_country: string;
  destination_country: string;
}

// Interest export interface
export interface Interest {
  cost: number;
  rate: number;
  markup: number;
  freight: number;
  interest: string;
  duty_rate: number;
  cover_type: string;
  duty_amount: number;
  markup_rate: number;
  sum_insured: number;
  package_type: string;
  basic_premium: number;
  item_description: string;
}

// Intermediary Branch export interface
export interface IntermediaryBranch {
  id: number;
  name: string;
  contact_person: string;
  position_of_person: string;
  contact_phone: string;
  email: string;
  office_location: string;
}

// Intermediary Type export interface
export interface IntermediaryType {
  id: number;
  name: string;
}

// Carrier export interface
export interface Carrier {
  id: number;
  name: string;
  code: string;
}

// Shipping Type export interface
export interface ShippingType {
  id: number;
  name: string;
}

// Customer Type interface
export interface CustomerType {
  id: number;
  name: string;
}

// Identification Type interface
export interface IdentificationType {
  id: number;
  name: string;
}

// Customer interface
export interface Customer {
  id: number;
  customer_type_id: number;
  identification_type_id: number;
  occupation_id: number;
  customer_category_id: number;
  name: string;
  email: string;
  phone: string;
  identification_number: string;
  tax_id_number: string;
  digital_address: string | null;
  postal_address: string;
  residential_address: string | null;
  customer_type: CustomerType;
  identification_type: IdentificationType;
}

// Currency interface
export interface Currency {
  id: number;
  code: string;
  name: string;
  is_base: boolean;
}

// Bank interface
export interface Bank {
  id: number;
  code: string;
  name: string;
}

// Institution Type interface
export interface InstitutionType {
  id: number;
  name: string;
}

// Institution interface
export interface Institution {
  id: number;
  institution_type_id: number;
  name: string;
  institution_type: InstitutionType;
}

// Branch interface
export interface Branch {
  id: number;
  institution_id: number;
  name: string;
  contact_person: string;
  position_of_person: string;
  contact_phone: string;
  email: string;
  office_location: string;
  institution: Institution;
}

// Main Policy interface
export interface Policy {
  id: number;
  institution_id: number;
  branch_id: number;
  customer_id: number;
  shipping_type_id: number;
  bank_id: number;
  carrier_id: number;
  currency_id: number;
  issue_date: string;
  sailing_date: string;
  no_known_loss: string;
  commercial_invoice_number: string;
  bill_of_laden_number: string;
  flight_vessel_name: string;
  flight_vessel_number: string;
  vessel_flag: string;
  premium_amount: number | null;
  policy_excess: string;
  distribution_channel: string;
  intermediary: Intermediary;
  transits: Transit[];
  transhipments: Transhipment[];
  interests: Interest[];
  policy_extentions: any[]; // Replace `any` with appropriate type if needed
  created_at: string;
  updated_at: string;
  open_cover_policy_id: number | null;
  intermediary_id: number;
  intermediary_branch_id: number;
  policy_number: string;
  country_of_importation: string;
  country_of_destination: string;
  port_of_loading: string;
  port_of_destination: string;
  intermediary_type_id: number;
  status: string;
  exchange_rate: string;
  estimated_arrival_date: string;
  user_id: number;
  current_step_index: string;
  intermediary_branch: IntermediaryBranch;
  intermediary_type: IntermediaryType;
  carrier: Carrier;
  shipping_type: ShippingType;
  customer: Customer;
  currency: Currency;
  bank: Bank;
  branch: Branch;
  documents: Document[];
}
