import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-slate-100 px-2 ">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-bold drop-shadow-md"> 🔐Auth</h1>
        <p className="typed-out drop-shadow-md whitespace-normal break-words">
          A simple authentication system.
        </p>
        <LoginButton asChild>
          <Button size={"lg"} className="bg-orange-400 hover:bg-orange-900">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
