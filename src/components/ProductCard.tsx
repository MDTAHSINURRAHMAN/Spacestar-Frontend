import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { RootState } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const hasValidImage =
    product.images &&
    product.images.length > 0 &&
    typeof product.images[0] === "string";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail page

    // Check if product is already in cart
    const isInCart = cart.items.some((item) => item.productId === product._id);
    if (isInCart) {
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      shortDescription: product.shortDescription,
      image: product.images[0] || "",
      size: product.sizes[0] || "M", // Default to first size or M
      availableSizes: product.sizes,
      color: product.colors[0] || "W", // Default to first color or W
      availableColors: product.colors,
      quantity: 1,
      price: product.price,
    };

    // Add to local Redux store
    dispatch(addToCart(cartItem));
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
            className="object-cover w-[398px] h-[586px]"
            style={{ objectFit: "cover" }}
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 md:-bottom-16 transition-all left-0 right-0 m-3 md:group-hover:bottom-0 bg-primary text-white p-2 font-violet-sans text-sm uppercase text-center"
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
