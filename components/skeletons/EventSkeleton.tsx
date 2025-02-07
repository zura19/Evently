import { Skeleton } from "@/components/ui/skeleton";
export default function EventSkeleton() {
  return (
    <div className="px-4  md:container-box">
      <div className="grid md:grid-cols-[1fr_1fr] gap-12">
        <Skeleton className="aspect-square w-[99%] rounded-md" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full sm:w-full " />
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-[100px] rounded-full" />
            <Skeleton className="h-6 w-[100px] rounded-full" />
            <Skeleton className="h-6 w-[160px]" />
          </div>
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-8 w-full rounded-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
}
