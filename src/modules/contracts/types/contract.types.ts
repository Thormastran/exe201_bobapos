export type ContractStatus = "active" | "pending" | "expired" | "completed";

export type ContractDto = {
  id: string;
  tenantId: string;
  code: string;
  ownerName: string;
  plan: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  amount: number;
  createdAt: string;
};

export type CreateContractDto = {
  tenantId: string;
  plan: string;
  startDate: string;
  endDate: string;
  amount: number;
  status?: ContractStatus;
};

export type UpdateContractDto = Partial<CreateContractDto> & {
  status?: ContractStatus;
};
