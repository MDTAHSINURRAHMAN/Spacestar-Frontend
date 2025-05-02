import commonAssets from "@/assets/commonAssets";
import CartItem from "@/components/CartItem";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function CheckoutPage() {
  return (
    <div className="min-h-[100dvh] p-5">
      <Header />

      <div className="grid grid-cols-3 lg:grid-cols-6">
        <aside className="col-span-2 hidden md:block"></aside>

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
              <CartItem />
              <hr />
              <CartItem />

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
                <p className="text-xs">Subtotal · 2 items</p>
                <p className="text-primary text-end">$40.95</p>

                <p className="text-xs">Shipping</p>
                <p className="text-primary text-end">$40.95</p>

                <p className="text-xs">Total</p>
                <p className="text-primary text-end">$40.95</p>
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
                  I agree to Terms & Conditions, Refund Policy and Privacy
                  Policy of Spacestar
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
