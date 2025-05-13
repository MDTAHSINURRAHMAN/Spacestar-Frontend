"use client";

import commonAssets from "@/assets/commonAssets";
import CustomerReviewCard from "@/components/CustomerReviewCard";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";
import {
  useGetAllProductsQuery,
  useGetProductQuery,
} from "@/lib/api/productApi";
import { useGetProductReviewsQuery } from "@/lib/api/reviewApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "@/lib/features/cartSlice";
import { RootState } from "@/lib/store";

export default function SingleProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const { data: texts } = useGetAllTextsQuery();
  const bannerText = texts?.[0]?.text || "Shop our latest collection";

  const { data: product, isLoading: productLoading } = useGetProductQuery(id);
  const { data: reviews = [] } = useGetProductReviewsQuery(id);
  const { data: allProducts } = useGetAllProductsQuery({});

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
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
  const formattedPrice = `$${product.price}`;

  const handleAddToCart = () => {
    // Check if product is already in cart
    const isInCart = cart.items.some((item) => item.productId === id);
    if (isInCart) {
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      image: product.images[0] || "",
      size: selectedSize || "M",
      availableSizes: product.sizes,
      color: selectedColor || "W",
      availableColors: product.colors,
      quantity: 1,
      price: product.price,
    };

    // Add to local Redux store
    dispatch(addToCartAction(cartItem));
  };

  // Get 3 random related products that are not the current one
  const relatedProducts = allProducts
    ? allProducts
        .filter((p) => p._id !== id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
    : [];

  const scrollToSizeChart = (e: React.MouseEvent) => {
    e.preventDefault();
    const sizeChart = document.getElementById("size-chart");
    if (sizeChart) {
      sizeChart.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 mt-4 relative min-h-screen mb-8 lg:mb-16">
      <Header text={bannerText} />
      <div className="flex md:hidden justify-start gap-3 mb-5">
        <Image src={commonAssets.icons.logo} alt="Spacestar" className="w-8" />
        <p className="text-2xl md:text-3xl text-primary font-helvetica-now-display">
          Spacestar
        </p>
      </div>
      <main className="max-w-screen-xl mx-auto relative z-10 w-full ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
          <aside className="order-1 md:sticky md:top-5 md:self-start mt-4">
            {hasImages && product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                width={470}
                height={690}
                className="object-cover"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Image
                src={commonAssets.images.productDetailsPlaceholder}
                alt=""
              />
            )}
          </aside>

          <div className="order-3 md:order-2 px-2">
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

            <div className="text-center pt-10">
              <h1 className="font-helvetica-now-display text-3xl md:text-4xl lg:text-6xl font-medium">
                {product.name}
              </h1>
              <p className="font-violet-sans uppercase text-sm lg:text-base pt-3">
                {product.shortDescription}
              </p>
            </div>

            <div className="text-center mt-5 md:mt-7">
              <h2 className="font-helvetica-now-display text-primary-dark text-3xl">
                {formattedPrice}
              </h2>

              <div className="text-xs font-violet-sans uppercase pt-5">
                <p>Design By {product.designer || "Shyed"}</p>
                <ul className="flex gap-x-3 flex-wrap justify-center pt-3 text-xs">
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
                    product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`${size === selectedSize ? "text-primary" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
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
                    product.colors.map((color) => (
                      <button
                        key={color}
                        className={`${color === selectedColor ? "text-primary" : ""}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))
                  ) : (
                    <>
                      <li>B</li>
                      <li>W</li>
                    </>
                  )}
                </ul>
              </div>

              <button
                onClick={scrollToSizeChart}
                className="text-primary text-xs font-violet-sans uppercase block underline pt-5 mx-auto"
              >
                Size Guide
              </button>

              <div className="pt-5">
                <button
                  onClick={handleAddToCart}
                  className="bg-primary font-violet-sans uppercase text-white px-10 py-3 text-sm"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="font-helvetica-now-display text-sm pt-10 max-w-full break-words">
              <p className="whitespace-pre-line">
                {product.longDescription ||
                  `Crafted from premium materials with meticulous attention to
                detail, this exclusive Studio Innate™ Long Sleeve T-Shirt
                offers comfort with its boxy and dropped shoulder fit. Made from
                100% heavyweight 240gsm cotton, each piece is finished and
                screen printed by us in-house with precision. This exclusive
                collection is designed for those who appreciate luxury,
                typography and design.`}
              </p>
            </div>

            {/* Chart Image Scrollable Section */}
            {product.chartImage && (
              <div id="size-chart" className="w-full overflow-x-auto mt-10">
                <div className="min-w-[400px] max-w-full">
                  <Image
                    src={product.chartImage}
                    alt="Size Chart"
                    width={800}
                    height={500}
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>
            )}
          </div>

          <aside className="order-2 md:order-3 md:sticky md:top-5 md:self-start mt-4">
            {hasImages && product.images[1] ? (
              <Image
                src={product.images[1]}
                alt={product.name}
                width={470}
                height={690}
                className="object-cover"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Image
                src={commonAssets.images.productDetailsPlaceholder}
                alt=""
              />
            )}
          </aside>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-10 pt-14 w-4/6 mx-auto">
          {hasImages && product.images[2] ? (
            <Image
              src={product.images[2]}
              alt={product.name}
              width={470}
              height={690}
              className="object-cover"
              style={{ objectFit: "cover" }}
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
              width={470}
              height={690}
              className="object-cover"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src={commonAssets.images.productPlaceholder}
              alt=""
              className="w-full object-cover object-top"
            />
          )}
        </div>

        <div className="pt-14">
          <p className="text-3xl font-helvetica-now-display">Customer Stores</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {reviews.length > 0 ? (
              <>
                {reviews.map((review) => (
                  <CustomerReviewCard
                    key={review._id}
                    image={review.imageUrl || review.image}
                    text={review.review}
                    rating={review.rating}
                    userName={review.name}
                    date={new Date(review.createdAt).toLocaleDateString()}
                  />
                ))}
              </>
            ) : (
              <p className="text-center col-span-3 py-5 font-violet-sans">
                No reviews yet
              </p>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="pt-14 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
