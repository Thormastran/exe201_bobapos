import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Public } from "./public.decorator";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  login(@Body() payload: { email: string; password: string }) {
    return this.authService.login(payload);
  }

  @Public()
  @Post("register")
  register(@Body() payload: { fullName: string; email: string; password: string; role?: string }) {
    return this.authService.register(payload);
  }

  @Public()
  @Post("forgot-password")
  forgotPassword() {
    return this.authService.forgotPassword();
  }

  @Public()
  @Post("verify-access")
  verifyAccess() {
    return this.authService.verifyAccess();
  }

  @Get("me")
  me(@Req() request: any) {
    return this.authService.me(request.user.sub);
  }

  @Post("logout")
  logout() {
    return this.authService.logout();
  }
}
