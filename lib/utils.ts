import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatDate = function (date: Date) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export const getShortString = function (date: Date) {
  return `${date?.getDate()}-${date?.getMonth()}-${date?.getFullYear()}`;
};

export const makeShortString = function (string: string, number: number) {
  return string.length > number ? `${string?.slice(0, number)}...` : string;
};

export const formatCurrency = function (amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
