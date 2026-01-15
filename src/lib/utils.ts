import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to get proper image URL
export function getImageUrl(relativePath: string | undefined | null): string {
  if (!relativePath) {
    return 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800';
  }
  
  // If it's already a full URL, return as is
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // If it's a relative path, prepend the backend URL
  return `/api${relativePath}`;
}
