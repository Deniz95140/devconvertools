"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { getToolDescription, getToolPath, getToolName, toolDefinitions } from "@/config/tools";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { formatCount } from "@/lib/utils";

type ToolGridProps = {
  locale: Locale;
};

export function ToolGrid({ locale }: ToolGridProps) {
  const [query, setQuery] = useState("");
  const messages = getMessages(locale);

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return toolDefinitions;
    }

    return toolDefinitions.filter((tool) => {
      const text = [tool.id, getToolName(tool, locale), getToolDescription(tool, locale)].join(" ").toLowerCase();
      return text.includes(normalized);
    });
  }, [locale, query]);

  return (
    <section aria-label="Tools">
      <div className="tool-search-wrap">
        <input
          className="tool-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={messages.searchPlaceholder}
          aria-label={messages.searchPlaceholder}
        />
        <p className="tool-search-count">
          {formatCount(filteredTools.length, locale)} {messages.toolsLabel}
        </p>
      </div>

      <div className="tool-grid">
        {filteredTools.map((tool) => (
          <Link key={tool.id} href={getToolPath(locale, tool.id)} className="tool-card">
            <h2>{getToolName(tool, locale)}</h2>
            <p>{getToolDescription(tool, locale)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
