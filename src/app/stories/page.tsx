import commonAssets from "@/assets/commonAssets";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function StoriesPage() {
  return (
    <div className="p-5">
      <Header />
      <main className="max-w-screen-xl mx-auto pt-5 md:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <aside className="relative hidden md:block">
            <Image
              src={commonAssets.images.logoLg}
              alt=""
              className="sticky top-20"
            />
          </aside>

          <section className="space-y-20">
            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                The Spark: Born from Creativity
              </h1>
              <p className="text-lg">
                Space Star was created for those who think differently, who see
                fashion as more than just clothing—it&apos;s an expression of
                art.
              </p>

              <div>
                <p className="text-lg">
                  I started Space Star because I believe creativity deserves a
                  canvas, and fashion is one of the most powerful ways to
                  express it.
                </p>

                <p className="text-lg font-semibold pt-2">
                  Muhammad Shyed Hassain
                  <span className="text-sm font-normal block">
                    Founder and designer
                  </span>
                </p>
              </div>
            </article>
            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                Designed for the Bold & Visionary
              </h1>
              <p className="text-lg">
                Space Star is not just a brand—it’s a movement for those who
                push boundaries.
              </p>

              <p className="text-lg">
                Our pieces are designed for creative minds—artists, designers,
                musicians, and innovators.
              </p>
              <p className="text-lg">
                Every stitch, fabric, and cut is meant to inspire confidence and
                originality.
              </p>
            </article>
            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                Made in Bangladesh, Inspired by the World
              </h1>
              <p className="text-lg">
                Our roots are in Bangladesh, a land of rich culture,
                craftsmanship, and innovation.
              </p>

              <p className="text-lg">
                We take inspiration from global art, space aesthetics, and
                futuristic fashion trends.
              </p>
              <p className="text-lg">
                Our artisans and designers work with passion to create pieces
                that stand out.
              </p>
            </article>
            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                The Journey of Space Star
              </h1>
              <p className="text-lg">
                From an idea to a growing brand, our story is just beginning.
              </p>

              <p className="text-lg">
                First collection → First 100 customers → First international
                reach.
              </p>
              <p className="text-lg">
                We&apos;re not just selling clothes; we&apos;re building a
                creative community.
              </p>
            </article>
            <article className="font-helvetica-now-display space-y-5">
              <h1 className="text-3xl font-medium">
                The Future: Creativity Has No Limits
              </h1>
              <p className="text-lg">
                Space Star is more than a brand—it&aopos;s a platform for
                creative expression.
              </p>

              <p className="text-lg">
                Upcoming collaborations with artists, designers, and
                visionaries.
              </p>
              <p className="text-lg">
                The universe is infinite, and so is creativity. Let’s create
                something extraordinary together.”
              </p>
            </article>
          </section>

          <section className="col-span-1 md:col-span-2 pt-32 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:flex-grow md:items-center">
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
