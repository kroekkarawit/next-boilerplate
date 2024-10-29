export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "en";

export default {
  locales,
  defaultLocale,
  localeDetection: true,
};
