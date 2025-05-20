interface AuthResponse {
  message: string;
  data: {
    grant_type: string;
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    refresh_token?: string;
  };
}

export type { AuthResponse };
