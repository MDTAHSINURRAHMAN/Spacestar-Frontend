"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useGetAllStoriesQuery } from "@/lib/api/storyApi";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";

export default function StoriesPage() {
  const { data: stories, isLoading: storiesLoading } = useGetAllStoriesQuery();
  const { data: texts, isLoading: textsLoading } = useGetAllTextsQuery();
  const { data: products, isLoading: productsLoading } =
    useGetAllProductsQuery();

  if (storiesLoading) {
    return <div>Loading stories...</div>;
  }

  return (
    <div className="p-5">
      <Header text={texts?.[0]?.text || ""} />
      <main className="max-w-screen-xl mx-auto pt-5 md:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <aside className="relative hidden md:block">
          {stories?.map((story) => (
              <article
                key={story._id}
                className="font-helvetica-now-display space-y-5"
              >
                {story.image && (
                  <Image
                    src={story.image}
                    alt={story.content[0]?.title || "Story image"}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </article>
            ))}
          </aside>

          <section className="space-y-20">
            {stories?.map((story) => (
              <article
                key={story._id}
                className="font-helvetica-now-display space-y-5"
              >
                {story.content.map((block, index) => (
                  <div key={index}>
                    <h1 className="text-3xl font-medium">{block.title}</h1>
                    <p className="text-lg">{block.description}</p>
                  </div>
                ))}
              </article>
            ))}
          </section>

          <section className="col-span-1 md:col-span-2 pt-32 pb-20">
            <h2 className="text-3xl font-medium mb-10">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:flex-grow md:items-center">
              {productsLoading ? (
                <div>Loading products...</div>
              ) : (
                products
                  ?.slice(0, 3)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
