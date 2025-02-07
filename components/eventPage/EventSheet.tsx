"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useState } from "react";
import { Button } from "../ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";
import TicketsCounter from "./TicketsCounter";
import Link from "next/link";

export default function EventSheet({
  date,
  totalTickets,
  event,
}: {
  date: Date;
  totalTickets: number;
  event: {
    name: string;
    _id: string;
    image: string;
    location: string;
    price: number;
  };
}) {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState(1);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div>
          <Button className="w-full rounded-full font-semibold">
            Buy Ticket
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-[auto_1fr] gap-4 py-4">
          <Image
            src={event?.image}
            alt={event?.name}
            width={100}
            height={100}
          />
          <div className="">
            <p className="font-semibold line-clamp-1">{event?.name}</p>
            <p>{event.location}</p>
            <p className="text-sm">{formatDate(date)}</p>
            <TicketsCounter
              totalTickets={totalTickets}
              setTickets={setTickets}
              tickets={tickets}
            />
          </div>

          <Button className="col-span-2" asChild>
            <Link
              href={`/payment/${event._id}?totalTickets=${tickets}&date=${date}`}
              onClick={() => setOpen(false)}
            >
              Buy {tickets} ticket for
              <span className="font-semibold">
                {formatCurrency(event.price * tickets)}
              </span>
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
