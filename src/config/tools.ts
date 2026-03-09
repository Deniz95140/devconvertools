import type { Locale } from "@/i18n/config";

export type ToolId =
  | "json-to-yaml"
  | "yaml-to-json"
  | "json-to-csv"
  | "csv-to-json"
  | "json-to-typescript"
  | "json-to-python"
  | "xml-to-json"
  | "base64"
  | "jwt-decoder"
  | "timestamp-converter"
  | "json-formatter"
  | "json-validator"
  | "json-minifier"
  | "url-encode-decode"
  | "html-encode-decode"
  | "sha256-generator"
  | "md5-generator"
  | "regex-tester"
  | "uuid-generator"
  | "password-generator";

export type LocalizedText = Partial<Record<Locale, string>> & { en: string };

export type ToolOption = {
  id: string;
  defaultValue: string;
  label: LocalizedText;
  choices: Array<{
    value: string;
    label: LocalizedText;
  }>;
};

export type ToolDefinition = {
  id: ToolId;
  slugs: LocalizedText;
  name: LocalizedText;
  description: LocalizedText;
  inputExtension: string;
  outputExtension: string;
  sampleInput: string;
  options?: ToolOption[];
};

export const toolDefinitions: ToolDefinition[] = [
  {
    id: "json-to-yaml",
    slugs: { en: "json-to-yaml", fr: "json-vers-yaml", es: "json-a-yaml", de: "json-zu-yaml", pt: "json-para-yaml" },
    name: { en: "JSON to YAML", fr: "JSON vers YAML", es: "JSON a YAML", de: "JSON zu YAML", pt: "JSON para YAML" },
    description: {
      en: "Convert JSON structures into readable YAML.",
      fr: "Convertit des structures JSON en YAML lisible.",
      es: "Convierte estructuras JSON en YAML legible.",
      de: "Wandelt JSON-Strukturen in lesbares YAML um.",
      pt: "Converte estruturas JSON em YAML legivel."
    },
    inputExtension: "json",
    outputExtension: "yaml",
    sampleInput: '{\n  "name": "john",\n  "age": 30\n}'
  },
  {
    id: "yaml-to-json",
    slugs: { en: "yaml-to-json", fr: "yaml-vers-json", es: "yaml-a-json", de: "yaml-zu-json", pt: "yaml-para-json" },
    name: { en: "YAML to JSON", fr: "YAML vers JSON", es: "YAML a JSON", de: "YAML zu JSON", pt: "YAML para JSON" },
    description: {
      en: "Turn YAML into normalized JSON.",
      fr: "Transforme du YAML en JSON normalise.",
      es: "Transforma YAML en JSON normalizado.",
      de: "Konvertiert YAML in normalisiertes JSON.",
      pt: "Transforma YAML em JSON padronizado."
    },
    inputExtension: "yaml",
    outputExtension: "json",
    sampleInput: "name: john\nage: 30"
  },
  {
    id: "json-to-csv",
    slugs: { en: "json-to-csv", fr: "json-vers-csv", es: "json-a-csv", de: "json-zu-csv", pt: "json-para-csv" },
    name: { en: "JSON to CSV", fr: "JSON vers CSV", es: "JSON a CSV", de: "JSON zu CSV", pt: "JSON para CSV" },
    description: {
      en: "Export JSON arrays and objects to CSV.",
      fr: "Exporte des tableaux ou objets JSON en CSV.",
      es: "Exporta arreglos u objetos JSON a CSV.",
      de: "Exportiert JSON-Arrays und Objekte nach CSV.",
      pt: "Exporta arrays e objetos JSON para CSV."
    },
    inputExtension: "json",
    outputExtension: "csv",
    sampleInput: '[\n  {"name": "john", "age": 30},\n  {"name": "sara", "age": 28}\n]'
  },
  {
    id: "csv-to-json",
    slugs: { en: "csv-to-json", fr: "csv-vers-json", es: "csv-a-json", de: "csv-zu-json", pt: "csv-para-json" },
    name: { en: "CSV to JSON", fr: "CSV vers JSON", es: "CSV a JSON", de: "CSV zu JSON", pt: "CSV para JSON" },
    description: {
      en: "Parse CSV columns into JSON objects.",
      fr: "Convertit des colonnes CSV en objets JSON.",
      es: "Convierte columnas CSV en objetos JSON.",
      de: "Parst CSV-Spalten zu JSON-Objekten.",
      pt: "Converte colunas CSV em objetos JSON."
    },
    inputExtension: "csv",
    outputExtension: "json",
    sampleInput: "name,age\njohn,30\nsara,28"
  },
  {
    id: "json-to-typescript",
    slugs: {
      en: "json-to-typescript",
      fr: "json-vers-typescript",
      es: "json-a-typescript",
      de: "json-zu-typescript",
      pt: "json-para-typescript"
    },
    name: {
      en: "JSON to TypeScript",
      fr: "JSON vers TypeScript",
      es: "JSON a TypeScript",
      de: "JSON zu TypeScript",
      pt: "JSON para TypeScript"
    },
    description: {
      en: "Generate TypeScript interfaces from JSON.",
      fr: "Genere des interfaces TypeScript depuis JSON.",
      es: "Genera interfaces TypeScript desde JSON.",
      de: "Erzeugt TypeScript-Interfaces aus JSON.",
      pt: "Gera interfaces TypeScript a partir de JSON."
    },
    inputExtension: "json",
    outputExtension: "ts",
    sampleInput: '{\n  "user": {\n    "id": 1,\n    "name": "john"\n  }\n}'
  },
  {
    id: "json-to-python",
    slugs: { en: "json-to-python", fr: "json-vers-python", es: "json-a-python", de: "json-zu-python", pt: "json-para-python" },
    name: {
      en: "JSON to Python classes",
      fr: "JSON vers classes Python",
      es: "JSON a clases Python",
      de: "JSON zu Python-Klassen",
      pt: "JSON para classes Python"
    },
    description: {
      en: "Build Python dataclasses from JSON structures.",
      fr: "Construit des dataclasses Python depuis JSON.",
      es: "Crea dataclasses Python desde estructuras JSON.",
      de: "Erzeugt Python-Dataclasses aus JSON-Strukturen.",
      pt: "Gera dataclasses Python a partir de estruturas JSON."
    },
    inputExtension: "json",
    outputExtension: "py",
    sampleInput: '{\n  "user": {\n    "id": 1,\n    "active": true\n  }\n}'
  },
  {
    id: "xml-to-json",
    slugs: { en: "xml-to-json", fr: "xml-vers-json", es: "xml-a-json", de: "xml-zu-json", pt: "xml-para-json" },
    name: { en: "XML to JSON", fr: "XML vers JSON", es: "XML a JSON", de: "XML zu JSON", pt: "XML para JSON" },
    description: {
      en: "Convert XML payloads to structured JSON.",
      fr: "Convertit des payloads XML en JSON structure.",
      es: "Convierte XML en JSON estructurado.",
      de: "Konvertiert XML-Nutzdaten in JSON.",
      pt: "Converte XML em JSON estruturado."
    },
    inputExtension: "xml",
    outputExtension: "json",
    sampleInput: "<user><name>john</name><age>30</age></user>"
  },
  {
    id: "base64",
    slugs: {
      en: "base64-encode-decode",
      fr: "base64-encoder-decoder",
      es: "base64-codificar-decodificar",
      de: "base64-kodieren-dekodieren",
      pt: "base64-codificar-decodificar"
    },
    name: {
      en: "Base64 encode / decode",
      fr: "Base64 encoder / decoder",
      es: "Base64 codificar / decodificar",
      de: "Base64 kodieren / dekodieren",
      pt: "Base64 codificar / decodificar"
    },
    description: {
      en: "Encode or decode text in Base64.",
      fr: "Encode ou decode du texte en Base64.",
      es: "Codifica o decodifica texto en Base64.",
      de: "Kodiert oder dekodiert Text in Base64.",
      pt: "Codifica ou decodifica texto em Base64."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "Hello developer",
    options: [
      {
        id: "mode",
        defaultValue: "encode",
        label: { en: "Action", fr: "Action", es: "Accion", de: "Aktion", pt: "Acao" },
        choices: [
          {
            value: "encode",
            label: { en: "Encode", fr: "Encoder", es: "Codificar", de: "Kodieren", pt: "Codificar" }
          },
          {
            value: "decode",
            label: { en: "Decode", fr: "Decoder", es: "Decodificar", de: "Dekodieren", pt: "Decodificar" }
          }
        ]
      }
    ]
  },
  {
    id: "jwt-decoder",
    slugs: { en: "jwt-decoder", fr: "decodeur-jwt", es: "decodificador-jwt", de: "jwt-dekodierer", pt: "decodificador-jwt" },
    name: { en: "JWT decoder", fr: "Decodeur JWT", es: "Decodificador JWT", de: "JWT Dekodierer", pt: "Decodificador JWT" },
    description: {
      en: "Inspect JWT header and payload instantly.",
      fr: "Inspecte instantanement l'entete et le payload JWT.",
      es: "Inspecciona al instante el header y payload JWT.",
      de: "Analysiert JWT-Header und Payload sofort.",
      pt: "Inspeciona imediatamente header e payload JWT."
    },
    inputExtension: "txt",
    outputExtension: "json",
    sampleInput: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4iLCJpYXQiOjE1MTYyMzkwMjJ9.signature"
  },
  {
    id: "timestamp-converter",
    slugs: {
      en: "timestamp-converter",
      fr: "convertisseur-timestamp",
      es: "convertidor-timestamp",
      de: "timestamp-konverter",
      pt: "conversor-timestamp"
    },
    name: {
      en: "Timestamp converter",
      fr: "Convertisseur timestamp",
      es: "Convertidor timestamp",
      de: "Timestamp Konverter",
      pt: "Conversor de timestamp"
    },
    description: {
      en: "Convert Unix timestamps and date strings.",
      fr: "Convertit timestamps Unix et dates texte.",
      es: "Convierte timestamps Unix y fechas texto.",
      de: "Konvertiert Unix-Timestamps und Datumswerte.",
      pt: "Converte timestamps Unix e strings de data."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "1714828800",
    options: [
      {
        id: "mode",
        defaultValue: "to-iso",
        label: { en: "Direction", fr: "Direction", es: "Direccion", de: "Richtung", pt: "Direcao" },
        choices: [
          {
            value: "to-iso",
            label: {
              en: "Timestamp to date",
              fr: "Timestamp vers date",
              es: "Timestamp a fecha",
              de: "Timestamp zu Datum",
              pt: "Timestamp para data"
            }
          },
          {
            value: "to-seconds",
            label: {
              en: "Date to unix seconds",
              fr: "Date vers secondes unix",
              es: "Fecha a segundos unix",
              de: "Datum zu Unix-Sekunden",
              pt: "Data para segundos unix"
            }
          },
          {
            value: "to-milliseconds",
            label: {
              en: "Date to unix milliseconds",
              fr: "Date vers millisecondes unix",
              es: "Fecha a milisegundos unix",
              de: "Datum zu Unix-Millisekunden",
              pt: "Data para milissegundos unix"
            }
          }
        ]
      }
    ]
  },
  {
    id: "json-formatter",
    slugs: { en: "json-formatter", fr: "formatteur-json", es: "formateador-json", de: "json-formatierer", pt: "formatador-json" },
    name: { en: "JSON Formatter", fr: "Formateur JSON", es: "Formateador JSON", de: "JSON Formatierer", pt: "Formatador JSON" },
    description: {
      en: "Pretty-print and indent JSON instantly.",
      fr: "Formate et indente du JSON instantanement.",
      es: "Formatea e indenta JSON al instante.",
      de: "Formatiert JSON sofort lesbar.",
      pt: "Formata e indenta JSON instantaneamente."
    },
    inputExtension: "json",
    outputExtension: "json",
    sampleInput: '{"user":{"name":"john","age":30},"active":true}'
  },
  {
    id: "json-validator",
    slugs: { en: "json-validator", fr: "validateur-json", es: "validador-json", de: "json-validator", pt: "validador-json" },
    name: { en: "JSON Validator", fr: "Validateur JSON", es: "Validador JSON", de: "JSON Validator", pt: "Validador JSON" },
    description: {
      en: "Validate JSON and detect syntax errors.",
      fr: "Valide le JSON et detecte les erreurs.",
      es: "Valida JSON y detecta errores.",
      de: "Prueft JSON und zeigt Syntaxfehler.",
      pt: "Valida JSON e detecta erros de sintaxe."
    },
    inputExtension: "json",
    outputExtension: "txt",
    sampleInput: '{"name":"john","age":30}'
  },
  {
    id: "json-minifier",
    slugs: { en: "json-minifier", fr: "minifieur-json", es: "minificador-json", de: "json-minifier", pt: "minificador-json" },
    name: { en: "JSON Minifier", fr: "Minifieur JSON", es: "Minificador JSON", de: "JSON Minifier", pt: "Minificador JSON" },
    description: {
      en: "Minify JSON for compact payloads.",
      fr: "Minifie le JSON pour des payloads compacts.",
      es: "Minifica JSON para payloads compactos.",
      de: "Minimiert JSON fuer kompakte Payloads.",
      pt: "Minifica JSON para payloads compactos."
    },
    inputExtension: "json",
    outputExtension: "json",
    sampleInput: '{\n  "name": "john",\n  "age": 30\n}'
  },
  {
    id: "url-encode-decode",
    slugs: {
      en: "url-encode-decode",
      fr: "url-encoder-decoder",
      es: "url-codificar-decodificar",
      de: "url-kodieren-dekodieren",
      pt: "url-codificar-decodificar"
    },
    name: {
      en: "URL Encode / Decode",
      fr: "URL encoder / decoder",
      es: "URL codificar / decodificar",
      de: "URL kodieren / dekodieren",
      pt: "URL codificar / decodificar"
    },
    description: {
      en: "Encode or decode URL components.",
      fr: "Encode ou decode des composants URL.",
      es: "Codifica o decodifica componentes URL.",
      de: "Kodiert oder dekodiert URL-Komponenten.",
      pt: "Codifica ou decodifica componentes de URL."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "https://example.com/search?q=dev tools&lang=en",
    options: [
      {
        id: "mode",
        defaultValue: "encode",
        label: { en: "Action", fr: "Action", es: "Accion", de: "Aktion", pt: "Acao" },
        choices: [
          {
            value: "encode",
            label: { en: "Encode", fr: "Encoder", es: "Codificar", de: "Kodieren", pt: "Codificar" }
          },
          {
            value: "decode",
            label: { en: "Decode", fr: "Decoder", es: "Decodificar", de: "Dekodieren", pt: "Decodificar" }
          }
        ]
      }
    ]
  },
  {
    id: "html-encode-decode",
    slugs: {
      en: "html-encode-decode",
      fr: "html-encoder-decoder",
      es: "html-codificar-decodificar",
      de: "html-kodieren-dekodieren",
      pt: "html-codificar-decodificar"
    },
    name: {
      en: "HTML Encode / Decode",
      fr: "HTML encoder / decoder",
      es: "HTML codificar / decodificar",
      de: "HTML kodieren / dekodieren",
      pt: "HTML codificar / decodificar"
    },
    description: {
      en: "Encode or decode HTML entities quickly.",
      fr: "Encode ou decode des entites HTML rapidement.",
      es: "Codifica o decodifica entidades HTML.",
      de: "Kodiert oder dekodiert HTML-Entitaeten.",
      pt: "Codifica ou decodifica entidades HTML."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "<div class=\"card\">Hello & welcome</div>",
    options: [
      {
        id: "mode",
        defaultValue: "encode",
        label: { en: "Action", fr: "Action", es: "Accion", de: "Aktion", pt: "Acao" },
        choices: [
          {
            value: "encode",
            label: { en: "Encode", fr: "Encoder", es: "Codificar", de: "Kodieren", pt: "Codificar" }
          },
          {
            value: "decode",
            label: { en: "Decode", fr: "Decoder", es: "Decodificar", de: "Dekodieren", pt: "Decodificar" }
          }
        ]
      }
    ]
  },
  {
    id: "sha256-generator",
    slugs: { en: "sha256-generator", fr: "generateur-sha256", es: "generador-sha256", de: "sha256-generator", pt: "gerador-sha256" },
    name: { en: "SHA256 Generator", fr: "Generateur SHA256", es: "Generador SHA256", de: "SHA256 Generator", pt: "Gerador SHA256" },
    description: {
      en: "Generate SHA-256 hash values in browser.",
      fr: "Genere des hash SHA-256 dans le navigateur.",
      es: "Genera hashes SHA-256 en el navegador.",
      de: "Erzeugt SHA-256 Hashes im Browser.",
      pt: "Gera hashes SHA-256 no navegador."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "my-secret-value"
  },
  {
    id: "md5-generator",
    slugs: { en: "md5-generator", fr: "generateur-md5", es: "generador-md5", de: "md5-generator", pt: "gerador-md5" },
    name: { en: "MD5 Generator", fr: "Generateur MD5", es: "Generador MD5", de: "MD5 Generator", pt: "Gerador MD5" },
    description: {
      en: "Generate MD5 fingerprints instantly.",
      fr: "Genere des empreintes MD5 instantanement.",
      es: "Genera huellas MD5 al instante.",
      de: "Erzeugt MD5 Fingerprints sofort.",
      pt: "Gera hashes MD5 instantaneamente."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "my-secret-value"
  },
  {
    id: "regex-tester",
    slugs: { en: "regex-tester", fr: "testeur-regex", es: "probador-regex", de: "regex-tester", pt: "testador-regex" },
    name: { en: "Regex Tester", fr: "Testeur Regex", es: "Probador Regex", de: "Regex Tester", pt: "Testador Regex" },
    description: {
      en: "Test regular expressions on sample text.",
      fr: "Teste des expressions regulieres sur du texte.",
      es: "Prueba expresiones regulares sobre texto.",
      de: "Testet regulaere Ausdruecke auf Text.",
      pt: "Testa expressoes regulares em texto."
    },
    inputExtension: "txt",
    outputExtension: "json",
    sampleInput: "/(error|warn)\\s+\\d+/gi\n\nINFO 101\nWARN 233\nerror 42"
  },
  {
    id: "uuid-generator",
    slugs: { en: "uuid-generator", fr: "generateur-uuid", es: "generador-uuid", de: "uuid-generator", pt: "gerador-uuid" },
    name: { en: "UUID Generator", fr: "Generateur UUID", es: "Generador UUID", de: "UUID Generator", pt: "Gerador UUID" },
    description: {
      en: "Generate UUID v4 values quickly.",
      fr: "Genere des UUID v4 rapidement.",
      es: "Genera UUID v4 rapidamente.",
      de: "Erzeugt schnell UUID v4 Werte.",
      pt: "Gera UUID v4 rapidamente."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "3"
  },
  {
    id: "password-generator",
    slugs: {
      en: "password-generator",
      fr: "generateur-mot-de-passe",
      es: "generador-contrasenas",
      de: "passwort-generator",
      pt: "gerador-senha"
    },
    name: {
      en: "Password Generator",
      fr: "Generateur de mot de passe",
      es: "Generador de contrasenas",
      de: "Passwort Generator",
      pt: "Gerador de senha"
    },
    description: {
      en: "Create strong random passwords.",
      fr: "Cree des mots de passe aleatoires robustes.",
      es: "Crea contrasenas aleatorias seguras.",
      de: "Erstellt sichere Zufallspasswoerter.",
      pt: "Cria senhas aleatorias fortes."
    },
    inputExtension: "txt",
    outputExtension: "txt",
    sampleInput: "16",
    options: [
      {
        id: "uppercase",
        defaultValue: "include",
        label: {
          en: "Uppercase letters",
          fr: "Majuscules",
          es: "Mayusculas",
          de: "Grossbuchstaben",
          pt: "Maiusculas"
        },
        choices: [
          { value: "include", label: { en: "Include", fr: "Inclure", es: "Incluir", de: "Ein", pt: "Incluir" } },
          { value: "exclude", label: { en: "Exclude", fr: "Exclure", es: "Excluir", de: "Aus", pt: "Excluir" } }
        ]
      },
      {
        id: "lowercase",
        defaultValue: "include",
        label: {
          en: "Lowercase letters",
          fr: "Minuscules",
          es: "Minusculas",
          de: "Kleinbuchstaben",
          pt: "Minusculas"
        },
        choices: [
          { value: "include", label: { en: "Include", fr: "Inclure", es: "Incluir", de: "Ein", pt: "Incluir" } },
          { value: "exclude", label: { en: "Exclude", fr: "Exclure", es: "Excluir", de: "Aus", pt: "Excluir" } }
        ]
      },
      {
        id: "numbers",
        defaultValue: "include",
        label: {
          en: "Numbers",
          fr: "Chiffres",
          es: "Numeros",
          de: "Zahlen",
          pt: "Numeros"
        },
        choices: [
          { value: "include", label: { en: "Include", fr: "Inclure", es: "Incluir", de: "Ein", pt: "Incluir" } },
          { value: "exclude", label: { en: "Exclude", fr: "Exclure", es: "Excluir", de: "Aus", pt: "Excluir" } }
        ]
      },
      {
        id: "symbols",
        defaultValue: "include",
        label: {
          en: "Symbols",
          fr: "Symboles",
          es: "Simbolos",
          de: "Symbole",
          pt: "Simbolos"
        },
        choices: [
          { value: "include", label: { en: "Include", fr: "Inclure", es: "Incluir", de: "Ein", pt: "Incluir" } },
          { value: "exclude", label: { en: "Exclude", fr: "Exclure", es: "Excluir", de: "Aus", pt: "Excluir" } }
        ]
      },
      {
        id: "count",
        defaultValue: "1",
        label: {
          en: "How many",
          fr: "Quantite",
          es: "Cantidad",
          de: "Anzahl",
          pt: "Quantidade"
        },
        choices: [
          { value: "1", label: { en: "1", fr: "1", es: "1", de: "1", pt: "1" } },
          { value: "3", label: { en: "3", fr: "3", es: "3", de: "3", pt: "3" } },
          { value: "5", label: { en: "5", fr: "5", es: "5", de: "5", pt: "5" } },
          { value: "10", label: { en: "10", fr: "10", es: "10", de: "10", pt: "10" } }
        ]
      }
    ]
  }
];

export const toolById: Record<ToolId, ToolDefinition> = Object.fromEntries(
  toolDefinitions.map((tool) => [tool.id, tool])
) as Record<ToolId, ToolDefinition>;

const slugOverrides: Partial<Record<Locale, Partial<Record<ToolId, string>>>> = {
  zh: {
    "json-to-yaml": "json-dao-yaml",
    "yaml-to-json": "yaml-dao-json",
    "json-to-csv": "json-dao-csv",
    "csv-to-json": "csv-dao-json",
    "json-to-typescript": "json-dao-typescript",
    "json-to-python": "json-dao-python",
    "xml-to-json": "xml-dao-json",
    base64: "base64-bianma-jiema",
    "jwt-decoder": "jwt-jiema",
    "timestamp-converter": "shijianchuo-zhuanhuan",
    "json-formatter": "json-geshihua",
    "json-validator": "json-xiaoyan",
    "json-minifier": "json-yasuo",
    "url-encode-decode": "url-bianma-jiema",
    "html-encode-decode": "html-bianma-jiema",
    "sha256-generator": "sha256-shengchengqi",
    "md5-generator": "md5-shengchengqi",
    "regex-tester": "regex-ceshiqi",
    "uuid-generator": "uuid-shengchengqi",
    "password-generator": "mima-shengchengqi"
  },
  ru: {
    "json-to-yaml": "json-v-yaml",
    "yaml-to-json": "yaml-v-json",
    "json-to-csv": "json-v-csv",
    "csv-to-json": "csv-v-json",
    "json-to-typescript": "json-v-typescript",
    "json-to-python": "json-v-python",
    "xml-to-json": "xml-v-json",
    base64: "base64-kodirovat-dekodirovat",
    "jwt-decoder": "jwt-dekoder",
    "timestamp-converter": "konverter-vremeni",
    "json-formatter": "json-formater",
    "json-validator": "json-validator",
    "json-minifier": "json-minifier",
    "url-encode-decode": "url-kodirovat-dekodirovat",
    "html-encode-decode": "html-kodirovat-dekodirovat",
    "sha256-generator": "sha256-generator",
    "md5-generator": "md5-generator",
    "regex-tester": "regex-tester",
    "uuid-generator": "uuid-generator",
    "password-generator": "generator-paroley"
  },
  ar: {
    "json-to-yaml": "json-ila-yaml",
    "yaml-to-json": "yaml-ila-json",
    "json-to-csv": "json-ila-csv",
    "csv-to-json": "csv-ila-json",
    "json-to-typescript": "json-ila-typescript",
    "json-to-python": "json-ila-python",
    "xml-to-json": "xml-ila-json",
    base64: "base64-tashfir-fakk",
    "jwt-decoder": "fakk-jwt",
    "timestamp-converter": "muhawwil-time",
    "json-formatter": "munasiq-json",
    "json-validator": "muta7aqqiq-json",
    "json-minifier": "mukhassis-json",
    "url-encode-decode": "url-tashfir-fakk",
    "html-encode-decode": "html-tashfir-fakk",
    "sha256-generator": "sha256-muwallid",
    "md5-generator": "md5-muwallid",
    "regex-tester": "mukhtabir-regex",
    "uuid-generator": "muwallid-uuid",
    "password-generator": "muwallid-kalimat-murur"
  },
  hi: {
    "json-to-yaml": "json-se-yaml",
    "yaml-to-json": "yaml-se-json",
    "json-to-csv": "json-se-csv",
    "csv-to-json": "csv-se-json",
    "json-to-typescript": "json-se-typescript",
    "json-to-python": "json-se-python",
    "xml-to-json": "xml-se-json",
    base64: "base64-encode-decode",
    "jwt-decoder": "jwt-decoder",
    "timestamp-converter": "timestamp-converter",
    "json-formatter": "json-formatter",
    "json-validator": "json-validator",
    "json-minifier": "json-minifier",
    "url-encode-decode": "url-encode-decode",
    "html-encode-decode": "html-encode-decode",
    "sha256-generator": "sha256-generator",
    "md5-generator": "md5-generator",
    "regex-tester": "regex-tester",
    "uuid-generator": "uuid-generator",
    "password-generator": "password-generator"
  }
};

const toolNameOverrides: Partial<Record<Locale, Partial<Record<ToolId, string>>>> = {
  zh: {
    "json-to-yaml": "JSON zhuan YAML",
    "yaml-to-json": "YAML zhuan JSON",
    "json-to-csv": "JSON zhuan CSV",
    "csv-to-json": "CSV zhuan JSON",
    "json-to-typescript": "JSON zhuan TypeScript",
    "json-to-python": "JSON zhuan Python classes",
    "xml-to-json": "XML zhuan JSON",
    base64: "Base64 bianma / jiema",
    "jwt-decoder": "JWT jiemaqi",
    "timestamp-converter": "Timestamp zhuanhuanqi",
    "json-formatter": "JSON geshihua",
    "json-validator": "JSON xiaoyan",
    "json-minifier": "JSON yasuo",
    "url-encode-decode": "URL bianma / jiema",
    "html-encode-decode": "HTML bianma / jiema",
    "sha256-generator": "SHA256 shengchengqi",
    "md5-generator": "MD5 shengchengqi",
    "regex-tester": "Regex ceshiqi",
    "uuid-generator": "UUID shengchengqi",
    "password-generator": "Mima shengchengqi"
  },
  ru: {
    "json-to-yaml": "JSON v YAML",
    "yaml-to-json": "YAML v JSON",
    "json-to-csv": "JSON v CSV",
    "csv-to-json": "CSV v JSON",
    "json-to-typescript": "JSON v TypeScript",
    "json-to-python": "JSON v Python classes",
    "xml-to-json": "XML v JSON",
    base64: "Base64 kodirovat / dekodirovat",
    "jwt-decoder": "JWT dekoder",
    "timestamp-converter": "Konverter vremeni",
    "json-formatter": "JSON formatter",
    "json-validator": "JSON validator",
    "json-minifier": "JSON minifier",
    "url-encode-decode": "URL kodirovat / dekodirovat",
    "html-encode-decode": "HTML kodirovat / dekodirovat",
    "sha256-generator": "SHA256 generator",
    "md5-generator": "MD5 generator",
    "regex-tester": "Regex tester",
    "uuid-generator": "UUID generator",
    "password-generator": "Generator paroley"
  },
  ar: {
    "json-to-yaml": "JSON ila YAML",
    "yaml-to-json": "YAML ila JSON",
    "json-to-csv": "JSON ila CSV",
    "csv-to-json": "CSV ila JSON",
    "json-to-typescript": "JSON ila TypeScript",
    "json-to-python": "JSON ila Python classes",
    "xml-to-json": "XML ila JSON",
    base64: "Base64 tashfir / fakk",
    "jwt-decoder": "JWT decoder",
    "timestamp-converter": "Muhawwil timestamp",
    "json-formatter": "Munasiq JSON",
    "json-validator": "Mudqqiq JSON",
    "json-minifier": "Mukhassis JSON",
    "url-encode-decode": "URL tashfir / fakk",
    "html-encode-decode": "HTML tashfir / fakk",
    "sha256-generator": "SHA256 muwallid",
    "md5-generator": "MD5 muwallid",
    "regex-tester": "Mukhtabir Regex",
    "uuid-generator": "UUID muwallid",
    "password-generator": "Muwallid kalimat murur"
  },
  hi: {
    "json-to-yaml": "JSON se YAML",
    "yaml-to-json": "YAML se JSON",
    "json-to-csv": "JSON se CSV",
    "csv-to-json": "CSV se JSON",
    "json-to-typescript": "JSON se TypeScript",
    "json-to-python": "JSON se Python classes",
    "xml-to-json": "XML se JSON",
    base64: "Base64 encode / decode",
    "jwt-decoder": "JWT decoder",
    "timestamp-converter": "Timestamp converter",
    "json-formatter": "JSON formatter",
    "json-validator": "JSON validator",
    "json-minifier": "JSON minifier",
    "url-encode-decode": "URL encode / decode",
    "html-encode-decode": "HTML encode / decode",
    "sha256-generator": "SHA256 generator",
    "md5-generator": "MD5 generator",
    "regex-tester": "Regex tester",
    "uuid-generator": "UUID generator",
    "password-generator": "Password generator"
  }
};
const toolUiConfig: Partial<
  Record<
    ToolId,
    {
      allowFileUpload?: boolean;
      inputLabel?: LocalizedText;
      outputLabel?: LocalizedText;
      inputPlaceholder?: LocalizedText;
      outputPlaceholder?: LocalizedText;
    }
  >
> = {
  "json-formatter": {
    inputLabel: { en: "Raw JSON", fr: "JSON brut", es: "JSON bruto", de: "Rohes JSON", pt: "JSON bruto" },
    outputLabel: { en: "Formatted JSON", fr: "JSON formate", es: "JSON formateado", de: "Formatiertes JSON", pt: "JSON formatado" }
  },
  "json-validator": {
    inputLabel: { en: "JSON to validate", fr: "JSON a valider", es: "JSON a validar", de: "JSON pruefen", pt: "JSON para validar" },
    outputLabel: {
      en: "Validation result",
      fr: "Resultat de validation",
      es: "Resultado de validacion",
      de: "Validierungsergebnis",
      pt: "Resultado da validacao"
    }
  },
  "json-minifier": {
    inputLabel: { en: "Raw JSON", fr: "JSON brut", es: "JSON bruto", de: "Rohes JSON", pt: "JSON bruto" },
    outputLabel: { en: "Minified JSON", fr: "JSON minifie", es: "JSON minificado", de: "Minifiziertes JSON", pt: "JSON minificado" }
  },
  "url-encode-decode": {
    inputLabel: { en: "URL text", fr: "Texte URL", es: "Texto URL", de: "URL Text", pt: "Texto URL" },
    outputLabel: { en: "URL output", fr: "Resultat URL", es: "Salida URL", de: "URL Ausgabe", pt: "Saida URL" }
  },
  "html-encode-decode": {
    inputLabel: { en: "HTML text", fr: "Texte HTML", es: "Texto HTML", de: "HTML Text", pt: "Texto HTML" },
    outputLabel: { en: "HTML output", fr: "Resultat HTML", es: "Salida HTML", de: "HTML Ausgabe", pt: "Saida HTML" }
  },
  "sha256-generator": {
    allowFileUpload: false,
    inputLabel: {
      en: "Text to hash",
      fr: "Texte a hasher",
      es: "Texto a hashear",
      de: "Text zum Hashen",
      pt: "Texto para hash"
    },
    outputLabel: {
      en: "SHA256 hash",
      fr: "Hash SHA256",
      es: "Hash SHA256",
      de: "SHA256 Hash",
      pt: "Hash SHA256"
    }
  },
  "md5-generator": {
    allowFileUpload: false,
    inputLabel: {
      en: "Text to hash",
      fr: "Texte a hasher",
      es: "Texto a hashear",
      de: "Text zum Hashen",
      pt: "Texto para hash"
    },
    outputLabel: {
      en: "MD5 hash",
      fr: "Hash MD5",
      es: "Hash MD5",
      de: "MD5 Hash",
      pt: "Hash MD5"
    }
  },
  "regex-tester": {
    allowFileUpload: false,
    inputLabel: {
      en: "Pattern + test text",
      fr: "Pattern + texte de test",
      es: "Patron + texto de prueba",
      de: "Pattern + Testtext",
      pt: "Padrao + texto de teste"
    },
    outputLabel: {
      en: "Regex matches",
      fr: "Correspondances regex",
      es: "Coincidencias regex",
      de: "Regex Treffer",
      pt: "Correspondencias regex"
    },
    inputPlaceholder: {
      en: "/(error|warn)\\s+\\d+/gi\n\nINFO 101\nWARN 233\nerror 42",
      fr: "/(error|warn)\\s+\\d+/gi\n\nINFO 101\nWARN 233\nerror 42",
      es: "/(error|warn)\\s+\\d+/gi\n\nINFO 101\nWARN 233\nerror 42",
      de: "/(error|warn)\\s+\\d+/gi\n\nINFO 101\nWARN 233\nerror 42",
      pt: "/(error|warn)\\s+\\d+/gi\n\nINFO 101\nWARN 233\nerror 42"
    }
  },
  "uuid-generator": {
    allowFileUpload: false,
    inputLabel: {
      en: "Number of UUIDs",
      fr: "Nombre de UUID",
      es: "Numero de UUID",
      de: "Anzahl der UUID",
      pt: "Numero de UUID"
    },
    outputLabel: {
      en: "Generated UUID(s)",
      fr: "UUID genere(s)",
      es: "UUID generado(s)",
      de: "Generierte UUID",
      pt: "UUID gerado(s)"
    },
    inputPlaceholder: { en: "Example: 5", fr: "Exemple: 5", es: "Ejemplo: 5", de: "Beispiel: 5", pt: "Exemplo: 5" }
  },
  "password-generator": {
    allowFileUpload: false,
    inputLabel: {
      en: "Password length",
      fr: "Longueur du mot de passe",
      es: "Longitud de contrasena",
      de: "Passwortlaenge",
      pt: "Tamanho da senha"
    },
    outputLabel: {
      en: "Generated password(s)",
      fr: "Mot(s) de passe genere(s)",
      es: "Contrasena(s) generada(s)",
      de: "Generierte Passwoerter",
      pt: "Senha(s) gerada(s)"
    },
    inputPlaceholder: { en: "Example: 16", fr: "Exemple: 16", es: "Ejemplo: 16", de: "Beispiel: 16", pt: "Exemplo: 16" },
    outputPlaceholder: {
      en: "Generated password will appear here.",
      fr: "Le mot de passe genere apparait ici.",
      es: "La contrasena generada aparece aqui.",
      de: "Generiertes Passwort erscheint hier.",
      pt: "A senha gerada aparece aqui."
    }
  }
};
const relatedToolMap: Record<ToolId, ToolId[]> = {
  "json-to-yaml": ["yaml-to-json", "json-formatter", "json-validator", "json-minifier"],
  "yaml-to-json": ["json-to-yaml", "json-formatter", "json-validator", "json-minifier"],
  "json-to-csv": ["csv-to-json", "json-formatter", "json-validator", "json-minifier"],
  "csv-to-json": ["json-to-csv", "json-formatter", "json-validator", "json-minifier"],
  "json-to-typescript": ["json-to-python", "json-formatter", "json-validator", "json-minifier"],
  "json-to-python": ["json-to-typescript", "json-formatter", "json-validator", "json-minifier"],
  "xml-to-json": ["json-formatter", "json-validator", "json-minifier", "csv-to-json"],
  base64: ["url-encode-decode", "html-encode-decode", "jwt-decoder", "sha256-generator"],
  "jwt-decoder": ["base64", "sha256-generator", "md5-generator", "timestamp-converter"],
  "timestamp-converter": ["jwt-decoder", "json-validator", "uuid-generator", "regex-tester"],
  "json-formatter": ["json-validator", "json-minifier", "json-to-yaml", "yaml-to-json"],
  "json-validator": ["json-formatter", "json-minifier", "json-to-typescript", "json-to-python"],
  "json-minifier": ["json-formatter", "json-validator", "json-to-csv", "csv-to-json"],
  "url-encode-decode": ["html-encode-decode", "base64", "regex-tester", "jwt-decoder"],
  "html-encode-decode": ["url-encode-decode", "base64", "regex-tester", "md5-generator"],
  "sha256-generator": ["md5-generator", "base64", "uuid-generator", "password-generator"],
  "md5-generator": ["sha256-generator", "base64", "password-generator", "uuid-generator"],
  "regex-tester": ["url-encode-decode", "html-encode-decode", "uuid-generator", "password-generator"],
  "uuid-generator": ["password-generator", "md5-generator", "sha256-generator", "regex-tester"],
  "password-generator": ["uuid-generator", "sha256-generator", "md5-generator", "regex-tester"]
};

export function getLocalizedValue(values: LocalizedText, locale: Locale): string {
  return values[locale] ?? values.en;
}

export function getToolSlug(tool: ToolDefinition, locale: Locale): string {
  const override = slugOverrides[locale]?.[tool.id];
  return override ?? getLocalizedValue(tool.slugs, locale);
}

function getNativeToolName(tool: ToolDefinition, locale: Locale): string | null {
  const base = tool.name.en;

  if (locale === "zh") {
    return base
      .replace(" to ", " \u8f6c ")
      .replace(" encode / decode", " \u7f16\u7801 / \u89e3\u7801")
      .replace(" decoder", " \u89e3\u7801\u5668")
      .replace(" converter", " \u8f6c\u6362\u5668")
      .replace(" Formatter", " \u683c\u5f0f\u5316")
      .replace(" Validator", " \u6821\u9a8c\u5668")
      .replace(" Minifier", " \u538b\u7f29\u5668")
      .replace(" Generator", " \u751f\u6210\u5668")
      .replace(" classes", " \u7c7b");
  }

  if (locale === "ru") {
    return base
      .replace(" to ", " \u0432 ")
      .replace(" encode / decode", " \u043a\u043e\u0434\u0438\u0440\u043e\u0432\u0430\u0442\u044c / \u0434\u0435\u043a\u043e\u0434\u0438\u0440\u043e\u0432\u0430\u0442\u044c")
      .replace(" decoder", " \u0434\u0435\u043a\u043e\u0434\u0435\u0440")
      .replace(" converter", " \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0435\u0440")
      .replace(" Formatter", " \u0444\u043e\u0440\u043c\u0430\u0442\u0442\u0435\u0440")
      .replace(" Validator", " \u0432\u0430\u043b\u0438\u0434\u0430\u0442\u043e\u0440")
      .replace(" Minifier", " \u043c\u0438\u043d\u0438\u0444\u0430\u0439\u0435\u0440")
      .replace(" Generator", " \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440")
      .replace(" classes", " \u043a\u043b\u0430\u0441\u0441\u044b");
  }

  if (locale === "ar") {
    return base
      .replace(" to ", " \u0625\u0644\u0649 ")
      .replace(" encode / decode", " \u062a\u0631\u0645\u064a\u0632 / \u0641\u0643 \u062a\u0631\u0645\u064a\u0632")
      .replace(" decoder", " \u0645\u0641\u0643\u0643")
      .replace(" converter", " \u0645\u062d\u0648\u0644")
      .replace(" Formatter", " \u0645\u0646\u0633\u0642")
      .replace(" Validator", " \u0645\u062f\u0642\u0642")
      .replace(" Minifier", " \u0645\u0635\u063a\u0631")
      .replace(" Generator", " \u0645\u0648\u0644\u062f")
      .replace(" classes", " \u0641\u0626\u0627\u062a");
  }

  if (locale === "hi") {
    return base
      .replace(" to ", " \u0938\u0947 ")
      .replace(" encode / decode", " \u090f\u0928\u094d\u0915\u094b\u0921 / \u0921\u093f\u0915\u094b\u0921")
      .replace(" decoder", " \u0921\u093f\u0915\u094b\u0921\u0930")
      .replace(" converter", " \u0915\u0928\u094d\u0935\u0930\u094d\u091f\u0930")
      .replace(" Formatter", " \u092b\u0949\u0930\u094d\u092e\u0948\u091f\u0930")
      .replace(" Validator", " \u0935\u0948\u0932\u093f\u0921\u0947\u091f\u0930")
      .replace(" Minifier", " \u092e\u093f\u0928\u093f\u092b\u093e\u092f\u0930")
      .replace(" Generator", " \u091c\u0928\u0930\u0947\u091f\u0930")
      .replace(" classes", " \u0915\u094d\u0932\u093e\u0938\u0947\u0938");
  }

  return null;
}
export function getToolName(tool: ToolDefinition, locale: Locale): string {
  const nativeName = getNativeToolName(tool, locale);
  if (nativeName) {
    return nativeName;
  }

  const override = toolNameOverrides[locale]?.[tool.id];
  return override ?? getLocalizedValue(tool.name, locale);
}

export function getToolDescription(tool: ToolDefinition, locale: Locale): string {
  const toolName = getToolName(tool, locale);

  if (locale === "zh") return `\u5728\u6d4f\u89c8\u5668\u4e2d\u4f7f\u7528 ${toolName} \u53ef\u5feb\u901f\u5b8c\u6210\u6570\u636e\u8f6c\u6362\u3002`;
  if (locale === "ru") return `\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442 ${toolName} \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442 \u0431\u044b\u0441\u0442\u0440\u043e \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u044f\u043c\u043e \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435.`;
  if (locale === "ar") return `\u062a\u0633\u0627\u0639\u062f\u0643 \u0623\u062f\u0627\u0629 ${toolName} \u0639\u0644\u0649 \u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0628\u0633\u0631\u0639\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u062f\u0627\u062e\u0644 \u0627\u0644\u0645\u062a\u0635\u0641\u062d.`;
  if (locale === "hi") return `${toolName} \u0915\u0947 \u0938\u093e\u0925 \u0906\u092a \u092c\u094d\u0930\u093e\u0909\u091c\u093c\u0930 \u092e\u0947\u0902 \u0924\u0941\u0930\u0902\u0924 \u0921\u0947\u091f\u093e \u0915\u0928\u094d\u0935\u0930\u094d\u091c\u093c\u0928 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964`;

  return getLocalizedValue(tool.description, locale);
}
export function getToolInputLabel(toolId: ToolId, locale: Locale, fallback: string): string {
  const config = toolUiConfig[toolId];
  if (!config?.inputLabel) return fallback;
  return getLocalizedValue(config.inputLabel, locale);
}

export function getToolOutputLabel(toolId: ToolId, locale: Locale, fallback: string): string {
  const config = toolUiConfig[toolId];
  if (!config?.outputLabel) return fallback;
  return getLocalizedValue(config.outputLabel, locale);
}

export function getToolInputPlaceholder(toolId: ToolId, locale: Locale, fallback: string): string {
  const config = toolUiConfig[toolId];
  if (!config?.inputPlaceholder) return fallback;
  return getLocalizedValue(config.inputPlaceholder, locale);
}

export function getToolOutputPlaceholder(toolId: ToolId, locale: Locale, fallback: string): string {
  const config = toolUiConfig[toolId];
  if (!config?.outputPlaceholder) return fallback;
  return getLocalizedValue(config.outputPlaceholder, locale);
}

export function isFileUploadEnabled(toolId: ToolId): boolean {
  return toolUiConfig[toolId]?.allowFileUpload !== false;
}

export function getToolBySlug(locale: Locale, slug: string): ToolDefinition | undefined {
  return toolDefinitions.find((tool) => getToolSlug(tool, locale) === slug);
}

export function getToolPath(locale: Locale, toolId: ToolId): string {
  return `/${locale}/${getToolSlug(toolById[toolId], locale)}`;
}

export function getRelatedToolIds(toolId: ToolId): ToolId[] {
  return relatedToolMap[toolId] ?? [];
}

export function getRelatedTools(toolId: ToolId): ToolDefinition[] {
  return getRelatedToolIds(toolId).map((id) => toolById[id]).filter(Boolean);
}




