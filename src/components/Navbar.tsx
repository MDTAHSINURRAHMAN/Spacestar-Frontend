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
import { useGetCartQuery } from "@/lib/api/cartApi";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let id = Cookies.get("cartId") || "";
    if (!id) {
      id = uuidv4();
      Cookies.set("cartId", id, { expires: 7 });
      // Optionally: call your backend to create an empty cart for this id
      // await fetch(`/api/cart/${id}`, { method: "POST" });
    }
    setCartId(id);
  }, []);

  const { data: cart } = useGetCartQuery(cartId, { skip: !cartId });

  const totalAmount =
    cart?.items.reduce((sum, item) => sum + item.total, 0) ?? 0;

  return (
    <nav
      className={
        "fixed w-fit p-1 bottom-3 left-1/2 -translate-x-1/2 bg-black z-[999]" +
        (pathname.split("/").includes("select-country") ? " hidden" : "")
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
            className={`text-xs md:text-sm ${pathname === itm.href ? "bg-white text-black" : "bg-[#222220] text-white hover:bg-white hover:text-black"} px-3 md:px-4 py-1 md:py-2 transition-colors cursor-pointer grid place-items-center`}
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

          <DialogContent className="fixed left-1/2 -translate-x-1/2 !rounded-none p-0 max-w-screen-sm z-[999] w-11/12 md:w-4/5 max-h-[70vh] md:max-h-[60vh] flex flex-col bg-white overflow-hidden">
            <DialogHeader className="p-2 border-b">
              <DialogTitle className="font-helvetica-now-display text-sm font-semibold !text-left">
                Cart List
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col h-full overflow-hidden">
              <main className="flex-1 overflow-y-auto p-2 max-h-[40vh] md:max-h-[45vh]">
                {cart?.items.map((item) => (
                  <div key={item._id} className="py-2">
                    <CartItem item={item} cartId={cart.cartId} />
                    <hr className="mt-2" />
                  </div>
                ))}
                {(!cart?.items || cart.items.length === 0) && (
                  <p className="text-center py-5 font-violet-sans">
                    Your cart is empty
                  </p>
                )}
              </main>

              <footer className="grid grid-cols-2 gap-3 items-center p-3 mt-auto border-t bg-white">
                <p className="font-helvetica-now-display text-base md:text-lg font-medium text-right">
                  Total Amount: ${totalAmount.toFixed(2)}
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
