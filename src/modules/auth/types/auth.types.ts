export type AuthUserDto = {
  id: string;
  sub?: string;
  email: string;
  fullName: string;
  role: string;
  tenantId?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  fullName: string;
  email: string;
  password: string;
  role?: string;
};

export type ForgotPasswordDto = {
  email: string;
};

export type VerifyAccessDto = {
  code: string;
};

export type AuthTokensDto = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
};
