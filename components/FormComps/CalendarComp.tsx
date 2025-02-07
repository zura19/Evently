"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarComp({
  date,
  setDate,
  label,
  dateError,
}: {
  date: Date;
  setDate: () => void;
  label: string;

  dateError?: string | null;
}) {
  return (
    <div className="space-y-2">
      <label className={`p-1 font-medium ${dateError && "text-red-500"} `}>
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal rounded-full bg-muted",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {dateError && <p className="p-1 text-sm text-red-500">{dateError}</p>}
    </div>
  );
}
