import EventList from "@/components/EventList/EventList";
import SearchEvent from "@/components/Filter/SearchEvent";
import { EventCardSkeleton } from "@/components/skeletons/EventCardSkeleton";
import { IsearchParamsFilter } from "@/lib/types/eventTypes";

import { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: IsearchParamsFilter;
}) {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15  to-primary/0 min-h-[90dvh]">
      <div className="container-box py-6">
        <SearchEvent />
        <Suspense
          fallback={<EventCardSkeleton length={4} />}
          key={[
            searchParams.query,
            searchParams.minPrice,
            searchParams.maxPrice,
            searchParams.category,
            searchParams.location,
            searchParams.page,
          ].join("-")}
        >
          <EventList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
