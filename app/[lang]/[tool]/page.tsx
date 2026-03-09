import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/AppHeader";
import { ConverterWorkbench } from "@/components/ConverterWorkbench";
import { ToolSeoSection } from "@/components/ToolSeoSection";
import { getToolBySlug, getToolDescription, getToolName, getToolSlug, toolDefinitions } from "@/config/tools";
import { isLocale, locales, type Locale } from "@/i18n/config";

type ToolPageProps = {
  params: Promise<{
    lang: string;
    tool: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    toolDefinitions.map((tool) => ({
      lang,
      tool: getToolSlug(tool, lang)
    }))
  );
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { lang, tool: slug } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  const tool = getToolBySlug(locale, slug);

  if (!tool) {
    return {};
  }

  const toolName = getToolName(tool, locale);
  const title = `${toolName} Converter - Free Developer Tool`;
  const description = `Convert data instantly with ${toolName}. Fast, minimal, and built for developers.`;
  const url = `https://devconvertools.com/${locale}/${getToolSlug(tool, locale)}`;

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "DevConverTools",
      type: "website"
    },
    alternates: {
      canonical: `/${locale}/${getToolSlug(tool, locale)}`,
      languages: Object.fromEntries(
        locales.map((currentLang) => [currentLang, `/${currentLang}/${getToolSlug(tool, currentLang)}`])
      )
    }
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { lang, tool: slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const tool = getToolBySlug(locale, slug);

  if (!tool) {
    notFound();
  }

  return (
    <>
      <AppHeader locale={locale} toolId={tool.id} section="tool" />

      <section className="hero hero-tool">
        <h1>{getToolName(tool, locale)}</h1>
        <p>{getToolDescription(tool, locale)}</p>
      </section>

      <ConverterWorkbench locale={locale} toolId={tool.id} />
      <ToolSeoSection locale={locale} toolId={tool.id} />
    </>
  );
}
