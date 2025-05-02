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
import React, { useEffect, useState } from "react";

export default function Home() {
  const [bannerText, setBannerText] = useState(
    "Pre-orders enjoy 10% off Full price item"
  );
  const [bannerImage, setBannerImage] = useState(
    commonAssets.images.placeholder
  );

  useEffect(() => {
    fetch("https://spacestar-backend-production.up.railway.app/api/banner")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.text) {
          console.log(data.text);
          setBannerText(data.text);
        }
        if (data && data.imageUrl) {
          console.log(data.imageUrl);
          setBannerImage(data.imageUrl);
        }
      })
      .catch(() => {
        // fallback to default text
      });
  }, []);

  return (
    <div className="h-dvh flex flex-col p-5">
      <Header text={bannerText} />

      <main className="flex-grow max-w-screen-xl mx-auto w-full relative">
        <aside className="absolute top-0 left-0 flex gap-3">
          <Image
            src={commonAssets.icons.logo}
            alt="Spacestar"
            className="w-8 md:w-full"
          />
          <p className="text-2xl md:text-3xl text-primary font-helvetica-now-display">
            Spacestar
          </p>
        </aside>
        <aside className="absolute right-0 translate-y-1/2 font-violet-sans uppercase">
          <ul className="space-y-3 md:space-y-5 text-right text-sm">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>WhatsApp</li>
            <li>X</li>
          </ul>
        </aside>

        <div className="max-w-screen-lg mx-auto h-full grid place-items-center">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[Autoplay({ delay: 3000 }), Fade()]}
          >
            <CarouselContent>
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <CarouselItem key={idx}>
                    <Image
                      src={bannerImage}
                      width={1000}
                      height={1000}
                      alt=""
                      className={
                        "h-[80dvh] object-contain mx-auto " +
                        (idx % 2 === 0 ? "rotate-90" : "")
                      }
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </main>

      <footer className="max-w-screen-xl mx-auto w-full justify-between font-violet-sans uppercase hidden lg:flex text-sm">
        <div>&copy; 2025 Spacestar LTD. All rights reserved.</div>
        <Link href={"/privacy-policy"}>Privacy Policy</Link>
      </footer>
    </div>
  );
}
