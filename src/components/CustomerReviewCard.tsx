import commonAssets from "@/assets/commonAssets";
import Image from "next/image";

interface CustomerReviewCardProps {
  text?: string;
  rating?: number;
  userName?: string;
  date?: string;
}

const CustomerReviewCard = ({ text, rating = 5, userName = "Abdullah Fahim", date = "19/04/2025" }: CustomerReviewCardProps) => {
  return (
    <article>
      <div>
        <Image
          src={commonAssets.images.productPlaceholder}
          alt=""
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

        <p className="font-helvetica-now-display text-lg flex gap-1">
          <Image src={commonAssets.icons.reviewStar} alt="" />{rating} Star
        </p>
      </div>

      <div className="pt-3 text-sm font-violet-sans">
        {text || "Be wary of cheap synthetics. While some synthetic blends can be durable, 100% polyester tees often don&apos;t breathe well and can wear out quickly. Choosing a more durable and naturally breathable fabric, such as Organic Cotton, can lead to t-shirts"}
      </div>
    </article>
  );
};

export default CustomerReviewCard;
