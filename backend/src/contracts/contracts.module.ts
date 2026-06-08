import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Tenant, TenantSchema } from "../tenants/tenant.schema";
import { Contract, ContractSchema } from "./contract.schema";
import { ContractsController } from "./contracts.controller";
import { ContractsService } from "./contracts.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contract.name, schema: ContractSchema },
      { name: Tenant.name, schema: TenantSchema }
    ])
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService, MongooseModule]
})
export class ContractsModule {}
