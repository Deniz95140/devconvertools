import { notFound } from "next/navigation";

import { isLocale } from "@/i18n/config";

type LangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dir = lang === "ar" ? "rtl" : "ltr";
  const className = lang === "ar" ? "page-shell page-shell-ar" : "page-shell";

  return (
    <main className={className} dir={dir} lang={lang}>
      {children}
    </main>
  );
}
