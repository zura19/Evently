import { auth } from "@/app/auth";
import CheckoutForm from "@/components/CheckoutForm";
import EventPaymentCard from "@/components/payment/EventPaymentCard";
import { Ievent } from "@/lib/types/eventTypes";
import eventModel from "@/models/eventModel";
import { notFound } from "next/navigation";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { totalTickets: string; date: string };
}) {
  const session = await auth();
  if (!searchParams.totalTickets || !params.id) return notFound();

  const event: Ievent = await eventModel
    .findById(params.id)
    .populate("author", "username");
  if (!event || !session?.user) return notFound();

  const { totalTickets, date } = searchParams;
  if (!date || !totalTickets) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(event.price * +totalTickets) * 100,
    currency: "usd",

    metadata: {
      event: event._id,
      date,
      totalTickets,
      user: session?.user?.id as string,
    },
  });

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20  to-primary/0 min-h-[90dvh]">
      <div className="container-box max-w-full lg:max-w-[70%] py-6 space-y-6">
        <EventPaymentCard
          event={event}
          date={new Date(date)}
          totalTickets={+totalTickets}
        />
        <CheckoutForm
          totalPrice={Number(event.price * +totalTickets)}
          clientSecret={paymentIntent.client_secret as string}
        />
      </div>
    </div>
  );
}
