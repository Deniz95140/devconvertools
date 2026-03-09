import type { Locale } from "@/i18n/config";

export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function buildAbsoluteUrl(pathname: string): string {
  return `https://devconvertools.com${pathname}`;
}
