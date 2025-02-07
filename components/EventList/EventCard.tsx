import Image from "next/image";
import PriceAndCategory from "./PriceAndCategory";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import EditAndDeleteEvent from "./EditAndDeleteEvent";
import { Ievent } from "@/lib/types/eventTypes";

export default function EventCard({
  event,
  user,
}: {
  event: Ievent;
  user?: { id: string; role: string };
}) {
  return (
    <div className="relative grid h-full group hover:-translate-y-3 hover:shadow-lg transition-all duration-500">
      <Link
        href={`/events/${event._id}`}
        className="grid bg-background gap-5 rounded-md border border-border "
      >
        <div className="relative h-52">
          <Image
            alt="Card"
            fill
            src={event.image}
            className="object-cover rounded-md rounded-b-none"
          />
        </div>
        <div className="p-4 space-y-2   pt-0">
          <PriceAndCategory price={event.price} category={event.category} />
          <p className="text-sm font-medium cursor-auto text-muted-foreground">
            {event.startDate.getTime() !== event.endDate.getTime()
              ? formatDate(event.startDate) + " - " + formatDate(event.endDate)
              : formatDate(event.startDate)}
          </p>
          <p className="text-pretty font-medium line-clamp-1">{event.name}</p>
          <p className="mt-auto">{event.author.username}</p>
        </div>
      </Link>
      {user?.id && (user?.role !== "user" || event.author._id === user?.id) && (
        <EditAndDeleteEvent eventId={event._id} />
      )}
    </div>
  );
}
