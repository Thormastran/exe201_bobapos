import { httpClient } from "@/lib/api/http-client";
import type { AuthTokensDto, AuthUserDto, ForgotPasswordDto, LoginDto, RegisterDto, VerifyAccessDto } from "@/modules/auth/types/auth.types";

export const authApi = {
  login: (payload: LoginDto) =>
    httpClient.post<AuthTokensDto>("/auth/login", payload).then((response) => response.data),
  register: (payload: RegisterDto) =>
    httpClient.post<AuthTokensDto>("/auth/register", payload).then((response) => response.data),
  me: () => httpClient.get<AuthUserDto>("/auth/me").then((response) => response.data),
  forgotPassword: (payload: ForgotPasswordDto) =>
    httpClient.post<void>("/auth/forgot-password", payload).then((response) => response.data),
  verifyAccess: (payload: VerifyAccessDto) =>
    httpClient.post<AuthTokensDto>("/auth/verify-access", payload).then((response) => response.data),
  logout: () => httpClient.post<void>("/auth/logout").then((response) => response.data)
};
