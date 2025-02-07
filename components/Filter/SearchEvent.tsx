"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter } from "./Filter";
import { Input } from "../ui/input";

export default function SearchEvent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = new URLSearchParams(searchParams);
    if (e.target.value.length > 2) {
      param.set("query", e.target.value);
    } else {
      param.delete("query");
    }
    router.push(`${pathname}?${param.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Input
        onChange={(e) => handleSearch(e)}
        placeholder="Search Events"
        className="bg-background rounded-full "
      />
      <Filter />
    </div>
  );
}
