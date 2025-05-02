"use client";

import commonAssets from "@/assets/commonAssets";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

async function getProducts() {
  const res = await fetch(
    "https://spacestar-backend-production.up.railway.app/api/products",
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default function ShoppingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [bannerText, setBannerText] = useState("Shop our latest collection");

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      setProducts(data);
      // Get unique categories and sort them
      const uniqueCategories = [
        ...new Set(data.map((product) => product.category)),
      ].sort();
      setCategories(uniqueCategories);
    });
  }, []);

  const filteredProducts = selectedCategory
  ? products.filter((product) => product.category === selectedCategory)
  : products;

  return (
    <div className="p-5 min-h-dvh flex flex-col">
      <Header text={bannerText} />

      <main className="max-w-screen-xl mx-auto flex-grow flex flex-col pt-10">
        <div className="flex justify-between flex-wrap md:flex-nowrap gap-x-10 items-stretch pb-5">
          <div className="flex items-center gap-2">
            <Image
              src={commonAssets.icons.logo}
              alt="Spacestar"
              className="max-w-6 md:w-full"
            />
            <p className="text-2xl text-primary font-helvetica-now-display whitespace-nowrap">
              Spacestar Shopping
            </p>
          </div>

          <div className="hidden md:grid grid-cols-6 gap-2 font-violet-sans text-xs pt-3 md:pt-0">
            <button
              key="all"
              className={`w-full border border-black px-2 whitespace-nowrap uppercase h-full py-1 ${
                selectedCategory === null ? "bg-primary text-white" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full border border-black px-2 whitespace-nowrap uppercase h-full py-1 ${
                  selectedCategory === category ? "bg-primary text-white" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:flex-grow md:items-center">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={
                typeof product.price === "string"
                  ? parseFloat(product.price)
                  : product.price
              }
              images={product.images}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
