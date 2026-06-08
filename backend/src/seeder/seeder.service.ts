import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contract, ContractDocument } from "../contracts/contract.schema";
import { Employee, EmployeeDocument } from "../employees/employee.schema";
import { Tenant, TenantDocument } from "../tenants/tenant.schema";
import { hashPassword } from "../auth/password.util";
import { User, UserDocument } from "../auth/user.schema";

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: Model<TenantDocument>,
    @InjectModel(Contract.name) private readonly contractModel: Model<ContractDocument>,
    @InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async onModuleInit() {
    await this.ensureAdminUser();

    const tenantCount = await this.tenantModel.countDocuments().exec();
    if (tenantCount > 0) {
      return;
    }

    const tenants = await this.tenantModel.insertMany([
      { name: "Emerald Tea Co.", ownerName: "Nguyễn Văn An", ownerEmail: "an.nguyen@tearetail.vn", plan: "premium", status: "active" },
      { name: "Azure Highlands Tea", ownerName: "Mai Nguyen", ownerEmail: "mai@azuretea.vn", plan: "enterprise", status: "active" },
      { name: "Sweet Pearl Group", ownerName: "Johnathan Doe", ownerEmail: "owner@shopdomain.com", plan: "starter", status: "pending" }
    ]);

    await this.contractModel.insertMany([
      { tenantId: tenants[0]._id.toString(), code: "#CNT-2024-081", ownerName: tenants[0].ownerName, plan: "saas_subscription", status: "active", startDate: "2024-10-12", endDate: "2026-10-12", amount: 48000000 },
      { tenantId: tenants[1]._id.toString(), code: "TF-2023-0892", ownerName: tenants[1].ownerName, plan: "franchise", status: "pending", startDate: "2023-10-27", endDate: "2025-10-27", amount: 72000000 }
    ]);

    await this.employeeModel.insertMany([
      { tenantId: tenants[0]._id.toString(), fullName: "Trần Minh Anh", email: "minhanh@tearetail.vn", role: "manager", department: "Operations", status: "active", lastLoginAt: "2026-06-02T09:00:00.000Z" },
      { tenantId: tenants[1]._id.toString(), fullName: "Lê Hoàng Nam", email: "nam@azuretea.vn", role: "staff", department: "Support", status: "pending" }
    ]);

  }

  private async ensureAdminUser() {
    const existingAdmin = await this.userModel.findOne({ email: "admin@teaflow.io" }).exec();
    if (existingAdmin) {
      return;
    }

    await this.userModel.create({
      email: "admin@teaflow.io",
      fullName: "System Admin",
      role: "admin",
      passwordHash: hashPassword("Admin@123456"),
      isActive: true
    });
  }
}
