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
