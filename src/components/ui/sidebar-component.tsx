"use client";
import React, { useState } from "react";
import {
  IconArrowLeft,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { GoProjectRoadmap } from "react-icons/go";
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import { AuroraText } from "./aurora-text";
import Link from 'next/link';




export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
      icon: <GiArtificialIntelligence className="h-5 w-5 shrink-0 text-green-700 ml-1" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-red-100 ml-1 border border-red-400 rounded-full bg-red-700" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden  border md:flex-row border-neutral-700 bg-black",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-black/80 ">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-4 flex flex-col gap-2 border-t-2 border-white/10">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="">
            <SidebarLink
            className="border-t-2 border-white/10"
              link={{
                label: "wm0x dev",
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

      <div className="flex flex-1 overflow-auto w-full rounded-l-2xl bg-[#0e0e0e]">
  {children}
</div>

    </div>
  );
}

export const Logo = () => {
  return (
    <Link
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
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
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
    </Link>
  );
};