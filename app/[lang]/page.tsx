import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/AppHeader";
import { HomeQuickBlog } from "@/components/HomeQuickBlog";
import { ToolGrid } from "@/components/ToolGrid";
import { toolDefinitions } from "@/config/tools";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { formatCount } from "@/lib/utils";

type LangPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const locale = lang;
  const messages = getMessages(locale);

  return {
    title: messages.appName,
    description: messages.seoDescription,
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: `${messages.appName} | DevConverTools`,
      description: messages.seoDescription,
      type: "website",
      url: `https://devconvertools.com/${locale}`
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((currentLang) => [currentLang, `/${currentLang}`]))
    }
  };
}

export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const messages = getMessages(locale);

  return (
    <>
      <AppHeader locale={locale} />

      <section className="hero">
        <h1>{messages.appTagline}</h1>
        <p>
          {formatCount(toolDefinitions.length, locale)} {messages.toolsCount}
        </p>
      </section>

      <ToolGrid locale={locale} />

      <HomeQuickBlog locale={locale} />
    </>
  );
}
