"use client";

import commonAssets from "@/assets/commonAssets";
import CartItem from "@/components/CartItem";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useGenerateCartIdQuery, useGetCartQuery } from "@/lib/api/cartApi";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";
export default function CheckoutPage() {
  const { data: cartIdData } = useGenerateCartIdQuery();
  const { data: cart } = useGetCartQuery(cartIdData?.cartId ?? "", {
    skip: !cartIdData?.cartId,
  });
  const { data: texts } = useGetAllTextsQuery();

  const totalAmount =
    cart?.items.reduce((sum, item) => sum + item.total, 0) ?? 0;
  const shippingCost = 5.99; // You can adjust this or make it dynamic based on your needs
  const finalTotal = totalAmount + shippingCost;

  return (
    <div className="w-2/3 mx-auto">
      <Header text={texts?.[0]?.text || ""} />

      <div className="grid">
        {/* <aside className="col-span-2 hidden md:block"></aside> */}

        <main className="space-y-10 col-span-3">
          <div className="flex items-center gap-2">
            <Image
              src={commonAssets.icons.logo}
              alt="Spacestar"
              className="max-w-6 md:w-full"
            />
            <p className="text-2xl text-primary font-helvetica-now-display">
              Spacestar
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-helvetica-now-display mb-5">
              Checkout Info
            </h2>

            <div className="font-violet-sans grid grid-cols-1 md:grid-cols-2 gap-5">
              <p className="text-sm col-span-1 md:col-span-2">Contact</p>

              <input
                type="text"
                placeholder="first name"
                className="bg-transparent border-b !outline-none placeholder:text-black placeholder:uppercase"
              />
              <input
                type="text"
                placeholder="last name"
                className="bg-transparent border-b !outline-none placeholder:text-black placeholder:uppercase"
              />

              <div>
                <input
                  type="text"
                  placeholder="phone"
                  className="bg-transparent w-full border-b !outline-none placeholder:text-black placeholder:uppercase"
                />
                <div className="flex items-center space-x-2 pt-3 text-primary">
                  <Checkbox id="subscribe-phone" />
                  <label
                    htmlFor="subscribe-phone"
                    className="text-xs uppercase font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Text Me With Order Updates
                  </label>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="email"
                  className="bg-transparent w-full border-b !outline-none placeholder:text-black placeholder:uppercase"
                />
                <div className="flex items-center space-x-2 pt-3 text-primary">
                  <Checkbox id="subscribe-email" />
                  <label
                    htmlFor="subscribe-email"
                    className="text-xs uppercase font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email Me With Order Updates
                  </label>
                </div>
              </div>

              <p className="text-sm col-span-1 md:col-span-2 pt-5">Address</p>
              <input
                type="text"
                placeholder="detailed address"
                className="bg-transparent col-span-1 md:col-span-2 border-b !outline-none placeholder:text-black placeholder:uppercase"
              />
              <input
                type="text"
                placeholder="city"
                className="bg-transparent border-b !outline-none placeholder:text-black placeholder:uppercase"
              />

              <input
                type="text"
                placeholder="postal code"
                className="bg-transparent border-b !outline-none placeholder:text-black placeholder:uppercase"
              />
              <input
                type="text"
                placeholder="Note for spacestar (optional)"
                className="bg-transparent col-span-1 md:col-span-2 border-b !outline-none placeholder:text-black placeholder:uppercase"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-helvetica-now-display mb-5">
              Order Summary
            </h2>

            <div className="space-y-3">
              {cart?.items.map((item) => (
                <div key={item._id}>
                  <CartItem item={item} cartId={cart.cartId} />
                  <hr />
                </div>
              ))}
              {(!cart?.items || cart.items.length === 0) && (
                <p className="text-center py-5 font-violet-sans">
                  Your cart is empty
                </p>
              )}

              <div className="md:w-2/3 ms-auto font-violet-sans text-sm flex flex-wrap gap-2 md:gap-3">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  className="px-5 py-3 placeholder:uppercase flex-grow w-full md:w-auto"
                />
                <button className="bg-primary px-8 py-3 text-white uppercase w-full md:w-auto">
                  Apply
                </button>
              </div>

              <div className="font-violet-sans grid grid-cols-2 items-center md:w-1/2 ms-auto gap-y-2">
                <p className="text-xs">
                  Subtotal · {cart?.items.length ?? 0} items
                </p>
                <p className="text-primary text-end">
                  ${totalAmount.toFixed(2)}
                </p>

                <p className="text-xs">Shipping</p>
                <p className="text-primary text-end">
                  ${shippingCost.toFixed(2)}
                </p>

                <p className="text-xs">Total</p>
                <p className="text-primary text-end">
                  ${finalTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-helvetica-now-display mb-5">
              Payment Options
            </h2>

            <div className="font-violet-sans space-y-5">
              <div className="bg-white uppercase px-5 py-3 flex items-center gap-3 text-lg">
                <Checkbox className="w-6 h-6" />
                <Image src={commonAssets.icons.bkash} alt="" className="w-14" />
                Bkash
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to Terms & Conditions, Refund Policy and Privacy
                  Policy of Spacestar
                </label>
              </div>

              <button className="w-full text-center py-3 bg-secondary uppercase !mt-8">
                Confirm Order
              </button>
            </div>
          </div>

          <footer>
            <h2 className="text-3xl font-helvetica-now-display uppercase mb-3">
              FOR ANY HELP YOU MAY CALL US AT
            </h2>
            <p className="font-violet-sans text-lg">
              +8809677666888
              <br />
              Open 24 Hours a Day, 7 Days a week
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
