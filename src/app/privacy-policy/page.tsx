"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useGetAllPrivacyQuery } from "@/lib/api/privacyApi";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { TipTapContent } from "@/types/privacy";
import { CustomTextStyle } from "@/components/TextStyle";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import Loader from "@/components/Loader";

export default function PrivacyPolicy() {
  const {
    data: privacies,
    isLoading: privaciesLoading,
    error: privaciesError,
  } = useGetAllPrivacyQuery();
  const { data: texts } = useGetAllTextsQuery();

  useEffect(() => {}, [privacies, privaciesLoading, privaciesError]);

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
          bold: {
            HTMLAttributes: {
              class: "font-bold",
            },
          },
        }),
        CustomTextStyle,
        Color.configure(),
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

      return (
        <div
          className="space-y-6 text-[1.3rem] [&_p]:mb-6 [&_strong]:font-bold [&_em]:italic [&_p:empty]:h-6 [&_*]:transition-colors prose prose-lg"
          style={{ wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (error) {
      console.error("Error rendering Tiptap content:", error);
      return <div>Error rendering content</div>;
    }
  };

  if (privaciesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (privaciesError) {
    return (
      <div className="p-5">
        <Header text={texts?.[0]?.text || ""} />
        <main className="max-w-screen-xl mx-auto pt-5 md:pt-32">
          <div className="text-red-500">
            Error loading privacy content: {JSON.stringify(privaciesError)}
          </div>
        </main>
      </div>
    );
  }

  if (!privacies || privacies.length === 0) {
    return (
      <div className="p-5">
        <Header text={texts?.[0]?.text || ""} />
        <main className="max-w-screen-xl mx-auto pt-5 md:pt-32">
          <div className="text-center">
            <p className="text-xl text-gray-600">
              No privacy content available
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4 sm:mt-6 lg:mt-8 mb-24 min-h-dvh">
      <Header text={texts?.[0]?.text || ""} />
      <main className="flex-grow w-4/6 mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-10">
          <aside className="relative hidden md:block">
            {privacies.map((privacy) => (
              <article
                key={privacy._id}
                className="font-helvetica-now-display space-y-5"
              >
                {privacy.image && (
                  <Image
                    src={privacy.image}
                    alt="Privacy policy image"
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
            {privacies.map((privacy) => (
              <article
                key={privacy._id}
                className="font-helvetica-now-display space-y-5"
              >
                {renderTiptapContent(privacy.content)}
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
