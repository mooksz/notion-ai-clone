import { NAME_AFFIXES } from "@/constants/nameAffixes";

export function getNameInitials(name: string) {
  return name
    .split(" ") // Split the name into parts by spaces
    .filter(
      (part) =>
        !(NAME_AFFIXES as readonly string[]).includes(part.toLowerCase())
    ) // Exclude prefixes
    .map((part) => part[0].toUpperCase()) // Take the first letter of each part and capitalize it
    .join(""); // Join the initials together
}
