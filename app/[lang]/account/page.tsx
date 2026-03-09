import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AccountPanel } from "@/components/AccountPanel";
import { AppHeader } from "@/components/AppHeader";
import { isLocale, locales, type Locale } from "@/i18n/config";

type AccountPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: AccountPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  return {
    title: "Account",
    description: "Optional account for DevConverTools users.",
    robots: {
      index: false,
      follow: false
    },
    alternates: {
      canonical: `/${lang}/account`,
      languages: Object.fromEntries(locales.map((currentLang) => [currentLang, `/${currentLang}/account`]))
    }
  };
}

export default async function LocalizedAccountPage({ params }: AccountPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;

  return (
    <>
      <AppHeader locale={locale} section="account" />
      <AccountPanel locale={locale} />
    </>
  );
}
