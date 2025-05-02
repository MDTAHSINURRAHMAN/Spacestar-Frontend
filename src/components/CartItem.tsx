import commonAssets from "@/assets/commonAssets";
import Image from "next/image";

const CartItem = () => {
  return (
    <article className="grid grid-cols-5 py-3">
      <div className="border col-span-2 md:col-span-1">
        <Image
          src={commonAssets.images.cartPlaceholder}
          alt=""
          className="object-cover h-full w-full"
        />
      </div>

      <div className="col-span-3 md:col-span-4 space-y-3 ps-3">
        {/* title and price */}
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="md:col-span-2">
            <h1 className="font-helvetica-now-display font-medium leading-tight md:text-lg">
              Space Star -  Pre-Order
            </h1>
            <p className="font-violet-sans text-muted text-xs leading-tight">
              Shipping: Pre-order: Estimated to Ship Apr 30
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              <p className="font-violet-sans text-muted text-xs leading-tight">
                Price
              </p>
              <p className="font-helvetica-now-display text-primary leading-tight text-sm md:text-base">
                $29.99
              </p>
            </div>
          </div>
        </div>

        {/* size and color */}
        <div className="flex justify-start gap-3 md:justify-between font-violet-sans uppercase flex-wrap">
          <div className="w-full md:w-auto">
            <h2 className="text-xs">Size</h2>
            <div className="flex gap-5 text-sm md:text-base">
              <span className="text-primary">XL</span>
              <span>S</span>
              <span>M</span>
              <span>L</span>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <h2 className="text-xs">Color</h2>
            <div className="flex gap-5 text-sm md:text-base">
              <span className="text-primary">B</span>
              <span>W</span>
            </div>
          </div>
          <div>
            <h2 className="text-xs">Quantity</h2>
            <div className="flex justify-center gap-2 text-sm md:text-base">
              <span>-</span>
              <span>3</span>
              <span>+</span>
            </div>
          </div>
          <div>
            <h2 className="text-xs">Subtotal</h2>
            <p className="text-sm md:text-base">$29.99</p>
          </div>
        </div>

        {/* actions */}
        <div className="font-violet-sans justify-end gap-1 hidden md:flex">
          <button className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-red-500 uppercase text-white ">
            <Image src={commonAssets.icons.delete} alt="delete" />
          </button>
          <button className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-black uppercase text-white ">
            Add Another Size
          </button>
        </div>
      </div>

      <div className="font-violet-sans justify-end gap-1 flex md:hidden col-span-5 pt-3">
        <button className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-red-500 uppercase text-white ">
          <Image src={commonAssets.icons.delete} alt="delete" />
        </button>
        <button className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-black uppercase text-white ">
          Add Another Size
        </button>
      </div>
    </article>
  );
};

export default CartItem;
