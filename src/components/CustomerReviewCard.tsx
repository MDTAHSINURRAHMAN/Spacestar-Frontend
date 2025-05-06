import commonAssets from "@/assets/commonAssets";
import Image, { StaticImageData } from "next/image";

interface CustomerReviewCardProps {
  text?: string;
  rating?: string | number;
  userName?: string;
  date?: string;
  image?: string | StaticImageData;
}

const CustomerReviewCard = ({
  text,
  rating = 5,
  userName = "Abdullah Fahim",
  date = "19/04/2025",
  image = commonAssets.images.productPlaceholder,
}: CustomerReviewCardProps) => {
  return (
    <article>
      <div>
        <Image
          src={image}
          alt={`Review by ${userName}`}
          width={400}
          height={300}
          className="aspect-[4/3] object-cover object-top w-full"
        />
      </div>

      <div className="pt-3 flex justify-between items-baseline">
        <div>
          <p className="text-lg font-helvetica-now-display leading-tight">
            {userName}
          </p>
          <span className="text-xs font-violet-sans">
            ✅ Verified Buyer ({date})
          </span>
        </div>

        <p className="font-helvetica-now-display text-lg flex items-center gap-1">
          <Image
            src={commonAssets.icons.reviewStar}
            alt="Rating star"
            width={20}
            height={20}
          />
          {rating} Star
        </p>
      </div>

      <div className="pt-3 text-sm font-violet-sans">
        {text ||
          "Be wary of cheap synthetics. While some synthetic blends can be durable, 100% polyester tees often don't breathe well and can wear out quickly. Choosing a more durable and naturally breathable fabric, such as Organic Cotton, can lead to t-shirts"}
      </div>
    </article>
  );
};

export default CustomerReviewCard;
