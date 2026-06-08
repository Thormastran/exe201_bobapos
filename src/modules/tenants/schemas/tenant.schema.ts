import { z } from "zod";

export const tenantSchema = z.object({
  name: z.string().min(2),
  ownerName: z.string().min(2),
  ownerEmail: z.string().email(),
  plan: z.string().min(1),
  status: z.enum(["active", "inactive", "pending", "suspended"])
});
