import purchaseModel from "@/models/purchaseModel";
import EventPaymentCard from "../payment/EventPaymentCard";
import { Ticket } from "lucide-react";

export default async function TicketsList({
  userId,
  ticketsType,
}: {
  userId: string;
  ticketsType?: string;
}) {
  const tickets = await purchaseModel
    .find({
      user: userId,
      date:
        ticketsType && ticketsType === "all"
          ? { $exists: true }
          : { $gte: new Date(Date.now()) },
    })
    .populate({
      path: "event",
      select: "name image price location category description author",
      populate: {
        path: "author",
        select: "username", // Add the fields you want from the author
      },
    });

  if (!tickets || tickets.length === 0)
    return (
      <div className="flex justify-center py-12">
        <div className="flex flex-col items-center">
          <Ticket className="text-primary" size={42} />
          <p className="text-xl font-medium">No tickets Found!</p>
        </div>
      </div>
    );

  return (
    <ul className="px-2 py-4 space-y-3  overflow-y-scroll h-[83.2dvh] ">
      {tickets.map((ticket) => (
        <EventPaymentCard
          className="bg-secondary/70"
          key={ticket._id}
          event={ticket.event}
          totalTickets={ticket.totalTickets}
          date={ticket.date}
        />
      ))}
    </ul>
  );
}
