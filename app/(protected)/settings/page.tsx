"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect } from "react";

const SettingsPage = () => {
  const onClick = async () => {
    await logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={onClick}>
        Sign out
      </button>
    </div>
  );
};
export default SettingsPage;
