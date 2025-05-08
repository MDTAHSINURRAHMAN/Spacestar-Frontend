import commonAssets from "@/assets/commonAssets";
import {
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useAddSizeVariantMutation,
} from "@/lib/api/cartApi";
import { CartItem as CartItemType } from "@/types/cart";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
  cartId: string;
}

const CartItem = ({ item, cartId }: CartItemProps) => {
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [addSizeVariant] = useAddSizeVariantMutation();

  const handleSizeChange = async (newSize: string) => {
    try {
      await updateCartItem({
        cartId,
        itemId: item._id,
        updates: { size: newSize },
      });
    } catch (error) {
      console.error("Failed to update size:", error);
    }
  };

  const handleColorChange = async (newColor: string) => {
    try {
      await updateCartItem({
        cartId,
        itemId: item._id,
        updates: { color: newColor },
      });
    } catch (error) {
      console.error("Failed to update color:", error);
    }
  };

  const handleQuantityChange = async (change: number) => {
    const newQuantity = Math.max(1, item.quantity + change);
    try {
      await updateCartItem({
        cartId,
        itemId: item._id,
        updates: { quantity: newQuantity },
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCartItem({
        cartId,
        itemId: item._id,
      });
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleAddAnotherSize = async () => {
    try {
      await addSizeVariant({
        cartId,
        productId: item.productId,
        size: item.availableSizes[0],
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add size variant:", error);
    }
  };

  return (
    <article className="grid grid-cols-5 py-3">
      <div className="border col-span-2 md:col-span-1">
        <Image
          src={item.image || commonAssets.images.cartPlaceholder}
          alt={item.name}
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="col-span-3 md:col-span-4 space-y-3 ps-3">
        {/* title and price */}
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="md:col-span-2">
            <h1 className="font-helvetica-now-display font-medium leading-tight md:text-lg">
              {item.name}
            </h1>
            <p className="font-violet-sans text-muted text-xs leading-tight">
              Shipping: {item.shippingDate}
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              <p className="font-violet-sans text-muted text-xs leading-tight">
                Price
              </p>
              <p className="font-helvetica-now-display text-primary leading-tight text-sm md:text-base">
                ${item.price}
              </p>
            </div>
          </div>
        </div>

        {/* size and color */}
        <div className="flex justify-start gap-3 md:justify-between font-violet-sans uppercase flex-wrap">
          <div className="w-full md:w-auto">
            <h2 className="text-xs">Size</h2>
            <div className="flex gap-5 text-sm md:text-base">
              {item.availableSizes.map((size) => (
                <button
                  key={size}
                  className={`${size === item.size ? "text-primary" : ""}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto">
            <h2 className="text-xs">Color</h2>
            <div className="flex gap-5 text-sm md:text-base">
              {item.availableColors.map((color) => (
                <button
                  key={color}
                  className={`${color === item.color ? "text-primary" : ""}`}
                  onClick={() => handleColorChange(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs">Quantity</h2>
            <div className="flex justify-center gap-2 text-sm md:text-base">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>
          <div>
            <h2 className="text-xs">Subtotal</h2>
            <p className="text-sm md:text-base">${item.total}</p>
          </div>
        </div>

        {/* actions */}
        <div className="font-violet-sans justify-end gap-1 hidden md:flex">
          <button
            className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-red-500 uppercase text-white"
            onClick={handleDelete}
          >
            <Image src={commonAssets.icons.delete} alt="delete" />
          </button>
          <button
            className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-black uppercase text-white"
            onClick={handleAddAnotherSize}
          >
            Add Another Size
          </button>
        </div>
      </div>

      <div className="font-violet-sans justify-end gap-1 flex md:hidden col-span-5 pt-3">
        <button
          className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-red-500 uppercase text-white"
          onClick={handleDelete}
        >
          <Image src={commonAssets.icons.delete} alt="delete" />
        </button>
        <button
          className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 bg-black uppercase text-white"
          onClick={handleAddAnotherSize}
        >
          Add Another Size
        </button>
      </div>
    </article>
  );
};

export default CartItem;
