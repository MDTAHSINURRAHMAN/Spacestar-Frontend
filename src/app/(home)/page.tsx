"use client";

import commonAssets from "@/assets/commonAssets";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";
import { useGetBannerQuery } from "@/lib/api/bannerApi";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";

export default function Home() {
  const { data: banner, isLoading } = useGetBannerQuery();
  const { data: texts } = useGetAllTextsQuery();
  const bannerImage = banner?.imageUrl || commonAssets.images.placeholder;

  return (
    <div className="flex flex-col mt-4 sm:mt-6 lg:mt-8">
      <Header text={texts?.[0]?.text || ""} />

      {/* Social links top right */}
      <aside className="absolute top-1/4 -translate-y-1/2 right-0 flex flex-col items-end z-30 mt-2 lg:mr-16 xl:mr-24 font-violet-sans uppercase">
          <ul className="space-y-2 sm:space-y-3 md:space-y-5 text-right text-xs sm:text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">
              Instagram
            </li>
            <li className="hover:text-primary cursor-pointer transition-colors">
              Facebook
            </li>
            <li className="hover:text-primary cursor-pointer transition-colors">
              WhatsApp
            </li>
            <li className="hover:text-primary cursor-pointer transition-colors">
              Twitter
            </li>
          </ul>
        </aside>

      <main className="flex-grow w-full lg:w-4/5 xl:w-3/4 mx-auto relative min-h-[70vh] flex flex-col justify-center">
        {/* Logo and brand name top left */}
        <aside className="absolute top-0 left-0 flex items-center gap-1 sm:gap-2 z-30">
          <Image
            src={commonAssets.icons.logo}
            alt="Spacestar"
            className="w-6 sm:w-8 md:w-12"
          />
          <p className="text-xl sm:text-2xl md:text-3xl text-primary font-helvetica-now-display">
            Spacestars
          </p>
        </aside>
        
        {/* Product image with overlayed text */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[50dvh] sm:min-h-[60dvh] md:min-h-[70dvh] lg:min-h-[80dvh]">
          {isLoading ? (
            <div className="h-[50dvh] sm:h-[60dvh] md:h-[70dvh] lg:h-[80dvh] w-full animate-pulse bg-gray-200 rounded-lg" />
          ) : (
            <Image
              src={bannerImage}
              width={1000}
              height={1000}
              alt="Carousel image"
              className="h-[50dvh] sm:h-[60dvh] md:h-[70dvh] lg:h-[80dvh] object-contain mx-auto z-10"
              priority
            />
          )}
          {/* Overlayed Space Stars text */}
          <div className="absolute inset-0 flex flex-col justify-end items-center pointer-events-none z-20">
            <div className="flex flex-row items-center justify-center w-full gap-2 sm:gap-4 mb-4 sm:mb-8">
              <span className="font-inter text-[10px] xs:text-xs sm:text-sm md:text-base uppercase text-black/80 lg:mr-8 whitespace-nowrap">
                MEET
              </span>
              <span className="font-recoleta text-3xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[11.5rem] text-primary text-center leading-none drop-shadow-lg whitespace-nowrap">
                Space-Stars
              </span>
              <span className="font-inter text-[10px] xs:text-xs sm:text-sm md:text-base uppercase text-black/80 lg:ml-8 whitespace-nowrap">
                by: SHYED
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-screen-xl mx-auto w-full py-4 sm:py-6 lg:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 font-violet-sans uppercase text-xs sm:text-sm">
          <div className="text-center sm:text-left">
            &copy; 2025 Spacestar LTD. All rights reserved.
          </div>
          <Link
            href={"/privacy-policy"}
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
