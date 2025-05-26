export interface AuthResponse {
  message: string;
  data: {
    grant_type: "authorization_code" | "password" | "refresh_token";
    token: {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token?: string;
    };
  };
}

export interface RegisterResponse {
  message: string;
  data: {
    email: string;
  };
  _links?: {
    self: {
      href: string;
    };
  };
}

export interface DeleteAccountResponse {
  message: string;
  data: {
    deleted_at: string;
  };
}

export type RegisterType = "password";

export interface RegisterError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors?: Array<{
    field: string;
    code: string;
    message: string;
  }>;
}
