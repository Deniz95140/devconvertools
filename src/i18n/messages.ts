import type { Locale } from "@/i18n/config";

export type Messages = {
  appName: string;
  appTagline: string;
  toolsCount: string;
  toolsLabel: string;
  selectTool: string;
  input: string;
  output: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  upload: string;
  dropHint: string;
  copy: string;
  copied: string;
  download: string;
  language: string;
  mode: string;
  errorPrefix: string;
  emptyOutput: string;
  sourceFile: string;
  quickSwitch: string;
  seoDescription: string;
  searchPlaceholder: string;
  blogHomeTitle: string;
  blogHomeSubtitle: string;
  blog: string;
  account: string;
  readQuickNote: string;
  seeMore: string;
};

const messages: Record<Locale, Messages> = {
  en: {
    appName: "DevConverTools",
    appTagline: "Fast developer converters, built for focus.",
    toolsCount: "Developer tools",
    toolsLabel: "tools",
    selectTool: "Select tool",
    input: "Input",
    output: "Output",
    inputPlaceholder: "Paste code or drop a file...",
    outputPlaceholder: "Converted output will appear here.",
    upload: "Upload file",
    dropHint: "Drag and drop a file here",
    copy: "Copy",
    copied: "Copied",
    download: "Download",
    language: "Language",
    mode: "Mode",
    errorPrefix: "Conversion error",
    emptyOutput: "Provide some input to get a result.",
    sourceFile: "Loaded file",
    quickSwitch: "Output format",
    seoDescription: "Instant format converters for developers. JSON, YAML, CSV, XML, JWT, Base64 and timestamps.",
    searchPlaceholder: "Search developer tools...",
    blogHomeTitle: "Developer essentials",
    blogHomeSubtitle: "Quick answers to common data-format questions.",
    blog: "Blog",
    account: "Account",
    readQuickNote: "Read quick note",
    seeMore: "See more"
  },
  fr: {
    appName: "DevConverTools",
    appTagline: "Convertisseurs rapides pour developpeurs.",
    toolsCount: "Outils developpeur",
    toolsLabel: "outils",
    selectTool: "Choisir un outil",
    input: "Entree",
    output: "Sortie",
    inputPlaceholder: "Collez du code ou deposez un fichier...",
    outputPlaceholder: "Le resultat apparait ici.",
    upload: "Importer un fichier",
    dropHint: "Glissez-deposez un fichier ici",
    copy: "Copier",
    copied: "Copie",
    download: "Telecharger",
    language: "Langue",
    mode: "Mode",
    errorPrefix: "Erreur de conversion",
    emptyOutput: "Ajoutez du contenu pour obtenir un resultat.",
    sourceFile: "Fichier charge",
    quickSwitch: "Format de sortie",
    seoDescription: "Convertisseurs instantanes pour developpeurs: JSON, YAML, CSV, XML, JWT, Base64 et timestamps.",
    searchPlaceholder: "Rechercher un outil developpeur...",
    blogHomeTitle: "Essentiels developpeur",
    blogHomeSubtitle: "Reponses rapides aux questions frequentes.",
    blog: "Blog",
    account: "Compte",
    readQuickNote: "Lire la reponse",
    seeMore: "Voir plus"
  },
  es: {
    appName: "DevConverTools",
    appTagline: "Conversores rapidos para desarrolladores.",
    toolsCount: "Herramientas",
    toolsLabel: "herramientas",
    selectTool: "Seleccionar herramienta",
    input: "Entrada",
    output: "Salida",
    inputPlaceholder: "Pega codigo o arrastra un archivo...",
    outputPlaceholder: "El resultado aparece aqui.",
    upload: "Subir archivo",
    dropHint: "Arrastra y suelta un archivo aqui",
    copy: "Copiar",
    copied: "Copiado",
    download: "Descargar",
    language: "Idioma",
    mode: "Modo",
    errorPrefix: "Error de conversion",
    emptyOutput: "Escribe contenido para obtener un resultado.",
    sourceFile: "Archivo cargado",
    quickSwitch: "Formato de salida",
    seoDescription: "Conversores instantaneos para desarrolladores: JSON, YAML, CSV, XML, JWT, Base64 y timestamps.",
    searchPlaceholder: "Buscar herramientas developer...",
    blogHomeTitle: "Esenciales para developers",
    blogHomeSubtitle: "Respuestas rapidas para formatos tecnicos.",
    blog: "Blog",
    account: "Cuenta",
    readQuickNote: "Leer nota rapida",
    seeMore: "Ver mas"
  },
  de: {
    appName: "DevConverTools",
    appTagline: "Schnelle Konverter fur Entwickler.",
    toolsCount: "Entwickler-Tools",
    toolsLabel: "Tools",
    selectTool: "Tool auswahlen",
    input: "Eingabe",
    output: "Ausgabe",
    inputPlaceholder: "Code einfugen oder Datei ablegen...",
    outputPlaceholder: "Die Ausgabe erscheint hier.",
    upload: "Datei hochladen",
    dropHint: "Datei hierher ziehen",
    copy: "Kopieren",
    copied: "Kopiert",
    download: "Herunterladen",
    language: "Sprache",
    mode: "Modus",
    errorPrefix: "Konvertierungsfehler",
    emptyOutput: "Fuge Inhalt ein, um ein Ergebnis zu sehen.",
    sourceFile: "Geladene Datei",
    quickSwitch: "Ausgabeformat",
    seoDescription: "Sofortige Konverter fur Entwickler: JSON, YAML, CSV, XML, JWT, Base64 und Timestamps.",
    searchPlaceholder: "Developer-Tools suchen...",
    blogHomeTitle: "Developer Essentials",
    blogHomeSubtitle: "Kurze Antworten auf wichtige Formatfragen.",
    blog: "Blog",
    account: "Konto",
    readQuickNote: "Kurznotiz lesen",
    seeMore: "Mehr sehen"
  },
  pt: {
    appName: "DevConverTools",
    appTagline: "Conversores rapidos para desenvolvedores.",
    toolsCount: "Ferramentas",
    toolsLabel: "ferramentas",
    selectTool: "Selecionar ferramenta",
    input: "Entrada",
    output: "Saida",
    inputPlaceholder: "Cole codigo ou solte um arquivo...",
    outputPlaceholder: "O resultado aparece aqui.",
    upload: "Enviar arquivo",
    dropHint: "Arraste e solte um arquivo aqui",
    copy: "Copiar",
    copied: "Copiado",
    download: "Baixar",
    language: "Idioma",
    mode: "Modo",
    errorPrefix: "Erro de conversao",
    emptyOutput: "Forneca conteudo para obter um resultado.",
    sourceFile: "Arquivo carregado",
    quickSwitch: "Formato de saida",
    seoDescription: "Conversores instantaneos para desenvolvedores: JSON, YAML, CSV, XML, JWT, Base64 e timestamps.",
    searchPlaceholder: "Buscar ferramentas developer...",
    blogHomeTitle: "Essenciais para developers",
    blogHomeSubtitle: "Respostas curtas para perguntas comuns.",
    blog: "Blog",
    account: "Conta",
    readQuickNote: "Ler nota rapida",
    seeMore: "Ver mais"
  },
  zh: {
    appName: "DevConverTools",
    appTagline: "\u4e3a\u5f00\u53d1\u8005\u6253\u9020\u7684\u6781\u901f\u683c\u5f0f\u8f6c\u6362\u5de5\u5177\u3002",
    toolsCount: "\u5f00\u53d1\u8005\u5de5\u5177",
    toolsLabel: "\u4e2a\u5de5\u5177",
    selectTool: "\u9009\u62e9\u5de5\u5177",
    input: "\u8f93\u5165",
    output: "\u8f93\u51fa",
    inputPlaceholder: "\u7c98\u8d34\u4ee3\u7801\u6216\u62d6\u62fd\u6587\u4ef6...",
    outputPlaceholder: "\u8f6c\u6362\u7ed3\u679c\u5c06\u663e\u793a\u5728\u8fd9\u91cc\u3002",
    upload: "\u4e0a\u4f20\u6587\u4ef6",
    dropHint: "\u5c06\u6587\u4ef6\u62d6\u62fd\u5230\u8fd9\u91cc",
    copy: "\u590d\u5236",
    copied: "\u5df2\u590d\u5236",
    download: "\u4e0b\u8f7d",
    language: "\u8bed\u8a00",
    mode: "\u6a21\u5f0f",
    errorPrefix: "\u8f6c\u6362\u9519\u8bef",
    emptyOutput: "\u8bf7\u8f93\u5165\u5185\u5bb9\u4ee5\u83b7\u53d6\u7ed3\u679c\u3002",
    sourceFile: "\u5df2\u52a0\u8f7d\u6587\u4ef6",
    quickSwitch: "\u8f93\u51fa\u683c\u5f0f",
    seoDescription: "\u9762\u5411\u5f00\u53d1\u8005\u7684\u5feb\u901f\u683c\u5f0f\u8f6c\u6362\u5de5\u5177\u3002",
    searchPlaceholder: "\u641c\u7d22\u5f00\u53d1\u8005\u5de5\u5177...",
    blogHomeTitle: "\u5f00\u53d1\u8005\u5fc5\u8bfb",
    blogHomeSubtitle: "\u5feb\u901f\u89e3\u7b54\u5e38\u89c1\u683c\u5f0f\u95ee\u9898\u3002",
    blog: "\u535a\u5ba2",
    account: "\u8d26\u6237",
    readQuickNote: "\u67e5\u770b\u7b80\u8981\u8bf4\u660e",
    seeMore: "\u67e5\u770b\u66f4\u591a"
  },  ru: {
    appName: "DevConverTools",
    appTagline: "\u0411\u044b\u0441\u0442\u0440\u044b\u0435 \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0435\u0440\u044b \u0444\u043e\u0440\u043c\u0430\u0442\u043e\u0432 \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432.",
    toolsCount: "\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u0430",
    toolsLabel: "\u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432",
    selectTool: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442",
    input: "\u0412\u0432\u043e\u0434",
    output: "\u0412\u044b\u0432\u043e\u0434",
    inputPlaceholder: "\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043a\u043e\u0434 \u0438\u043b\u0438 \u043f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043b...",
    outputPlaceholder: "\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043f\u043e\u044f\u0432\u0438\u0442\u0441\u044f \u0437\u0434\u0435\u0441\u044c.",
    upload: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0444\u0430\u0439\u043b",
    dropHint: "\u041f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043b \u0441\u044e\u0434\u0430",
    copy: "\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c",
    copied: "\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e",
    download: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c",
    language: "\u042f\u0437\u044b\u043a",
    mode: "\u0420\u0435\u0436\u0438\u043c",
    errorPrefix: "\u041e\u0448\u0438\u0431\u043a\u0430 \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438",
    emptyOutput: "\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0432\u0445\u043e\u0434\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0434\u043b\u044f \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0430.",
    sourceFile: "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u043d\u044b\u0439 \u0444\u0430\u0439\u043b",
    quickSwitch: "\u0424\u043e\u0440\u043c\u0430\u0442 \u0432\u044b\u0432\u043e\u0434\u0430",
    seoDescription: "\u041c\u0433\u043d\u043e\u0432\u0435\u043d\u043d\u044b\u0435 \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0435\u0440\u044b \u0444\u043e\u0440\u043c\u0430\u0442\u043e\u0432 \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u043e\u0432.",
    searchPlaceholder: "\u041f\u043e\u0438\u0441\u043a \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432...",
    blogHomeTitle: "\u0411\u0430\u0437\u0430 \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u0430",
    blogHomeSubtitle: "\u041a\u043e\u0440\u043e\u0442\u043a\u0438\u0435 \u043e\u0442\u0432\u0435\u0442\u044b \u043d\u0430 \u0447\u0430\u0441\u0442\u044b\u0435 \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u044b.",
    blog: "\u0411\u043b\u043e\u0433",
    account: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
    readQuickNote: "\u0427\u0438\u0442\u0430\u0442\u044c \u043a\u0440\u0430\u0442\u043a\u043e",
    seeMore: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435"
  },  ar: {
    appName: "DevConverTools",
    appTagline: "\u0645\u062d\u0648\u0644\u0627\u062a \u0633\u0631\u064a\u0639\u0629 \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646 \u0645\u0639 \u062a\u062c\u0631\u0628\u0629 \u0628\u0633\u064a\u0637\u0629.",
    toolsCount: "\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0645\u0637\u0648\u0631",
    toolsLabel: "\u0623\u062f\u0627\u0629",
    selectTool: "\u0627\u062e\u062a\u0631 \u0627\u0644\u0623\u062f\u0627\u0629",
    input: "\u0627\u0644\u0625\u062f\u062e\u0627\u0644",
    output: "\u0627\u0644\u0625\u062e\u0631\u0627\u062c",
    inputPlaceholder: "\u0623\u0644\u0635\u0642 \u0627\u0644\u0643\u0648\u062f \u0623\u0648 \u0627\u0633\u062d\u0628 \u0645\u0644\u0641\u0627...",
    outputPlaceholder: "\u0633\u062a\u0638\u0647\u0631 \u0627\u0644\u0646\u062a\u064a\u062c\u0629 \u0647\u0646\u0627.",
    upload: "\u0631\u0641\u0639 \u0645\u0644\u0641",
    dropHint: "\u0627\u0633\u062d\u0628 \u0648\u0623\u0641\u0644\u062a \u0645\u0644\u0641\u0627 \u0647\u0646\u0627",
    copy: "\u0646\u0633\u062e",
    copied: "\u062a\u0645 \u0627\u0644\u0646\u0633\u062e",
    download: "\u062a\u0646\u0632\u064a\u0644",
    language: "\u0627\u0644\u0644\u063a\u0629",
    mode: "\u0627\u0644\u0648\u0636\u0639",
    errorPrefix: "\u062e\u0637\u0623 \u0641\u064a \u0627\u0644\u062a\u062d\u0648\u064a\u0644",
    emptyOutput: "\u0623\u062f\u062e\u0644 \u0645\u062d\u062a\u0648\u0649 \u0644\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0646\u062a\u064a\u062c\u0629.",
    sourceFile: "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0645\u062d\u0645\u0644",
    quickSwitch: "\u0635\u064a\u063a\u0629 \u0627\u0644\u0625\u062e\u0631\u0627\u062c",
    seoDescription: "\u0645\u062d\u0648\u0644\u0627\u062a \u0641\u0648\u0631\u064a\u0629 \u0644\u0635\u064a\u063a \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0644\u0644\u0645\u0637\u0648\u0631\u064a\u0646.",
    searchPlaceholder: "\u0627\u0628\u062d\u062b \u0639\u0646 \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0645\u0637\u0648\u0631...",
    blogHomeTitle: "\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0644\u0644\u0645\u0637\u0648\u0631",
    blogHomeSubtitle: "\u0625\u062c\u0627\u0628\u0627\u062a \u0633\u0631\u064a\u0639\u0629 \u0644\u0623\u0633\u0626\u0644\u0629 \u0634\u0627\u0626\u0639\u0629.",
    blog: "\u0627\u0644\u0645\u062f\u0648\u0646\u0629",
    account: "\u0627\u0644\u062d\u0633\u0627\u0628",
    readQuickNote: "\u0627\u0642\u0631\u0623 \u0645\u0644\u062e\u0635\u0627 \u0633\u0631\u064a\u0639\u0627",
    seeMore: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064a\u062f"
  },  hi: {
    appName: "DevConverTools",
    appTagline: "\u0921\u0947\u0935\u0932\u092a\u0930\u094d\u0938 \u0915\u0947 \u0932\u093f\u090f \u0924\u0947\u091c \u0914\u0930 \u0938\u0930\u0932 \u0915\u0928\u094d\u0935\u0930\u094d\u091f\u0930\u0964",
    toolsCount: "\u0921\u0947\u0935\u0932\u092a\u0930 \u091f\u0942\u0932\u094d\u0938",
    toolsLabel: "\u091f\u0942\u0932\u094d\u0938",
    selectTool: "\u091f\u0942\u0932 \u091a\u0941\u0928\u0947\u0902",
    input: "\u0907\u0928\u092a\u0941\u091f",
    output: "\u0906\u0909\u091f\u092a\u0941\u091f",
    inputPlaceholder: "\u0915\u094b\u0921 \u092a\u0947\u0938\u094d\u091f \u0915\u0930\u0947\u0902 \u092f\u093e \u092b\u093c\u093e\u0907\u0932 \u0921\u094d\u0930\u0948\u0917 \u0915\u0930\u0947\u0902...",
    outputPlaceholder: "\u0915\u0928\u094d\u0935\u0930\u094d\u091f \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u092a\u0930\u093f\u0923\u093e\u092e \u092f\u0939\u093e\u0902 \u0926\u093f\u0916\u0947\u0917\u093e\u0964",
    upload: "\u092b\u093c\u093e\u0907\u0932 \u0905\u092a\u0932\u094b\u0921 \u0915\u0930\u0947\u0902",
    dropHint: "\u092b\u093c\u093e\u0907\u0932 \u092f\u0939\u093e\u0902 \u0921\u094d\u0930\u0948\u0917 \u090f\u0902\u0921 \u0921\u094d\u0930\u0949\u092a \u0915\u0930\u0947\u0902",
    copy: "\u0915\u0949\u092a\u0940",
    copied: "\u0915\u0949\u092a\u0940 \u0939\u094b \u0917\u092f\u093e",
    download: "\u0921\u093e\u0909\u0928\u0932\u094b\u0921",
    language: "\u092d\u093e\u0937\u093e",
    mode: "\u092e\u094b\u0921",
    errorPrefix: "\u0915\u0928\u094d\u0935\u0930\u094d\u091c\u093c\u0928 \u0924\u094d\u0930\u0941\u091f\u093f",
    emptyOutput: "\u092a\u0930\u093f\u0923\u093e\u092e \u092a\u093e\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0907\u0928\u092a\u0941\u091f \u0926\u0947\u0902\u0964",
    sourceFile: "\u0932\u094b\u0921 \u0915\u0940 \u0917\u0908 \u092b\u093c\u093e\u0907\u0932",
    quickSwitch: "\u0906\u0909\u091f\u092a\u0941\u091f \u092b\u093c\u0949\u0930\u094d\u092e\u0948\u091f",
    seoDescription: "\u0921\u0947\u0935\u0932\u092a\u0930\u094d\u0938 \u0915\u0947 \u0932\u093f\u090f \u0924\u0941\u0930\u0902\u0924 \u0921\u0947\u091f\u093e \u092b\u093c\u0949\u0930\u094d\u092e\u0948\u091f \u0915\u0928\u094d\u0935\u0930\u094d\u091f\u0930\u0964",
    searchPlaceholder: "\u0921\u0947\u0935\u0932\u092a\u0930 \u091f\u0942\u0932\u094d\u0938 \u0916\u094b\u091c\u0947\u0902...",
    blogHomeTitle: "\u0921\u0947\u0935\u0932\u092a\u0930 \u090f\u0938\u0947\u0902\u0936\u093f\u092f\u0932\u094d\u0938",
    blogHomeSubtitle: "\u0915\u0949\u092e\u0928 \u091f\u0947\u0915\u094d\u0928\u093f\u0915\u0932 \u0938\u0935\u093e\u0932\u094b\u0902 \u0915\u0947 \u0936\u0949\u0930\u094d\u091f \u091c\u0935\u093e\u092c\u0964",
    blog: "\u092c\u094d\u0932\u0949\u0917",
    account: "\u0905\u0915\u093e\u0909\u0902\u091f",
    readQuickNote: "\u0936\u0949\u0930\u094d\u091f \u0928\u094b\u091f \u092a\u0922\u093c\u0947\u0902",
    seeMore: "\u0914\u0930 \u0926\u0947\u0916\u0947\u0902"
  }
};

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.en;
}



