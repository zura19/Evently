import Loader from "@/components/Loader";
import React from "react";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
}
