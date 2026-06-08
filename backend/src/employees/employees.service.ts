import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { paginate, toDto } from "../common/mongo";
import { QueryParams } from "../common/types";
import { Employee, EmployeeDocument } from "./employee.schema";

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) {}

  findAll(params: QueryParams) {
    return paginate(this.employeeModel, params, ["fullName", "email", "role", "department", "status"]);
  }

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    return toDto(employee);
  }

  async create(payload: any) {
    const employee = await this.employeeModel.create({ status: "pending", ...payload });
    return toDto(employee);
  }

  async update(id: string, payload: any) {
    const employee = await this.employeeModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    return toDto(employee);
  }

  async remove(id: string) {
    await this.employeeModel.findByIdAndDelete(id).exec();
  }
}
