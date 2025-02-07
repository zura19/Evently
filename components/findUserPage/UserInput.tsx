"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export default function UserInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("username") || "");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    const param = new URLSearchParams(searchParams);
    if (e.target.value.length > 2) {
      param.set("username", e.target.value);
    } else {
      param.delete("username");
    }
    router.push(`${pathname}?${param.toString()}`);
  }

  function handleClear() {
    setQuery("");
    router.push(`${pathname}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="sm:flex items-center justify-between">
        <Label className=" px-1">search user by username</Label>
        {searchParams.get("username") && (
          <p
            onClick={handleClear}
            className="text-sm text-muted-foreground cursor-pointer hover:text-muted-foreground/60 add-transition-300"
          >
            X Clear search
          </p>
        )}
      </div>
      <Input
        value={query}
        onChange={(e) => handleSearch(e)}
        placeholder="Johndoe"
        className="bg-secondary rounded-md"
      />
    </div>
  );
}
