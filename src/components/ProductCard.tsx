import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import {
  useGenerateCartIdQuery,
  useAddToCartMutation,
} from "@/lib/api/cartApi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { RootState } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [addToCartMutation] = useAddToCartMutation();
  const [cartId, setCartId] = useState<string | null>(null);
  const cart = useSelector((state: RootState) => state.cart);

  const hasValidImage =
    product.images &&
    product.images.length > 0 &&
    typeof product.images[0] === "string";

  // Get existing cartId from cookie or generate new one
  const existingCartId = Cookies.get("cartId");
  const { data: cartIdData } = useGenerateCartIdQuery(undefined, {
    skip: !!existingCartId,
  });

  useEffect(() => {
    // If we have an existing cartId in cookies, use that
    if (existingCartId) {
      setCartId(existingCartId);
      return;
    }

    // If we got a new cartId from the API, save it
    if (cartIdData?.cartId) {
      Cookies.set("cartId", cartIdData.cartId, { expires: 7 });
      setCartId(cartIdData.cartId);
    }
  }, [cartIdData, existingCartId]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail page
    if (!cartId) {
      console.error("No cart ID available");
      return;
    }

    // Check if product is already in cart
    const isInCart = cart.items.some((item) => item.productId === product._id);
    if (isInCart) {
      return;
    }

    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        image: product.images[0] || "",
        size: product.sizes[0] || "M", // Default to first size or M
        availableSizes: product.sizes,
        color: product.colors[0] || "W", // Default to first color or W
        availableColors: product.colors,
        quantity: 1,
        price: product.price,
      };

      // Add to backend
      await addToCartMutation({
        cartId,
        item: cartItem,
      });

      // Add to local Redux store
      dispatch(addToCart(cartItem));
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <article>
      <Link href={`/shopping/${product._id}`}>
        <div className="group relative overflow-hidden">
          <Image
            src={hasValidImage ? product.images[0] : ""}
            alt={product.name}
            width={398}
            height={586}
            className="object-cover"
          />
          <button
            onClick={handleAddToCart}
            className="absolute -bottom-16 transition-all left-0 right-0 m-3 group-hover:bottom-0 bg-primary text-white p-2 z-50 font-violet-sans text-sm uppercase text-center"
          >
            add to cart
          </button>
        </div>

        <div className="font-helvetica-now-display text-lg flex justify-between items-center mt-2">
          <div>
            <h1 className="font-medium">{product.name}</h1>
            <p className="text-xs text-muted font-violet-sans uppercase font-normal">
              {product.shortDescription}
            </p>
          </div>

          <h2 className="text-primary-dark font-medium uppercase">
            ${product.price}
          </h2>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
