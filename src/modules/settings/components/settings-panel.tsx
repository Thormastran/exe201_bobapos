"use client";

import { useSettingsProfile } from "@/modules/settings/api/settings.queries";
import { useSettingsStore } from "@/modules/settings/stores/settings.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SettingsPanel() {
  const profile = useSettingsProfile();
  const { activeTab, setActiveTab } = useSettingsStore();

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <Button variant={activeTab === "profile" ? "default" : "outline"} onClick={() => setActiveTab("profile")}>Profile</Button>
        <Button variant={activeTab === "security" ? "default" : "outline"} onClick={() => setActiveTab("security")}>Security</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>{activeTab === "profile" ? "Profile settings" : "Security settings"}</CardTitle></CardHeader>
        <CardContent className="grid gap-3 text-sm md:grid-cols-2">
          {activeTab === "profile" ? (
            <>
              <p>Name: {profile.data?.fullName}</p>
              <p>Email: {profile.data?.email}</p>
              <p>Role: {profile.data?.role}</p>
            </>
          ) : (
            <p className="text-muted-foreground">Security update forms submit to /settings/security.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
