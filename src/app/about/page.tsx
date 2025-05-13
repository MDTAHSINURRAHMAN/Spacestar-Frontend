"use client";

import commonAssets from "@/assets/commonAssets";
import Image from "next/image";
import { useGetAboutContentQuery } from "@/lib/api/aboutApi";
import Header from "@/components/Header";
import { useGetAllTextsQuery } from "@/lib/api/homeApi";
import Loader from "@/components/Loader";

// Helper function to ensure proper YouTube embed URL format
const getYouTubeEmbedUrl = (url: string) => {
  try {
    // Handle different YouTube URL formats
    let videoId = "";

    if (url.includes("youtube.com/embed/")) {
      return url; // Already in embed format
    }

    if (url.includes("youtube.com/watch?v=")) {
      videoId = new URL(url).searchParams.get("v") || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    if (!videoId) return ""; // Return empty if no valid video ID found

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
    return "";
  }
};

export default function AboutPage() {
  const { data: aboutContent, isLoading, error } = useGetAboutContentQuery();

  const { data: texts } = useGetAllTextsQuery();
  const bannerText = texts?.[0]?.text || "Shop our latest collection";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-center">Error loading content</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4 sm:mt-6 lg:mt-8 mb-24 min-h-dvh">
      <Header text={bannerText} />

      <main className="flex-grow w-full md:w-4/6 md:px-0 mx-auto relative">
        <div className="flex items-center gap-2 md:pt-6 px-4 md:px-0">
          <Image
            src={commonAssets.icons.logo}
            alt="Spacestar"
            className="w-6 sm:w-8"
          />
          <p className="text-xl sm:text-2xl text-primary font-helvetica-now-display whitespace-nowrap">
            Spacestar
          </p>
        </div>

        <div className="space-y-10 font-medium mt-4 md:mt-8 px-4 md:px-0">
          <h1 className="font-helvetica-now-display text-2xl md:text-3xl text-muted">
            {aboutContent?.brandMessage}
          </h1>

          <ul className="space-y-3 md:space-y-5 font-medium font-helvetica-now-display text-lg md:text-xl">
            {Array.isArray(aboutContent?.missionPoints) &&
              aboutContent.missionPoints.map((point, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 md:pt-20 pb-10 md:pb-20">
            {/* Iframe (YouTube video) */}
            <div className="col-span-2 w-full aspect-video">
              {aboutContent?.iframeLink ? (
                <iframe
                  src={getYouTubeEmbedUrl(aboutContent.iframeLink)}
                  title="YouTube video player"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full border-0"
                ></iframe>
              ) : null}
            </div>
            {/* Images below iframe - side by side on mobile and larger screens */}
            <div className="w-full">
              {aboutContent?.image1Url ? (
                <Image
                  width={600}
                  height={750}
                  src={aboutContent.image1Url}
                  alt="About us image 1"
                  className="object-cover w-[165px] md:w-[600px] h-[175px] md:h-[750px]"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </div>
            <div className="w-full">
              {aboutContent?.image2Url ? (
                <Image
                  width={600}
                  height={750}
                  src={aboutContent.image2Url}
                  alt="About us image 2"
                  className="object-cover w-[165px] md:w-[600px] h-[175px] md:h-[750px]"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
