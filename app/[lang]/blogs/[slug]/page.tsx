import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/AppHeader";
import { getToolPath, getToolName, toolById } from "@/config/tools";
import { blogPosts, getBlogUiCopy, getLocalizedBlogPostBySlug } from "@/content/blog";
import { isLocale, locales, type Locale } from "@/i18n/config";

type LocalizedBlogPostPageProps = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) => blogPosts.map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({ params }: LocalizedBlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  const post = getLocalizedBlogPostBySlug(locale, slug);

  if (!post) {
    return {};
  }

  const url = `https://devconvertools.com/${locale}/blogs/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      siteName: "DevConverTools"
    },
    alternates: {
      canonical: `/${locale}/blogs/${post.slug}`,
      languages: Object.fromEntries(locales.map((currentLang) => [currentLang, `/${currentLang}/blogs/${post.slug}`]))
    }
  };
}

export default async function LocalizedBlogPostPage({ params }: LocalizedBlogPostPageProps) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const post = getLocalizedBlogPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  const copy = getBlogUiCopy(locale);

  return (
    <>
      <AppHeader locale={locale} section="blog-post" blogSlug={post.slug} />

      <article className="blog-article">
        <h1>{post.title}</h1>

        {post.paragraphs.map((paragraph, index) => (
          <p key={`${post.slug}-${index}`}>{paragraph}</p>
        ))}

        <section className="blog-try-tools">
          <h2>{copy.tryTools}</h2>
          <div className="related-tools-grid">
            {post.tryTools.map((toolId) => (
              <Link key={toolId} href={getToolPath(locale, toolId)} className="related-tool-card">
                <strong>{getToolName(toolById[toolId], locale)}</strong>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
