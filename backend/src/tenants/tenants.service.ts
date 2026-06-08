import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { paginate, toDto } from "../common/mongo";
import { QueryParams } from "../common/types";
import { Tenant, TenantDocument } from "./tenant.schema";

@Injectable()
export class TenantsService {
  constructor(@InjectModel(Tenant.name) private readonly tenantModel: Model<TenantDocument>) {}

  findAll(params: QueryParams) {
    return paginate(this.tenantModel, params, ["name", "ownerName", "ownerEmail", "plan", "status"]);
  }

  async findOne(id: string) {
    const tenant = await this.tenantModel.findById(id).exec();
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }
    return toDto(tenant);
  }

  async create(payload: any) {
    const tenant = await this.tenantModel.create({ status: "active", ...payload });
    return toDto(tenant);
  }

  async update(id: string, payload: any) {
    const tenant = await this.tenantModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).exec();
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }
    return toDto(tenant);
  }

  async remove(id: string) {
    await this.tenantModel.findByIdAndDelete(id).exec();
  }
}
