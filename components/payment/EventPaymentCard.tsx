import { formatCurrency, getShortString } from "@/lib/utils";
import {
  Calendar,
  Grid2X2,
  HandCoins,
  MapPin,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";

export default function EventPaymentCard({
  event,
  totalTickets,
  date,
  className,
}: {
  event: {
    name: string;
    image: string;
    price: number;
    location: string;
    description: string;
    category: string;
    author: { _id: string; username: string };
  };
  totalTickets?: number;
  date: Date;
  className?: string;
}) {
  console.log(event);
  return (
    <div className={`md:flex gap-4 bg-background p-4 rounded-md  ${className}`}>
      <div className="relative h-52 aspect-video w-full md:w-auto md:aspect-square">
        <Image
          fill
          src={event.image}
          alt={event.name}
          className="object-cover md:object-contain w-full rounded-md"
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <p className="font-semibold mt-4 text-lg leading-3  md:text-md md:mt-0  md:leading-normal ">
          {event.name}
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 md:flex md:items-center md:justify-between w-full ">
          {totalTickets && (
            <>
              <p className="flex items-center gap-2">
                <Ticket className="text-primary" />
                <span>{totalTickets}</span>
              </p>
              <p className="flex items-center gap-2">
                <HandCoins className="text-primary" />
                <span>
                  {formatCurrency(event.price * Number(totalTickets))}
                </span>
              </p>
            </>
          )}

          <p className="flex items-center gap-2">
            <MapPin className="text-primary" />
            <span>{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <Grid2X2 className="text-primary" />
            <span>
              {event.category?.length > 5
                ? event.category.slice(0, 5) + "..."
                : event.category}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="text-primary" />
            <span>{getShortString(date)}</span>
          </p>
        </div>
        <p className="text-muted-foreground line-clamp-2 break-all ">
          {event.description || "No description."}
        </p>

        <p className="flex items-center gap-2 mt-auto">
          <User className="text-primary" />
          <span>{event.author.username}</span>
        </p>
      </div>
    </div>
  );
}
