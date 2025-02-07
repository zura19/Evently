import { getEvent } from "@/actions/EventActions";
import Image from "next/image";
import PriceAndCategory from "../EventList/PriceAndCategory";
import { MapPin } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { auth } from "@/app/auth";
import Bookmarked from "./Bookmarked";
import { notFound } from "next/navigation";

export default async function Event({ id }: { id: string }) {
  const session = await auth();
  const { event, isBookmarked } = await getEvent(id);

  if (!event) return notFound();

  return (
    <div className="container-box grid md:grid-cols-[1fr_1fr] gap-12">
      <div className="relative w-full aspect-square">
        <Image
          fill
          src={event.image}
          alt={event.name}
          className="object-contain object-top rounded-md"
        />
      </div>
      <div className=" space-y-4">
        <h1 className="text-2xl font-bold">{event.name}</h1>
        <div className="flex items-center justify-between">
          <PriceAndCategory
            eventPage={true}
            price={event.price}
            category={event.category}
            username={event.author.username}
          />
          {session?.user && (
            <Bookmarked isBookmarked={isBookmarked} eventId={event?._id} />
          )}
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={25} className="text-primary" />
          <p>{event.location}</p>
        </div>

        <DatePicker
          event={{
            _id: event._id,
            name: event.name,
            location: event.location,
            image: event.image,
            price: event.price,
          }}
          userId={session?.user?.id}
          tickets={JSON.parse(
            JSON.stringify(
              event.tickets.filter(
                (ticket: { date: Date }) =>
                  new Date(ticket.date).getTime() > Date.now()
              )
            )
          )}
        />

        <p className="text-sm sm:text-base text-muted-foreground ">
          {event.description || "no description"}
        </p>
      </div>
    </div>
  );
}
