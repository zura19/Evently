import React from "react";

export default function Loader({
  size = "md",
  className,
  white = false,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  white?: boolean;
}) {
  const sizes = {
    sm: "size-[30px]",
    md: "size-[50px]",
    lg: "size-[70px]",
  };

  return (
    <div
      className={`${white ? "loader-white" : "loader"} ${
        sizes[size]
      } ${className} `}
    ></div>
  );
}
