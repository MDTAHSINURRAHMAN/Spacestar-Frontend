import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasValidImage =
    product.images &&
    product.images.length > 0 &&
    typeof product.images[0] === "string";
  return (
    <article>
      <Link href={`/shopping/${product._id}`}>
        <div className="group relative overflow-hidden">
          <Image
            src={hasValidImage ? product.images[0] : ""}
            alt={product.name}
            width={500}
            height={500}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute -bottom-16 transition-all left-0 right-0 m-3 group-hover:bottom-0 bg-primary text-white p-2 z-50 font-violet-sans text-sm uppercase text-center">
            add to cart
          </div>
        </div>

        <div className="font-helvetica-now-display text-lg flex justify-between items-center mt-2">
          <div>
            <h1 className="">{product.name}</h1>
            <p className="text-xs text-muted font-violet-sans uppercase">
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
