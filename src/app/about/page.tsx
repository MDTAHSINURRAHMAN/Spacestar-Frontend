import commonAssets from "@/assets/commonAssets";
import Image from "next/image";
import selectCountryAssets from "../select-country/assets";

export default function AboutPage() {
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
            <span className="text-black">
              Space Star is more than a clothing brand—
            </span>
            it’s a movement for those who dare to be different. We envision a
            world where fashion is not just about trends but about storytelling,
            individuality, and limitless creativity.
          </h1>

          <ul className="space-y-3 md:space-y-5 font-medium font-helvetica-now-display text-lg md:text-xl">
            <li className="flex items-baseline gap-3">
              <span>
                <Image
                  src={commonAssets.icons.star}
                  className="min-w-[1rem]"
                  alt=""
                />
              </span>
              To craft high-quality, luxury apparel that blends artistry,
              innovation, and timeless style.
            </li>
            <li className="flex items-baseline gap-3">
              <span>
                <Image
                  src={commonAssets.icons.star}
                  className="min-w-[1rem]"
                  alt=""
                />
              </span>
              To create fashion that resonates with creative professionals,
              artists, and visionaries.
            </li>
            <li className="flex items-baseline gap-3">
              <span>
                <Image
                  src={commonAssets.icons.star}
                  className="min-w-[1rem]"
                  alt=""
                />
              </span>
              To push the boundaries of design by combining Bangladeshi
              craftsmanship with futuristic aesthetics.
            </li>
            <li className="flex items-baseline gap-3">
              <span>
                <Image
                  src={commonAssets.icons.star}
                  className="min-w-[1rem]"
                  alt=""
                />
              </span>
              To build a global creative community, connecting like-minded
              individuals through fashion.
            </li>
            <li className="flex items-baseline gap-3">
              <span>
                <Image
                  src={commonAssets.icons.star}
                  className="min-w-[1rem]"
                  alt=""
                />
              </span>
              To prioritize sustainability, ethical production, and premium
              materials.
            </li>
          </ul>

          <div className="font-helvetica-now-display space-y-5 text-xl hidden md:block">
            <h2 className="text-3xl ">Contact Us</h2>
            <p>For any privacy-related inquiries, feel free to contact us</p>
            <ul>
              <li>📧 Email: support@[yourbrand].com</li>
              <li>📍 Address: [Your Business Address]</li>
              <li>📞 Phone: [Your Contact Number]</li>
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
