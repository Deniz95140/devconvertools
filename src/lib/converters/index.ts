import Papa from "papaparse";
import { XMLParser } from "fast-xml-parser";
import YAML from "yaml";

import type { ToolId } from "@/config/tools";
import { jsonToPythonDataclasses } from "@/lib/converters/generatePython";
import { jsonToTypeScript } from "@/lib/converters/generateTypescript";

export type ConvertOptions = Record<string, string>;

function parseJson(input: string): unknown {
  try {
    return JSON.parse(input);
  } catch {
    throw new Error("Invalid JSON input.");
  }
}

function toPrettyJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function jsonToCsv(input: string): string {
  const parsed = parseJson(input);

  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      return "";
    }

    if (parsed.every((item) => typeof item !== "object" || item === null)) {
      return Papa.unparse(parsed.map((item) => ({ value: item })));
    }

    return Papa.unparse(parsed as Array<Record<string, unknown>>);
  }

  if (typeof parsed === "object" && parsed !== null) {
    return Papa.unparse([parsed as Record<string, unknown>]);
  }

  throw new Error("JSON to CSV expects an object or array.");
}

function csvToJson(input: string): string {
  const result = Papa.parse<Record<string, string>>(input, {
    header: true,
    skipEmptyLines: "greedy"
  });

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  return toPrettyJson(result.data);
}

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddingNeeded = normalized.length % 4;
  const padded = paddingNeeded === 0 ? normalized : normalized + "=".repeat(4 - paddingNeeded);

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function decodeBase64(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddingNeeded = normalized.length % 4;
  const padded = paddingNeeded === 0 ? normalized : normalized + "=".repeat(4 - paddingNeeded);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodeJwt(input: string): string {
  const parts = input.trim().split(".");

  if (parts.length < 2) {
    throw new Error("JWT must contain at least header and payload.");
  }

  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));

  const output = {
    header,
    payload,
    signature: parts[2] ?? "",
    info: {
      expiresAt: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
      issuedAt: payload.iat ? new Date(payload.iat * 1000).toISOString() : null,
      notBefore: payload.nbf ? new Date(payload.nbf * 1000).toISOString() : null
    }
  };

  return toPrettyJson(output);
}

function parseTimestamp(input: string): Date {
  const trimmed = input.trim();

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    const numeric = Number(trimmed);

    if (!Number.isFinite(numeric)) {
      throw new Error("Invalid numeric timestamp.");
    }

    const millis = Math.abs(numeric) < 1e11 ? numeric * 1000 : numeric;
    const date = new Date(millis);

    if (Number.isNaN(date.getTime())) {
      throw new Error("Unable to parse timestamp.");
    }

    return date;
  }

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date string.");
  }

  return date;
}

function convertTimestamp(input: string, mode: string): string {
  if (mode === "to-iso") {
    const date = parseTimestamp(input);
    return [
      `ISO: ${date.toISOString()}`,
      `UTC: ${date.toUTCString()}`,
      `Local: ${date.toString()}`,
      `Unix seconds: ${Math.floor(date.getTime() / 1000)}`,
      `Unix milliseconds: ${date.getTime()}`
    ].join("\n");
  }

  const date = parseTimestamp(input);

  if (mode === "to-seconds") {
    return String(Math.floor(date.getTime() / 1000));
  }

  if (mode === "to-milliseconds") {
    return String(date.getTime());
  }

  throw new Error("Unknown timestamp mode.");
}

function validateJson(input: string): string {
  try {
    const parsed = JSON.parse(input);
    const type = Array.isArray(parsed) ? "array" : typeof parsed;
    const keys = typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
      ? Object.keys(parsed as Record<string, unknown>).length
      : 0;

    return ["Valid JSON", `Root type: ${type}`, `Root keys: ${keys}`].join("\n");
  } catch (error) {
    return `Invalid JSON\n${error instanceof Error ? error.message : "Unknown parsing error."}`;
  }
}

function htmlEncode(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlDecode(input: string): string {
  return input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function regexTest(input: string): string {
  const [patternLine = "", ...textLines] = input.split(/\r?\n/);
  const targetText = textLines.join("\n");

  if (!patternLine.trim()) {
    throw new Error("First line must contain a regex pattern (example: /foo/gi).");
  }

  let source = patternLine;
  let flags = "g";

  if (patternLine.startsWith("/") && patternLine.lastIndexOf("/") > 0) {
    const lastSlash = patternLine.lastIndexOf("/");
    source = patternLine.slice(1, lastSlash);
    flags = patternLine.slice(lastSlash + 1) || "g";
  }

  const regex = new RegExp(source, flags);
  const matches = Array.from(targetText.matchAll(regex)).map((match) => ({
    value: match[0],
    index: match.index ?? -1
  }));

  return toPrettyJson({
    pattern: source,
    flags,
    testStringLength: targetText.length,
    isMatch: matches.length > 0,
    totalMatches: matches.length,
    matches: matches.slice(0, 100)
  });
}

function parsePositiveInteger(input: string, fallback: number, max: number): number {
  const parsed = Number.parseInt(input.trim(), 10);

  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.max(1, Math.min(max, parsed));
}

function generatePassword(length: number, options: ConvertOptions): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.?";

  const includeUppercase = options.uppercase !== "exclude";
  const includeLowercase = options.lowercase !== "exclude";
  const includeNumbers = options.numbers !== "exclude";
  const includeSymbols = options.symbols === "include";

  let chars = "";
  if (includeUppercase) chars += uppercase;
  if (includeLowercase) chars += lowercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (!chars) {
    throw new Error("Enable at least one character group.");
  }

  const randomBytes = new Uint32Array(length);
  crypto.getRandomValues(randomBytes);

  return Array.from(randomBytes)
    .map((value) => chars[value % chars.length])
    .join("");
}

async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hashBytes = Array.from(new Uint8Array(digest));
  return hashBytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function md5(input: string): string {
  function rotateLeft(lValue: number, shiftBits: number): number {
    return (lValue << shiftBits) | (lValue >>> (32 - shiftBits));
  }

  function addUnsigned(lX: number, lY: number): number {
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);

    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      }
      return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    }
    return lResult ^ lX8 ^ lY8;
  }

  function f(x: number, y: number, z: number): number {
    return (x & y) | (~x & z);
  }

  function g(x: number, y: number, z: number): number {
    return (x & z) | (y & ~z);
  }

  function h(x: number, y: number, z: number): number {
    return x ^ y ^ z;
  }

  function i(x: number, y: number, z: number): number {
    return y ^ (x | ~z);
  }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str: string): number[] {
    const lWordCount: number[] = [];
    const lMessageLength = str.length;
    let lNumberOfWordsTempOne = lMessageLength + 8;
    const lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
    const lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
    let lBytePosition = 0;
    let lByteCount = 0;

    while (lByteCount < lMessageLength) {
      const lWordCountIndex = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordCount[lWordCountIndex] = lWordCount[lWordCountIndex] | (str.charCodeAt(lByteCount) << lBytePosition);
      lByteCount += 1;
    }

    const lWordCountIndex = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordCount[lWordCountIndex] = lWordCount[lWordCountIndex] | (0x80 << lBytePosition);
    lWordCount[lNumberOfWords - 2] = lMessageLength << 3;
    lWordCount[lNumberOfWords - 1] = lMessageLength >>> 29;

    return lWordCount;
  }

  function wordToHex(lValue: number): string {
    let wordToHexValue = "";

    for (let lCount = 0; lCount <= 3; lCount += 1) {
      const lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue += (`0${lByte.toString(16)}`).slice(-2);
    }

    return wordToHexValue;
  }

  const x = convertToWordArray(unescape(encodeURIComponent(input)));
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let k = 0; k < x.length; k += 16) {
    const aa = a;
    const bb = b;
    const cc = c;
    const dd = d;

    a = ff(a, b, c, d, x[k], 7, 0xd76aa478);
    d = ff(d, a, b, c, x[k + 1], 12, 0xe8c7b756);
    c = ff(c, d, a, b, x[k + 2], 17, 0x242070db);
    b = ff(b, c, d, a, x[k + 3], 22, 0xc1bdceee);
    a = ff(a, b, c, d, x[k + 4], 7, 0xf57c0faf);
    d = ff(d, a, b, c, x[k + 5], 12, 0x4787c62a);
    c = ff(c, d, a, b, x[k + 6], 17, 0xa8304613);
    b = ff(b, c, d, a, x[k + 7], 22, 0xfd469501);
    a = ff(a, b, c, d, x[k + 8], 7, 0x698098d8);
    d = ff(d, a, b, c, x[k + 9], 12, 0x8b44f7af);
    c = ff(c, d, a, b, x[k + 10], 17, 0xffff5bb1);
    b = ff(b, c, d, a, x[k + 11], 22, 0x895cd7be);
    a = ff(a, b, c, d, x[k + 12], 7, 0x6b901122);
    d = ff(d, a, b, c, x[k + 13], 12, 0xfd987193);
    c = ff(c, d, a, b, x[k + 14], 17, 0xa679438e);
    b = ff(b, c, d, a, x[k + 15], 22, 0x49b40821);

    a = gg(a, b, c, d, x[k + 1], 5, 0xf61e2562);
    d = gg(d, a, b, c, x[k + 6], 9, 0xc040b340);
    c = gg(c, d, a, b, x[k + 11], 14, 0x265e5a51);
    b = gg(b, c, d, a, x[k], 20, 0xe9b6c7aa);
    a = gg(a, b, c, d, x[k + 5], 5, 0xd62f105d);
    d = gg(d, a, b, c, x[k + 10], 9, 0x02441453);
    c = gg(c, d, a, b, x[k + 15], 14, 0xd8a1e681);
    b = gg(b, c, d, a, x[k + 4], 20, 0xe7d3fbc8);
    a = gg(a, b, c, d, x[k + 9], 5, 0x21e1cde6);
    d = gg(d, a, b, c, x[k + 14], 9, 0xc33707d6);
    c = gg(c, d, a, b, x[k + 3], 14, 0xf4d50d87);
    b = gg(b, c, d, a, x[k + 8], 20, 0x455a14ed);
    a = gg(a, b, c, d, x[k + 13], 5, 0xa9e3e905);
    d = gg(d, a, b, c, x[k + 2], 9, 0xfcefa3f8);
    c = gg(c, d, a, b, x[k + 7], 14, 0x676f02d9);
    b = gg(b, c, d, a, x[k + 12], 20, 0x8d2a4c8a);

    a = hh(a, b, c, d, x[k + 5], 4, 0xfffa3942);
    d = hh(d, a, b, c, x[k + 8], 11, 0x8771f681);
    c = hh(c, d, a, b, x[k + 11], 16, 0x6d9d6122);
    b = hh(b, c, d, a, x[k + 14], 23, 0xfde5380c);
    a = hh(a, b, c, d, x[k + 1], 4, 0xa4beea44);
    d = hh(d, a, b, c, x[k + 4], 11, 0x4bdecfa9);
    c = hh(c, d, a, b, x[k + 7], 16, 0xf6bb4b60);
    b = hh(b, c, d, a, x[k + 10], 23, 0xbebfbc70);
    a = hh(a, b, c, d, x[k + 13], 4, 0x289b7ec6);
    d = hh(d, a, b, c, x[k], 11, 0xeaa127fa);
    c = hh(c, d, a, b, x[k + 3], 16, 0xd4ef3085);
    b = hh(b, c, d, a, x[k + 6], 23, 0x04881d05);
    a = hh(a, b, c, d, x[k + 9], 4, 0xd9d4d039);
    d = hh(d, a, b, c, x[k + 12], 11, 0xe6db99e5);
    c = hh(c, d, a, b, x[k + 15], 16, 0x1fa27cf8);
    b = hh(b, c, d, a, x[k + 2], 23, 0xc4ac5665);

    a = ii(a, b, c, d, x[k], 6, 0xf4292244);
    d = ii(d, a, b, c, x[k + 7], 10, 0x432aff97);
    c = ii(c, d, a, b, x[k + 14], 15, 0xab9423a7);
    b = ii(b, c, d, a, x[k + 5], 21, 0xfc93a039);
    a = ii(a, b, c, d, x[k + 12], 6, 0x655b59c3);
    d = ii(d, a, b, c, x[k + 3], 10, 0x8f0ccc92);
    c = ii(c, d, a, b, x[k + 10], 15, 0xffeff47d);
    b = ii(b, c, d, a, x[k + 1], 21, 0x85845dd1);
    a = ii(a, b, c, d, x[k + 8], 6, 0x6fa87e4f);
    d = ii(d, a, b, c, x[k + 15], 10, 0xfe2ce6e0);
    c = ii(c, d, a, b, x[k + 6], 15, 0xa3014314);
    b = ii(b, c, d, a, x[k + 13], 21, 0x4e0811a1);
    a = ii(a, b, c, d, x[k + 4], 6, 0xf7537e82);
    d = ii(d, a, b, c, x[k + 11], 10, 0xbd3af235);
    c = ii(c, d, a, b, x[k + 2], 15, 0x2ad7d2bb);
    b = ii(b, c, d, a, x[k + 9], 21, 0xeb86d391);

    a = addUnsigned(a, aa);
    b = addUnsigned(b, bb);
    c = addUnsigned(c, cc);
    d = addUnsigned(d, dd);
  }

  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

export async function convert(toolId: ToolId, input: string, options: ConvertOptions): Promise<string> {
  switch (toolId) {
    case "json-to-yaml": {
      return YAML.stringify(parseJson(input));
    }
    case "yaml-to-json": {
      return toPrettyJson(YAML.parse(input));
    }
    case "json-to-csv": {
      return jsonToCsv(input);
    }
    case "csv-to-json": {
      return csvToJson(input);
    }
    case "json-to-typescript": {
      return jsonToTypeScript(parseJson(input));
    }
    case "json-to-python": {
      return jsonToPythonDataclasses(parseJson(input));
    }
    case "xml-to-json": {
      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
      return toPrettyJson(parser.parse(input));
    }
    case "base64": {
      return options.mode === "decode" ? decodeBase64(input) : encodeBase64(input);
    }
    case "jwt-decoder": {
      return decodeJwt(input);
    }
    case "timestamp-converter": {
      return convertTimestamp(input, options.mode ?? "to-iso");
    }
    case "json-formatter": {
      return toPrettyJson(parseJson(input));
    }
    case "json-validator": {
      return validateJson(input);
    }
    case "json-minifier": {
      return JSON.stringify(parseJson(input));
    }
    case "url-encode-decode": {
      return options.mode === "decode" ? decodeURIComponent(input) : encodeURIComponent(input);
    }
    case "html-encode-decode": {
      return options.mode === "decode" ? htmlDecode(input) : htmlEncode(input);
    }
    case "sha256-generator": {
      return sha256(input);
    }
    case "md5-generator": {
      return md5(input);
    }
    case "regex-tester": {
      return regexTest(input);
    }
    case "uuid-generator": {
      const count = parsePositiveInteger(input, 1, 100);
      return Array.from({ length: count }, () => crypto.randomUUID()).join("\n");
    }
    case "password-generator": {
      const length = parsePositiveInteger(input, 16, 128);
      const count = parsePositiveInteger(options.count ?? "1", 1, 20);
      return Array.from({ length: count }, () => generatePassword(length, options)).join("\n");
    }
    default: {
      return input;
    }
  }
}