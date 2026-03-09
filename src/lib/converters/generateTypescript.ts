type Context = {
  interfaces: string[];
  usedNames: Set<string>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pascalCase(input: string): string {
  const clean = input.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  if (!clean) {
    return "GeneratedType";
  }

  return clean
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function uniqueName(base: string, context: Context): string {
  let name = base;
  let suffix = 2;

  while (context.usedNames.has(name)) {
    name = `${base}${suffix}`;
    suffix += 1;
  }

  context.usedNames.add(name);
  return name;
}

function toIdentifier(key: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : `'${key}'`;
}

function inferType(value: unknown, nameHint: string, context: Context): string {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "any[]";
    }

    const itemTypes = Array.from(
      new Set(value.map((item) => inferType(item, `${nameHint}Item`, context)))
    );

    const unionType = itemTypes.length === 1 ? itemTypes[0] : `(${itemTypes.join(" | ")})`;
    return `${unionType}[]`;
  }

  if (isObject(value)) {
    const interfaceName = uniqueName(pascalCase(nameHint), context);

    const lines = Object.entries(value).map(([key, child]) => {
      const childType = inferType(child, key, context);
      return `  ${toIdentifier(key)}: ${childType};`;
    });

    const body = lines.length > 0 ? lines.join("\n") : "  [key: string]: unknown;";
    context.interfaces.push(`export interface ${interfaceName} {\n${body}\n}`);

    return interfaceName;
  }

  if (typeof value === "string") {
    return "string";
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? "number" : "number";
  }

  if (typeof value === "boolean") {
    return "boolean";
  }

  return "unknown";
}

export function jsonToTypeScript(value: unknown): string {
  const context: Context = {
    interfaces: [],
    usedNames: new Set()
  };

  const rootType = inferType(value, "Root", context);

  const sections: string[] = [];
  if (context.interfaces.length > 0) {
    sections.push(context.interfaces.join("\n\n"));
  }

  const hasRootInterface = context.interfaces.some((entry) => entry.startsWith("export interface Root "));
  if (!(hasRootInterface && rootType === "Root")) {
    sections.push(`export type Root = ${rootType};`);
  }
  return sections.join("\n\n");
}
