"use client";
import { bookmarkAction } from "@/actions/userModel";
import { toast } from "@/hooks/use-toast";
import { Bookmark } from "lucide-react";
import { startTransition, useOptimistic } from "react";
import { TooltipComp } from "../TooltipComp";

export default function Bookmarked({
  eventId,
  isBookmarked,
}: {
  eventId: string;
  isBookmarked: boolean;
}) {
  const [optimisticBookmark, optimisticBookmarkFunc] = useOptimistic(
    isBookmarked,
    (prev) => !prev
  );

  async function handleBookmark() {
    startTransition(() => {
      optimisticBookmarkFunc((prev: boolean) => !prev);
    });
    const bookmark = await bookmarkAction(eventId);

    if (bookmark.error) {
      startTransition(() => {
        optimisticBookmarkFunc((prev: boolean) => !prev);
      });
      toast({
        title: "Error",
        description: bookmark.error,
        variant: "destructive",
      });
      return;
    }

    if (bookmark.success) {
      toast({
        title: "Success",
        description: bookmark.success,
        variant: "success",
      });

      return;
    }
  }

  return (
    <TooltipComp content={optimisticBookmark ? "Unbookmark" : "Bookmark"}>
      <div onClick={handleBookmark}>
        <div className="bg-primary/50 p-1.5 rounded-full cursor-pointer">
          <Bookmark
            className={`text-white size-[25px]  ${optimisticBookmark ? "fill-white/100" : "fill-white/0"} transition-all duration-300`}
          />
        </div>
      </div>
    </TooltipComp>
  );
}
