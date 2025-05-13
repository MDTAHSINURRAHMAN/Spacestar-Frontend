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
import Loader from "@/components/Loader";
import { ChevronDown } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4 sm:mt-6 lg:mt-8 mb-24 min-h-dvh">
      <Header text={bannerText} />

      <main className="flex-grow w-full md:w-4/6 mx-auto relative">
        <div className="flex flex-col md:flex-row justify-center md:pt-6 px-4 md:px-0">
          <aside className="flex items-center gap-1 sm:gap-2">
            <Image
              src={commonAssets.icons.logo}
              alt="Spacestar"
              className="w-6 sm:w-8"
            />
            <p className="text-xl sm:text-2xl text-primary font-helvetica-now-display whitespace-nowrap">
              Spacestar Shopping
            </p>
          </aside>

          <div className="block md:hidden w-full pt-4">
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full border border-black py-2 uppercase font-violet-sans text-start px-4 text-xs bg-white flex justify-between items-center">
                  {selectedCategory || "ALL PRODUCT"}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[calc(100vw-2rem)] md:w-[18.2rem]">
                <ul className="font-violet-sans text-xs uppercase w-full">
                  <li className="w-full">
                    <button
                      className={`w-full text-left font-violet-sans uppercase px-4 py-2 border-b border-gray-200 ${selectedCategory === null ? "bg-black text-white" : ""}`}
                      onClick={() => setSelectedCategory(null)}
                    >
                      ALL PRODUCT
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category} className="w-full">
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

          {/* Categories grid for md and up, unless useDropdown is true */}
          <section className="hidden md:block ml-auto font-violet-sans text-xs">
            {useDropdown ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="border border-black px-4 py-4 uppercase font-violet-sans text-xs bg-white flex items-center gap-2">
                    {selectedCategory || "All"}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="p-0 w-48">
                  <ul className="font-violet-sans text-xs uppercase">
                    <li>
                      <button
                        className={`w-full text-left px-4 py-4 border-b border-gray-200 ${selectedCategory === null ? "bg-black text-white" : ""}`}
                        onClick={() => setSelectedCategory(null)}
                      >
                        All
                      </button>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className={`w-full text-left px-4 py-4 border-b border-gray-200 ${selectedCategory === category ? "bg-black text-white" : ""}`}
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
              <div className="flex items-center gap-2 font-violet-sans text-xs justify-end">
                <button
                  key="all"
                  className={`w-full border border-black px-7 whitespace-nowrap uppercase h-full py-1 ${selectedCategory === null ? "bg-black text-white" : ""}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`w-full border border-black px-7 whitespace-nowrap uppercase h-full py-1 ${selectedCategory === category ? "bg-black text-white" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:flex-grow md:items-center mt-4 md:mt-8 px-4 md:px-0 pb-10 md:pb-20">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
