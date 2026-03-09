import Link from "next/link";

import { getLocalizedBlogPosts } from "@/content/blog";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

type HomeQuickBlogProps = {
  locale: Locale;
};

export function HomeQuickBlog({ locale }: HomeQuickBlogProps) {
  const messages = getMessages(locale);
  const essentials = getLocalizedBlogPosts(locale).slice(0, 3);

  return (
    <section className="home-blog-section">
      <h2>{messages.blogHomeTitle}</h2>
      <p>{messages.blogHomeSubtitle}</p>

      <div className="home-blog-accordion">
        {essentials.map((post) => (
          <details key={post.slug} className="home-blog-item">
            <summary>{post.title}</summary>
            <p>{post.excerpt}</p>
            <Link href={`/${locale}/blogs/${post.slug}`}>{messages.readQuickNote}</Link>
          </details>
        ))}
      </div>

      <Link href={`/${locale}/blogs`} className="see-more-link">
        {messages.seeMore}
      </Link>
    </section>
  );
}
