"use client";

import commonAssets from "@/assets/commonAssets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CartItem from "./CartItem";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className={
        "fixed w-fit p-1 bottom-3 left-1/2 -translate-x-1/2 bg-black z-50" +
        (pathname.split("/").includes("select-country") ? "hidden" : "")
      }
    >
      <ul className="flex gap-1 font-violet-sans text-sm uppercase w-max">
        {[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Shopping", href: "/shopping" },
          { label: "Stories", href: "/stories" },
        ].map((itm) => (
          <Link
            key={itm.label}
            href={itm.href}
            className="text-xs md:text-sm bg-[#222220] hover:bg-white text-white hover:text-black px-3 md:px-4 py-1 md:py-2 transition-colors cursor-pointer grid place-items-center"
          >
            {itm.label}
          </Link>
        ))}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <li className="bg-primary grid place-items-center aspect-square p-2 md:p-2 min-w-fit">
              <Image
                src={commonAssets.icons.cart}
                alt="shopping cart"
                className="w-4 md:w-full"
              />
            </li>
          </DialogTrigger>

          <DialogContent className="max-h-dvh md:-bottom-[10rem] md:top-auto !rounded-none p-2 max-w-screen-sm z-50 md:z-40">
            <DialogHeader>
              <DialogTitle className="font-helvetica-now-display text-sm font-semibold !text-left">
                Cart List
              </DialogTitle>
            </DialogHeader>

            <div>
              <main className="max-h-[calc(100dvh-350px)] md:max-h-[455px] overflow-auto">
                <CartItem />
                <hr />
                <CartItem />
              </main>

              <footer className="grid grid-cols-2 gap-3 items-center pt-2">
                <p className="font-helvetica-now-display text-base md:text-lg font-medium text-right">
                  Total Amount: $99.99
                </p>
                <Link
                  href="/checkout"
                  className="text-center bg-secondary font-violet-sans uppercase text-sm px-5 md:px-8 py-2 md:py-3"
                >
                  Checkout
                </Link>
              </footer>
            </div>
          </DialogContent>
        </Dialog>
      </ul>
    </nav>
  );
};

export default Navbar;
