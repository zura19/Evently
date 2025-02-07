import Event from "@/components/eventPage/Event";
import EventCarousel from "@/components/eventPage/EventCarousel";
import { EventCardSkeleton } from "@/components/skeletons/EventCardSkeleton";
import EventSkeleton from "@/components/skeletons/EventSkeleton";
import { Suspense } from "react";

export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10  to-primary/0 py-6 ">
        <Suspense fallback={<EventSkeleton />} key={params.id}>
          <Event id={params.id} />
        </Suspense>
      </div>
      <div className="container-box py-4">
        <h1 className="text-2xl font-bold">Related Events</h1>
        <Suspense fallback={<EventCardSkeleton length={4} />}>
          <EventCarousel />
        </Suspense>
      </div>
    </>
  );
}
