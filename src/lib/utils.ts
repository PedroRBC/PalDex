import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTypeVariant(type: string): string {
  const typeColors: Record<string, string> = {
    "normal": "bg-gray-500 hover:bg-gray-600 text-white",
    "fire": "bg-red-500 hover:bg-red-600 text-white",
    "water": "bg-blue-500 hover:bg-blue-600 text-white",
    "electric": "bg-yellow-500 hover:bg-yellow-600 text-white",
    "grass": "bg-green-500 hover:bg-green-600 text-white",
    "ice": "bg-cyan-500 hover:bg-cyan-600 text-white",
    "ground": "bg-amber-500 hover:bg-amber-600 text-white",
    "dragon": "bg-violet-500 hover:bg-violet-600 text-white",
  };

  return typeColors[type.toLowerCase()] || "bg-gray-500 hover:bg-gray-600 text-white";
}
