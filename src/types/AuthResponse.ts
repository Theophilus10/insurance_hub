// export interface UserLoginResponse {
//   id: number;
//   email: string;
//   created_at: string;
//   updated_at: string;
//   jti: string;
//   name: string;
//   role: string;
//   phone: string;
//   institution_id: number;
//   institution_type_id: number;
//   branch_id: number;
//   region: string;
//   branch: Branch;
//   institution_type: InstitutionType;
//   institution: Institution;
// }

interface Branch {
  id: number;
  name: string;
}

interface InstitutionType {
  id: number;
  name: string;
}

interface Institution {
  id: number;
  name: string;
}

export interface UserLoginResponse {
  status: {
    data: LoggedInUserData;
  };
}

export interface LoggedInUserData {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  jti: string;
  name: string;
  role: string;
  phone: string;
  institution_id: number;
  institution_type_id: number;
  branch_id: number;
  region: string;
  branch: Branch;
  institution: Institution;
  institution_type: InstitutionType;
}
