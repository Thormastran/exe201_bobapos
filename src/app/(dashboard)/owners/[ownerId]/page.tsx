"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenant } from "@/modules/tenants/api/tenant.queries";
import { TenantStatusEditor } from "@/modules/tenants/components/tenant-status-editor";

export default function OwnerDetailPage() {
  const params = useParams<{ ownerId: string }>();
  const tenant = useTenant(params.ownerId);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground">Owners</p>
        <h1 className="text-3xl font-bold text-primary">Chi tiết owner</h1>
      </div>
      <Card>
        <CardHeader><CardTitle>{tenant.data?.ownerName ?? "Loading..."}</CardTitle></CardHeader>
        <CardContent className="grid gap-3 text-sm md:grid-cols-2">
          <p>Email: {tenant.data?.ownerEmail}</p>
          <p>Store: {tenant.data ? <Link className="font-semibold text-primary" href={`/tenants/${tenant.data.id}`}>{tenant.data.name}</Link> : null}</p>
          <p>Plan: {tenant.data?.plan}</p>
          <p>Created: {tenant.data?.createdAt}</p>
          <div className="space-y-1">
            <p className="font-semibold">Status</p>
            {tenant.data ? <TenantStatusEditor tenantId={tenant.data.id} status={tenant.data.status} /> : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
