"use client";
import Link from "next/link";
import DesktopNav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <header className='bg-primary-old sticky top-0 z-50 bg-opacity-70 py-1 xl:py-8'>
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        !isScrolled ? "bg-primary shadow-lg" : "bg-primary/40",
      )}
    >
      <div className="relative flex w-full items-center justify-between px-2 py-1 md:px-3 xl:py-2">
        <Link
          href={pathname === "/" ? "" : "/"}
          // target={pathname === "/" ? "_blank" : "_self"}
          // rel={pathname === "/" ? "noopener noreferrer" : undefined}
        >
          <div
            className={
              "inset-shadow-gray-500 mx-auto ml-5 rounded-full bg-transparent px-3 py-0 text-white transition-colors duration-500 ease-out hover:bg-primary_blue hover:text-accent_green lg:m-0"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="50"
              viewBox="0 0 400 100"
              fill={"none"}
            >
              <rect width="100%" height="100%" fill="transparent" />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="40"
                fill="currentColor"
                fontWeight="bold"
              >
                Hamza Missaoui.
              </text>
            </svg>
          </div>
        </Link>
        <div className="hidden items-center gap-8 xl:flex">
          <DesktopNav />
        </div>

        <div className="flex items-center xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
