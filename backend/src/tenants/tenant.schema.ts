import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TenantDocument = HydratedDocument<Tenant>;
export type TenantStatus = "active" | "inactive" | "pending" | "suspended";

@Schema({ timestamps: true })
export class Tenant {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  ownerName: string;

  @Prop({ required: true, trim: true, lowercase: true })
  ownerEmail: string;

  @Prop({ required: true, trim: true })
  plan: string;

  @Prop({ required: true, enum: ["active", "inactive", "pending", "suspended"], default: "pending" })
  status: TenantStatus;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
