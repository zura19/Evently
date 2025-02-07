import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton({ length = 1 }: { length?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
      {new Array(length).fill(0).map((_, index) => (
        <EventSkeleton key={index} />
      ))}
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className="flex flex-col space-y-4 bg-background rounded-md">
      <Skeleton className="h-52 w-full rounded-md rounded-b-none  " />
      <div className="space-y-4 px-4 py-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-[30%] rounded-full" />
          <Skeleton className="h-5 w-[30%] rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

// grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]
