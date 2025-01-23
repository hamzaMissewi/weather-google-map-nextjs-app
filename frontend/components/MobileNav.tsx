"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import React, { useState } from "react";
import { DropdownMenuComponent } from "@/components/common/DropdownMenu";

const links = [
  { name: "home", path: "/" },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "projects",
    path: "/projects",
  },
  // [
  //   {
  //     name: 'work',
  //     path: '/work'
  //   },
  //   {
  //     name: 'projects',
  //     path: '/projects'
  //   }
  // ],
  {
    name: "services",
    path: "/services",
  },
  {
    name: "testimonials",
    path: "/testimonials",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

function MobileNav() {
  const [openSheet, setOpenSheet] = useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger
        onClick={() => setOpenSheet((prevState) => !prevState)}
        className="flex items-end justify-center"
      >
        <CiMenuBurger className="text-[32px]" />
        {/*<CiMenuFries className='text-[32px]' />*/}
      </SheetTrigger>
      <SheetContent className="flex w-fit flex-col px-10">
        <DialogTitle></DialogTitle>
        <div className="mb-28 mt-32 text-center text-2xl">
          <Link href="/" onClick={() => setOpenSheet(false)}>
            <h1 className="text-4xl font-semibold">
              Hamza Dev
              <span className="text-accent_green">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col items-center justify-start gap-4 overflow-y-auto text-center">
          {links.map((link, index) => {
            if (Array.isArray(link)) {
              return (
                // <NavigationMenuComponent
                //   key={index}
                //   menuData={link}
                //   title={"menu"}
                // />
                <DropdownMenuComponent
                  menuData={link}
                  key={index}
                  titleClassName={
                    "text-lg text-white capitalize transition-all hover:text-accent_green font-semibold hover:no-underline"
                  }
                  initialTitle={"Work"}
                />
              );
            } else
              return (
                <Link
                  onClick={() => setOpenSheet(false)}
                  href={link.path}
                  key={index}
                  className={`${
                    link.path === pathname &&
                    "border-b-2 border-accent_green px-3 text-accent_green"
                  } text-xl capitalize transition-all hover:text-accent_green`}
                >
                  {link.name}
                </Link>
              );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
