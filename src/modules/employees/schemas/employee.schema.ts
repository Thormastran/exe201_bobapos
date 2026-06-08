import { z } from "zod";

export const employeeSchema = z.object({
  tenantId: z.string().uuid(),
  fullName: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(1),
  department: z.string().min(1),
  status: z.enum(["active", "inactive", "pending"]).optional()
});
