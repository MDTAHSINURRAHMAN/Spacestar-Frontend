"use client";

import commonAssets from "@/assets/commonAssets";
import CustomerReviewCard from "@/components/CustomerReviewCard";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  designer: string;
  features: string[];
  price: string | number;
  category: string;
  stock: string;
  images: string[];
  isPreOrder: boolean;
  sizes: string[];
  colors: string[];
  material: string;
  weight: string;
  dimensions: string;
  isFeatured: boolean;
  isOnSale: boolean;
  salePrice: string;
}

interface Review {
  _id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function SingleProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://spacestar-backend-production.up.railway.app/api/products/${id}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setProduct(data);
        setLoading(false);
        
        // Fetch related products
        const productsRes = await fetch(
          "https://spacestar-backend-production.up.railway.app/api/products",
          { cache: "no-store" }
        );
        const productsData = await productsRes.json();
        // Get 3 random products that are not the current one
        const filtered = productsData.filter((p: Product) => p._id !== id);
        const randomProducts = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRelatedProducts(randomProducts);
        
        // Fetch reviews for this product
        const reviewsRes = await fetch(
          `https://spacestar-backend-production.up.railway.app/api/reviews/${product?._id}`,
          { cache: "no-store" }
        );
        console.log(reviewsRes);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-5 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-2xl font-helvetica-now-display">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-5 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-2xl font-helvetica-now-display">Product not found</p>
      </div>
    );
  }

  const hasImages = product.images && product.images.length > 0;
  const price = typeof product.price === "string" ? product.price : product.price.toString();
  const formattedPrice = price.includes("$") ? price : `$${price}`;

  return (
    <div className="p-5 pb-20">
      <Header text="Product Details" />

      <div className="flex md:hidden justify-start gap-3 mb-5">
        <Image src={commonAssets.icons.logo} alt="Spacestar" className="w-8" />
        <p className="text-2xl md:text-3xl text-primary font-helvetica-now-display">
          Spacestar
        </p>
      </div>

      <main className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
          <aside className="order-1 md:sticky md:top-5 md:self-start">
            {hasImages && product.images[0] ? (
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                width={500}
                height={500}
                className="w-full"
              />
            ) : (
              <Image src={commonAssets.images.productDetailsPlaceholder} alt="" />
            )}
          </aside>

          <div className="order-3 md:order-2">
            <div className="hidden md:flex justify-center gap-3">
              <Image
                src={commonAssets.icons.logo}
                alt="Spacestar"
                className="w-8"
              />
              <p className="text-2xl md:text-3xl text-primary font-helvetica-now-display">
                Spacestar
              </p>
            </div>

            <div className="text-center pt-10 md:pt-20">
              <h1 className="font-helvetica-now-display text-6xl font-medium">
                {product.name}
              </h1>
              <p className="font-violet-sans uppercase text-lg pt-3">
                {product.shortDescription}
              </p>
            </div>

            <div className="text-center mt-10">
              <h2 className="font-helvetica-now-display text-primary-dark text-3xl">
                {formattedPrice}
              </h2>

              <div className="text-sm font-violet-sans uppercase pt-5">
                <p>Design By {product.designer || "Shyed"}</p>
                <ul className="flex gap-x-3 flex-wrap justify-center pt-3">
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))
                  ) : (
                    <>
                      <li>• 100% cotton</li>
                      <li>• 280gsm² </li>
                      <li>• Relaxed Fit </li>
                      <li>• Screen Printed</li>
                      <li>• Soft Feel</li>
                      <li>• Comfortable</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="font-violet-sans uppercase pt-5">
                <p className="text-xs">Size</p>
                <ul className="flex gap-5 justify-center text-base pt-3">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size, index) => (
                      <li key={index}>{size}</li>
                    ))
                  ) : (
                    <>
                      <li>XL</li>
                      <li>S</li>
                      <li>M</li>
                      <li>L</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="font-violet-sans uppercase pt-5">
                <p className="text-xs">Color</p>
                <ul className="flex gap-5 justify-center text-base pt-3">
                  {product.colors && product.colors.length > 0 ? (
                    product.colors.map((color, index) => (
                      <li key={index}>{color}</li>
                    ))
                  ) : (
                    <>
                      <li>B</li>
                      <li>W</li>
                    </>
                  )}
                </ul>
              </div>

              <Link
                href="#"
                className="text-primary text-xs font-violet-sans uppercase block underline pt-5"
              >
                Size Guide
              </Link>

              <div className="pt-5">
                <button className="bg-primary font-violet-sans uppercase text-white px-10 py-3 text-sm">
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="font-helvetica-now-display pt-10">
              <p>
                {product.longDescription || `Crafted from premium materials with meticulous attention to
                detail, this exclusive Studio Innate™ Long Sleeve T-Shirt
                offers comfort with its boxy and dropped shoulder fit. Made from
                100% heavyweight 240gsm cotton, each piece is finished and
                screen printed by us in-house with precision. This exclusive
                collection is designed for those who appreciate luxury,
                typography and design.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
                alias dolorum quaerat! Reprehenderit, quidem accusantium ratione
                ducimus iure, veniam labore illo, placeat unde dolor aliquid
                earum fugiat atque repellendus? Deleniti laudantium fugit
                veritatis modi provident placeat vero eos, aperiam soluta, at
                dolores! Quibusdam dolor, reiciendis sequi ipsum saepe ullam
                alias eius illum ducimus fugit possimus odit eum et voluptas
                corrupti vero fugiat in consequatur quam. Unde obcaecati itaque
                aperiam. Quasi odit fugiat hic esse dolor minus distinctio nulla
                cupiditate omnis sint nisi laboriosam, quam eum non perferendis
                soluta minima aut! Atque rerum ut veritatis ea qui voluptatem
                repudiandae tempore necessitatibus!`}
              </p>
            </div>
          </div>

          <aside className="order-2 md:order-3 md:sticky md:top-5 md:self-start">
            {hasImages && product.images[1] ? (
              <Image 
                src={product.images[1]} 
                alt={product.name} 
                width={500}
                height={500}
                className="w-full"
              />
            ) : (
              <Image src={commonAssets.images.productDetailsPlaceholder} alt="" />
            )}
          </aside>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-10 pt-20">
          {hasImages && product.images[2] ? (
            <Image
              src={product.images[2]}
              alt={product.name}
              width={800}
              height={600}
              className="w-full object-cover object-top"
            />
          ) : (
            <Image
              src={commonAssets.images.productPlaceholder}
              alt=""
              className="w-full object-cover object-top"
            />
          )}
          {hasImages && product.images[3] ? (
            <Image
              src={product.images[3]}
              alt={product.name}
              width={800}
              height={600}
              className="w-full object-cover object-top"
            />
          ) : (
            <Image
              src={commonAssets.images.productPlaceholder}
              alt=""
              className="w-full object-cover object-top"
            />
          )}
        </div>

        <div className="pt-10">
          <p className="text-3xl font-helvetica-now-display">
            Customer Reviews
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <CustomerReviewCard 
                  key={review._id}
                  text={review.comment}
                  rating={review.rating}
                  userName={review.userName}
                  date={review.date}
                />
              ))
            ) : (
              <>
                <CustomerReviewCard />
                <CustomerReviewCard />
                <CustomerReviewCard />
                <CustomerReviewCard />
                <CustomerReviewCard />
                <CustomerReviewCard />
              </>
            )}
          </div>
        </div>

        <div className="pt-10">
          <p className="text-3xl font-helvetica-now-display text-center">
            View More Products
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name}
                description={product.shortDescription}
                price={
                  typeof product.price === "string"
                    ? parseFloat(product.price.replace("$", ""))
                    : product.price
                }
                images={product.images}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
