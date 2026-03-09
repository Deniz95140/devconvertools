import Link from "next/link";

import { getToolPath } from "@/config/tools";
import type { ToolId } from "@/config/tools";
import { languageFlags, languageNames, type Locale, locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

type HeaderSection = "home" | "tool" | "account" | "blogs" | "blog-post" | "contact";

type AppHeaderProps = {
  locale: Locale;
  toolId?: ToolId;
  section?: HeaderSection;
  blogSlug?: string;
};

const contactLabelByLocale: Record<Locale, string> = {
  en: "Contact",
  fr: "Contact",
  es: "Contacto",
  de: "Kontakt",
  pt: "Contato",
  zh: "\u8054\u7cfb",
  ru: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442",
  ar: "\u062a\u0648\u0627\u0635\u0644",
  hi: "\u0938\u0902\u092a\u0930\u094d\u0915"
};

function toFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function getLanguageHref(lang: Locale, section: HeaderSection, toolId?: ToolId, blogSlug?: string): string {
  if (section === "tool" && toolId) {
    return getToolPath(lang, toolId);
  }

  if (section === "account") {
    return `/${lang}/account`;
  }

  if (section === "blogs") {
    return `/${lang}/blogs`;
  }

  if (section === "contact") {
    return `/${lang}/contact`;
  }

  if (section === "blog-post" && blogSlug) {
    return `/${lang}/blogs/${blogSlug}`;
  }

  return `/${lang}`;
}

export function AppHeader({ locale, toolId, section = "home", blogSlug }: AppHeaderProps) {
  const messages = getMessages(locale);

  return (
    <header className="app-header">
      <div>
        <Link className="brand" href={`/${locale}`}>
          {messages.appName}
        </Link>
        <p className="tagline">{messages.appTagline}</p>
      </div>

      <div className="header-right">
        <div className="header-links">
          <Link href={`/${locale}/blogs`}>{messages.blog}</Link>
          <Link href={`/${locale}/account`}>{messages.account}</Link>
          <Link href={`/${locale}/contact`}>{contactLabelByLocale[locale]}</Link>
        </div>

        <details className="language-menu">
          <summary>
            <span className="lang-flag">{toFlagEmoji(languageFlags[locale])}</span>
            <span>{messages.language}</span>
          </summary>
          <div className="language-menu-list">
            {locales.map((lang) => (
              <Link
                key={lang}
                href={getLanguageHref(lang, section, toolId, blogSlug)}
                className={lang === locale ? "lang-link active" : "lang-link"}
              >
                <span className="lang-flag">{toFlagEmoji(languageFlags[lang])}</span>
                <span>{languageNames[lang]}</span>
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
