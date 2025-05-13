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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setCartOpen } from "@/lib/features/cartSlice";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(setCartOpen(false));
  }, [pathname, dispatch]);

  const totalAmount = cart.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <nav
      className={
        "fixed w-fit p-1 bottom-9 left-1/2 -translate-x-1/2 bg-black z-[999]" +
        (pathname.split("/").includes("select-country") ? " hidden" : "")
      }
    >
      <ul className="flex gap-1 font-violet-sans text-sm uppercase">
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

        <Dialog
          open={cart.isCartOpen}
          onOpenChange={(open) => dispatch(setCartOpen(open))}
        >
          <DialogTrigger>
            <li className="bg-primary grid place-items-center p-2 md:p-2">
              <ShoppingBag
                className="w-4 h-4 block md:hidden"
                color="#212135"
              />
              <Image
                width={127}
                height={158}
                src={commonAssets.icons.cart}
                alt="shopping cart" 
                className="w-4 hidden md:block md:w-full"
              />
            </li>
          </DialogTrigger>

          <DialogContent className="fixed !rounded-none p-0 w-11/12 md:w-[670px] h-[455px] md:h-[455px] mx-auto flex flex-col bg-white overflow-hidden">
            <DialogHeader className="p-2">
              <DialogTitle className="font-helvetica-now-display text-sm !text-left">
                Cart List
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col h-full overflow-hidden">
              <main className="flex-1 overflow-y-auto p-2">
                {cart.items.map((item) => (
                  <div key={item._id} className="py-2">
                    <CartItem item={{ ...item, description: "" }} />
                    <hr className="mt-2" />
                  </div>
                ))}
                {cart.items.length === 0 && (
                  <p className="text-center font-violet-sans">
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
