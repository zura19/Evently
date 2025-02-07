import { Skeleton } from "@/components/ui/skeleton";

export default function UserSkeleton({ count = 1 }: { count?: number }) {
  return (
    <ul className="h-[400px]">
      {Array.from({ length: count }).map((_, i) => (
        <Uskeleton key={i} />
      ))}
    </ul>
  );
}

function Uskeleton() {
  return (
    <div className="flex items-center gap-1.5 my-1 py-2 px-1 sm:px-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-52" />
      </div>
    </div>
  );
}
