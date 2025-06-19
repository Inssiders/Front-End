export interface UserType {
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  bio?: string;
  accountVisible?: boolean;
  followerVisible?: boolean;
  accessToken: string;
}

export interface PasswordChangeRequest {
  password: string;
}

export interface PasswordChangeResponse {
  message: string;
  data: {
    updated_at: string;
  };
}

export interface ProfileUpdateRequest {
  nickname?: string;
  introduction?: string;
  profile_url?: string;
  account_visibility?: boolean;
  follower_visibility?: boolean;
}

export interface ProfileUpdateResponse {
  message: string;
  data: {
    nickname?: string;
    bio?: string;
    profileUrl?: string;
    accountVisible?: boolean;
    followerVisible?: boolean;
    updated_at: string;
  };
}
