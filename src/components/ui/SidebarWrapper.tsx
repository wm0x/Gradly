"use client";
import React, { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { GoProjectRoadmap } from "react-icons/go";
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { AuroraText } from "@/components/ui/aurora-text";
import { signOut } from "next-auth/react";

export function SidebarWrapper({ userName }: { userName: string }) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  if (userName === "Login") {
    setDisabled(false);
  }
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <MdDashboard className="h-5 w-5 shrink-0 text-green-700 ml-1" />,
    },
    {
      label: "Projects",
      href: "/dashboard/projects",
      icon: (
        <GoProjectRoadmap className="h-5 w-5 shrink-0 text-green-700 ml-1" />
      ),
    },
    {
      label: "Gradly AI",
      href: "/dashboard/ai",
      icon: (
        <GiArtificialIntelligence className="h-5 w-5 shrink-0 text-green-700 ml-1" />
      ),
    },
  ];

  const filteredLinks = links.map((link) => {
    const isRestricted =
      ["Dashboard", "Gradly AI"].includes(link.label) &&
      userName.toLowerCase() === "login";

    return {
      ...link,
      href: isRestricted ? "#" : link.href,
      isDisabled: isRestricted,
    };
  });

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-black/80">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-4 flex flex-col gap-2 border-t-2 border-white/10">
            {filteredLinks.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={cn(
                  link.isDisabled &&
                    "pointer-events-none opacity-40 cursor-not-allowed"
                )}
              />
            ))}

            {userName !== "login" && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={cn(
                  "flex items-center rounded-lg px-1 py-3 text-sm font-medium w-full",
                  "text-red-400 hover:text-red-300 transition-colors",
                  "hover:bg-red-900/20 border border-transparent hover:border-red-900/30",
                  "group transition-all duration-200"
                )}
              >
                <div
                  className={cn(
                    "h-5 w-5 flex items-center justify-center ",
                    "rounded-full p-0.5 transition-all duration-200",
                    "bg-red-700/30 border border-red-400/80",
                    "group-hover:bg-red-700/50 group-hover:border-red-300"
                  )}
                >
                  <IconArrowLeft className="h-4 w-4" />
                </div>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="whitespace-nowrap ml-2.5"
                  >
                    Logout
                  </motion.span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t-2 border-white/10 pt-2">
          <SidebarLink
            link={{
              label: userName,
              href: "/dashboard/profile",
              icon: (
                <img
                  src="https://avatar.vercel.sh/ali"
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-green-500 ml-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      >
        <AuroraText className="font-bold text-2xl"> Gradly </AuroraText>
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-green-500 ml-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    </a>
  );
};
