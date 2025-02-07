import EventPaymentCard from "@/components/payment/EventPaymentCard";
import { Button } from "@/components/ui/button";
import { Ievent } from "@/lib/types/eventTypes";
import eventModel from "@/models/eventModel";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function page({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );
  if (!paymentIntent.metadata) notFound();

  const { event, date, totalTickets } = paymentIntent.metadata;

  const product: Ievent | null = await eventModel
    .findById(event)
    .populate("author", "username");
  if (product == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  if (isSuccess)
    return (
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20  to-primary/0 min-h-dvh py-6">
        <div className="container-box">
          <EventPaymentCard
            event={product}
            date={new Date(date)}
            totalTickets={+totalTickets}
          />
          <div className="flex flex-col gap-2 items-center justify-center bg-white rounded-md mt-1 py-6">
            <CheckCircle2 size={70} className="text-green-500" />
            <p className="text-2xl font-semibold">Payment was successful!</p>
            <Button asChild className="rounded-full ">
              <Link href={"/"}>Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
}
