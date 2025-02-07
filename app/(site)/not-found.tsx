import Logo from "@/components/Logo";
import React from "react";

export default function Notfound() {
  return (
    <div className="container-box flex flex-col gap-2 items-center py-6">
      <Logo className="grayscale" />
      <div className="text-2xl font-semibold ">page not found</div>
    </div>
  );
}
