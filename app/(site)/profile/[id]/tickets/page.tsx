import { auth } from "@/app/auth";
import { TicketSkeleton } from "@/components/skeletons/TicketSkeleton";
import TicketsList from "@/components/userPage/TicketsList";
import TicketsNav from "@/components/userPage/TicketsNav";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { tickets: string };
}) {
  const session = await auth();
  const { tickets } = searchParams;

  if (!session?.user) return notFound();

  return (
    <div className="border-r border-border">
      <TicketsNav />
      <Suspense key={tickets} fallback={<TicketSkeleton length={3} />}>
        <TicketsList
          userId={session?.user?.id as string}
          ticketsType={tickets}
        />
      </Suspense>
    </div>
  );
}
