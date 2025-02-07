"use client";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import FormButton from "./FormComps/FormButton";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
export default function CheckoutForm({
  clientSecret,
  totalPrice,
}: {
  clientSecret: string;
  totalPrice: number;
}) {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form price={totalPrice} />
    </Elements>
  );
}

function Form({ price }: { price: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (elements == null || email == null) return;

    stripe
      ?.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL!}/payment/success`,
        },
      })
      ?.then(({ error }) => {
        if (
          error?.type === "card_error" ||
          error?.type === "validation_error"
        ) {
          setError(error.message as string);
        } else {
          setError("An unknown error occured");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-sm mb-2 ">{error}</p>}
      <PaymentElement />
      <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />

      <FormButton
        classname="w-full mt-4 font-semibold rounded-md"
        isSubmitting={isLoading || !elements}
        content={`Purchase - ${formatCurrency(price)}`}
      />
    </form>
  );
}
