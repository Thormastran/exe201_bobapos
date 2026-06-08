import { RestClient } from "@/lib/api/rest-client";
import type { ContractDto, CreateContractDto, UpdateContractDto } from "@/modules/contracts/types/contract.types";

export const contractApi = new RestClient<ContractDto, CreateContractDto, UpdateContractDto>("/contracts");
