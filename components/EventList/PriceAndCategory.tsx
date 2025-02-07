import { formatCurrency } from "@/lib/utils";

export default function PriceAndCategory({
  price,
  category,
  eventPage,
  username,
}: {
  price?: number;
  category?: string;
  eventPage?: boolean;
  username?: string;
}) {
  if (eventPage) {
    return (
      <div className="flex items-center gap-3">
        <p className="bg-green-100 px-4 py-1 text-green-700 font-medium rounded-full">
          {price === 0 ? "free" : formatCurrency(price || 0)}
        </p>

        <p className="px-4 py-1 bg-primary/10 rounded-full font-medium text-primary">
          {category || null}
        </p>
        <p className="flex items-center gap-1">
          <span className="">by</span>
          <span className="text-lg text-primary font-semibold">{username}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <p className="text-sm bg-green-100 px-4 py-1 text-green-700 font-medium rounded-full">
        {price === 0 ? "free" : formatCurrency(price || 0)}
      </p>

      <p className="text-sm px-4 py-1 bg-primary/10 rounded-full font-medium text-primary">
        {category || null}
      </p>
    </div>
  );
}
