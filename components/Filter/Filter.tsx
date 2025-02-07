"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilterIcon } from "lucide-react";
import { TooltipComp } from "../TooltipComp";
import FilterForm from "./FilterForm";
import { useState } from "react";

export function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenChange() {
    setIsOpen((prev) => !prev);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <TooltipComp content="Filter">
        <DialogTrigger asChild>
          <Button variant="outline">
            <FilterIcon />
          </Button>
        </DialogTrigger>
      </TooltipComp>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Events</DialogTitle>
          <DialogDescription>
            Filter events by price, category, location, etc.
          </DialogDescription>
        </DialogHeader>
        <FilterForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
}
