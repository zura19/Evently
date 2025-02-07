"use client";
import { format } from "date-fns";
import { cn, formatDate, getShortString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Ticket } from "lucide-react";
import EventSheet from "./EventSheet";
import Link from "next/link";
import { useState } from "react";

export function DatePicker({
  event,
  tickets,
  userId,
}: {
  event: {
    name: string;
    _id: string;
    image: string;
    location: string;
    price: number;
  };
  tickets: { date: Date; remainingTickets: number; _id: string }[];
  userId?: string;
}) {
  const [date, setDate] = useState<Date>(new Date(tickets[0]?.date + ""));

  const ticketsQuantity = tickets?.find(
    (ticket) =>
      getShortString(new Date(ticket?.date + "")) == getShortString(date)
  )?.remainingTickets;

  const isTicketAvailable = ticketsQuantity && ticketsQuantity > 0;

  if (!tickets || tickets.length === 0)
    return (
      <div className="w-full flex flex-col gap-4 bg-red-100 font-medium rounded-md py-2 text-center text-red-500 ">
        <p>No tickets available for this event</p>
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-3">
            <CalendarIcon className="text-primary" size={25} />
            <Button
              variant={"outline"}
              className={cn(
                "flex-grow justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            // @ts-expect-error idk
            onSelect={setDate}
            disabled={(date) =>
              date < new Date() ||
              !tickets.find(
                (ticket) =>
                  getShortString(new Date(ticket.date + "")) ==
                  getShortString(date)
              )
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-3">
        <Ticket
          size={25}
          className={` ${isTicketAvailable ? "text-primary" : "text-red-500"}`}
        />
        <p>
          {isTicketAvailable ? (
            ticketsQuantity
          ) : (
            <span className="text-red-500">no tickets available</span>
          )}
        </p>
        <span className="ml-auto text-xs text-muted-foreground">
          Tickets Available for date: {date && formatDate(date)}
        </span>
      </div>
      {!userId && (
        <Button className="font-semibold" asChild>
          <Link href="/login">Log in to continue</Link>
        </Button>
      )}
      {userId && isTicketAvailable && (
        <EventSheet date={date} totalTickets={ticketsQuantity} event={event} />
      )}
    </div>
  );
}
