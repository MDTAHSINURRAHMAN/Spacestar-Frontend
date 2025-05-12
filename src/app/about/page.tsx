"use client";

import commonAssets from "@/assets/commonAssets";
import Image from "next/image";
import selectCountryAssets from "../select-country/assets";
import { useGetAboutContentQuery } from "@/lib/api/aboutApi";

export default function AboutPage() {
  const { data: aboutContent, isLoading, error } = useGetAboutContentQuery();

  if (isLoading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-center">Error loading content</div>;
  }

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 mt-4 relative min-h-screen mb-8 lg:mb-16">

      <main className="flex-grow w-full lg:w-4/5 xl:w-3/4 mx-auto relative z-10">
        <div className="flex items-center gap-2 pt-10">
          <Image
            src={commonAssets.icons.logo}
            alt="Spacestar"
            className="w-6 sm:w-8 md:w-12"
          />
          <p className="text-xl sm:text-2xl md:text-3xl text-primary font-helvetica-now-display whitespace-nowrap">
            Spacestar
          </p>
        </div>

        <div className="space-y-10 font-medium mt-8">
          <h1 className="font-helvetica-now-display text-2xl md:text-3xl text-muted">
            {aboutContent?.brandMessage}
          </h1>

          <ul className="space-y-3 md:space-y-5 font-medium font-helvetica-now-display text-lg md:text-xl">
            {aboutContent?.missionPoints.map((point, index) => (
              <li key={index} className="flex items-baseline gap-3">
                <span>
                  <Image
                    src={commonAssets.icons.star}
                    className="min-w-[1rem]"
                    alt=""
                  />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="font-helvetica-now-display space-y-5 text-xl hidden md:block">
            <h2 className="text-3xl">Contact Us</h2>
            <p>For any privacy-related inquiries, feel free to contact us</p>
            <ul>
              <li>📧 Email: {aboutContent?.email}</li>
              <li>📍 Address: {aboutContent?.address}</li>
              <li>📞 Phone: {aboutContent?.phone}</li>
            </ul>
          </div>

          {/* Responsive grid: first item is iframe, below are two images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:pt-20">
            {/* Iframe (YouTube video) */}
            <div className="col-span-1 md:col-span-2 w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/IISQ-flx4tI?si=NKHAK7wnWzkCwuLj"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
            {/* Images below iframe - side by side on mobile and larger screens */}
            <div className="w-full">
              <Image
                width={1000}
                height={1000} 
                src={selectCountryAssets.images.model}
                alt=""
                className="w-full object-cover object-top" // Made taller with 4:3 aspect ratio
              />
            </div>
            <div className="w-full">
              <Image
                width={1000}
                height={1000}
                src={selectCountryAssets.images.model}
                alt=""
                className="w-full object-cover object-top" // Made taller with 4:3 aspect ratio
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
