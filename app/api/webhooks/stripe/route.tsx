import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import Event from "@/models/eventModel";
import purchaseModel from "@/models/purchaseModel";
import { Resend } from "resend";
import PurchaseEventTemplate from "@/email/PurchaseEventTemplate";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "charge.succeeded") {
    await connectToDB();
    const charge = event.data.object;
    const { event: eventId, user, totalTickets, date } = charge.metadata;
    const email = charge.billing_details.email;
    const paidInCents = charge.amount;

    const removeHours = new Date(date).setHours(0, 0, 0, 0);

    const eventToFind = await Event.findOneAndUpdate(
      { _id: eventId, "tickets.date": removeHours }, // Find the event with the matching ticket date
      {
        $inc: { "tickets.$.remainingTickets": -totalTickets }, // Use positional $ operator to update the correct ticket
      },
      { new: true } // Return the updated document
    );

    if (!eventToFind) {
      return new NextResponse("bad request", { status: 400 });
    }

    const purchase = await purchaseModel.create({
      event: eventId,
      totalTickets,
      date,
      user,
    });

    if (!purchase || !email) {
      return new NextResponse("bad request", { status: 400 });
    }

    // const product = await Product.findById(productId);
    // if (!product || !email) {
    //   return new NextResponse("bad request", { status: 400 });
    // }

    // const order = await Order.create({
    //   productId,
    //   price: paidInCents / 100,
    //   email,
    // });

    await resend.emails.send({
      from: `Evently Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Purchase Confirmation",
      react: (
        <PurchaseEventTemplate
          eventName={eventToFind.name}
          email={email}
          date={new Date(date)}
          tickets={Number(totalTickets)}
          location={eventToFind.location}
          totalPrice={paidInCents / 100}
          image={eventToFind.image}
        />
      ),
    });
  }

  return new NextResponse();
}
