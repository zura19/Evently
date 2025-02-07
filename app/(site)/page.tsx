import CategoriesList from "@/components/CategoriesList";
import EventList from "@/components/EventList/EventList";
import Header from "@/components/Header";
import { EventCardSkeleton } from "@/components/skeletons/EventCardSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="">
      <div className="bg-primary/5 py-6">
        <Header />
      </div>

      <CategoriesList />

      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15  to-primary/0">
        <div className="container-box py-6 space-y-10  ">
          <h1 className="text-3xl font-bold leading-tight">
            Trusted by <br /> Thousends Of Events
          </h1>

          <Suspense fallback={<EventCardSkeleton length={4} />}>
            <EventList label="Upcoming Events" searchParams={{ limit: "4" }} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
