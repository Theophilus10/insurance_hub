import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import {Role, Branch} from "@app/types/severTypes"

declare module "next-auth" {
  interface Session {
    user: {
      // id: string;
      // email: string;
      // accessToken: string;
      // refreshToken: string;
      // name: string | undefined;
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
    } & DefaultSession;
  }
  interface User extends DefaultUser {
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
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // access_token: string;
    // refresh_token: string;
    // id: string;
    expires: string;
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
}
