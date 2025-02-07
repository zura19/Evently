"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TicketsNav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleActive = () => {
    router.push(`${pathname}`);
  };

  const handleAll = () => {
    const param = new URLSearchParams(searchParams);
    param.set("tickets", "all");
    router.push(`${pathname}?${param.toString()}`);
  };

  const isAll =
    searchParams.get("tickets") && searchParams.get("tickets") === "all";

  return (
    <div className="grid grid-cols-[1fr_1fr] border-b border-border">
      <div
        onClick={handleActive}
        className={`flex items-center justify-center  p-4 ${!isAll && "bg-secondary"} hover:bg-secondary hover:text-primary border-r border-border cursor-pointer`}
      >
        <p className={`font-medium ${!isAll && "text-primary"}`}>
          Active Tickets
        </p>
      </div>

      <div
        onClick={handleAll}
        className={`flex items-center justify-center  p-4 ${isAll && "bg-secondary"} hover:bg-secondary hover:text-primary  cursor-pointer add-transition-300`}
      >
        <p className={`font-medium ${isAll && "text-primary"}`}>All Tickets</p>
      </div>
    </div>
  );
}
