import { auth } from "@/app/auth";
import { EventCardSkeleton } from "@/components/skeletons/EventCardSkeleton";
import BookmarksList from "@/components/userPage/BookmarksList";

import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await auth();
  if (!session?.user?.id || session?.user?.id !== id) return notFound();

  return (
    <div className="border-r border-border p-4">
      <h1 className="text-2xl font-semibold mb-4">Bookmarks</h1>
      <Suspense fallback={<EventCardSkeleton length={2} />}>
        <BookmarksList id={id} />
      </Suspense>
    </div>
  );
}
