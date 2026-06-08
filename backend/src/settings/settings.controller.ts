import { Body, Controller, Get, Patch } from "@nestjs/common";

let profile = {
  id: "admin-user",
  fullName: "System Admin",
  email: "admin@teaflow.io",
  role: "admin"
};

@Controller("settings")
export class SettingsController {
  @Get("profile")
  getProfile() {
    return profile;
  }

  @Patch("profile")
  updateProfile(@Body() payload: Partial<typeof profile>) {
    profile = { ...profile, ...payload };
    return profile;
  }

  @Patch("security")
  updateSecurity() {
    return { ok: true };
  }
}
