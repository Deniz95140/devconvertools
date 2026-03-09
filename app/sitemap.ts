import type { MetadataRoute } from "next";

import { blogPosts } from "@/content/blog";
import { getToolSlug, toolDefinitions } from "@/config/tools";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devconvertools.com";

  const mainUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "monthly",
      priority: 0.3
    },
    {
      url: `${baseUrl}/account`,
      changeFrequency: "monthly",
      priority: 0.4
    }
  ];

  const localizedHomes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  const localizedAccounts = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/account`,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const toolUrls = locales.flatMap((locale) =>
    toolDefinitions.map((tool) => ({
      url: `${baseUrl}/${locale}/${getToolSlug(tool, locale)}`,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  );

  const localizedBlogLists = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/blogs`,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const localizedBlogPosts = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${baseUrl}/${locale}/blogs/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  );

  return [...mainUrls, ...localizedHomes, ...localizedAccounts, ...localizedBlogLists, ...localizedBlogPosts, ...toolUrls];
}
