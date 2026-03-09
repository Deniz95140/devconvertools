import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/AppHeader";
import { isLocale, locales, type Locale } from "@/i18n/config";

type ContactPageProps = {
  params: Promise<{
    lang: string;
  }>;
};

type ContactCopy = {
  title: string;
  subtitle: string;
  aboutTitle: string;
  aboutText: string;
  contactTitle: string;
  contactText: string;
};

const contactCopyByLocale: Record<Locale, ContactCopy> = {
  en: {
    title: "About & Contact",
    subtitle: "DevConverTools is a fast and minimal toolbox for developers.",
    aboutTitle: "About",
    aboutText: "This site focuses on speed, simplicity, and reliable format conversions for daily developer workflows.",
    contactTitle: "Contact",
    contactText: "For any request, partnership, or feedback: devconvertools@gmail.com"
  },
  fr: {
    title: "A propos & Contact",
    subtitle: "DevConverTools est une toolbox rapide et minimaliste pour developpeurs.",
    aboutTitle: "A propos",
    aboutText: "Ce site permet de convertir rapidement les formats techniques avec une experience simple et fiable pour les developpeurs.",
    contactTitle: "Contact",
    contactText: "Pour toute demande, partenariat ou retour: devconvertools@gmail.com"
  },
  es: {
    title: "Acerca de & Contacto",
    subtitle: "DevConverTools es una toolbox rapida y minimalista para developers.",
    aboutTitle: "Acerca de",
    aboutText: "Este sitio permite convertir formatos tecnicos con rapidez, simplicidad y fiabilidad para el trabajo diario de desarrollo.",
    contactTitle: "Contacto",
    contactText: "Para consultas, colaboraciones o feedback: devconvertools@gmail.com"
  },
  de: {
    title: "Uber uns & Kontakt",
    subtitle: "DevConverTools ist eine schnelle und minimalistische Toolbox fur Entwickler.",
    aboutTitle: "Uber uns",
    aboutText: "Diese Website ermoglicht schnelle, einfache und zuverlassige Konvertierungen fur den Entwickleralltag.",
    contactTitle: "Kontakt",
    contactText: "Fur Anfragen, Partnerschaften oder Feedback: devconvertools@gmail.com"
  },
  pt: {
    title: "Sobre & Contato",
    subtitle: "DevConverTools e uma toolbox rapida e minimalista para developers.",
    aboutTitle: "Sobre",
    aboutText: "Este site permite converter formatos tecnicos com velocidade, simplicidade e confiabilidade no fluxo diario de desenvolvimento.",
    contactTitle: "Contato",
    contactText: "Para duvidas, parcerias ou feedback: devconvertools@gmail.com"
  },
  zh: {
    title: "\u5173\u4e8e\u4e0e\u8054\u7cfb",
    subtitle: "DevConverTools \u662f\u4e3a\u5f00\u53d1\u8005\u6253\u9020\u7684\u9ad8\u901f\u6781\u7b80\u5de5\u5177\u7bb1\u3002",
    aboutTitle: "\u5173\u4e8e",
    aboutText: "\u8be5\u7f51\u7ad9\u63d0\u4f9b\u5feb\u901f\u3001\u7b80\u6d01\u4e14\u53ef\u9760\u7684\u683c\u5f0f\u8f6c\u6362\uff0c\u670d\u52a1\u4e8e\u5f00\u53d1\u8005\u7684\u65e5\u5e38\u5de5\u4f5c\u6d41\u3002",
    contactTitle: "\u8054\u7cfb",
    contactText: "\u5982\u6709\u9700\u6c42\u3001\u5408\u4f5c\u6216\u53cd\u9988\uff1adevconvertools@gmail.com"
  },
  ru: {
    title: "\u041e \u0441\u0430\u0439\u0442\u0435 \u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
    subtitle: "DevConverTools \u2014 \u0431\u044b\u0441\u0442\u0440\u0430\u044f \u0438 \u043c\u0438\u043d\u0438\u043c\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u0430\u044f toolbox \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432.",
    aboutTitle: "\u041e \u0441\u0430\u0439\u0442\u0435",
    aboutText: "\u042d\u0442\u043e\u0442 \u0441\u0430\u0439\u0442 \u043f\u043e\u0437\u0432\u043e\u043b\u044f\u0435\u0442 \u0431\u044b\u0441\u0442\u0440\u043e \u0438 \u043d\u0430\u0434\u0451\u0436\u043d\u043e \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0444\u043e\u0440\u043c\u0430\u0442\u044b \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u044b \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u0430.",
    contactTitle: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442",
    contactText: "\u0414\u043b\u044f \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432, \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0441\u0442\u0432 \u0438\u043b\u0438 \u043e\u0442\u0437\u044b\u0432\u043e\u0432: devconvertools@gmail.com"
  },
  ar: {
    title: "\u0645\u0646 \u0646\u062d\u0646 \u0648\u0627\u0644\u062a\u0648\u0627\u0635\u0644",
    subtitle: "DevConverTools \u0623\u062f\u0627\u0629 \u0633\u0631\u064a\u0639\u0629 \u0648\u0628\u0633\u064a\u0637\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646.",
    aboutTitle: "\u0645\u0646 \u0646\u062d\u0646",
    aboutText: "\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639 \u064a\u0648\u0641\u0631 \u062a\u062d\u0648\u064a\u0644\u0627\u062a \u0633\u0631\u064a\u0639\u0629 \u0648\u0628\u0633\u064a\u0637\u0629 \u0648\u0645\u0648\u062b\u0648\u0642\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646 \u0641\u064a \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647\u0645 \u0627\u0644\u064a\u0648\u0645\u064a.",
    contactTitle: "\u0627\u0644\u062a\u0648\u0627\u0635\u0644",
    contactText: "\u0644\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a \u0623\u0648 \u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062a \u0623\u0648 \u0627\u0644\u0645\u0644\u0627\u062d\u0638\u0627\u062a: devconvertools@gmail.com"
  },
  hi: {
    title: "\u0939\u092e\u093e\u0930\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u0914\u0930 \u0938\u0902\u092a\u0930\u094d\u0915",
    subtitle: "DevConverTools developers \u0915\u0947 \u0932\u093f\u090f \u090f\u0915 fast \u0914\u0930 minimal toolbox \u0939\u0948\u0964",
    aboutTitle: "\u0939\u092e\u093e\u0930\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902",
    aboutText: "\u092f\u0939 \u0938\u093e\u0907\u091f developers \u0915\u0947 \u0932\u093f\u090f \u0924\u0947\u091c, simple \u0914\u0930 reliable format conversions \u092a\u094d\u0930\u0926\u093e\u0928 \u0915\u0930\u0924\u0940 \u0939\u0948\u0964",
    contactTitle: "\u0938\u0902\u092a\u0930\u094d\u0915",
    contactText: "\u0915\u093f\u0938\u0940 \u092d\u0940 request, partnership \u092f\u093e feedback \u0915\u0947 \u0932\u093f\u090f: devconvertools@gmail.com"
  }
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const locale = lang as Locale;
  const copy = contactCopyByLocale[locale];

  return {
    title: copy.title,
    description: copy.subtitle,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: Object.fromEntries(locales.map((currentLang) => [currentLang, `/${currentLang}/contact`]))
    }
  };
}

export default async function LocalizedContactPage({ params }: ContactPageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;
  const copy = contactCopyByLocale[locale];

  return (
    <>
      <AppHeader locale={locale} section="contact" />

      <section className="hero">
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </section>

      <section className="account-panel">
        <div className="account-card">
          <h2>{copy.aboutTitle}</h2>
          <p>{copy.aboutText}</p>
        </div>

        <div className="account-card" style={{ marginTop: "1rem" }}>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactText}</p>
        </div>
      </section>
    </>
  );
}

