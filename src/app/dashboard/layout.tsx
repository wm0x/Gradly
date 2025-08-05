import { auth } from "@/auth";
import { SidebarWrapper } from "@/components/ui/SidebarWrapper";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider>
    <div className="mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row h-screen border border-neutral-700 bg-black">
      <SidebarWrapper userName={session?.user?.name || "login"} />

      <div className="flex flex-1 overflow-auto w-full rounded-l-2xl bg-[#0e0e0e]">
        {children}
      </div>
    </div>
    </SessionProvider>
  );
}
