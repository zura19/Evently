import User from "@/models/userModel";
import EventCard from "../EventList/EventCard";
import { Bookmark } from "lucide-react";

export default async function BookmarksList({ id }: { id: string }) {
  const user = await User.findById(id)
    .select("bookmarks role")
    .populate({
      path: "bookmarks",
      select: "name image price location category startDate endDate  author",
      populate: { path: "author", select: "username" },
    });

  const { bookmarks } = user;

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex flex-col items-center">
          <Bookmark className="text-primary" size={52} />
          <p className="text-xl font-medium">No bookmarks</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-20  md:gap-x-12 xl:grid-cols-3 ">
      {/* @ts-expect-error Server Component */}
      {bookmarks?.map((bookmark) => (
        <EventCard
          key={bookmark._id}
          event={bookmark}
          user={{ id: user._id, role: user.role }}
        />
      ))}
    </ul>
  );
}
