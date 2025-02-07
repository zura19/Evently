"use client";
import { Slider } from "@/components/ui/slider";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComboboxComp } from "../FormComps/ComboboxComp";
import AccordionComp from "../AccordionComp";
import CheckboxList from "./CheckboxList";
import FormButton from "../FormComps/FormButton";

export default function FilterForm({ closeModal }: { closeModal: () => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || 1
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || 1000
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(minPrice, maxPrice);

    const param = new URLSearchParams(searchParams);

    if (minPrice > 1) {
      param.set("minPrice", minPrice.toString());
    } else {
      param.delete("minPrice");
    }

    if (maxPrice < 1000) {
      param.set("maxPrice", maxPrice.toString());
    } else {
      param.delete("maxPrice");
    }

    if (category) {
      param.set("category", category);
    } else {
      param.delete("category");
    }

    if (location) {
      param.set("location", location);
    } else {
      param.delete("location");
    }

    closeModal();
    router.push(`${pathname}?${param.toString()}`);
  }

  function handleReset() {
    router.push(`${pathname}`);
    closeModal();
  }

  console.log(category);

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
      <AccordionComp
        defaultOpen={
          searchParams.has("minPrice") || searchParams.has("maxPrice")
        }
        title="Price"
      >
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <Label>Min Price ({minPrice})</Label>
            <Slider
              value={[minPrice]}
              onValueChange={(value) => {
                if (value[0] >= maxPrice) return;
                setMinPrice(value[0]);
              }}
              min={0}
              disabled={minPrice >= maxPrice}
              max={1000}
              step={10}
              className="cursor-pointer"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <Label className="ml-auto">Max Price ({maxPrice})</Label>
            <Slider
              value={[maxPrice]}
              onValueChange={(value) => {
                if (value[0] <= minPrice) return;
                setMaxPrice(value[0]);
              }}
              min={0}
              max={1000}
              step={10}
              className="cursor-pointer"
            />
          </div>
        </div>
      </AccordionComp>

      <AccordionComp
        defaultOpen={searchParams.has("category")}
        title="Category"
      >
        <CheckboxList
          arr={[
            { value: "music", label: "Music" },
            { value: "sport", label: "Sport" },
            { value: "art", label: "Art" },
            { value: "movies", label: "Movies" },
            { value: "programming", label: "Programming" },
            { value: "food", label: "Food" },
            { value: "technology", label: "Technology" },
            { value: "other", label: "Other" },
          ]}
          value={category}
          setValue={setCategory}
        />
      </AccordionComp>

      <AccordionComp
        defaultOpen={searchParams.has("location")}
        title="Location"
      >
        <ComboboxComp
          value={location}
          setValue={setLocation}
          placeholder="Select Location"
          arr={[
            { label: "Tbilisi", value: "tbilisi" },
            { label: "Qutaisi", value: "qutaisi" },
            { label: "Batumi", value: "batumi" },
            { label: "Other", value: "other" },
          ]}
        />
      </AccordionComp>

      <div className=" flex items-center gap-4">
        <FormButton
          content="Apply"
          isSubmitting={false}
          classname="rounded-md"
        />
        <Button
          type="button"
          onClick={handleReset}
          variant={"secondary"}
          className="w-full font-semibold"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
