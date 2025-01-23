"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";
// import { CiMenuKebab } from 'react-icons/ci'
import { CiMenuBurger } from "react-icons/ci";
import { DropdownMenuComponent } from "@/components/common/DropdownMenu";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "testimonials",
    path: "/testimonials",
  },
  [
    {
      name: "work",
      path: "/work",
    },
    {
      name: "projects",
      path: "/projects",
    },
    {
      name: "contact",
      path: "/contact",
    },
  ],
];
function DesktopNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-x-10">
      {links.map((link, index) => {
        if (Array.isArray(link)) {
          return (
            <DropdownMenuComponent
              // MenuIcon={CiMenuKebab}
              MenuIcon={CiMenuBurger}
              menuData={link}
              key={index}
              titleClassName={"font-medium text-xl capitalize transition-all"}
              initialTitle={"Work"}
            />
          );
        } else
          return (
            <Link
              href={link.path}
              key={index}
              className={`${
                link.path === pathname && "border-b-1 text-accent_green"
              } text-xl font-medium capitalize transition-all`}
            >
              {link.name}
            </Link>
          );
      })}

      <Link href="/contact">
        <Button
          variant={"default"}
          size={"sm"}
          className="ml-6 h-min bg-accent_green py-1.5 shadow-md hover:shadow-gray-400"
        >
          {/*<Button className="ml-6 text-accent_green hover:underline">*/}
          Contact Me
        </Button>
      </Link>
    </div>
  );
}

export default DesktopNav;
