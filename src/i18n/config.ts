export const locales = ["en", "fr", "es", "de", "pt", "zh", "ru", "ar", "hi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const languageNames: Record<Locale, string> = {
  en: "English",
  fr: "Francais",
  es: "Espanol",
  de: "Deutsch",
  pt: "Portugues",
  zh: "\u4e2d\u6587",
  ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
  hi: "\u0939\u093f\u0928\u094d\u0926\u0940"
};

export const languageFlags: Record<Locale, string> = {
  en: "US",
  fr: "FR",
  es: "ES",
  de: "DE",
  pt: "PT",
  zh: "CN",
  ru: "RU",
  ar: "SA",
  hi: "IN"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

