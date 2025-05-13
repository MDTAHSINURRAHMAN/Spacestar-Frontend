"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useGetAllStoriesQuery } from "@/lib/api/storyApi";
import { useGetAllProductsQuery } from "@/lib/api/productApi";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { TipTapContent } from "@/types/story";
import { CustomTextStyle } from "@/components/TextStyle";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import Loader from "@/components/Loader";
import commonAssets from "@/assets/commonAssets";

export default function StoriesPage() {
  const {
    data: stories,
    isLoading: storiesLoading,
    error: storiesError,
  } = useGetAllStoriesQuery();
  const { data: texts } = useGetAllTextsQuery();
  const { data: products, isLoading: productsLoading } = useGetAllProductsQuery(
    {}
  );

  useEffect(() => {}, [stories, storiesLoading, storiesError]);

  const renderTiptapContent = (content: TipTapContent | string) => {
    try {
      const parsedContent =
        typeof content === "string" ? JSON.parse(content) : content;

      const html = generateHTML(parsedContent, [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
          bulletList: {
            keepMarks: true,
            keepAttributes: true,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: true,
          },
        }),
        CustomTextStyle,
        Color,
        Highlight.configure({
          multicolor: true,
        }),
        Underline,
        Link.configure({
          openOnClick: true,
          HTMLAttributes: {
            class: "text-primary hover:underline",
          },
        }),
        Typography,
      ]);

      console.log("Generated HTML:", html);

      return (
        <div
          className="space-y-6 text-[1.3rem] [&_p]:mb-6 [&_strong]:text-black [&_em]:italic [&_p:empty]:h-6 [&_*]:transition-colors prose prose-lg max-w-none [&_span[style*=color]]:!text-[var(--tiptap-color)]"
          style={{
            "--tiptap-color": "inherit",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (error) {
      console.error("Error rendering Tiptap content:", error);
      return <div>Error rendering content</div>;
    }
  };

  if (storiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (storiesError) {
    return (
      <div className="p-5">
        <Header text={texts?.[0]?.text || ""} />
        <main className="max-w-screen-xl mx-auto pt-5 md:pt-32">
          <div className="text-red-500">
            Error loading stories: {JSON.stringify(storiesError)}
          </div>
        </main>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="p-5">
        <Header text={texts?.[0]?.text || ""} />
        <main className="max-w-screen-xl mx-auto pt-5 md:pt-32">
          <div className="text-center">
            <p className="text-xl text-gray-600">No stories available</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4 sm:mt-6 lg:mt-8 mb-24 min-h-dvh">
      <Header text={texts?.[0]?.text || ""} />   
      <main className="flex-grow w-full md:w-4/6 mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 md:pt-6 px-4 md:px-0">
        <div className="md:hidden flex items-center gap-2 md:pt-6">
          <Image
            src={commonAssets.icons.logo}
            alt="Spacestar"
            className="w-6 sm:w-8"
          />
          <p className="text-xl sm:text-2xl text-primary font-helvetica-now-display whitespace-nowrap">
            Spacestar
          </p>
        </div>
          <aside className="hidden md:block sticky top-8 h-fit">
            {stories.map((story) => (
              <article
                key={story._id}
                className="font-helvetica-now-display space-y-5"
              >
                {story.image && (
                  <Image
                    src={story.image}
                    alt="Story image"
                    width={595}
                    height={610}
                    className="w-full h-auto rounded-lg object-cover"
                    priority
                  />
                )}
              </article>
            ))}
          </aside>

          <section className="space-y-20">
            {stories.map((story) => (
              <article
                key={story._id}
                className="font-helvetica-now-display space-y-5"
              >
                {renderTiptapContent(story.content)}
              </article>
            ))}
          </section>
        </div>

        <section className="col-span-1 md:col-span-2 pt-10 md:pt-36 pb-10 md:pb-20 px-4 md:px-0">
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
      </main>
    </div>
  );
}
