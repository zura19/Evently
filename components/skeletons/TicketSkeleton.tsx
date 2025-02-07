import { Skeleton } from "@/components/ui/skeleton";

export function TicketSkeleton({ length = 1 }: { length?: number }) {
  return (
    <div className="grid gap-2">
      {new Array(length).fill(0).map((_, index) => (
        <EventSkeleton key={index} />
      ))}
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className="grid md:grid-cols-[6.5fr_20fr] p-4 gap-4  w-full bg-background rounded-md">
      <Skeleton className="h-48 w-full rounded-md   " />
      <div className="flex flex-col gap-4 ">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-32 mt-auto " />
      </div>
    </div>
  );
}
