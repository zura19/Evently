import { auth } from "@/app/auth";
import EventForm from "@/components/createEvent/EventForm";
import { notFound } from "next/navigation";

export default async function page() {
  const session = await auth();

  // @ts-expect-error idk why this is not working
  if (session?.user?.role === "user") return notFound();

  return (
    <div className="container-box py-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <EventForm userId={session?.user?.id as string} />
    </div>
  );
}
