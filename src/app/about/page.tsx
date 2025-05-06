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
    <div className="p-5">
      <main className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2 pt-10">
          <Image
            src={commonAssets.icons.logo}
            alt="Spacestar"
            className="max-w-6 md:w-full"
          />
          <p className="text-2xl text-primary font-helvetica-now-display whitespace-nowrap">
            Spacestar Shopping
          </p>
        </div>

        <div className="pt-10 space-y-10 font-medium">
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

          <div className="grid grid-cols-2 gap-5 md:pt-20">
            <Image
              src={selectCountryAssets.images.model}
              alt=""
              className="aspect-video object-cover object-top col-span-2 w-full"
            />
            <Image src={selectCountryAssets.images.model} alt="" />
            <Image src={selectCountryAssets.images.model} alt="" />
          </div>
        </div>
      </main>
    </div>
  );
}
