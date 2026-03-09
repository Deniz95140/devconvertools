"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { FileDropZone } from "@/components/FileDropZone";
import {
  getLocalizedValue,
  getToolInputLabel,
  getToolInputPlaceholder,
  getToolName,
  getToolOutputLabel,
  getToolOutputPlaceholder,
  getToolPath,
  isFileUploadEnabled,
  toolById,
  toolDefinitions,
  type ToolId
} from "@/config/tools";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { convert } from "@/lib/converters";

function getDefaultOptions(toolId: ToolId): Record<string, string> {
  const tool = toolById[toolId];
  const entries = (tool.options ?? []).map((option) => [option.id, option.defaultValue]);
  return Object.fromEntries(entries);
}

type ConverterWorkbenchProps = {
  locale: Locale;
  toolId: ToolId;
};

export function ConverterWorkbench({ locale, toolId }: ConverterWorkbenchProps) {
  const router = useRouter();
  const messages = getMessages(locale);
  const tool = toolById[toolId];

  const [input, setInput] = useState(tool.sampleInput);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [sourceFile, setSourceFile] = useState("");
  const [options, setOptions] = useState<Record<string, string>>(() => getDefaultOptions(toolId));

  useEffect(() => {
    setInput(tool.sampleInput);
    setOutput("");
    setError(null);
    setCopied(false);
    setSourceFile("");
    setOptions(getDefaultOptions(toolId));
  }, [tool.sampleInput, toolId]);

  useEffect(() => {
    let isCancelled = false;

    if (!input.trim()) {
      setOutput("");
      setError(null);
      return () => {
        isCancelled = true;
      };
    }

    (async () => {
      try {
        const converted = await convert(toolId, input, options);

        if (!isCancelled) {
          setOutput(converted);
          setError(null);
        }
      } catch (conversionError) {
        if (!isCancelled) {
          setOutput("");
          setError(conversionError instanceof Error ? conversionError.message : "Unexpected conversion error.");
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [input, options, toolId]);

  const toolOptions = useMemo(() => tool.options ?? [], [tool.options]);

  function handleDownload() {
    if (!output) {
      return;
    }

    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${tool.id}.${tool.outputExtension}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1200);
  }

  const inputLabel = getToolInputLabel(toolId, locale, messages.input);
  const outputLabel = getToolOutputLabel(toolId, locale, messages.output);
  const inputPlaceholder = getToolInputPlaceholder(toolId, locale, messages.inputPlaceholder);
  const outputPlaceholder = getToolOutputPlaceholder(toolId, locale, messages.outputPlaceholder);
  const canUpload = isFileUploadEnabled(toolId);

  return (
    <section className="workbench">
      <div className="workbench-toolbar">
        <div className="field-group compact">
          <label htmlFor="tool-select">{messages.quickSwitch}</label>
          <select
            id="tool-select"
            value={toolId}
            onChange={(event) => {
              const selectedTool = event.target.value as ToolId;
              router.push(getToolPath(locale, selectedTool));
            }}
          >
            {toolDefinitions.map((item) => (
              <option key={item.id} value={item.id}>
                {getToolName(item, locale)}
              </option>
            ))}
          </select>
        </div>

        {toolOptions.map((option) => (
          <div className="field-group compact" key={option.id}>
            <label htmlFor={`option-${option.id}`}>{getLocalizedValue(option.label, locale)}</label>
            <select
              id={`option-${option.id}`}
              value={options[option.id] ?? option.defaultValue}
              onChange={(event) => {
                const value = event.target.value;
                setOptions((current) => ({ ...current, [option.id]: value }));
              }}
            >
              {option.choices.map((choice) => (
                <option value={choice.value} key={choice.value}>
                  {getLocalizedValue(choice.label, locale)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="workbench-upload-row">
        {canUpload ? (
          <FileDropZone
            label={messages.upload}
            hint={messages.dropHint}
            onLoaded={(content, filename) => {
              setInput(content);
              setSourceFile(filename);
            }}
          />
        ) : null}

        <div className="action-buttons">
          <button type="button" className="button" onClick={() => void handleCopy()} disabled={!output}>
            {copied ? messages.copied : messages.copy}
          </button>
          <button type="button" className="button" onClick={handleDownload} disabled={!output}>
            {messages.download}
          </button>
        </div>
      </div>

      {sourceFile ? (
        <p className="source-file">
          {messages.sourceFile}: <strong>{sourceFile}</strong>
        </p>
      ) : null}

      {error ? (
        <p className="error-banner">
          {messages.errorPrefix}: {error}
        </p>
      ) : null}

      <div className="editors-grid">
        <div className="editor-panel">
          <label htmlFor="input-editor">{inputLabel}</label>
          <textarea
            id="input-editor"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            placeholder={inputPlaceholder}
          />
        </div>

        <div className="editor-panel">
          <label htmlFor="output-editor">{outputLabel}</label>
          <textarea
            id="output-editor"
            value={output}
            readOnly
            spellCheck={false}
            placeholder={outputPlaceholder}
          />
        </div>
      </div>
    </section>
  );
}
