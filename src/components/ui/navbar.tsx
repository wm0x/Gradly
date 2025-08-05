"use client";
import React from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";

import { useState } from "react";

function NavbarDemo() {
  const navItems = [
    {
      name: "features",
      link: "#features",
    },
    {
      name: "Gradly AI",
      link: "#Gradly-ai",
    },
    {
      name: "why Gradly",
      link: "#why-grads",
    },
        {
      name: "projects",
      link: "/dashboard/projects",
    },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="relative w-full" dir="ltr">
      <Navbar>
        {/* for desktop */}
        <NavBody className="border rounded-xl">
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              variant="secondary"
              className="text-green-600"
              href="/auth/login"
            >
              login
            </NavbarButton>

            <NavbarButton variant="primary" href="/auth/register" className="w-full rounded-lg">
              register
            </NavbarButton>
          </div>
        </NavBody>

        {/* for mobile */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
                <NavbarButton variant="secondary" className="text-green-600" href="/auth/login">
                  login
                </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full rounded-lg"
                href="/auth/register"
              >
                register
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default NavbarDemo;
