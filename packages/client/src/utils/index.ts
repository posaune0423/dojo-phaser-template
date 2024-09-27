import { type ClassValue, clsx } from "clsx";
import { shortString } from "starknet";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const truncateAddress = (address: string) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match || match.length < 3) return address;
  const part1 = match[1] || "";
  const part2 = match[2] || "";
  return `0x${part1}…${part2}`;
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1).toString().padStart(2, "0")}/${dateObj
    .getDate()
    .toString()
    .padStart(2, "0")}:${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
};

export const felt252ToString = (felt252: string | number | bigint) => {
  if (typeof felt252 === "bigint" || typeof felt252 === "object") {
    felt252 = `0x${felt252.toString(16)}`;
  }
  if (felt252 === "0x0" || felt252 === "0") return "";
  if (typeof felt252 === "string") {
    try {
      return shortString.decodeShortString(felt252);
    } catch (e) {
      console.error("Error decoding short string:", e);
      return felt252;
    }
  }
  return felt252.toString();
};
