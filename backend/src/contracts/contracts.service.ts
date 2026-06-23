import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { paginate, toDto } from "../common/mongo";
import type { QueryParams } from "../common/types";
import { Tenant, TenantDocument } from "../tenants/tenant.schema";
import { Contract, ContractDocument } from "./contract.schema";

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract.name) private readonly contractModel: Model<ContractDocument>,
    @InjectModel(Tenant.name) private readonly tenantModel: Model<TenantDocument>
  ) {}

  findAll(params: QueryParams) {
    return paginate(this.contractModel, params, ["code", "ownerName", "plan", "status"]);
  }

  async findOne(id: string) {
    const conditions = id.match(/^[a-f\d]{24}$/i) ? [{ _id: id }, { code: id }] : [{ code: id }];
    const contract = await this.contractModel.findOne({ $or: conditions }).exec();
    if (!contract) {
      throw new NotFoundException("Contract not found");
    }
    return toDto(contract);
  }

  async create(payload: any) {
    const tenant = payload.tenantId ? await this.tenantModel.findById(payload.tenantId).exec() : null;
    const count = await this.contractModel.countDocuments().exec();
    const contract = await this.contractModel.create({
      code: `TF-${new Date().getFullYear()}-${String(count + 892).padStart(4, "0")}`,
      ownerName: tenant?.ownerName ?? "Nguyễn Văn An",
      status: "pending",
      ...payload
    });
    return toDto(contract);
  }

  async update(id: string, payload: any) {
    const tenant = payload.tenantId ? await this.tenantModel.findById(payload.tenantId).exec() : null;
    const updatePayload = {
      ...payload,
      ...(tenant ? { ownerName: tenant.ownerName } : {})
    };
    const contract = await this.contractModel.findByIdAndUpdate(id, updatePayload, { new: true, runValidators: true }).exec();
    if (!contract) {
      throw new NotFoundException("Contract not found");
    }
    return toDto(contract);
  }

  async remove(id: string) {
    const contract = await this.contractModel.findByIdAndDelete(id).exec();
    if (!contract) {
      throw new NotFoundException("Contract not found");
    }
  }
}
