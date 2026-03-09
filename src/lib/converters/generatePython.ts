type Context = {
  classes: string[];
  usedNames: Set<string>;
  imports: Set<string>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pascalCase(input: string): string {
  const clean = input.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  if (!clean) {
    return "GeneratedClass";
  }

  return clean
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function snakeCase(input: string): string {
  const replaced = input
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

  return replaced || "field_value";
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

function inferType(value: unknown, nameHint: string, context: Context): string {
  if (value === null || value === undefined) {
    context.imports.add("Any");
    return "Any";
  }

  if (Array.isArray(value)) {
    context.imports.add("List");

    if (value.length === 0) {
      context.imports.add("Any");
      return "List[Any]";
    }

    const itemTypes = Array.from(new Set(value.map((item) => inferType(item, `${nameHint}Item`, context))));

    if (itemTypes.length === 1) {
      return `List[${itemTypes[0]}]`;
    }

    context.imports.add("Union");
    return `List[Union[${itemTypes.join(", ")}]]`;
  }

  if (isObject(value)) {
    const className = uniqueName(pascalCase(nameHint), context);

    const lines = Object.entries(value).map(([key, child]) => {
      const pyName = snakeCase(key);
      const pyType = inferType(child, key, context);

      if (pyName !== key) {
        return `    ${pyName}: ${pyType}  # original key: ${key}`;
      }

      return `    ${pyName}: ${pyType}`;
    });

    const body = lines.length > 0 ? lines.join("\n") : "    pass";
    context.classes.push(`@dataclass\nclass ${className}:\n${body}`);

    return className;
  }

  if (typeof value === "boolean") {
    return "bool";
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? "int" : "float";
  }

  if (typeof value === "string") {
    return "str";
  }

  context.imports.add("Any");
  return "Any";
}

export function jsonToPythonDataclasses(value: unknown): string {
  const context: Context = {
    classes: [],
    usedNames: new Set(),
    imports: new Set()
  };

  const rootType = inferType(value, "Root", context);

  const imports = ["from dataclasses import dataclass"];
  if (context.imports.size > 0) {
    imports.push(`from typing import ${Array.from(context.imports).sort().join(", ")}`);
  }

  const content: string[] = [imports.join("\n")];
  if (context.classes.length > 0) {
    content.push(context.classes.join("\n\n"));
  }

  if (!context.classes.some((entry) => entry.includes("class Root"))) {
    content.push(`RootValue = ${rootType}`);
  }

  return content.join("\n\n");
}
