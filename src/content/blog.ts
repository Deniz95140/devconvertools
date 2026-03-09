import type { ToolId } from "@/config/tools";
import type { Locale } from "@/i18n/config";

type LocalizedText = Partial<Record<Locale, string>> & { en: string };

export type BlogPostDefinition = {
  slug: string;
  topic: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  tryTools: ToolId[];
};

export type LocalizedBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  tryTools: ToolId[];
};

function pick(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}

function localizedParagraphs(locale: Locale, topic: string): string[] {
  if (locale === "fr") {
    return [
      `${topic} est un sujet central pour les developpeurs qui construisent des APIs, des dashboards et des pipelines de donnees. Bien comprendre le format reduit les erreurs d'integration.`,
      `En pratique, les equipes utilisent ${topic} pour valider des payloads, preparer des fixtures de tests et partager des donnees entre services.`,
      `Le workflow efficace reste simple: valider tot, convertir uniquement quand necessaire, et garder un format de sortie constant.`
    ];
  }

  if (locale === "es") {
    return [
      `${topic} es un concepto clave para equipos que trabajan con APIs y flujos de datos. Comprender bien el formato evita errores comunes.`,
      `En el dia a dia, ${topic} se usa para validar payloads, crear fixtures de testing y comunicar servicios entre si.`,
      `La mejor estrategia es clara: validar pronto, convertir solo cuando haga falta y mantener salidas consistentes.`
    ];
  }

  if (locale === "de") {
    return [
      `${topic} ist ein zentrales Thema fur Entwickler in APIs, Dashboards und Datenpipelines. Gute Formatkenntnis reduziert Integrationsfehler.`,
      `Teams nutzen ${topic} fur Payload-Validierung, Test-Fixtures und Service-zu-Service Kommunikation.`,
      `Ein guter Ablauf bleibt einfach: fruh validieren, nur bei Bedarf konvertieren und konsistente Ausgaben behalten.`
    ];
  }

  if (locale === "pt") {
    return [
      `${topic} e um conceito essencial para desenvolvedores que lidam com APIs e dados. Entender o formato reduz erros de integracao.`,
      `No uso diario, equipes aplicam ${topic} para validar payloads, montar testes e comunicar servicos.`,
      `O fluxo ideal e simples: validar cedo, converter somente quando necessario e manter saidas consistentes.`
    ];
  }

  if (locale === "zh") {
    return [
      `${topic} \u662f\u5f00\u53d1\u8005\u5728 API \u548c\u6570\u636e\u6d41\u7a0b\u4e2d\u5e38\u7528\u7684\u6838\u5fc3\u6982\u5ff5\u3002\u7406\u89e3\u5b83\u80fd\u51cf\u5c11\u96c6\u6210\u9519\u8bef\u3002`,
      `\u56e2\u961f\u5728\u65e5\u5e38\u5de5\u4f5c\u4e2d\u4f1a\u7528 ${topic} \u6765\u505a payload \u6821\u9a8c\u3001\u6d4b\u8bd5 fixture \u4ee5\u53ca\u670d\u52a1\u95f4\u901a\u4fe1\u3002`,
      `\u6700\u4f73\u6d41\u7a0b\u5f88\u7b80\u5355\uff1a\u5c3d\u65e9\u9a8c\u8bc1\uff0c\u6309\u9700\u8f6c\u6362\uff0c\u5e76\u4fdd\u6301\u8f93\u51fa\u683c\u5f0f\u4e00\u81f4\u3002`
    ];
  }

  if (locale === "ru") {
    return [
      `${topic} \u2014 \u0432\u0430\u0436\u043d\u0430\u044f \u0442\u0435\u043c\u0430 \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432, \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0449\u0438\u0445 \u0441 API \u0438 \u0434\u0430\u043d\u043d\u044b\u043c\u0438. \u041f\u043e\u043d\u0438\u043c\u0430\u043d\u0438\u0435 \u0444\u043e\u0440\u043c\u0430\u0442\u0430 \u0441\u043d\u0438\u0436\u0430\u0435\u0442 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043e\u0448\u0438\u0431\u043e\u043a.`,
      `\u041a\u043e\u043c\u0430\u043d\u0434\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044e\u0442 ${topic} \u0434\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 payload, \u0442\u0435\u0441\u0442\u043e\u0432\u044b\u0445 fixture \u0438 \u043e\u0431\u043c\u0435\u043d\u0430 \u0434\u0430\u043d\u043d\u044b\u043c\u0438 \u043c\u0435\u0436\u0434\u0443 \u0441\u0435\u0440\u0432\u0438\u0441\u0430\u043c\u0438.`,
      `\u041b\u0443\u0447\u0448\u0438\u0439 \u043f\u043e\u0434\u0445\u043e\u0434 \u043f\u0440\u043e\u0441\u0442: \u0440\u0430\u043d\u043e \u0432\u0430\u043b\u0438\u0434\u0438\u0440\u043e\u0432\u0430\u0442\u044c, \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e\u0441\u0442\u0438 \u0438 \u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0444\u043e\u0440\u043c\u0430\u0442 \u0432\u044b\u0432\u043e\u0434\u0430 \u0441\u0442\u0430\u0431\u0438\u043b\u044c\u043d\u044b\u043c.`
    ];
  }

  if (locale === "ar") {
    return [
      `${topic} \u0645\u0648\u0636\u0648\u0639 \u0623\u0633\u0627\u0633\u064a \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646 \u0627\u0644\u0630\u064a\u0646 \u064a\u0639\u0645\u0644\u0648\u0646 \u0639\u0644\u0649 API \u0648\u0645\u0633\u0627\u0631\u0627\u062a \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a. \u0641\u0647\u0645 \u0627\u0644\u0635\u064a\u063a\u0629 \u064a\u0642\u0644\u0644 \u0623\u062e\u0637\u0627\u0621 \u0627\u0644\u062a\u0643\u0627\u0645\u0644.`,
      `\u062a\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0641\u0631\u0642 ${topic} \u0644\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 payload \u0648\u0625\u0639\u062f\u0627\u062f test fixtures \u0648\u062a\u0628\u0627\u062f\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0628\u064a\u0646 \u0627\u0644\u062e\u062f\u0645\u0627\u062a.`,
      `\u0623\u0641\u0636\u0644 \u0633\u064a\u0631 \u0639\u0645\u0644 \u0628\u0633\u064a\u0637: \u062a\u062d\u0642\u0642 \u0645\u0628\u0643\u0631\u064b\u0627\u060c \u062a\u062d\u0648\u064a\u0644 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629\u060c \u0648\u0627\u0644\u062d\u0641\u0627\u0638 \u0639\u0644\u0649 \u0646\u062a\u0627\u0626\u062c \u0645\u062a\u0633\u0642\u0629 \u062f\u0627\u0626\u0645\u064b\u0627.`
    ];
  }

  if (locale === "hi") {
    return [
      `${topic} developers ke liye bahut important hai jab woh APIs aur data pipelines par kaam karte hain. Sahi samajh integration errors kam karti hai.`,
      `\u091f\u0940\u092e\u094d\u0938 ${topic} \u0915\u093e \u0909\u092a\u092f\u094b\u0917 payload validation, test fixtures \u0914\u0930 services \u0915\u0947 \u092c\u0940\u091a communication \u0915\u0947 \u0932\u093f\u090f \u0915\u0930\u0924\u0940 \u0939\u0948\u0902\u0964`,
      `\u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u093e workflow \u0938\u0930\u0932 \u0939\u0948: \u091c\u0932\u094d\u0926\u0940 validate \u0915\u0930\u094b, \u091c\u0930\u0942\u0930\u0924 \u092a\u0930 convert \u0915\u0930\u094b, \u0914\u0930 output \u0915\u094b consistent \u0930\u0916\u094b\u0964`
    ];
  }

  return [
    `${topic} is one of the most common concepts developers handle when building APIs, dashboards, and data pipelines. Understanding the format helps reduce integration mistakes.`,
    `In practice, teams use ${topic} for payload validation, test fixtures, and service-to-service communication.`,
    `The best workflow stays simple: validate early, convert only when needed, and keep output formats consistent.`
  ];
}

function loc(
  en: string,
  fr: string,
  es: string,
  de: string,
  pt: string,
  zh: string,
  ru: string,
  ar: string,
  hi: string
): LocalizedText {
  return { en, fr, es, de, pt, zh, ru, ar, hi };
}

export const blogPosts: BlogPostDefinition[] = [
  {
    slug: "what-is-json",
    topic: loc("JSON", "JSON", "JSON", "JSON", "JSON", "JSON", "JSON", "JSON", "JSON"),
    title: loc(
      "What is JSON",
      "Qu'est-ce que JSON",
      "Que es JSON",
      "Was ist JSON",
      "O que e JSON",
      "\u4ec0\u4e48\u662f JSON",
      "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 JSON",
      "\u0645\u0627 \u0647\u0648 JSON\u061f",
      "JSON \u0915\u094d\u092f\u093e \u0939\u0948?"
    ),
    excerpt: loc(
      "JSON is a lightweight text format for structured data used in nearly every API.",
      "JSON est un format texte leger pour les donnees structurees utilise dans presque toutes les APIs.",
      "JSON es un formato ligero para datos estructurados usado en casi todas las APIs.",
      "JSON ist ein leichtes Textformat fur strukturierte Daten und wird in fast allen APIs genutzt.",
      "JSON e um formato leve de texto para dados estruturados usado em quase toda API.",
      "JSON \u662f\u4e00\u79cd\u8f7b\u91cf\u7ea7\u7684\u7ed3\u6784\u5316\u6570\u636e\u6587\u672c\u683c\u5f0f\u3002",
      "JSON \u2014 \u044d\u0442\u043e \u043b\u0451\u0433\u043a\u0438\u0439 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u044b\u0439 \u0444\u043e\u0440\u043c\u0430\u0442 \u0434\u043b\u044f \u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0432 API.",
      "JSON \u0647\u0648 \u062a\u0646\u0633\u064a\u0642 \u0646\u0635\u064a \u062e\u0641\u064a\u0641 \u0644\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u0629 \u0641\u064a API\u0627\u062a.",
      "JSON \u090f\u0915 lightweight text format \u0939\u0948 \u091c\u094b structured data \u0915\u0947 \u0932\u093f\u090f \u0932\u0917\u092d\u0917 \u0939\u0930 API \u092e\u0947\u0902 \u0907\u0938\u094d\u0924\u0947\u092e\u093e\u0932 \u0939\u094b\u0924\u093e \u0939\u0948\u0964"
    ),
    tryTools: ["json-formatter", "json-validator", "json-minifier", "json-to-yaml"]
  },
  {
    slug: "json-vs-yaml",
    topic: loc("JSON and YAML", "JSON et YAML", "JSON y YAML", "JSON und YAML", "JSON e YAML", "JSON ? YAML", "JSON ? YAML", "JSON ? YAML", "JSON ?? YAML"),
    title: loc(
      "JSON vs YAML",
      "JSON vs YAML",
      "JSON vs YAML",
      "JSON vs YAML",
      "JSON vs YAML",
      "JSON vs YAML",
      "JSON vs YAML",
      "JSON vs YAML",
      "JSON vs YAML"
    ),
    excerpt: loc(
      "JSON is strict and machine-friendly, while YAML is more human-readable for config files.",
      "JSON est strict et machine-friendly, alors que YAML est plus lisible pour les fichiers de configuration.",
      "JSON es estricto y amigable para maquinas, mientras YAML es mas legible para configuraciones.",
      "JSON ist strikt und maschinenfreundlich, YAML ist oft besser lesbar fur Konfigurationsdateien.",
      "JSON e mais estrito e YAML e mais legivel para arquivos de configuracao.",
      "JSON geng yange, YAML geng shiyu renlei yuedu peizhi wenjian.",
      "JSON bolee strogii, YAML obychno udobnee dlya konfiguratsii.",
      "JSON \u0623\u0643\u062b\u0631 \u0635\u0631\u0627\u0645\u0629\u060c \u0628\u064a\u0646\u0645\u0627 YAML \u0623\u0633\u0647\u0644 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u064a \u0645\u0644\u0641\u0627\u062a \u0627\u0644\u0625\u0639\u062f\u0627\u062f.",
      "JSON strict hota hai, jabki YAML config files ke liye zyada readable hota hai."
    ),
    tryTools: ["json-to-yaml", "yaml-to-json", "json-formatter", "json-validator"]
  },
  {
    slug: "how-jwt-works",
    topic: loc("JWT", "JWT", "JWT", "JWT", "JWT", "JWT", "JWT", "JWT", "JWT"),
    title: loc(
      "How JWT works",
      "Comment fonctionne JWT",
      "Como funciona JWT",
      "Wie JWT funktioniert",
      "Como JWT funciona",
      "JWT \u5982\u4f55\u5de5\u4f5c",
      "\u041a\u0430\u043a \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 JWT",
      "\u0643\u064a\u0641 \u064a\u0639\u0645\u0644 JWT\u061f",
      "JWT \u0915\u0948\u0938\u0947 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948?"
    ),
    excerpt: loc(
      "A JWT contains header, payload, and signature to carry identity and claims across services.",
      "Un JWT contient header, payload et signature pour transporter des claims entre services.",
      "Un JWT contiene header, payload y firma para transportar identidad entre servicios.",
      "Ein JWT enthalt Header, Payload und Signatur fur Identitatsdaten zwischen Services.",
      "Um JWT contem header, payload e assinatura para carregar claims entre servicos.",
      "JWT baohan header, payload he signature yongyu service zhijian shenfen xinxi.",
      "JWT soderzhit header, payload i podpis dlya peredachi claims mezhdu servisami.",
      "JWT yahtawi header wa payload wa signature li naql alhawiya bayn alkhadamat.",
      "JWT me header, payload aur signature hota hai jo identity claims carry karta hai."
    ),
    tryTools: ["jwt-decoder", "base64", "timestamp-converter", "sha256-generator"]
  },
  {
    slug: "what-is-base64-encoding",
    topic: loc("Base64", "Base64", "Base64", "Base64", "Base64", "Base64", "Base64", "Base64", "Base64"),
    title: loc(
      "What is Base64 encoding",
      "Qu'est-ce que l'encodage Base64",
      "Que es la codificacion Base64",
      "Was ist Base64 Kodierung",
      "O que e codificacao Base64",
      "\u4ec0\u4e48\u662f Base64 \u7f16\u7801",
      "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 \u043a\u043e\u0434\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 Base64",
      "\u0645\u0627 \u0647\u0648 \u062a\u0631\u0645\u064a\u0632 Base64\u061f",
      "Base64 encoding \u0915\u094d\u092f\u093e \u0939\u0948?"
    ),
    excerpt: loc(
      "Base64 converts binary-safe content into plain text for transport and storage compatibility.",
      "Base64 convertit du contenu binaire en texte pour faciliter le transport et le stockage.",
      "Base64 convierte contenido binario a texto para compatibilidad de transporte y almacenamiento.",
      "Base64 wandelt binare Inhalte in Text fur Transport und Speicherung um.",
      "Base64 converte conteudo binario em texto para transporte e armazenamento.",
      "Base64 jiang erjinzhi neirong zhuan cheng wenben yi bian chuanshu he cunchu.",
      "Base64 preobrazuyet dannye v tekst dlya peredachi i hraneniya.",
      "Base64 yuhawwil alm??awa althunaai ila nass lisuhulat alnaql walhifz.",
      "Base64 binary content ko text me convert karta hai taaki transport aur storage easy ho."
    ),
    tryTools: ["base64", "url-encode-decode", "html-encode-decode", "jwt-decoder"]
  },
  {
    slug: "what-is-unix-timestamp",
    topic: loc("Unix timestamp", "Timestamp Unix", "Timestamp Unix", "Unix Timestamp", "Timestamp Unix", "Unix timestamp", "Unix timestamp", "Unix timestamp", "Unix timestamp"),
    title: loc(
      "What is a Unix timestamp",
      "Qu'est-ce qu'un timestamp Unix",
      "Que es un timestamp Unix",
      "Was ist ein Unix Timestamp",
      "O que e um timestamp Unix",
      "\u4ec0\u4e48\u662f Unix \u65f6\u95f4\u6233",
      "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 Unix timestamp",
      "\u0645\u0627 \u0647\u0648 Unix timestamp\u061f",
      "Unix timestamp \u0915\u094d\u092f\u093e \u0939\u0948?"
    ),
    excerpt: loc(
      "Unix time stores dates as seconds or milliseconds since January 1, 1970 UTC.",
      "Le temps Unix stocke les dates en secondes ou millisecondes depuis le 1 janvier 1970 UTC.",
      "El tiempo Unix guarda fechas como segundos o milisegundos desde el 1 de enero de 1970 UTC.",
      "Unix-Zeit speichert Datumswerte als Sekunden oder Millisekunden seit dem 1. Januar 1970 UTC.",
      "Tempo Unix guarda datas como segundos ou milissegundos desde 1 de janeiro de 1970 UTC.",
      "Unix shijian yi 1970-01-01 UTC qiyi de miao huo haomiao baocun shijian.",
      "Unix vremya hranit daty kak sekundy ili millisekundy s 1 yanvarya 1970 UTC.",
      "\u0648\u0642\u062a Unix \u064a\u062e\u0632\u0646 \u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0628\u0627\u0644\u062b\u0648\u0627\u0646\u064a \u0623\u0648 \u0627\u0644\u0645\u0644\u0644\u064a \u062b\u0627\u0646\u064a\u0629 \u0645\u0646\u0630 1 \u064a\u0646\u0627\u064a\u0631 1970 \u0628\u062a\u0648\u0642\u064a\u062a UTC.",
      "Unix time date ko 1 January 1970 UTC se seconds ya milliseconds me store karta hai."
    ),
    tryTools: ["timestamp-converter", "jwt-decoder", "json-validator", "regex-tester"]
  },
  {
    slug: "what-is-csv",
    topic: loc("CSV", "CSV", "CSV", "CSV", "CSV", "CSV", "CSV", "CSV", "CSV"),
    title: loc(
      "What is CSV",
      "Qu'est-ce que CSV",
      "Que es CSV",
      "Was ist CSV",
      "O que e CSV",
      "\u4ec0\u4e48\u662f CSV",
      "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 CSV",
      "\u0645\u0627 \u0647\u0648 CSV\u061f",
      "CSV \u0915\u094d\u092f\u093e \u0939\u0948?"
    ),
    excerpt: loc(
      "CSV stores tabular data in plain text rows and columns separated by delimiters.",
      "CSV stocke des donnees tabulaires en texte avec lignes et colonnes separees par delimiters.",
      "CSV guarda datos tabulares en texto con filas y columnas separadas por delimitadores.",
      "CSV speichert tabellarische Daten als Text mit Zeilen und Spalten.",
      "CSV guarda dados tabulares em texto com linhas e colunas separadas por delimitadores.",
      "CSV yong fen ge fu jiang biaoge shuju cunwei wenben hanglie.",
      "CSV hranit tablichnye dannye v tekstovom vide s razdelitelyami.",
      "CSV yukhazzin bayanat jadwaliya binass bisufuf wa aemida.",
      "CSV tabular data ko plain text rows aur columns me store karta hai."
    ),
    tryTools: ["csv-to-json", "json-to-csv", "json-formatter", "json-validator"]
  },
  {
    slug: "what-is-xml",
    topic: loc("XML", "XML", "XML", "XML", "XML", "XML", "XML", "XML", "XML"),
    title: loc(
      "What is XML",
      "Qu'est-ce que XML",
      "Que es XML",
      "Was ist XML",
      "O que e XML",
      "\u4ec0\u4e48\u662f XML",
      "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435 XML",
      "\u0645\u0627 \u0647\u0648 XML\u061f",
      "XML \u0915\u094d\u092f\u093e \u0939\u0948?"
    ),
    excerpt: loc(
      "XML is a markup format for hierarchical data still common in enterprise integrations.",
      "XML est un format de balisage pour donnees hierarchiques encore frequent en integration entreprise.",
      "XML es un formato de marcado para datos jerarquicos aun usado en integraciones empresariales.",
      "XML ist ein Markup-Format fur hierarchische Daten und weiter verbreitet in Enterprise-Integrationen.",
      "XML e um formato de marcacao para dados hierarquicos comum em integracoes enterprise.",
      "XML shi yongyu cengji shuju de biaoji geshi, zai qiye jicheng zhong reng changjian.",
      "XML \u2014 \u044d\u0442\u043e \u0444\u043e\u0440\u043c\u0430\u0442 \u0440\u0430\u0437\u043c\u0435\u0442\u043a\u0438 \u0434\u043b\u044f \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0434\u0430\u043d\u043d\u044b\u0445, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0432\u0441\u0451 \u0435\u0449\u0451 \u0447\u0430\u0441\u0442\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0432 enterprise-\u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f\u0445.",
      "XML siqat mark-up lilbayanat altartibiya wa ma zala mustakhdama fi alsharikat.",
      "XML hierarchical data ke liye markup format hai jo enterprise integrations me abhi bhi common hai."
    ),
    tryTools: ["xml-to-json", "json-formatter", "json-validator", "regex-tester"]
  },
  {
    slug: "json-vs-xml",
    topic: loc("JSON and XML", "JSON et XML", "JSON y XML", "JSON und XML", "JSON e XML", "JSON ? XML", "JSON ? XML", "JSON ? XML", "JSON ?? XML"),
    title: loc(
      "JSON vs XML",
      "JSON vs XML",
      "JSON vs XML",
      "JSON vs XML",
      "JSON vs XML",
      "JSON vs XML",
      "JSON vs XML",
      "JSON vs XML",
      "JSON vs XML"
    ),
    excerpt: loc(
      "JSON is compact and modern API-friendly, while XML provides verbose structural control.",
      "JSON est compact et moderne pour APIs, tandis que XML offre un controle structurel plus verbeux.",
      "JSON es compacto y moderno para APIs, mientras XML da control estructural mas detallado.",
      "JSON ist kompakt und API-freundlich, XML bietet ausfuhrlichere Strukturkontrolle.",
      "JSON e compacto e moderno para APIs, enquanto XML oferece controle estrutural mais detalhado.",
      "JSON geng jingjian shihe xiandai API, XML tigong geng xiangxi de jiegou kongzhi.",
      "JSON kompaktnee dlya API, a XML daet bolee podrobnyy strukturnyy kontrol.",
      "JSON mukhtasar wa munasib lil API alhaditha, wa XML yuqaddim tahakkuman binyawiyan akthar tafsilan.",
      "JSON compact aur API-friendly hai, jabki XML zyada verbose structural control deta hai."
    ),
    tryTools: ["xml-to-json", "json-to-yaml", "json-formatter", "json-validator"]
  }
];

export function getLocalizedBlogPosts(locale: Locale): LocalizedBlogPost[] {
  return blogPosts.map((post) => {
    const topic = pick(post.topic, locale);

    return {
      slug: post.slug,
      title: pick(post.title, locale),
      excerpt: pick(post.excerpt, locale),
      paragraphs: localizedParagraphs(locale, topic),
      tryTools: post.tryTools
    };
  });
}

export function getLocalizedBlogPostBySlug(locale: Locale, slug: string): LocalizedBlogPost | undefined {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return undefined;
  }

  const topic = pick(post.topic, locale);

  return {
    slug: post.slug,
    title: pick(post.title, locale),
    excerpt: pick(post.excerpt, locale),
    paragraphs: localizedParagraphs(locale, topic),
    tryTools: post.tryTools
  };
}

type BlogUiCopy = {
  listTitle: string;
  listSubtitle: string;
  tryTools: string;
};

export function getBlogUiCopy(locale: Locale): BlogUiCopy {
  if (locale === "fr") {
    return {
      listTitle: "Blog developpeur",
      listSubtitle: "Guides rapides pour comprendre les formats techniques courants.",
      tryTools: "Tester les outils"
    };
  }

  if (locale === "es") {
    return {
      listTitle: "Blog para developers",
      listSubtitle: "Guias rapidas para entender formatos tecnicos comunes.",
      tryTools: "Probar herramientas"
    };
  }

  if (locale === "de") {
    return {
      listTitle: "Developer Blog",
      listSubtitle: "Kurze Guides zu wichtigen technischen Datenformaten.",
      tryTools: "Tools testen"
    };
  }

  if (locale === "pt") {
    return {
      listTitle: "Blog para developers",
      listSubtitle: "Guias rapidos para entender formatos tecnicos comuns.",
      tryTools: "Testar ferramentas"
    };
  }

  if (locale === "zh") {
    return {
      listTitle: "\u5f00\u53d1\u8005\u535a\u5ba2",
      listSubtitle: "\u5e2e\u52a9\u4f60\u5feb\u901f\u7406\u89e3\u5e38\u89c1\u6280\u672f\u683c\u5f0f\u7684\u7b80\u660e\u6307\u5357\u3002",
      tryTools: "\u8bd5\u8bd5\u8fd9\u4e9b\u5de5\u5177"
    };
  }

  if (locale === "ru") {
    return {
      listTitle: "\u0411\u043b\u043e\u0433 \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432",
      listSubtitle: "\u041a\u0440\u0430\u0442\u043a\u0438\u0435 \u0433\u0430\u0439\u0434\u044b \u043f\u043e \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u043c \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u043c \u0444\u043e\u0440\u043c\u0430\u0442\u0430\u043c.",
      tryTools: "\u041f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b"
    };
  }

  if (locale === "ar") {
    return {
      listTitle: "\u0645\u062f\u0648\u0646\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646",
      listSubtitle: "\u0623\u062f\u0644\u0629 \u0633\u0631\u064a\u0639\u0629 \u0644\u0641\u0647\u0645 \u0623\u0647\u0645 \u0627\u0644\u0635\u064a\u063a \u0627\u0644\u062a\u0642\u0646\u064a\u0629.",
      tryTools: "\u062c\u0631\u0651\u0628 \u0627\u0644\u0623\u062f\u0648\u0627\u062a"
    };
  }

  if (locale === "hi") {
    return {
      listTitle: "Developer blog",
      listSubtitle: "\u0906\u092e technical formats \u0915\u094b \u0938\u092e\u091d\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u091b\u094b\u091f\u0940 guides\u0964",
      tryTools: "\u091f\u0942\u0932 \u0906\u091c\u092e\u093e\u090f\u0902"
    };
  }

  return {
    listTitle: "Developer Blog",
    listSubtitle: "Technical guides to help developers understand common data formats and tooling workflows.",
    tryTools: "Try the tools"
  };
}




