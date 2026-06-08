export type TenantStatus = "active" | "inactive" | "pending" | "suspended";

export type TenantDto = {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  plan: string;
  status: TenantStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTenantDto = {
  name: string;
  ownerName: string;
  ownerEmail: string;
  plan: string;
  status: TenantStatus;
};

export type UpdateTenantDto = Partial<CreateTenantDto> & {
  status?: TenantStatus;
};
