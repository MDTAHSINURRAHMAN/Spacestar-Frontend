"use client";

import commonAssets from "@/assets/commonAssets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";
import { useGetBannerQuery } from "@/lib/api/bannerApi";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";

export default function Home() {
  const { data: banner, isLoading } = useGetBannerQuery();
  const { data: texts, isLoading: textsLoading } = useGetAllTextsQuery();
  const bannerImage = banner?.imageUrl || commonAssets.images.placeholder;

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8">
      <Header text={texts?.[0]?.text || ""} />

      {/* Left shadow-like rectangle (hidden on mobile) */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-1/6 w-24 sm:w-32 lg:w-56 bg-gray-300 opacity-60 z-0" />
      {/* Right shadow-like rectangle (hidden on mobile) */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-1/6 w-24 sm:w-32 lg:w-56 bg-gray-300 opacity-60 z-0" />

      <main className="flex-grow w-full lg:w-4/5 xl:w-3/4 mx-auto relative">
        <aside className="absolute top-0 left-0 flex items-center gap-1 sm:gap-2">
          <Image
            src={commonAssets.icons.logo}
            alt="Spacestar"
            className="w-6 sm:w-8 md:w-12"
          />
          <p className="text-xl sm:text-2xl md:text-3xl text-primary font-helvetica-now-display">
            Spacestar
          </p>
        </aside>
        <aside className="absolute right-0 translate-y-1/2 font-violet-sans uppercase">
          <ul className="space-y-2 sm:space-y-3 md:space-y-5 text-right text-xs sm:text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">Instagram</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Facebook</li>
            <li className="hover:text-primary cursor-pointer transition-colors">WhatsApp</li>
            <li className="hover:text-primary cursor-pointer transition-colors">X</li>
          </ul>
        </aside>

        <div className="max-w-screen-lg mx-auto h-full grid place-items-center mb-8 sm:mb-10 lg:mb-12">
          <Carousel
            // opts={{
            //   loop: true,
            // }}
            // plugins={[Autoplay({ delay: 3000 }), Fade()]}
            className="w-full"
          >
            <CarouselContent>
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <CarouselItem key={idx}>
                    {isLoading ? (
                      <div className="h-[50dvh] sm:h-[60dvh] md:h-[70dvh] lg:h-[80dvh] w-full animate-pulse bg-gray-200 rounded-lg" />
                    ) : (
                      <Image
                        src={bannerImage}
                        width={1000}
                        height={1000}
                        alt="Carousel image"
                        className={
                          "h-[50dvh] sm:h-[60dvh] md:h-[70dvh] lg:h-[80dvh] object-contain mx-auto "
                        }
                        priority={idx === 0}
                      />
                    )}
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* MEET | Space Stars | by syed row - floating above navbar */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-10 lg:bottom-12 w-full max-w-screen-lg px-2 flex flex-col items-center pointer-events-none z-20">
          <div className="flex flex-row justify-center items-center w-full gap-2 sm:gap-4">
            <span className="font-inter text-[10px] xs:text-xs sm:text-sm md:text-base uppercase">
              MEET
            </span>
            <span className="font-recoleta text-xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl text-primary text-center leading-none">
              Space-Stars
            </span>
            <span className="font-inter text-[10px] xs:text-xs sm:text-sm md:text-base uppercase">
              by: syed
            </span>
          </div>
        </div>
      </main>

      <footer className="max-w-screen-xl mx-auto w-full py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 font-violet-sans uppercase text-xs sm:text-sm">
          <div className="text-center sm:text-left">&copy; 2025 Spacestar LTD. All rights reserved.</div>
          <Link href={"/privacy-policy"} className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
