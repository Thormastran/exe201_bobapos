import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { QueryParams } from "../common/types";
import { ContractsService } from "./contracts.service";

@Controller("contracts")
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  findAll(@Query() query: QueryParams) {
    return this.contractsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.contractsService.findOne(id);
  }
 
  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.contractsService.create(payload);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() payload: Record<string, unknown>) {
    return this.contractsService.update(id, payload);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.contractsService.remove(id);
  }
}
