import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Contract, ContractSchema } from "../contracts/contract.schema";
import { Employee, EmployeeSchema } from "../employees/employee.schema";
import { Tenant, TenantSchema } from "../tenants/tenant.schema";
import { User, UserSchema } from "../auth/user.schema";
import { SeederService } from "./seeder.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: Contract.name, schema: ContractSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [SeederService]
})
export class SeederModule {}
