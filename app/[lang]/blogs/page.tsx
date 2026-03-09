import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/AppHeader";
import { getBlogUiCopy, getLocalizedBlogPosts } from "@/content/blog";
import { isLocale, locales, type Locale } from "@/i18n/config";

type LocalizedBlogPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LocalizedBlogPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  const copy = getBlogUiCopy(locale);

  return {
    title: copy.listTitle,
    description: copy.listSubtitle,
    openGraph: {
      title: `${copy.listTitle} | DevConverTools`,
      description: copy.listSubtitle,
      type: "website",
      url: `https://devconvertools.com/${locale}/blogs`
    },
    alternates: {
      canonical: `/${locale}/blogs`,
      languages: Object.fromEntries(locales.map((currentLang) => [currentLang, `/${currentLang}/blogs`]))
    }
  };
}

export default async function LocalizedBlogPage({ params }: LocalizedBlogPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const posts = getLocalizedBlogPosts(locale);
  const copy = getBlogUiCopy(locale);

  return (
    <>
      <AppHeader locale={locale} section="blogs" />

      <section className="hero">
        <h1>{copy.listTitle}</h1>
        <p>{copy.listSubtitle}</p>
      </section>

      <section className="blog-grid">
        {posts.map((post) => (
          <Link key={post.slug} href={`/${locale}/blogs/${post.slug}`} className="blog-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
