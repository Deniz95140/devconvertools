import Link from "next/link";

import { getRelatedTools, getToolPath, getToolName, toolById, type ToolId } from "@/config/tools";
import type { Locale } from "@/i18n/config";

type ToolSeoSectionProps = {
  locale: Locale;
  toolId: ToolId;
};

type SeoCopy = {
  whatTitle: string;
  howTitle: string;
  useCasesTitle: string;
  relatedTitle: string;
  topicPrefix: string;
  whatTemplate: string;
  howTemplate: string;
  useCasesTemplate: string;
  topicTemplate: string;
  topicLabels: Record<string, string>;
};

function fill(template: string, toolName: string, topic: string): string {
  return template.replaceAll("{tool}", toolName).replaceAll("{topic}", topic);
}

function getBaseTopic(toolId: ToolId): string {
  if (toolId.includes("json")) return "json";
  if (toolId.includes("yaml")) return "yaml";
  if (toolId.includes("csv")) return "csv";
  if (toolId.includes("xml")) return "xml";
  if (toolId.includes("jwt")) return "jwt";
  if (toolId.includes("timestamp")) return "timestamp";
  if (toolId.includes("regex")) return "regex";
  if (toolId.includes("password")) return "password";
  if (toolId.includes("uuid")) return "uuid";
  return "data";
}

function getSeoCopy(locale: Locale): SeoCopy {
  if (locale === "zh") {
    return {
      whatTitle: "\u8fd9\u4e2a\u5de5\u5177\u662f\u4ec0\u4e48",
      howTitle: "\u5de5\u4f5c\u65b9\u5f0f",
      useCasesTitle: "\u5e38\u89c1\u5f00\u53d1\u573a\u666f",
      relatedTitle: "\u76f8\u5173\u5de5\u5177",
      topicPrefix: "\u4ec0\u4e48\u662f",
      whatTemplate: "{tool}\u662f\u9762\u5411\u5f00\u53d1\u8005\u7684\u8f7b\u91cf\u5de5\u5177\uff0c\u53ef\u5728\u6d4f\u89c8\u5668\u5185\u5feb\u901f\u8f6c\u6362\u683c\u5f0f\u3002",
      howTemplate: "\u5904\u7406\u6d41\u7a0b\u5728\u672c\u5730\u6267\u884c\uff1a\u6821\u9a8c\u3001\u89c4\u8303\u5316\u3001\u8f93\u51fa\u3002",
      useCasesTemplate: "\u9002\u7528\u4e8e API \u8c03\u8bd5\u3001\u6d4b\u8bd5\u6570\u636e\u51c6\u5907\u3001legacy \u6570\u636e\u8f6c\u6362\u548c webhook \u9a8c\u8bc1\u3002",
      topicTemplate: "{topic}\u662f\u5f00\u53d1\u4e2d\u7684\u57fa\u7840\u80fd\u529b\uff0c\u7406\u89e3\u5b83\u80fd\u964d\u4f4e\u89e3\u6790\u548c\u96c6\u6210\u9519\u8bef\u3002",
      topicLabels: {
        json: "JSON",
        yaml: "YAML",
        csv: "CSV",
        xml: "XML",
        jwt: "JWT",
        timestamp: "Unix \u65f6\u95f4\u6233",
        regex: "\u6b63\u5219\u8868\u8fbe\u5f0f",
        password: "\u5b89\u5168\u5bc6\u7801",
        uuid: "UUID",
        data: "\u6570\u636e\u683c\u5f0f"
      }
    };
  }

  if (locale === "ru") {
    return {
      whatTitle: "\u0427\u0442\u043e \u044d\u0442\u043e \u0437\u0430 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442",
      howTitle: "\u041a\u0430\u043a \u044d\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442",
      useCasesTitle: "\u0422\u0438\u043f\u043e\u0432\u044b\u0435 \u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0438",
      relatedTitle: "\u041f\u043e\u0445\u043e\u0436\u0438\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b",
      topicPrefix: "\u0427\u0442\u043e \u0442\u0430\u043a\u043e\u0435",
      whatTemplate: "{tool} \u2014 \u043b\u0435\u0433\u043a\u0438\u0439 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442 \u0434\u043b\u044f \u0431\u044b\u0441\u0442\u0440\u043e\u0439 \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438 \u0444\u043e\u0440\u043c\u0430\u0442\u043e\u0432.",
      howTemplate: "\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0438\u0434\u0435\u0442 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e: \u0432\u0430\u043b\u0438\u0434\u0430\u0446\u0438\u044f, \u043d\u043e\u0440\u043c\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f, \u0432\u044b\u0432\u043e\u0434.",
      useCasesTemplate: "\u041f\u043e\u043b\u0435\u0437\u043d\u043e \u0434\u043b\u044f API-\u0434\u0435\u0431\u0430\u0433\u0430, \u0442\u0435\u0441\u0442\u043e\u0432, legacy-\u044d\u043a\u0441\u043f\u043e\u0440\u0442\u043e\u0432 \u0438 webhook-\u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438.",
      topicTemplate: "{topic} \u2014 \u0432\u0430\u0436\u043d\u0430\u044f \u0447\u0430\u0441\u0442\u044c \u0441\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e\u0439 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438, \u043f\u043e\u043d\u0438\u043c\u0430\u043d\u0438\u0435 \u0435\u0433\u043e \u0441\u043d\u0438\u0436\u0430\u0435\u0442 \u043e\u0448\u0438\u0431\u043a\u0438.",
      topicLabels: {
        json: "JSON",
        yaml: "YAML",
        csv: "CSV",
        xml: "XML",
        jwt: "JWT",
        timestamp: "Unix-\u0432\u0440\u0435\u043c\u044f",
        regex: "\u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u044f",
        password: "\u043d\u0430\u0434\u0435\u0436\u043d\u044b\u0435 \u043f\u0430\u0440\u043e\u043b\u0438",
        uuid: "UUID",
        data: "\u0444\u043e\u0440\u043c\u0430\u0442\u044b \u0434\u0430\u043d\u043d\u044b\u0445"
      }
    };
  }

  if (locale === "ar") {
    return {
      whatTitle: "\u0645\u0627 \u0647\u0648 \u0647\u0630\u0627 \u0627\u0644\u0623\u062f\u0627\u0629",
      howTitle: "\u0643\u064a\u0641 \u064a\u0639\u0645\u0644",
      useCasesTitle: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0627\u062a \u0634\u0627\u0626\u0639\u0629",
      relatedTitle: "\u0623\u062f\u0648\u0627\u062a \u0645\u0631\u062a\u0628\u0637\u0629",
      topicPrefix: "\u0645\u0627 \u0647\u0648",
      whatTemplate: "{tool} \u0623\u062f\u0627\u0629 \u062e\u0641\u064a\u0641\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646 \u0644\u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0635\u064a\u063a \u0628\u0633\u0631\u0639\u0629.",
      howTemplate: "\u064a\u062a\u0645 \u0627\u0644\u062a\u062d\u0648\u064a\u0644 \u0645\u062d\u0644\u064a\u0627: \u062a\u062d\u0642\u064a\u0642\u060c \u062a\u0637\u0628\u064a\u0639\u060c \u0648\u0625\u062e\u0631\u0627\u062c \u0646\u0638\u064a\u0641.",
      useCasesTemplate: "\u0645\u0641\u064a\u062f \u0641\u064a API debugging\u060c \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a\u060c \u062a\u062d\u0648\u064a\u0644 legacy \u0648\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 webhook.",
      topicTemplate: "{topic} \u0623\u0633\u0627\u0633\u064a \u0641\u064a \u0627\u0644\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u062d\u062f\u064a\u062b\u060c \u0648\u0641\u0647\u0645\u0647 \u064a\u0642\u0644\u0644 \u0627\u0644\u0623\u062e\u0637\u0627\u0621.",
      topicLabels: {
        json: "JSON",
        yaml: "YAML",
        csv: "CSV",
        xml: "XML",
        jwt: "JWT",
        timestamp: "Unix \u0637\u0627\u0628\u0639 \u0632\u0645\u0646\u064a",
        regex: "\u0627\u0644\u062a\u0639\u0627\u0628\u064a\u0631 \u0627\u0644\u0646\u0638\u0627\u0645\u064a\u0629",
        password: "\u0643\u0644\u0645\u0627\u062a \u0645\u0631\u0648\u0631 \u0642\u0648\u064a\u0629",
        uuid: "UUID",
        data: "\u0635\u064a\u063a \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a"
      }
    };
  }

  if (locale === "hi") {
    return {
      whatTitle: "\u092f\u0939 \u091f\u0942\u0932 \u0915\u094d\u092f\u093e \u0915\u0930\u0924\u093e \u0939\u0948",
      howTitle: "\u092f\u0939 \u0915\u0948\u0938\u0947 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948",
      useCasesTitle: "\u0915\u0949\u092e\u0928 \u092f\u0942\u091c\u093c \u0915\u0947\u0938",
      relatedTitle: "\u0930\u093f\u0932\u0947\u091f\u0947\u0921 \u091f\u0942\u0932\u094d\u0938",
      topicPrefix: "\u0915\u094d\u092f\u093e \u0939\u0948",
      whatTemplate: "{tool} \u090f\u0915 \u0932\u093e\u0907\u091f\u0935\u0947\u091f \u0921\u0947\u0935\u0932\u092a\u0930 \u091f\u0942\u0932 \u0939\u0948 \u091c\u094b \u0924\u0941\u0930\u0902\u0924 \u0915\u0928\u094d\u0935\u0930\u094d\u091c\u093c\u0928 \u0915\u0930\u0924\u093e \u0939\u0948\u0964",
      howTemplate: "\u092a\u094d\u0930\u094b\u0938\u0947\u0938\u093f\u0902\u0917 \u0932\u094b\u0915\u0932 \u092c\u094d\u0930\u093e\u0909\u091c\u093c\u0930 \u092e\u0947\u0902 \u0939\u094b\u0924\u0940 \u0939\u0948: \u0935\u0948\u0932\u093f\u0921\u0947\u091f, \u0928\u0949\u0930\u094d\u092e\u0932\u093e\u0907\u091c\u093c, \u0915\u094d\u0932\u0940\u0928 \u0906\u0909\u091f\u092a\u0941\u091f\u0964",
      useCasesTemplate: "API debugging, test fixtures, legacy export conversion, webhook validation aur team sharing ke liye useful.",
      topicTemplate: "{topic} modern development ka important hissa hai aur isko samajhne se errors kam hote hain.",
      topicLabels: {
        json: "JSON",
        yaml: "YAML",
        csv: "CSV",
        xml: "XML",
        jwt: "JWT",
        timestamp: "Unix timestamp",
        regex: "regular expressions",
        password: "strong passwords",
        uuid: "UUID",
        data: "data formats"
      }
    };
  }

  return {
    whatTitle: "What is this tool",
    howTitle: "How it works",
    useCasesTitle: "Common developer use cases",
    relatedTitle: "Related tools",
    topicPrefix: "What is",
    whatTemplate: "{tool} is a lightweight utility for developers. Paste input, convert instantly, then copy or download the output.",
    howTemplate: "The conversion runs locally in your browser with validation, normalization and clean output rendering.",
    useCasesTemplate: "Useful for API debugging, test fixtures, legacy exports, webhook validation and reproducible examples.",
    topicTemplate: "{topic} is a core part of modern software and understanding it helps reduce parsing and integration errors.",
    topicLabels: {
      json: "JSON",
      yaml: "YAML",
      csv: "CSV",
      xml: "XML",
      jwt: "JWT",
      timestamp: "Unix timestamps",
      regex: "regular expressions",
      password: "secure passwords",
      uuid: "UUID",
      data: "data formats"
    }
  };
}

export function ToolSeoSection({ locale, toolId }: ToolSeoSectionProps) {
  const tool = toolById[toolId];
  const toolName = getToolName(tool, locale);
  const relatedTools = getRelatedTools(toolId).slice(0, 4);
  const copy = getSeoCopy(locale);
  const topic = copy.topicLabels[getBaseTopic(toolId)] ?? copy.topicLabels.data;

  return (
    <section className="tool-seo-section">
      <h2>{copy.whatTitle}</h2>
      <p>{fill(copy.whatTemplate, toolName, topic)}</p>

      <h2>{copy.howTitle}</h2>
      <p>{fill(copy.howTemplate, toolName, topic)}</p>

      <h2>{copy.useCasesTitle}</h2>
      <p>{fill(copy.useCasesTemplate, toolName, topic)}</p>

      <h2>
        {copy.topicPrefix} {topic}
      </h2>
      <p>{fill(copy.topicTemplate, toolName, topic)}</p>

      <h2>{copy.relatedTitle}</h2>
      <div className="related-tools-grid">
        {relatedTools.map((relatedTool) => (
          <Link key={relatedTool.id} href={getToolPath(locale, relatedTool.id)} className="related-tool-card">
            <strong>{getToolName(relatedTool, locale)}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
