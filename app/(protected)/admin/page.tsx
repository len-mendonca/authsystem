"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route");
      } else {
        toast.error("Forbidden API Route");
      }
    });
  };
  const onServerClick = () => {
    admin().then((response) => {
      if (response.error) {
        toast.error("Forbidden API Route");
      } else {
        toast.success("Allowed API Route");
      }
    });
  };
  return (
    <Card className="w-[600px] overflow-hidden">
      <CardHeader
        style={{
          background:
            "linear-gradient(180deg, rgba(209,194,21,1) 0%, rgba(255,220,220,1) 22%, rgba(255,255,255,1) 45%)",
        }}
      >
        <p className="text-2xl font-semibold text-center">🗝️ Admin </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button
            onClick={onApiRouteClick}
            className="bg-orange-400 hover:bg-orange-800"
          >
            Click to test
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button
            onClick={onServerClick}
            className="bg-orange-400 hover:bg-orange-800"
          >
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
