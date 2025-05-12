"use client";

import commonAssets from "@/assets/commonAssets";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useState } from "react";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";

export default function ShoppingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: texts } = useGetAllTextsQuery();
  const bannerText = texts?.[0]?.text || "Shop our latest collection";

  // Query for filtered products
  const { data: products = [], isLoading } = useGetAllProductsQuery(
    selectedCategory ? { category: selectedCategory } : {}
  );
  // Query for all products (unfiltered) to get all categories
  const { data: allProducts = [] } = useGetAllProductsQuery({});

  // Always show all categories from the unfiltered product list
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ].sort();

  // If more than 5 categories, always use dropdown
  const useDropdown = categories.length > 5;

  if (isLoading) {
    return (
      <div className="flex flex-col px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8 min-h-dvh">
        <Header text={bannerText} />
        <div className="flex justify-center items-center flex-grow">
          <p className="text-2xl font-helvetica-now-display">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 sm:mt-6 lg:mt-8 mb-24 min-h-dvh">
      <Header text={bannerText} />

      {/* Categories dropdown for mobile (below md) */}
      <div className="block md:hidden mb-8">
        <Popover>
          <PopoverTrigger asChild>
            <button className="border border-black px-4 py-2 uppercase font-violet-sans text-xs bg-white w-full">
              {selectedCategory || "All"}
              <span className="ml-2">▼</span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0 w-full max-w-xs">
            <ul className="font-violet-sans text-xs uppercase">
              <li>
                <button
                  className={`w-full text-left font-violet-sans uppercase px-4 py-2 border-b border-gray-200 ${selectedCategory === null ? "bg-black text-white" : ""}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={`w-full text-left font-violet-sans uppercase px-4 py-2 border-b border-gray-200 ${selectedCategory === category ? "bg-black text-white" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      <main className="flex-grow w-full lg:w-4/5 xl:w-3/4 mx-auto relative pt-2">
        <div className="flex justify-between items-center pb-5 pt-3 md:pt-0">
          <aside className="flex items-center gap-1 sm:gap-2">
            <Image
              src={commonAssets.icons.logo}
              alt="Spacestar"
              className="w-6 sm:w-8 md:w-12"
            />
            <p className="text-xl sm:text-2xl md:text-3xl text-primary font-helvetica-now-display">
              Spacestar Shopping
            </p>
          </aside>

          {/* Categories grid for md and up, unless useDropdown is true */}
          <section className="hidden md:flex justify-end items-center">
            {useDropdown ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="border border-black px-4 py-2 uppercase font-violet-sans text-xs bg-white">
                    {selectedCategory || "All"}
                    <span className="ml-2">▼</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="p-0 w-48">
                  <ul className="font-violet-sans text-xs uppercase">
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 border-b border-gray-200 ${selectedCategory === null ? "bg-black text-white" : ""}`}
                        onClick={() => setSelectedCategory(null)}
                      >
                        All
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className={`w-full text-left px-4 py-2 border-b border-gray-200 ${selectedCategory === category ? "bg-black text-white" : ""}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="grid grid-cols-6 gap-2 font-violet-sans text-xs w-full max-w-xl">
                <button
                  key="all"
                  className={`w-full border border-black px-2 whitespace-nowrap uppercase h-full py-1 ${selectedCategory === null ? "bg-black text-white" : ""}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`w-full border border-black px-2 whitespace-nowrap uppercase h-full py-1 ${selectedCategory === category ? "bg-black text-white" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:flex-grow md:items-center mt-10">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
