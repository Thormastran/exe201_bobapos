"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenant } from "@/modules/tenants/api/tenant.queries";
import { TenantStatusEditor } from "@/modules/tenants/components/tenant-status-editor";

export default function TenantDetailPage() {
  const params = useParams<{ tenantId: string }>();
  const tenant = useTenant(params.tenantId);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Stores</p>
        <h1 className="text-3xl font-bold text-primary">Chi tiết cửa hàng</h1>
      </div>
      <Card>
        <CardHeader><CardTitle>{tenant.data?.name ?? "Loading..."}</CardTitle></CardHeader>
        <CardContent className="grid gap-3 text-sm md:grid-cols-2">
          <p>Owner: {tenant.data?.ownerName}</p>
          <p>Email: {tenant.data?.ownerEmail}</p>
          <p>Plan: {tenant.data?.plan}</p>
          <div className="space-y-1">
            <p className="font-semibold">Status</p>
            {tenant.data ? <TenantStatusEditor tenantId={tenant.data.id} status={tenant.data.status} /> : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
