import Image from "next/image";
import selectCountryAssets from "./assets";
import commonAssets from "@/assets/commonAssets";

export default function SelectCountry() {
  return (
    <div className="h-dvh grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2">
      <aside className="overflow-hidden">
        <Image
          src={selectCountryAssets.images.model}
          alt=""
          className="md:h-dvh object-cover object-top"
        />
      </aside>

      <main className="grid place-items-center p-5">
        <div className="space-y-5 text-center">
          <h1 className="font-helvetica-now-display text-3xl text-primary flex justify-center items-center gap-3">
            <Image src={commonAssets.icons.logo} alt="Spacestar" />
            Spacestar
          </h1>
          <p className="font-helvetica-now-display uppercase font-medium text-xl md:text-3xl">
            Select your location
          </p>

          <div className="space-y-3">
            <button className="w-full px-10 py-5 bg-black font-violet-sans text-sm text-white flex justify-center gap-3">
              <Image src={selectCountryAssets.icons.uaeFlag} alt="" />
              United Arab Emirates
            </button>
            <button className="w-full px-10 py-5 bg-secondary font-violet-sans text-sm flex justify-center gap-3">
              <Image src={selectCountryAssets.icons.bdFlag} alt="" />
              Bangladesh
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
