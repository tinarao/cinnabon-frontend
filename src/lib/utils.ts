import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const slugGenerator = (str: string) => {
  const res: Array<string> = [];
  str.split('').forEach(letter => {
    if (letter === ' ' || letter === '/') {
      res.push('-');
    } else {
      res.push(letter.toLowerCase());
    }
  })

  return res;
}