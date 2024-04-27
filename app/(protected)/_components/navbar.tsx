"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-around items-center p-1 rounded-xl  w-[60px] mx-2 sm:mx-4 sm:w-[600px] sm:shadow-sm gap-x-4 flex-col sm:flex-row gap-y-2 ">
      <div className="flex flex-col gap-y-4 mx-1 sm:flex-row gap-x-2 sm:mx-6">
        <Button
          className=" w-[60px] sm:w-[80px] "
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link
            href={"/server"}
            onClick={() => {
              window.location.href = "/server";
            }}
          >
            Server
          </Link>
        </Button>
        <Button
          className=" w-[60px] sm:w-[80px]"
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button
          className=" w-[60px] sm:w-[80px]"
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href={"/admin"}>Admin</Link>
        </Button>
        <Button
          asChild
          className=" w-[60px] sm:w-[80px] "
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
export default Navbar;
