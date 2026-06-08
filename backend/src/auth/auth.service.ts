import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { toDto } from "../common/mongo";
import { hashPassword, verifyPassword } from "./password.util";
import { TokenService } from "./token.service";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly tokenService: TokenService
  ) {}

  async login(payload: { email: string; password: string }) {
    const user = await this.userModel.findOne({ email: payload.email.toLowerCase(), isActive: true }).exec();
    if (!user || !verifyPassword(payload.password, user.passwordHash)) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    return this.createTokenResponse(user);
  }

  async register(payload: { fullName: string; email: string; password: string; role?: string }) {
    const email = payload.email.toLowerCase();
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException("Email is already registered");
    }

    const user = await this.userModel.create({
      fullName: payload.fullName,
      email,
      role: payload.role ?? "admin",
      passwordHash: hashPassword(payload.password),
      isActive: true
    });

    return this.createTokenResponse(user);
  }

  async verifyAccess() {
    const user = await this.userModel.findOne({ isActive: true }).exec();
    if (!user) {
      throw new UnauthorizedException("No active user available");
    }
    return this.createTokenResponse(user);
  }

  async me(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return this.toAuthUser(user);
  }

  forgotPassword() {
    return { ok: true, message: "If the email exists, a reset link has been sent." };
  }

  logout() {
    return { ok: true };
  }

  private createTokenResponse(user: UserDocument) {
    const authUser = this.toAuthUser(user);
    return {
      accessToken: this.tokenService.sign(authUser, 60 * 60 * 8),
      refreshToken: this.tokenService.sign(authUser, 60 * 60 * 24 * 7),
      user: authUser
    };
  }

  private toAuthUser(user: UserDocument) {
    const dto = toDto<Record<string, any>>(user)!;
    return {
      sub: dto.id,
      id: dto.id,
      email: dto.email,
      fullName: dto.fullName,
      role: dto.role,
      tenantId: dto.tenantId
    };
  }
}
