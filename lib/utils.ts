import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isUndefined } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ColorTheme = "light" | "dark";

export const generateColorFromString = (
  str: string | undefined,
  theme?: ColorTheme // Made optional
) => {
  if (!str) {
    str = "colored";
  }

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;

  const colorSettings = {
    light: {
      saturation: 70,
      lightness: 60,
    },
    dark: {
      saturation: 30,
      lightness: 20,
    }
  };

  // Use light theme as default if theme is undefined
  const { saturation, lightness } = colorSettings[theme || "light"];

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  // Format the number with commas as thousands separators
  const formattedNumber = value.toFixed(decimals); // Apply toFixed for decimal precision
  const [integer, decimal] = formattedNumber.split("."); // Separate integer and decimal parts

  // Add commas to the integer part
  const integerWithCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // If there's a decimal part, combine them, else return the integer part
  return decimal ? `${integerWithCommas}.${decimal}` : integerWithCommas;
};


export const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  
  return null;
};