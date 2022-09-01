export interface GitHubUser {
  id: number;
  name: string;
}

export interface AccessTokenResponse {
  access_token: string;
}

export interface UserResponse {
  id: number;
  name: string;
}

export interface NewUserDocument {
  name: string;
  id: string;
  tokenVersion: number;
  gitHubUserId: string;
}

export interface AccessTokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  version: number;
}

export interface AccessToken extends AccessTokenPayload {
  exp: number;
}

export interface RefreshToken extends RefreshTokenPayload {
  exp: number;
}
