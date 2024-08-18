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

// Спизжено
// https://stackoverflow.com/questions/17380845/how-do-i-convert-a-string-to-enum-in-typescript
export function enumFromStringValue<T>(enm: { [s: string]: T }, value: string): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? value as unknown as T
    : undefined;
}

export const reqUri = (url: string): string => {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_DEV
      : process.env.NEXT_PUBLIC_API_PROD;

  return `${apiUrl}${url}`;
}