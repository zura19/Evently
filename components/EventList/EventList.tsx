import { getEvents } from "@/actions/EventActions";
import EventCard from "./EventCard";
import { IsearchParamsFilter } from "@/lib/types/eventTypes";
import { auth } from "@/app/auth";
import AnimatedList from "../AnimatedList";

export default async function EventList({
  searchParams,
  label,
}: {
  searchParams?: IsearchParamsFilter;
  label?: string;
}) {
  const session = await auth();
  const { query, minPrice, maxPrice, category, location, page, limit } =
    searchParams || {};
  const events = await getEvents({
    query,
    minPrice,
    maxPrice,
    category,
    location,
    page,
    limit,
  });

  if (!events || events.length === 0)
    return <div className=" text-center">No events found</div>;

  return (
    <div className={`${label && "space-y-4"}`}>
      {label && <h1 className="text-2xl font-bold">{label}</h1>}
      <AnimatedList>
        {events?.map((event) => (
          <EventCard
            key={event._id}
            // @ts-expect-error role
            user={{ id: session?.user?.id, role: session?.user?.role }}
            event={event}
          />
        ))}
      </AnimatedList>
    </div>
  );
}
